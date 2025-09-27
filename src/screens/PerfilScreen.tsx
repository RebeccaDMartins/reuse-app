import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import { PrimaryButton, OutlineButton } from "../components/Buttons";
import { save, load } from "../lib/storage";
import { useAuth } from "../lib/auth";

const PERFIL_KEY = "perfil-usuario";

export default function PerfilScreen() {
  const { user, login, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? "Ana Maria");
  const [handle, setHandle] = useState(user?.handle ?? "@ana.maria");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const perfil = await load<{ name: string; handle: string }>(PERFIL_KEY);
      if (perfil) {
        setName(perfil.name || name);
        setHandle(perfil.handle || handle);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salvarPerfil = async () => {
    if (!name.trim()) return Alert.alert("Ops", "Informe um nome.");
    if (!handle.trim().startsWith("@")) return Alert.alert("Ops", "Use formato @usuario.");
    await save(PERFIL_KEY, { name, handle });
    // Atualiza também o usuário autenticado (mantendo o e-mail atual)
    if (user?.email) await login({ name, handle, email: user.email });
    setEditing(false);
    Alert.alert("Pronto", "Perfil salvo no dispositivo.");
  };

  return (
    <ScreenScaffold title="Perfil">
      <View style={styles.header}>
        <View style={styles.avatar} accessibilityLabel="Avatar do usuário" accessible />
        <View style={{ width: 12 }} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.handle}>{handle}</Text>
        </View>
      </View>

      <View style={[baseStyles.card, { marginBottom: 12 }]}>
        <Text style={styles.sectionTitle} accessibilityRole="header">Informações</Text>
        <Row label="Cidade" value="São Paulo" />
        <Row label="Membro desde" value="2025" />
        <Row label="Anúncios ativos" value="2" />
      </View>

      {editing ? (
        <View style={[baseStyles.card, { marginBottom: 12 }]}>
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>Editar nome</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <Text style={{ fontWeight: "700", marginVertical: 6 }}>Editar @</Text>
          <TextInput value={handle} onChangeText={setHandle} style={styles.input} autoCapitalize="none" />
          <View style={{ height: 8 }} />
          <PrimaryButton label="Salvar" onPress={salvarPerfil} />
          <View style={{ height: 8 }} />
          <OutlineButton label="Cancelar" onPress={() => setEditing(false)} />
        </View>
      ) : (
        <>
          <PrimaryButton label="Editar perfil" onPress={() => setEditing(true)} />
          <View style={{ height: 8 }} />
          <OutlineButton label="Sair" onPress={logout} />
        </>
      )}
    </ScreenScaffold>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#C9CDD3" },
  name: { fontSize: 18, fontWeight: "700" },
  handle: { color: "#5B6876" },
  sectionTitle: { fontWeight: "700", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#EEF2F7" },
  rowLabel: { color: "#4B5563" },
  rowValue: { fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#D1D9E0", backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
});
