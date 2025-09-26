import React from "react";
import { View, Text } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import { PrimaryButton, OutlineButton } from "../components/Buttons";

const MOCK = [
  { id: "1", title: "Cafeteira", status: "Ativo" },
  { id: "2", title: "Livro UX", status: "Pausado" },
  { id: "3", title: "Camiseta M", status: "Ativo" },
];

export default function GerenciarScreen() {
  return (
    <ScreenScaffold title="Meus itens" subtitle="Edite, pause ou remova seus anúncios.">
      {MOCK.map((it) => (
        <View key={it.id} style={[baseStyles.card, { marginBottom: 12 }]} accessible accessibilityLabel={`Item ${it.title}, status ${it.status}`}>
          <View style={[baseStyles.row, { justifyContent: "space-between" }]}>
            <View style={baseStyles.row}>
              <View style={baseStyles.imagePh} />
              <View style={{ width: 8 }} />
              <View>
                <Text style={{ fontWeight: "700" }}>{it.title}</Text>
                <View style={baseStyles.pill}>
                  <Text style={baseStyles.pillText}>{it.status}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[baseStyles.row, { marginTop: 10 }]}>
            <OutlineButton label="Editar" onPress={() => {}} />
            <View style={{ width: 8 }} />
            <PrimaryButton label={it.status === "Ativo" ? "Pausar" : "Ativar"} onPress={() => {}} />
          </View>
        </View>
      ))}
    </ScreenScaffold>
  );
}
