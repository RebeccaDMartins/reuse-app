import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import LabeledInput from "../components/LabeledInput";
import { PrimaryButton, OutlineButton } from "../components/Buttons";

export default function PublicarScreen() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  return (
    <ScreenScaffold title="Publicar item" subtitle="Adicione fotos, descreva e defina as condições.">
      <View accessible accessibilityLabel="Área para adicionar foto do item" style={[styles.hero, { marginBottom: 12 }]}>
        <View style={[baseStyles.imagePh, { width: 96, height: 96 }]} />
        <Text style={{ marginTop: 8 }}>Toque para enviar fotos</Text>
      </View>

      <View style={baseStyles.card}>
        <LabeledInput label="Título" value={title} onChangeText={setTitle} placeholder="Ex.: Livro de design" />
        <LabeledInput
          label="Descrição"
          value={desc}
          onChangeText={setDesc}
          placeholder="Condição, tamanho, etc."
          multiline
          style={{ height: 96, textAlignVertical: "top" }}
        />
        <LabeledInput label="Preço (opcional)" value={price} onChangeText={setPrice} placeholder="Ex.: 25" keyboardType="numeric" />
      </View>

      <View style={{ height: 12 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <OutlineButton label="Salvar rascunho" onPress={() => {}} />
        <View style={{ width: 12 }} />
        <PrimaryButton label="Publicar" onPress={() => {}} />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: "#F2F4F7", borderRadius: 16, padding: 16, alignItems: "center" },
});
