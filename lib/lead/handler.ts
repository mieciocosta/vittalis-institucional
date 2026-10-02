// ═══════════════════════════════════════════════════════════════
// RECEBIMENTO DO FORMULÁRIO DE CAMPANHA (POST /api/lead)
//
// Onde roda: o site é exportado como HTML estático (output: "export"),
// então não existe servidor Next em produção. Esta lógica roda como
// Pages Function do Cloudflare Pages (functions/api/lead.ts), no runtime
// de Workers: API Web padrão (Request/Response/fetch), sem fs e sem Node.
//
// O que faz: valida com zod, descarta robô (honeypot + tempo mínimo),
// limita tentativas por IP e repassa o lead para LEADS_WEBHOOK_URL.
// LGPD: nada de dado de saúde; o log nunca leva nome nem telefone.
// ═══════════════════════════════════════════════════════════════

import { z } from "zod";
import { CAMPANHAS } from "../content/campanhas";

export type AmbienteLead = { LEADS_WEBHOOK_URL?: string };

const SLUGS = CAMPANHAS.map((c) => c.slug) as [string, ...string[]];
const REF_POR_SLUG = Object.fromEntries(CAMPANHAS.map((c) => [c.slug, c.ref]));

const texto = (max: number) => z.string().trim().max(max).optional().default("");

// O formulário manda o telefone com máscara, (98) 98888-7777; aqui fica só
// o número, com DDD (10 ou 11 dígitos, ou 12/13 se vier com o 55).
const esquema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(80, "Nome muito longo."),
  telefone: z
    .string()
    .transform((t) => t.replace(/\D/g, ""))
    .pipe(z.string().min(10, "Informe o WhatsApp com DDD.").max(13, "Telefone inválido.")),
  para_quem: z.enum(["para_mim", "para_meu_filho", "outra_pessoa"], { message: "Escolha para quem é o atendimento." }),
  periodo: z.enum(["manha", "tarde", "qualquer"], { message: "Escolha o melhor período." }),
  consentimento: z.literal(true, { message: "É preciso autorizar o contato para enviar." }),
  campanha: z.enum(SLUGS),
  utm_source: texto(100),
  utm_medium: texto(100),
  utm_campaign: texto(100),
  utm_content: texto(100),
  empresa: texto(200), // honeypot
  tempo_ms: z.coerce.number().optional(),
});

const ERRO_GERAL = "Não conseguimos enviar agora. Tente de novo em instantes ou fale com a equipe pelo WhatsApp.";

// Limite simples por IP, em memória da instância. Não é à prova de tudo
// (cada instância tem a sua), mas segura rajada de robô sem configurar
// nada a mais na Cloudflare.
const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_JANELA = 5;
const tentativas = new Map<string, number[]>();

function excedeuLimite(ip: string, agora = Date.now()): boolean {
  const recentes = (tentativas.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  tentativas.set(ip, recentes);
  if (tentativas.size > 5000) tentativas.clear(); // não deixa a memória crescer sem fim
  return recentes.length > MAX_POR_JANELA;
}

function querHtml(request: Request): boolean {
  // Envio sem JavaScript (formulário nativo) espera uma página, não JSON.
  const tipo = request.headers.get("content-type") ?? "";
  return !tipo.includes("application/json");
}

function responder(request: Request, status: number, ok: boolean, mensagem?: string): Response {
  if (querHtml(request)) {
    const titulo = ok ? "Recebemos seu contato" : "Não foi possível enviar";
    const corpo = ok ? "Obrigado! Nossa equipe vai retornar pelo telefone informado." : mensagem ?? ERRO_GERAL;
    const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${titulo} | Vittalis Saúde</title><body style="font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 20px;color:#1A2B2A;line-height:1.6"><h1 style="font-size:28px">${titulo}</h1><p>${corpo}</p><p><a href="javascript:history.back()" style="color:#185C74">Voltar</a></p></body></html>`;
    return new Response(html, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  }
  return Response.json(ok ? { ok: true } : { ok: false, erro: mensagem ?? ERRO_GERAL }, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

async function lerCorpo(request: Request): Promise<Record<string, unknown> | null> {
  try {
    if ((request.headers.get("content-type") ?? "").includes("application/json")) {
      return (await request.json()) as Record<string, unknown>;
    }
    const form = await request.formData();
    const obj: Record<string, unknown> = {};
    form.forEach((v, k) => {
      obj[k] = typeof v === "string" ? v : "";
    });
    obj.consentimento = form.get("consentimento") === "on";
    return obj;
  } catch {
    return null;
  }
}

export async function processarLead(request: Request, env: AmbienteLead): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Método não permitido", { status: 405, headers: { allow: "POST" } });
  }

  // Só aceita envio vindo do próprio site.
  const origem = request.headers.get("origin");
  if (origem && new URL(origem).host !== new URL(request.url).host) {
    return responder(request, 403, false);
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "sem-ip";
  if (excedeuLimite(ip)) {
    return responder(request, 429, false, "Recebemos muitas tentativas seguidas. Aguarde alguns minutos ou fale com a equipe pelo WhatsApp.");
  }

  const bruto = await lerCorpo(request);
  if (!bruto) return responder(request, 400, false);

  const resultado = esquema.safeParse(bruto);
  if (!resultado.success) {
    const primeiro = resultado.error.issues[0];
    const campo = String(primeiro?.path[0] ?? "");
    const mensagem = ["nome", "telefone", "para_quem", "periodo", "consentimento"].includes(campo)
      ? primeiro.message
      : "Confira os campos e tente de novo.";
    return responder(request, 422, false, mensagem);
  }
  const d = resultado.data;

  // Robô: preencheu o campo escondido ou enviou rápido demais. Responde
  // "ok" para ele não insistir, mas não repassa nada.
  if (d.empresa || (d.tempo_ms !== undefined && d.tempo_ms < 2500)) {
    return responder(request, 200, true);
  }

  const webhook = env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] LEADS_WEBHOOK_URL não configurado: lead não foi repassado.", { campanha: d.campanha });
    return responder(request, 503, false, "O formulário está temporariamente indisponível. Fale com a equipe pelo WhatsApp ou pelo telefone.");
  }

  const lead = {
    origem: "site",
    campanha: d.campanha,
    ref: REF_POR_SLUG[d.campanha],
    nome: d.nome,
    telefone: d.telefone,
    para_quem: d.para_quem,
    periodo: d.periodo,
    consentimento: true,
    consentimento_em: new Date().toISOString(),
    utm_source: d.utm_source,
    utm_medium: d.utm_medium,
    utm_campaign: d.utm_campaign,
    utm_content: d.utm_content,
  };

  try {
    const resp = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) {
      console.error("[lead] webhook respondeu com erro", { status: resp.status, campanha: d.campanha });
      return responder(request, 502, false);
    }
  } catch (e) {
    console.error("[lead] falha ao chamar o webhook", { erro: e instanceof Error ? e.name : "desconhecido", campanha: d.campanha });
    return responder(request, 502, false);
  }

  return responder(request, 200, true);
}
