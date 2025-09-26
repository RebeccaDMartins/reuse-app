import React, { useState } from "react";
import { View } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import LabeledInput from "../components/LabeledInput";
import { PrimaryButton } from "../components/Buttons";

export default function CadastroScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenScaffold title="Crie sua conta" subtitle="Preencha os dados abaixo.">
      <View style={baseStyles.card}>
        <LabeledInput label="Nome" value={name} onChangeText={setName} placeholder="Seu nome completo" textContentType="name" />
        <LabeledInput label="E-mail" value={email} onChangeText={setEmail} placeholder="voce@email.com" keyboardType="email-address"
          textContentType="emailAddress" autoCapitalize="none" />
        <LabeledInput label="Senha" value={password} onChangeText={setPassword} placeholder="Mínimo 8 caracteres" secureTextEntry textContentType="password" />
      </View>
      <View style={{ height: 12 }} />
      <PrimaryButton label="Cadastrar" onPress={() => {}} />
    </ScreenScaffold>
  );
}
