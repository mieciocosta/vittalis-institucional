// UTMs do anúncio que trouxe a pessoa. Ficam na sessão do navegador para
// não se perderem se ela navegar pelo site antes de preencher o formulário.
// Vão só no corpo do POST do lead e nos eventos neutros, nunca na URL.

export const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type Utms = Partial<Record<(typeof CHAVES_UTM)[number], string>>;

const CHAVE_SESSAO = "vit_utms";

export function capturarUtms(): Utms {
  if (typeof window === "undefined") return {};
  let salvas: Utms = {};
  try {
    salvas = JSON.parse(sessionStorage.getItem(CHAVE_SESSAO) || "{}") as Utms;
  } catch {
    salvas = {};
  }
  const url = new URLSearchParams(window.location.search);
  const daUrl: Utms = {};
  for (const k of CHAVES_UTM) {
    const v = url.get(k);
    if (v) daUrl[k] = v.slice(0, 100);
  }
  // UTM nova na URL vale mais que a guardada.
  const finais = Object.keys(daUrl).length ? daUrl : salvas;
  try {
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(finais));
  } catch {
    // Navegação privada pode bloquear a sessão; segue sem guardar.
  }
  return finais;
}
