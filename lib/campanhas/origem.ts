// De onde a pessoa chegou ao site, para a planilha de contatos saber a
// origem mesmo quando o anúncio não tem UTM. Guardado na sessão já na
// PRIMEIRA página: depois de navegar pelo site, o "veio de" seria o
// próprio site.
//
// LGPD: só o domínio da página anterior (ex.: instagram.com) e se o clique
// veio de anúncio (fbclid da Meta, gclid do Google). Nada que identifique
// a pessoa, e nada disso vai para o Analytics.

export type Origem = {
  /** "meta" ou "google-ads" quando a URL traz a marca de clique de anúncio. */
  origem: string;
  /** Domínio da página anterior, sem "www.". Vazio se a pessoa digitou o endereço. */
  veio_de: string;
};

const CHAVE_SESSAO = "vit_origem";

export function capturarOrigem(): Origem {
  if (typeof window === "undefined") return { origem: "", veio_de: "" };
  try {
    const salva = sessionStorage.getItem(CHAVE_SESSAO);
    if (salva) return JSON.parse(salva) as Origem;
  } catch {
    // Navegação privada pode bloquear a sessão; segue calculando.
  }

  const url = new URLSearchParams(window.location.search);
  let origem = "";
  if (url.has("fbclid")) origem = "meta";
  else if (url.has("gclid") || url.has("gbraid") || url.has("wbraid")) origem = "google-ads";

  let veioDe = "";
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host !== window.location.hostname.replace(/^www\./, "")) veioDe = host.slice(0, 100);
    }
  } catch {
    veioDe = "";
  }

  const resultado = { origem, veio_de: veioDe };
  try {
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(resultado));
  } catch {
    // Sem sessão, a origem é recalculada na próxima página.
  }
  return resultado;
}
