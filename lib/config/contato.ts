// ═══════════════════════════════════════════════════════════════
// CONTATO DA VITTALIS: fonte ÚNICA do número de WhatsApp/telefone.
//
// Por que existe: em 30/09/2026 a Meta baniu o WhatsApp principal e o
// número estava escrito à mão em 14 lugares. Agora todo link wa.me e
// todo tel: do site sai daqui.
//
// O número vem de NEXT_PUBLIC_WHATSAPP_NUMBER (variável de BUILD no
// Cloudflare Pages: o site é estático, então o valor é gravado no HTML
// na hora do build). Sem a variável, vale o número padrão abaixo.
//
// Este arquivo não importa nada de propósito: o script
// `npm run check:campanhas` lê ele direto pelo Node.
// ═══════════════════════════════════════════════════════════════

const NUMERO_PADRAO = "5598920053606";

/** Só dígitos, com DDI e DDD. Ex.: 5598920053606 */
export const WHATSAPP_NUMERO = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || NUMERO_PADRAO).replace(/\D/g, "");

/** (98) 92005-3606 */
export const WHATSAPP_EXIBICAO = formatarNumero(WHATSAPP_NUMERO);

/** Link de ligar no formato internacional, que todo celular entende. */
export const TELEFONE_TEL = `tel:+${WHATSAPP_NUMERO}`;

/**
 * Mensagem pré-preenchida das páginas de campanha. Neutra de propósito:
 * igual em todas as páginas, sem nome de vacina, doença ou preço. Só muda
 * o código de referência, que diz à equipe de qual campanha a pessoa veio.
 */
export const MENSAGEM_NEUTRA = "Olá! Vim pelo site da Vittalis e gostaria de atendimento.";

export function mensagemComReferencia(ref?: string): string {
  return ref ? `${MENSAGEM_NEUTRA} (ref: ${ref})` : MENSAGEM_NEUTRA;
}

/** Link do WhatsApp. Sem `ref`, usa a mensagem livre (ou a neutra). */
export function linkWhatsApp(opcoes: { ref?: string; mensagem?: string } = {}): string {
  const texto = opcoes.mensagem ?? mensagemComReferencia(opcoes.ref);
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

/** Endereço do site em produção, sem barra no fim. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vittalissaude.com.br").replace(/\/+$/, "");

// ENDEREÇO: fonte única do site (rodapé, campanhas, especialidades e dados
// para o Google). Tem que ser IGUAL ao Business Info da Meta e ao cartão
// CNPJ, letra por letra (exigência da análise da Meta, 01/10/2026).
export const ENDERECO = {
  linha: "Av. Coronel Colares Moreira, nº 3, Salas 36/37",
  bairro: "Jardim Renascença",
  cidade: "São Luís/MA",
  cep: "65075-441",
  completo: "Av. Coronel Colares Moreira, nº 3, Salas 36/37, Jardim Renascença, São Luís/MA",
  mapsUrl: "https://maps.app.goo.gl/35Vernq6NtWw9vBLA",
  // Mapa sem chave de API, carregado só quando a pessoa chega na seção.
  mapaEmbed: "https://www.google.com/maps?q=Av.+Coronel+Colares+Moreira,+3,+Jardim+Renascen%C3%A7a,+S%C3%A3o+Lu%C3%ADs+-+MA&output=embed",
};

export const HORARIOS = {
  semana: "Segunda a sexta, das 8h às 18h",
  sabado: "Sábado, das 8h às 12h",
};

function formatarNumero(numero: string): string {
  // 55 + DDD (2) + 9 dígitos
  const m = numero.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : `+${numero}`;
}
