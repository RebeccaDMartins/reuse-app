import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { PrimaryButton, OutlineButton } from "../components/Buttons";

export default function HomeScreen({ navigation }: any) {
  const [q, setQ] = useState("");
  const categories = [ "Casa", "Eletrônicos", "Esportes", "Livros", "Moda", "Outros"];
  const featured = useMemo(() => ["Oferta da Semana", "Recomendado", "Perto de você"], []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        {/* Top bar */}
        <View style={styles.topbar}>
          <View style={styles.avatar} accessibilityLabel="Avatar do usuário" accessible />
          <View style={{ width: 12 }} />
          <SearchBar value={q} onChangeText={setQ} />
        </View>

        {/* Saudação */}
        <Text style={styles.h1} accessibilityRole="header">Olá, Ana Maria! </Text>
        <Text style={styles.muted}>Encontre itens ou publique o que não usa mais.</Text>
        <View style={{ height: 12 }} />

        {/* Hero */}
        <View style={styles.hero} accessible accessibilityLabel="Destaque">
          <View style={styles.heroImg} />
        </View>

        {/* Seções em destaque */}
        {featured.map((t) => (
          <View key={t} style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>{t}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={styles.card}
                  accessibilityRole="summary"
                  accessibilityLabel={`Item ${i}`}
                >
                  <View style={styles.cardImg} />
                  <Text style={{ fontWeight: "700", marginTop: 6 }}>Item {i}</Text>
                  <Text style={{ color: "#4B5563" }}>Tenho interesse</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}



        {/* CATEGORIAS — agora a ÚLTIMA seção da página */}
        <Text style={styles.h2} accessibilityRole="header">Categorias</Text>
        <View style={styles.grid}>
          {categories.map((t) => (
            <View
              key={t}
              style={styles.gridItem}
              accessibilityRole="button"
              accessibilityLabel={`Abrir categoria ${t}`}
            >
              <View style={styles.gridIcon} />
              <Text style={{ fontWeight: "600" }}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 22, fontWeight: "700" },
  h2: { fontSize: 18, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  muted: { color: "#5B6876" },
  topbar: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#C9CDD3" },
  hero: { backgroundColor: "#F2F4F7", borderRadius: 16, padding: 16, marginTop: 4 },
  heroImg: { height: 120, borderRadius: 12, backgroundColor: "#DBE1E8", marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "48%", backgroundColor: "#EFF2F5", padding: 12, borderRadius: 16, alignItems: "center", marginBottom: 12 },
  gridIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#D7DDE4", marginBottom: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  card: { width: 180, backgroundColor: "#fff", borderRadius: 16, padding: 12, borderColor: "#E2E8F0", borderWidth: 1, marginRight: 12 },
  cardImg: { width: "100%", height: 96, backgroundColor: "#E8EDF3", borderRadius: 12, borderWidth: 1, borderColor: "#DDE3EA" },
});
