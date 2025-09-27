import React, { useState } from "react";
import { View, Alert } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import LabeledInput from "../components/LabeledInput";
import { PrimaryButton } from "../components/Buttons";
import { useAuth } from "../lib/auth";

export default function CadastroScreen() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Ops", "Preencha todos os campos.");
      return;
    }
    const handle = "@" + name.trim().toLowerCase().replace(/\s+/g, ".");
    await login({ name: name.trim(), handle, email: email.trim().toLowerCase() });
    // App troca automaticamente para as Tabs
  };

  return (
    <ScreenScaffold title="Crie sua conta" subtitle="Preencha os dados abaixo.">
      <View style={baseStyles.card}>
        <LabeledInput label="Nome" value={name} onChangeText={setName} placeholder="Seu nome completo" textContentType="name" />
        <LabeledInput label="E-mail" value={email} onChangeText={setEmail} placeholder="voce@email.com" keyboardType="email-address"
          textContentType="emailAddress" autoCapitalize="none" />
        <LabeledInput label="Senha" value={password} onChangeText={setPassword} placeholder="Mínimo 8 caracteres" secureTextEntry textContentType="password" />
      </View>
      <View style={{ height: 12 }} />
      <PrimaryButton label="Cadastrar" onPress={onSignup} />
    </ScreenScaffold>
  );
}
