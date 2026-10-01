// Pages Function do Cloudflare Pages: atende POST /api/lead.
// www.vittalissaude.com.br aponta para vittalis-institucional.pages.dev,
// então é o Pages que serve o site. Ele publica tudo que está em
// functions/ junto com a pasta out/, sem configuração extra.
// LEADS_WEBHOOK_URL: Pages > Settings > Variables and Secrets (tipo Secret).
import { processarLead, type AmbienteLead } from "../../lib/lead/handler";

type Contexto = { request: Request; env: AmbienteLead };

export const onRequest = (contexto: Contexto) => processarLead(contexto.request, contexto.env);
