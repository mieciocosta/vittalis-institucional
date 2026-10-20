// ═══════════════════════════════════════════════════════════════
// PLANILHA DE CONTATOS DO SITE (Google Planilhas)
//
// Pedido do master (20/10): ver numa planilha quem preencheu o formulário
// das landing pages, o que preencheu e de qual campanha e anúncio veio.
//
// Como funciona: a planilha da equipe tem um Apps Script publicado como
// "App da Web" (código e passo a passo em scripts/planilha-leads/Codigo.gs).
// O site manda cada contato direto para esse endereço, sem servidor no meio:
// o site é estático, e a rota /api/lead do Cloudflare nunca funcionou em
// produção (respondia 405 e nenhum contato era guardado).
//
// Enquanto PLANILHA_URL estiver vazio, o formulário manda a pessoa para o
// WhatsApp com a mensagem pronta (o plano B), como antes.
//
// Este arquivo não importa nada de propósito, igual a contato.ts.
// ═══════════════════════════════════════════════════════════════

/** Endereço do App da Web da planilha (termina em /exec). */
export const PLANILHA_URL: string = "";

/**
 * Senha simples que a planilha confere. Não é segredo (fica no código da
 * página): só faz a planilha ignorar envio de robô que não saiu do site.
 * Tem que ser igual à CHAVE de scripts/planilha-leads/Codigo.gs.
 */
export const PLANILHA_CHAVE = "vittalis-site-2026";
