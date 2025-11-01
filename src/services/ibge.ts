// src/services/ibge.ts
export type Estado = { id: number; sigla: string; nome: string };
export type Municipio = { id: number; nome: string };
import { cacheGet, cacheSet } from "../lib/cache";

export async function getEstados(): Promise<Estado[]> {
    try {
        const res = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await res.json();
        return data.map((e: any) => ({ id: e.id, sigla: e.sigla, nome: e.nome }));
    } catch (error) {
        console.error("Erro ao buscar estados do IBGE:", error);
        return [];
    }
}

export async function getMunicipios(ufSigla: string): Promise<Municipio[]> {
    try {
        const res = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios?orderBy=nome`
        );
        const data = await res.json();
        return data.map((m: any) => ({ id: m.id, nome: m.nome }));
    } catch (error) {
        console.error("Erro ao buscar municípios do IBGE:", error);
        return [];
    }
}
