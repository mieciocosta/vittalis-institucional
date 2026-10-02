// Máscara do telefone dos formulários do site: (98) 98888-7777.
//
// Pedido do master (02/10): o campo de WhatsApp precisa de máscara e de
// limite, em todas as páginas. A máscara guia quem digita (DDD + número) e
// evita contato que a equipe não consegue retornar.

/** Formata enquanto a pessoa digita. Aceita colar com +55, espaço, traço etc. */
export function mascararTelefone(valor: string): string {
  let d = valor.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  // Sem o ")" no fim enquanto só tem o DDD: senão o apagar nunca passa dele.
  if (d.length <= 2) return d ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = resto.length === 9 ? 5 : 4; // celular tem 9 dígitos, fixo tem 8
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

/** Telefone completo: DDD + 8 ou 9 dígitos. */
export function telefoneCompleto(valor: string): boolean {
  const d = valor.replace(/\D/g, "");
  return d.length === 10 || d.length === 11;
}

/** Maior texto que a máscara produz: "(98) 98888-7777". */
export const TAMANHO_TELEFONE = 15;

/** Para o atributo pattern do input (o navegador avisa se estiver incompleto). */
export const PADRAO_TELEFONE = "\\(\\d{2}\\) \\d{4,5}-\\d{4}";

export const EXEMPLO_TELEFONE = "(98) 98888-7777";
