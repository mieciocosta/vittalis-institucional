// De onde a pessoa chegou ao site (guardado por 30 dias: ver
// lib/campanhas/atribuicao.ts), para a planilha e o texto do WhatsApp
// saberem a origem mesmo quando o anúncio não tem UTM.

import { capturarAtribuicao } from "./atribuicao";

export type Origem = { origem: string; veio_de: string; gclid: string; fbclid: string };

export function capturarOrigem(): Origem {
  const { origem, veio_de, gclid, fbclid } = capturarAtribuicao();
  return { origem, veio_de, gclid, fbclid };
}

/** Origem curta para o texto do WhatsApp: "google/cpc/vacinas", "meta", "instagram.com" ou "site". */
export function textoOrigem(): string {
  const a = capturarAtribuicao();
  const limpo = (t: string) => t.replace(/[[\]\n\r]/g, " ").trim().slice(0, 80);
  if (a.utms.utm_source) return limpo([a.utms.utm_source, a.utms.utm_medium, a.utms.utm_campaign].filter(Boolean).join("/"));
  if (a.origem) return a.origem;
  if (a.veio_de) return limpo(a.veio_de);
  return "site";
}

/** A mensagem com a origem no fim, do jeito que a equipe lê no WhatsApp. */
export function comOrigem(mensagem: string): string {
  return `${mensagem} [origem: ${textoOrigem()}]`;
}
