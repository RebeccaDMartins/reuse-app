import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import LabeledInput from "../components/LabeledInput";
import { PrimaryButton, OutlineButton } from "../components/Buttons";
import { useAuth } from "../lib/auth";

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const onLogin = async () => {
        if (!email.trim()) {
            alert("Informe um e-mail.");
            return;
        }
        const name = "Ana Maria";
        const handle = "@" + email.split("@")[0];
        await login({ name, handle, email });
    };

    return (
        <ScreenScaffold title="Bem-vindo(a)">
            <View style={baseStyles.card}>
                <LabeledInput label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <LabeledInput label="Senha" value={pwd} onChangeText={setPwd} secureTextEntry />
            </View>
            <View style={{ height: 12 }} />
            <PrimaryButton label="Entrar" onPress={onLogin} />
            <View style={{ height: 12 }} />
            <OutlineButton label="Criar conta" onPress={() => navigation.navigate("Cadastro")} />
        </ScreenScaffold>
    );
}
