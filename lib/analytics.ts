// ═══════════════════════════════════════════════════════════════
// EVENTOS DE ANALYTICS (GA4 + GTM)
//
// Regra das campanhas: a Meta restringe dados de domínios de saúde, e
// evento com nome de serviço médico é bloqueado. Por isso as páginas de
// campanha só disparam os 4 eventos neutros abaixo, e só com o slug da
// campanha e as UTMs. Nada de nome, telefone, doença ou vacina.
//
// No GTM, se houver Meta Pixel: generate_lead → Lead;
// click_whatsapp e click_phone → Contact. Nenhum evento customizado.
// ═══════════════════════════════════════════════════════════════

type Janela = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

/** Disparo genérico, usado pelas páginas antigas (home e especialidades). */
export function trackEvent(eventName: string, params?: Record<string, string>) {
  try {
    if (typeof window === "undefined") return;
    const w = window as Janela;
    w.gtag?.("event", eventName, params);
    w.dataLayer?.push({ event: eventName, ...params });
  } catch {
    // Analytics nunca pode quebrar a página.
  }
}

export const EVENTOS_CAMPANHA = ["generate_lead", "click_whatsapp", "click_phone", "click_maps"] as const;
export type EventoCampanha = (typeof EVENTOS_CAMPANHA)[number];

export const PARAMETROS_CAMPANHA = ["campaign_slug", "utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type ParametrosCampanha = Partial<Record<(typeof PARAMETROS_CAMPANHA)[number], string>>;

/** Disparo das páginas de campanha: só nomes e parâmetros da lista branca. */
export function trackCampanha(evento: EventoCampanha, params: ParametrosCampanha) {
  const limpos: Record<string, string> = {};
  for (const chave of PARAMETROS_CAMPANHA) {
    const valor = params[chave];
    if (valor) limpos[chave] = valor.slice(0, 100);
  }
  trackEvent(evento, limpos);
}
