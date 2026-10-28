// ATRIBUIÇÃO: de onde veio a visita, guardado no navegador por 30 dias.
// Pedido do master (28/10): quem clicou no anúncio e só volta dias depois
// para chamar no WhatsApp continua com a origem certa. Antes ficava só na
// sessão (sumia ao fechar a aba).
//
// Vale a ÚLTIMA chegada de fora, inteira: UTMs, código do clique do anúncio
// (gclid/fbclid) e o site anterior são guardados juntos. Uma chegada nova
// (outro anúncio, uma busca no Google) troca tudo de uma vez, para nunca
// misturar a UTM de um anúncio com a origem de outro. Visita direta e
// navegação dentro do site não mexem no que está guardado.
//
// LGPD: nada aqui identifica a pessoa (domínio da página anterior e os
// códigos do anúncio). Não vai para o Analytics. Navegação privada pode
// bloquear o armazenamento: aí tudo funciona, só sem lembrar.

export const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type Utms = Partial<Record<(typeof CHAVES_UTM)[number], string>>;

export type Atribuicao = {
  utms: Utms;
  /** "google-ads" ou "meta" quando a URL traz a marca de clique de anúncio. */
  origem: string;
  /** Domínio da página anterior, sem "www.". Vazio se a pessoa digitou o endereço. */
  veio_de: string;
  gclid: string;
  fbclid: string;
};

const VAZIA: Atribuicao = { utms: {}, origem: "", veio_de: "", gclid: "", fbclid: "" };
const CHAVE = "vit_atribuicao";
const VALIDADE_MS = 30 * 24 * 3600 * 1000;

function ler(): Atribuicao | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const env = JSON.parse(bruto) as { em: number; dados: Atribuicao };
    if (!env || typeof env.em !== "number" || Date.now() - env.em > VALIDADE_MS) return null;
    return { ...VAZIA, ...env.dados };
  } catch {
    return null;
  }
}

function guardar(dados: Atribuicao) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ em: Date.now(), dados }));
  } catch {
    // Sem armazenamento: a origem vale só para esta página.
  }
}

export function capturarAtribuicao(): Atribuicao {
  if (typeof window === "undefined") return VAZIA;
  const url = new URLSearchParams(window.location.search);

  const utms: Utms = {};
  for (const k of CHAVES_UTM) {
    const v = url.get(k);
    if (v) utms[k] = v.slice(0, 100);
  }
  const gclid = (url.get("gclid") || url.get("gbraid") || url.get("wbraid") || "").slice(0, 200);
  const fbclid = (url.get("fbclid") || "").slice(0, 200);
  let veioDe = "";
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host !== window.location.hostname.replace(/^www\./, "")) veioDe = host.slice(0, 100);
    }
  } catch {
    veioDe = "";
  }

  if (Object.keys(utms).length || gclid || fbclid || veioDe) {
    const nova: Atribuicao = { utms, origem: gclid ? "google-ads" : fbclid ? "meta" : "", veio_de: veioDe, gclid, fbclid };
    guardar(nova);
    return nova;
  }
  return ler() ?? VAZIA;
}
