// src/services/viacep.ts
export type ViaCepAddress = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string; // cidade
    uf: string;         // estado (sigla)
    erro?: boolean;
    mensagem?: string;
};

export async function getAddressByCep(cepInput: string): Promise<ViaCepAddress> {
    const cleanCep = String(cepInput || "").replace(/\D/g, "");

    if (cleanCep.length !== 8) {
        return {
            cep: "", logradouro: "", complemento: "", bairro: "", localidade: "", uf: "",
            erro: true, mensagem: "CEP inválido (use 8 dígitos).",
        };
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();

        if (data?.erro) {
            return {
                cep: "", logradouro: "", complemento: "", bairro: "", localidade: "", uf: "",
                erro: true, mensagem: "CEP não encontrado.",
            };
        }

        return {
            cep: data.cep ?? "",
            logradouro: data.logradouro ?? "",
            complemento: data.complemento ?? "",
            bairro: data.bairro ?? "",
            localidade: data.localidade ?? "",
            uf: data.uf ?? "",
        };
    } catch (error) {
        console.error("Erro ViaCEP:", error);
        return {
            cep: "", logradouro: "", complemento: "", bairro: "", localidade: "", uf: "",
            erro: true, mensagem: "Falha ao consultar o CEP.",
        };
    }
}
