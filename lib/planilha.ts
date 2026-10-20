// Envio dos contatos e dos cliques para a planilha da equipe.
// Configuração e o porquê em lib/config/planilha.ts.

import { PLANILHA_CHAVE, PLANILHA_URL } from "./config/planilha";
import { capturarUtms } from "./campanhas/utm";
import { capturarOrigem } from "./campanhas/origem";

export const planilhaLigada = PLANILHA_URL !== "";

export type DadosLead = {
  /** Qual formulário: o das campanhas (com caixa de autorização) ou o das especialidades. */
  formulario: "campanha" | "especialidade";
  nome: string;
  telefone: string;
  para_quem?: string;
  periodo?: string;
  /** Slug da página (planejamento-vacinal, pediatria...). */
  campanha: string;
  /** Nome que aparece na planilha. */
  campanha_nome: string;
  ref?: string;
  consentimento: boolean;
  /** Campo isca do formulário: só robô preenche. */
  empresa?: string;
  tempo_ms?: number;
};

export type RespostaPlanilha = { ok: boolean; erro?: string };

export type Botao = "whatsapp" | "telefone" | "mapa";

/** Campanha, anúncio e origem que acompanham tudo que vai para a planilha. */
function contexto() {
  return { chave: PLANILHA_CHAVE, ...capturarUtms(), ...capturarOrigem(), pagina: window.location.pathname };
}

/**
 * Grava o contato. ok=false com `erro` = a planilha recusou um campo (a
 * pessoa corrige); ok=false sem `erro` = não deu para gravar (rede ruim,
 * planilha fora do ar), e o formulário oferece o WhatsApp.
 */
export async function enviarParaPlanilha(lead: DadosLead): Promise<RespostaPlanilha> {
  if (!planilhaLigada) return { ok: false };
  // Sem AbortSignal.timeout: iPhone com iOS antigo não tem.
  const controle = new AbortController();
  const prazo = setTimeout(() => controle.abort(), 15000);
  try {
    // Corpo em texto puro de propósito: assim o navegador não faz a consulta
    // prévia de CORS (OPTIONS), que o Apps Script não sabe responder.
    const resp = await fetch(PLANILHA_URL, {
      method: "POST",
      body: JSON.stringify({ tipo: "lead", ...contexto(), ...lead }),
      credentials: "omit",
      signal: controle.signal,
    });
    const json = (await resp.json().catch(() => ({}))) as Partial<RespostaPlanilha>;
    return { ok: json.ok === true, erro: typeof json.erro === "string" ? json.erro : undefined };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(prazo);
  }
}

/** Manda sem esperar resposta: serve quando a página vai abrir o WhatsApp na hora. */
function enviarSemEsperar(corpo: Record<string, unknown>) {
  if (!planilhaLigada) return;
  try {
    fetch(PLANILHA_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      credentials: "omit",
      body: JSON.stringify({ ...contexto(), ...corpo }),
    }).catch(() => {});
  } catch {
    // A planilha nunca pode atrapalhar o clique.
  }
}

/** Contato do formulário das especialidades, que abre o WhatsApp no mesmo toque. */
export function guardarLeadSemEsperar(lead: DadosLead) {
  enviarSemEsperar({ tipo: "lead", ...lead });
}

/**
 * Conta um toque nos botões de WhatsApp, ligar ou mapa. Sem nenhum dado da
 * pessoa e sem esperar resposta: o link abre na hora.
 */
export function registrarCliquePlanilha(botao: Botao, campanha: { slug: string; ref?: string; nome?: string }) {
  enviarSemEsperar({ tipo: "clique", botao, campanha: campanha.slug, ref: campanha.ref ?? "", campanha_nome: campanha.nome ?? "" });
}
