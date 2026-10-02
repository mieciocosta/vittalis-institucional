// ═══════════════════════════════════════════════════════════════
// npm run check:campanhas: trava a publicação de página de campanha
// com termo proibido (Meta, WhatsApp, RDC Anvisa 96/2008, CFM 2.336/2023).
//
//   (sem argumento) roda no prebuild: confere o conteúdo das campanhas,
//                   metadados, nomes e alt das imagens, mensagem do
//                   WhatsApp, eventos de analytics e o texto dos
//                   componentes de app/campanhas.
//   --html          roda no postbuild: confere o HTML final gerado em
//                   out/campanhas/ (texto, meta tags, alt, links) e
//                   procura números de WhatsApp banidos em todo o out/.
//
// Lista configurável em scripts/campanhas-termos.json.
// Sai com código 1 se achar qualquer problema.
// ═══════════════════════════════════════════════════════════════
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { register } from "node:module";

// Os .ts do projeto são lidos pelo carregador de scripts/ts-hook.mjs.
register("./ts-hook.mjs", import.meta.url);

const RAIZ = new URL("..", import.meta.url).pathname;
const CFG = JSON.parse(readFileSync(join(RAIZ, "scripts/campanhas-termos.json"), "utf8"));

const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const PROIBIDOS = CFG.proibidos.map((t) => ({ original: t, norm: normalizar(t) }));
const PERMITIDOS = CFG.permitidos.map(normalizar);

const problemas = [];
const avisos = [];

function conferirTexto(texto, onde) {
  let t = normalizar(String(texto));
  for (const p of PERMITIDOS) t = t.split(p).join(" ");
  for (const { original, norm } of PROIBIDOS) {
    const i = t.indexOf(norm);
    if (i >= 0) problemas.push(`${onde}: termo proibido "${original}" em "…${t.slice(Math.max(0, i - 30), i + norm.length + 30).trim()}…"`);
  }
}

// Dados oficiais da empresa (lib/brand.ts) vêm em maiúsculas de propósito:
// são cópia letra por letra das Informações da empresa da Meta. Não contam
// como texto "gritado".
let DADOS_OFICIAIS = [];

function conferirCaixaAlta(texto, onde) {
  const siglas = new Set(CFG.siglasPermitidas.map((s) => s.toUpperCase()));
  let t = String(texto);
  for (const d of DADOS_OFICIAIS) t = t.split(d).join(" ");
  for (const palavra of t.match(/\p{Lu}{4,}/gu) ?? []) {
    if (!siglas.has(palavra.toUpperCase())) problemas.push(`${onde}: palavra em CAIXA ALTA "${palavra}" (tom gritado)`);
  }
}

function cadaTexto(valor, caminho, fn) {
  if (typeof valor === "string") fn(valor, caminho);
  else if (Array.isArray(valor)) valor.forEach((v, i) => cadaTexto(v, `${caminho}[${i}]`, fn));
  else if (valor && typeof valor === "object") for (const [k, v] of Object.entries(valor)) cadaTexto(v, `${caminho}.${k}`, fn);
}

function arquivos(dir, filtro) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? arquivos(p, filtro) : filtro(p) ? [p] : [];
  });
}

async function modoFontes() {
  const { CAMPANHAS, DIFERENCIAIS, RESSALVA, CONFIANCA } = await import(join(RAIZ, "lib/content/campanhas.ts"));
  const { mensagemComReferencia } = await import(join(RAIZ, "lib/config/contato.ts"));
  const { EVENTOS_CAMPANHA, PARAMETROS_CAMPANHA } = await import(join(RAIZ, "lib/analytics.ts"));
  const { LEGAL } = await import(join(RAIZ, "lib/legal.ts"));
  const { BRAND } = await import(join(RAIZ, "lib/brand.ts"));
  DADOS_OFICIAIS = [BRAND.legalName, BRAND.legalAddress].filter(Boolean);

  // 1. Conteúdo, metadados, alt e nomes de imagem de cada campanha
  for (const c of CAMPANHAS) {
    cadaTexto(c, `campanha ${c.slug}`, (t, onde) => {
      conferirTexto(t, onde);
      if (!/\.(arquivo|imagemOg|slug|ref|icone)$/.test(onde)) conferirCaixaAlta(t, onde);
    });
    if (!/^[a-z0-9-]+$/.test(c.slug)) problemas.push(`campanha ${c.slug}: slug fora do padrão`);
    // 2. Mensagem pré-preenchida do WhatsApp
    conferirTexto(mensagemComReferencia(c.ref), `whatsapp ${c.ref}`);
  }
  cadaTexto({ DIFERENCIAIS, RESSALVA, CONFIANCA }, "comum", (t, onde) => { conferirTexto(t, onde); conferirCaixaAlta(t, onde); });

  // 3. Arquivos de imagem das campanhas
  for (const f of arquivos(join(RAIZ, "public/images/campanhas"), () => true)) conferirTexto(relative(RAIZ, f), "arquivo de imagem");

  // 4. Analytics: só os nomes e parâmetros neutros da lista branca
  for (const e of EVENTOS_CAMPANHA) if (!CFG.eventosPermitidos.includes(e)) problemas.push(`analytics: evento fora da lista "${e}"`);
  for (const p of PARAMETROS_CAMPANHA) if (!CFG.parametrosPermitidos.includes(p)) problemas.push(`analytics: parâmetro fora da lista "${p}"`);

  // 5. Texto escrito direto nos componentes: só o que o leitor vê (texto
  // do JSX e frases entre aspas). Nomes de variável e CSS ficam de fora;
  // o HTML final é conferido por inteiro no postbuild (--html).
  for (const f of arquivos(join(RAIZ, "app/campanhas"), (p) => /\.tsx?$/.test(p))) {
    const fonte = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
    const visiveis = [
      ...[...fonte.matchAll(/>([^<>{}]*\p{L}[^<>{}]*)</gu)].map((m) => m[1]),
      ...[...fonte.matchAll(/"([^"\n]*\p{L}[^"\n]* [^"\n]*)"|'([^'\n]*\p{L}[^'\n]* [^'\n]*)'|`([^`$\n]*\p{L}[^`$\n]* [^`$\n]*)`/gu)].map((m) => m[1] ?? m[2] ?? m[3]),
    ];
    for (const v of visiveis) conferirTexto(v, relative(RAIZ, f));
    for (const m of fonte.matchAll(/trackCampanha\(\s*"([^"]+)"/g)) {
      if (!CFG.eventosPermitidos.includes(m[1])) problemas.push(`${relative(RAIZ, f)}: evento fora da lista "${m[1]}"`);
    }
  }

  // Pendências (avisam, não travam: o Dr. Miécio ainda vai preencher)
  if (!LEGAL.responsavelTecnicoNome || !LEGAL.responsavelTecnicoRegistro) avisos.push("lib/legal.ts: responsável técnico pendente (nome e registro no conselho)");
  if (!LEGAL.licencaSanitaria) avisos.push("lib/legal.ts: número da licença sanitária pendente");
}

function textoDoHtml(html) {
  const semScripts = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  const atributos = [...semScripts.matchAll(/\s(?:content|alt|title|aria-label|placeholder|value|href|src)="([^"]*)"/gi)].map((m) => m[1]);
  const texto = semScripts.replace(/<[^>]+>/g, " ");
  const decodificar = (t) => t.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
  return decodificar([texto, ...atributos].join(" \n "));
}

async function modoHtml() {
  const { CAMPANHAS } = await import(join(RAIZ, "lib/content/campanhas.ts"));
  const { mensagemComReferencia } = await import(join(RAIZ, "lib/config/contato.ts"));
  const out = join(RAIZ, "out");
  if (!existsSync(out)) {
    problemas.push("out/ não existe: rode o build antes de --html");
    return;
  }
  for (const c of CAMPANHAS) {
    const arquivo = join(out, "campanhas", `${c.slug}.html`);
    if (!existsSync(arquivo)) {
      problemas.push(`${relative(RAIZ, arquivo)} não foi gerado`);
      continue;
    }
    const html = readFileSync(arquivo, "utf8");
    conferirTexto(textoDoHtml(html), relative(RAIZ, arquivo));
    // Todo link de WhatsApp da página tem que levar a mensagem neutra da campanha.
    const esperado = mensagemComReferencia(c.ref);
    for (const m of html.matchAll(/https:\/\/wa\.me\/\d+\?text=([^"&\\]+)/g)) {
      const msg = decodeURIComponent(m[1]);
      if (msg !== esperado) problemas.push(`${relative(RAIZ, arquivo)}: WhatsApp com mensagem diferente da neutra: "${msg}"`);
    }
  }
  // Números banidos em qualquer página do site
  for (const f of arquivos(out, (p) => /\.(html|txt|xml|js)$/.test(p))) {
    const conteudo = readFileSync(f, "utf8");
    for (const n of CFG.numerosBanidos) if (conteudo.includes(n)) problemas.push(`${relative(RAIZ, f)}: número banido ${n}`);
  }
}

const html = process.argv.includes("--html");
await (html ? modoHtml() : modoFontes());

for (const a of avisos) console.warn(`⚠️  ${a}`);
if (problemas.length) {
  console.error(`\n✖ check:campanhas${html ? " --html" : ""} encontrou ${problemas.length} problema(s):\n`);
  for (const p of problemas) console.error(`  - ${p}`);
  console.error("\nCorrija o texto (ou, se for falso positivo, acrescente a frase em 'permitidos' de scripts/campanhas-termos.json).\n");
  process.exit(1);
}
console.log(`✓ check:campanhas${html ? " --html" : ""}: nenhum termo proibido.`);
