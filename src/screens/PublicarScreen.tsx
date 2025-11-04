import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert, Pressable, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import { PrimaryButton, OutlineButton } from "../components/Buttons";
import { save, load, remove } from "../lib/storage";

type Draft = { title: string; desc: string; price: string; images: string[] };
const DRAFT_KEY = "draft-publicacao";

export default function PublicarScreen() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const draft = await load<Draft>(DRAFT_KEY);
      if (draft) {
        setTitle(draft.title ?? "");
        setDesc(draft.desc ?? "");
        setPrice(draft.price ?? "");
        setImages(Array.isArray(draft.images) ? draft.images : []);
      }
    })();
  }, []);

  const pickFromCamera = async () => {
    const camPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (camPerm.status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos da câmera para tirar fotos do item.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setImages((prev) => [uri, ...prev].slice(0, 5));
    }
  };

  const pickFromGallery = async () => {
    const libPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libPerm.status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos da galeria para escolher fotos do item.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) setImages((prev) => [uri, ...prev].slice(0, 5));
    }
  };

  const saveDraft = async () => {
    const draft: Draft = { title, desc, price, images };
    await save(DRAFT_KEY, draft);
    Alert.alert("Rascunho salvo", "Guardamos seu rascunho no dispositivo.");
  };

  const publish = async () => {
    if (title.trim().length < 3) return Alert.alert("Ops", "Informe um título com pelo menos 3 caracteres.");
    if (desc.trim().length < 10) return Alert.alert("Ops", "Descreva o item com pelo menos 10 caracteres.");
    Alert.alert("Publicado!", `Título: ${title}\nFotos: ${images.length}\nPreço: ${price || "—"}`);
    await remove(DRAFT_KEY);
    setTitle(""); setDesc(""); setPrice(""); setImages([]);
  };

  return (
    <ScreenScaffold title="Publicar item" subtitle="Adicione fotos, descreva e defina as condições.">
      {/* Fotos / Câmera */}
      <View style={[styles.hero, { marginBottom: 12 }]}>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={pickFromCamera} accessibilityRole="button" accessibilityLabel="Abrir câmera" style={styles.addPhoto} hitSlop={12}>
            <Text style={{ fontWeight: "700" }}>Tirar foto</Text>
          </Pressable>
          <View style={{ width: 8 }} />
          <Pressable onPress={pickFromGallery} accessibilityRole="button" accessibilityLabel="Escolher da galeria" style={styles.addPhoto} hitSlop={12}>
            <Text style={{ fontWeight: "700" }}>Galeria</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {images.length === 0 ? (
            <Text style={{ color: "#6B7280" }}>Nenhuma foto selecionada</Text>
          ) : (
            images.map((uri) => (
              <View key={uri} style={{ marginRight: 8 }}>
                <Image source={{ uri }} style={styles.thumb} accessibilityLabel="Miniatura da foto selecionada" />
              </View>
            ))
          )}
        </View>
      </View>

      {}
      <View style={baseStyles.card}>
        <Label>Título</Label>
        <TextInput value={title} onChangeText={setTitle} placeholder="Ex.: Livro de design" style={styles.input} />
        <Label>Descrição</Label>
        <TextInput value={desc} onChangeText={setDesc} placeholder="Condição, tamanho, etc." multiline style={[styles.input, { height: 96, textAlignVertical: "top" }]} />
        <Label>Condições do produto</Label>
        <TextInput value={price} onChangeText={setPrice} placeholder="Ex.: Novo ou com alguma avaria" keyboardType="phone-pad" style={styles.input} />
      </View>

      <View style={{ height: 12 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <OutlineButton label="Salvar rascunho" onPress={saveDraft} />
        <View style={{ width: 12 }} />
        <PrimaryButton label="Publicar" onPress={publish} />
      </View>
    </ScreenScaffold>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontWeight: "700", marginTop: 8, marginBottom: 6 }}>{children}</Text>;
}

const styles = StyleSheet.create({
  hero: { backgroundColor: "#F2F4F7", borderRadius: 16, padding: 16 },
  addPhoto: {
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  thumb: { width: 72, height: 72, borderRadius: 10, backgroundColor: "#DDE3EA", borderWidth: 1, borderColor: "#CBD5E1" },
  input: { borderWidth: 1, borderColor: "#D1D9E0", backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
});
