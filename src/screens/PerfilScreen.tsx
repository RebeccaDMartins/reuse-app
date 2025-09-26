import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import { PrimaryButton, OutlineButton } from "../components/Buttons";

export default function PerfilScreen({ navigation }: any) {
  return (
    <ScreenScaffold title="Perfil">
      <View style={styles.header}>
        <View style={styles.avatar} accessibilityLabel="Avatar do usuário" accessible />
        <View style={{ width: 12 }} />
        <View>
          <Text style={styles.name}>Ana Maria</Text>
          <Text style={styles.handle}>@ana.maria</Text>
        </View>
      </View>

      <View style={[baseStyles.card, { marginBottom: 12 }]}>
        <Text style={styles.sectionTitle} accessibilityRole="header">Informações</Text>
        <Row label="Cidade" value="São Paulo" />
        <Row label="Membro desde" value="2023" />
        <Row label="Anúncios ativos" value="12" />
      </View>

      <PrimaryButton label="Editar perfil" onPress={() => {}} />
      <View style={{ height: 8 }} />
      <OutlineButton label="Ir para Cadastro" onPress={() => navigation.navigate("Cadastro")} />
      <View style={{ height: 8 }} />
      <OutlineButton label="Sair" onPress={() => {}} />
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
});
