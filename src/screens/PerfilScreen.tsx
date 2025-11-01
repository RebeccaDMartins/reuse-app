// src/screens/PerfilScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScreenScaffold, baseStyles } from "../components/Scaffold";
import { PrimaryButton, OutlineButton } from "../components/Buttons";
import { save, load } from "../lib/storage";
import { useAuth } from "../lib/auth";
import { getAddressByCep } from "../services/viacep";
import { getEstados, getMunicipios, Estado, Municipio } from "../services/ibge";

const PERFIL_KEY = "perfil-usuario";

function maskCep(v: string) {
  const d = String(v || "").replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export default function PerfilScreen() {
  const { user, login, logout } = useAuth();

  // dados básicos
  const [name, setName] = useState<string>(user?.name ?? "Ana Maria");
  const [handle, setHandle] = useState<string>(user?.handle ?? "@ana.maria");
  const [editing, setEditing] = useState<boolean>(false);

  // endereço
  const [cep, setCep] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [localidade, setLocalidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");

  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  // IBGE
  const [estados, setEstados] = useState<Estado[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loadingIbge, setLoadingIbge] = useState<boolean>(true);

  const numeroRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      // carrega perfil salvo
      const perfil = await load<{
        name: string;
        handle: string;
        cep?: string;
        logradouro?: string;
        numero?: string;
        complemento?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
      }>(PERFIL_KEY);

      if (perfil) {
        setName(perfil.name || "Ana Maria");
        setHandle(perfil.handle || "@ana.maria");
        setCep(maskCep(perfil.cep ?? ""));
        setLogradouro(perfil.logradouro ?? "");
        setNumero(perfil.numero ?? "");
        setComplemento(perfil.complemento ?? "");
        setBairro(perfil.bairro ?? "");
        setLocalidade(perfil.localidade ?? "");
        setUf(perfil.uf ?? "");
      }

      // carrega estados
      const estadosData = await getEstados();
      setEstados(estadosData);
      setLoadingIbge(false);

      // se já tiver UF salva, carrega municípios
      if (perfil?.uf) {
        const mun = await getMunicipios(perfil.uf);
        setMunicipios(mun);
      }
    })();
  }, []);

  async function buscarMunicipiosPorUf(sigla: string) {
    if (!sigla) return;
    setLoadingIbge(true);
    const data = await getMunicipios(sigla);
    setMunicipios(data);
    setLoadingIbge(false);
  }

  async function buscarEnderecoPorCep(valorCep?: string) {
    const raw = (valorCep ?? cep).replace(/\D/g, "");
    if (raw.length !== 8) return;

    try {
      setLoadingCep(true);
      const data = await getAddressByCep(raw);
      if (data.erro) {
        Alert.alert("CEP", data.mensagem || "Não foi possível buscar o CEP.");
        return;
      }
      setLogradouro(data.logradouro);
      setComplemento(data.complemento || "");
      setBairro(data.bairro);
      setLocalidade(data.localidade);
      setUf(data.uf);

      // atualiza municípios da UF vinda do CEP
      buscarMunicipiosPorUf(data.uf);

      // foca no número após preencher
      setTimeout(() => numeroRef.current?.focus(), 80);
    } finally {
      setLoadingCep(false);
    }
  }

  const onCepChange = (texto: string) => {
    const masked = maskCep(texto);
    setCep(masked);
    const clean = masked.replace(/\D/g, "");
    if (clean.length === 8) buscarEnderecoPorCep(masked);
  };

  const salvarPerfil = async () => {
    if (!name.trim()) return Alert.alert("Ops", "Informe um nome.");
    if (!handle.trim().startsWith("@")) return Alert.alert("Ops", "Use formato @usuario.");

    await save(PERFIL_KEY, {
      name,
      handle,
      cep: cep.replace(/\D/g, ""),
      logradouro,
      numero,
      complemento,
      bairro,
      localidade,
      uf,
    });

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
        <Row label="Cidade" value={localidade || "—"} />
        <Row label="Estado" value={uf || "—"} />
        <Row label="Membro desde" value="2025" />
        <Row label="Anúncios ativos" value="2" />
      </View>

      {editing ? (
        <>
          {/* edição de nome/@ */}
          <View style={[baseStyles.card, { marginBottom: 12 }]}>
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>Editar nome</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <Text style={{ fontWeight: "700", marginVertical: 6 }}>Editar @</Text>
            <TextInput value={handle} onChangeText={setHandle} style={styles.input} autoCapitalize="none" />
          </View>

          {/* endereço */}
          <View style={[baseStyles.card, { marginBottom: 12 }]}>
            <Text style={styles.sectionTitle} accessibilityRole="header">Endereço</Text>

            <Text style={styles.inputLabel}>CEP</Text>
            <TextInput
              placeholder="00000-000"
              keyboardType="numeric"
              value={cep}
              onChangeText={onCepChange}
              onBlur={() => cep.replace(/\D/g, "").length === 8 && buscarEnderecoPorCep()}
              style={styles.input}
              accessibilityLabel="Campo de CEP"
            />
            {loadingCep && <ActivityIndicator />}

            <Text style={styles.inputLabel}>Logradouro</Text>
            <TextInput
              placeholder="Rua / Avenida"
              value={logradouro}
              onChangeText={setLogradouro}
              style={styles.input}
              accessibilityLabel="Logradouro"
            />

            <Text style={styles.inputLabel}>Número</Text>
            <TextInput
              ref={numeroRef}
              placeholder="Número"
              keyboardType="numeric"
              value={numero}
              onChangeText={setNumero}
              style={styles.input}
              accessibilityLabel="Número"
            />

            <Text style={styles.inputLabel}>Complemento</Text>
            <TextInput
              placeholder="Apto, Bloco..."
              value={complemento}
              onChangeText={setComplemento}
              style={styles.input}
              accessibilityLabel="Complemento"
            />

            <Text style={styles.inputLabel}>Bairro</Text>
            <TextInput
              placeholder="Bairro"
              value={bairro}
              onChangeText={setBairro}
              style={styles.input}
              accessibilityLabel="Bairro"
            />

            {/* Estado (UF) */}
            <Text style={styles.inputLabel}>Estado (UF)</Text>
            {loadingIbge ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={uf as string}
                  onValueChange={(itemValue: string | number) => {
                    const value = String(itemValue);
                    setUf(value);
                    buscarMunicipiosPorUf(value);
                  }}
                >
                  <Picker.Item label="Selecione o estado" value="" />
                  {estados.map((e) => (
                    <Picker.Item key={e.id} label={`${e.sigla} - ${e.nome}`} value={e.sigla} />
                  ))}
                </Picker>
              </View>
            )}

            {/* Cidade */}
            <Text style={styles.inputLabel}>Cidade</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={localidade as string}
                onValueChange={(itemValue: string | number) => setLocalidade(String(itemValue))}
                enabled={municipios.length > 0}
              >
                <Picker.Item label="Selecione a cidade" value="" />
                {municipios.map((m) => (
                  <Picker.Item key={m.id} label={m.nome} value={m.nome} />
                ))}
              </Picker>
            </View>
          </View>

          <PrimaryButton label="Salvar" onPress={salvarPerfil} />
          <View style={{ height: 8 }} />
          <OutlineButton label="Cancelar" onPress={() => setEditing(false)} />
        </>
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
  inputLabel: { marginTop: 6, marginBottom: 4, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#D1D9E0", backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  pickerBox: { borderWidth: 1, borderColor: "#D1D9E0", borderRadius: 10, backgroundColor: "#fff" },
});
