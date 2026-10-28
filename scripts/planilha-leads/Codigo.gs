/**
 * PLANILHA DE CONTATOS DO SITE DA VITTALIS SAÚDE
 *
 * Pedido do Dr. Miécio (20/10): ver numa planilha quem preencheu o
 * formulário das landing pages, o que preencheu e de qual campanha e
 * anúncio a pessoa veio.
 *
 * O que este código faz, dentro da planilha:
 *   - Aba "Leads": um contato por linha, o mais novo em cima, com a
 *     campanha, o anúncio e de onde a pessoa veio. A equipe usa as
 *     colunas "Situação" e "Observações da equipe".
 *   - Aba "Cliques": quantas vezes tocaram nos botões de WhatsApp, ligar
 *     e mapa das campanhas. Sem nenhum dado da pessoa.
 *   - Aba "Resumo": os números por campanha, por origem e por situação.
 *   - Um e-mail de aviso a cada contato novo.
 *
 * INSTALAÇÃO (uma vez só)
 *   1. Na planilha, abra o menu Extensões > Apps Script.
 *   2. Apague o que estiver no editor, cole este arquivo inteiro e clique
 *      no disquete (Salvar).
 *   3. Na barra de cima, escolha a função "configurar" e clique em
 *      Executar. O Google pede autorização: Revisar permissões > escolha
 *      sua conta > Avançado > Acessar o projeto > Permitir. O aviso de
 *      "app não verificado" é normal: o app é seu.
 *   4. Clique em Implantar > Nova implantação > engrenagem > App da Web.
 *      Executar como: Eu. Quem pode acessar: Qualquer pessoa. Implantar.
 *   5. Copie o "URL do app da Web" (termina em /exec). Ele vai em
 *      PLANILHA_URL, no arquivo lib/config/planilha.ts do site.
 *
 * Mudou este código depois? Implantar > Gerenciar implantações > lápis >
 * Versão: Nova versão > Implantar. O endereço continua o mesmo.
 *
 * O original deste arquivo mora no repositório do site, em
 * scripts/planilha-leads/Codigo.gs.
 */

// Igual a PLANILHA_CHAVE em lib/config/planilha.ts. Não é segredo (fica no
// código da página): só faz a planilha ignorar envio de robô que não saiu
// do site.
const CHAVE = "vittalis-site-2026";

// Quem recebe o e-mail de cada contato novo. Vazio = só o dono da planilha.
// Exemplo: ["atendimento@vittalissaude.com.br", "outra@pessoa.com"]
const EMAILS_AVISO = [];

// São Luís: UTC-3 o ano inteiro, sem horário de verão.
const FUSO = "America/Fortaleza";

const ABA_LEADS = "Leads";
const ABA_CLIQUES = "Cliques";
const ABA_RESUMO = "Resumo";

const COLUNAS_LEADS = [
  "Data e hora", "Nome", "WhatsApp", "Chamar", "Para quem", "Melhor período",
  "Campanha", "Código", "Origem", "Campanha do anúncio", "Anúncio", "Mídia",
  "Veio de", "Página", "Autorização", "Situação", "Observações da equipe",
  // 28/10: no fim, para não mexer nas colunas que a equipe já usa.
  "Detalhes", "ID do clique",
];
const COLUNAS_CLIQUES = [
  "Data e hora", "Botão", "Campanha", "Código", "Origem", "Campanha do anúncio",
  "Anúncio", "Mídia", "Veio de", "Página",
];

// Posição das colunas da aba Leads (começando em 0), para o Resumo.
const L = { data: 0, campanha: 6, origem: 8, situacao: 15 };
// Posição das colunas da aba Cliques.
const K = { data: 0, botao: 1, campanha: 2 };

const SITUACOES = ["Novo", "Em contato", "Agendado", "Sem resposta", "Não quer"];
const PARA_QUEM = { para_mim: "Para a própria pessoa", para_meu_filho: "Para o filho(a)", outra_pessoa: "Para outra pessoa" };
const PERIODO = { manha: "Manhã", tarde: "Tarde", qualquer: "Qualquer horário" };
const BOTAO = { whatsapp: "WhatsApp", telefone: "Ligar", mapa: "Mapa" };

// utm_source do anúncio (ou a origem que o site deduziu) em português.
// No Gerenciador de Anúncios da Meta, {{site_source_name}} vira fb, ig, an ou msg.
const NOME_ORIGEM = {
  fb: "Facebook", facebook: "Facebook", ig: "Instagram", instagram: "Instagram",
  an: "Meta (rede de parceiros)", msg: "Messenger", meta: "Meta (Facebook ou Instagram)",
  google: "Google", "google-ads": "Google Ads", whatsapp: "WhatsApp",
};

const LARGURAS = {
  "Data e hora": 130, "Nome": 180, "WhatsApp": 130, "Chamar": 150, "Para quem": 160,
  "Melhor período": 120, "Campanha": 230, "Código": 70, "Origem": 170, "Campanha do anúncio": 190,
  "Anúncio": 170, "Mídia": 100, "Veio de": 150, "Página": 220, "Autorização": 170,
  "Situação": 130, "Observações da equipe": 280, "Botão": 90, "Detalhes": 200, "ID do clique": 200,
};

const COR_MARCA = "#207898";
const COR_CLARA = "#E6F7F8";

/* ───────────────────────── Entrada (site) ───────────────────────── */

/** Abrir o endereço no navegador mostra se a planilha está no ar. */
function doGet() {
  return json({ ok: true, servico: "Planilha de contatos da Vittalis" });
}

/** O site manda aqui cada contato (tipo "lead") e cada clique (tipo "clique"). */
function doPost(e) {
  let d;
  try {
    d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (erro) {
    return json({ ok: false, erro: "Formato inválido." });
  }
  if (!d || typeof d !== "object" || d.chave !== CHAVE) return json({ ok: false, erro: "Envio não reconhecido." });

  if (d.tipo === "clique") {
    if (!passouDoLimite("clique", 120)) registrarClique(d);
    return json({ ok: true });
  }

  const problema = validarLead(d);
  if (problema) return json({ ok: false, erro: problema });

  // Robô: preencheu o campo escondido ou mandou rápido demais. Responde ok
  // para ele não insistir, mas não grava nada.
  if (texto(d.empresa) || (Number(d.tempo_ms) > 0 && Number(d.tempo_ms) < 2500)) return json({ ok: true });
  if (passouDoLimite("lead", 20)) return json({ ok: false, erro: "Muitos envios seguidos. Tente de novo em instantes." });

  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  let gravou = false;
  try {
    gravou = gravarLead(d);
    if (gravou) atualizarResumo();
  } finally {
    trava.releaseLock();
  }
  if (gravou) avisarPorEmail(d);
  return json({ ok: true });
}

function json(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

/* ───────────────────────── Contatos ───────────────────────── */

function validarLead(d) {
  const nome = texto(d.nome);
  if (nome.length < 2) return "Informe seu nome.";
  if (nome.length > 80) return "Nome muito longo.";
  const local = telefoneLocal(soDigitos(d.telefone));
  if (local.length < 10 || local.length > 11) return "Informe o WhatsApp com DDD.";
  if (!slugValido(d.campanha)) return "Campanha inválida.";
  // As campanhas pedem a caixa de autorização. A página de especialidade
  // não tem a caixa: lá a pessoa pede o agendamento (art. 7º, V, da LGPD).
  if (d.formulario !== "especialidade" && d.consentimento !== true) return "É preciso autorizar o contato para enviar.";
  return "";
}

/** Grava o contato na primeira linha. Devolve false se for envio repetido. */
function gravarLead(d) {
  const aba = garantirAba(ABA_LEADS, COLUNAS_LEADS);
  const local = telefoneLocal(soDigitos(d.telefone));
  const campanha = nomeCampanha(d);
  if (repetido(aba, formatarTelefone(local), campanha)) return false;

  escreverNoTopo(aba, [
    new Date(),
    seguro(texto(d.nome, 80)),
    formatarTelefone(local),
    "Chamar no WhatsApp",
    PARA_QUEM[d.para_quem] || "",
    PERIODO[d.periodo] || "",
    seguro(campanha),
    seguro(texto(d.ref, 20)),
    seguro(origemDe(d)),
    seguro(texto(d.utm_campaign, 100)),
    seguro(texto(d.utm_content, 100)),
    seguro(texto(d.utm_medium, 100)),
    seguro(texto(d.veio_de, 100)),
    seguro(texto(d.pagina, 200)),
    d.formulario === "especialidade" ? "Pediu agendamento" : "Marcou a autorização",
    "Novo",
    "",
    // Ex.: "Bebê de 4 meses", da landing de vacinação.
    seguro(texto(d.detalhes, 120)),
    // gclid (Google) ou fbclid (Meta): serve para subir a conversão no anúncio.
    seguro(texto(d.gclid || d.fbclid, 200)),
  ]);
  // Link de verdade, sem fórmula: funciona em qualquer idioma da planilha.
  aba.getRange(2, 4).setRichTextValue(
    SpreadsheetApp.newRichTextValue().setText("Chamar no WhatsApp").setLinkUrl("https://wa.me/55" + local).build()
  );
  aba.getRange(2, L.situacao + 1).setDataValidation(regraSituacao());
  return true;
}

/** Mesmo telefone na mesma campanha nos últimos 2 minutos = clique duplo. */
function repetido(aba, telefone, campanha) {
  const n = Math.min(aba.getLastRow() - 1, 20);
  if (n < 1) return false;
  const limite = Date.now() - 2 * 60 * 1000;
  return aba.getRange(2, 1, n, L.campanha + 1).getValues().some(function (linha) {
    return linha[0] instanceof Date && linha[0].getTime() >= limite && linha[2] === telefone && linha[L.campanha] === campanha;
  });
}

function avisarPorEmail(d) {
  try {
    const para = EMAILS_AVISO.length ? EMAILS_AVISO.join(",") : Session.getEffectiveUser().getEmail();
    if (!para) return;
    const local = telefoneLocal(soDigitos(d.telefone));
    const corpo = [
      "Chegou um contato novo pelo site da Vittalis.",
      "",
      "Nome: " + texto(d.nome, 80),
      "WhatsApp: " + formatarTelefone(local) + "   https://wa.me/55" + local,
      "Para quem: " + (PARA_QUEM[d.para_quem] || "não informado"),
      "Melhor período: " + (PERIODO[d.periodo] || "não informado"),
      "Campanha: " + nomeCampanha(d),
      "Origem: " + origemDe(d),
      ...(texto(d.detalhes) ? ["Detalhes: " + texto(d.detalhes, 120)] : []),
      "",
      "Planilha: " + planilha().getUrl(),
    ].join("\n");
    MailApp.sendEmail({ to: para, subject: "Novo contato pelo site: " + texto(d.nome, 60), body: corpo, name: "Site Vittalis" });
  } catch (erro) {
    // A cota grátis é de 100 e-mails por dia. Sem e-mail, o contato já está salvo.
    console.warn("Não deu para mandar o e-mail de aviso: " + erro);
  }
}

/* ───────────────────────── Cliques ───────────────────────── */

function registrarClique(d) {
  if (!slugValido(d.campanha) || !BOTAO[d.botao]) return;
  const trava = LockService.getScriptLock();
  if (!trava.tryLock(5000)) return; // é só contagem: melhor perder um clique que segurar um contato
  try {
    escreverNoTopo(garantirAba(ABA_CLIQUES, COLUNAS_CLIQUES), [
      new Date(),
      BOTAO[d.botao],
      seguro(nomeCampanha(d)),
      seguro(texto(d.ref, 20)),
      seguro(origemDe(d)),
      seguro(texto(d.utm_campaign, 100)),
      seguro(texto(d.utm_content, 100)),
      seguro(texto(d.utm_medium, 100)),
      seguro(texto(d.veio_de, 100)),
      seguro(texto(d.pagina, 200)),
    ]);
  } finally {
    trava.releaseLock();
  }
}

/* ───────────────────────── Resumo ───────────────────────── */

function atualizarResumo() {
  const ss = planilha();
  const agora = new Date();
  const seteDias = agora.getTime() - 7 * 24 * 3600 * 1000;
  const trintaDias = agora.getTime() - 30 * 24 * 3600 * 1000;
  const mesAtual = Utilities.formatDate(agora, FUSO, "yyyy-MM");
  const doMes = function (data) { return Utilities.formatDate(data, FUSO, "yyyy-MM") === mesAtual; };

  const leads = linhasComData(ss.getSheetByName(ABA_LEADS), COLUNAS_LEADS.length, 0);
  // Os cliques mais novos ficam em cima: lê só o topo e conta 30 dias.
  const cliques = linhasComData(ss.getSheetByName(ABA_CLIQUES), COLUNAS_CLIQUES.length, 20000)
    .filter(function (k) { return k[K.data].getTime() >= trintaDias; });

  const campanhas = {};
  const daCampanha = function (nome) {
    const chave = nome || "Sem campanha";
    if (!campanhas[chave]) campanhas[chave] = { nome: chave, total: 0, semana: 0, mes: 0, agendados: 0, whatsapp: 0, ligar: 0 };
    return campanhas[chave];
  };
  const origens = {};
  const situacoes = {};

  leads.forEach(function (l) {
    const data = l[L.data];
    const c = daCampanha(l[L.campanha]);
    const nomeOrigem = l[L.origem] || "Direto ou desconhecido";
    const o = origens[nomeOrigem] || (origens[nomeOrigem] = { nome: nomeOrigem, total: 0, semana: 0, mes: 0, agendados: 0 });
    const situacao = l[L.situacao] || "Novo";
    situacoes[situacao] = (situacoes[situacao] || 0) + 1;
    [c, o].forEach(function (x) {
      x.total++;
      if (data.getTime() >= seteDias) x.semana++;
      if (doMes(data)) x.mes++;
      if (situacao === "Agendado") x.agendados++;
    });
  });
  cliques.forEach(function (k) {
    const c = daCampanha(k[K.campanha]);
    if (k[K.botao] === "WhatsApp") c.whatsapp++;
    else if (k[K.botao] === "Ligar") c.ligar++;
  });

  const porTotal = function (a, b) { return b.total - a.total || b.whatsapp - a.whatsapp || String(a.nome).localeCompare(String(b.nome)); };
  const largura = 7;
  const linhas = [];
  const titulos = [];
  const cabecalhos = [];
  const add = function (valores) {
    const linha = valores.slice();
    while (linha.length < largura) linha.push("");
    linhas.push(linha);
    return linhas.length;
  };

  titulos.push(add(["Resumo dos contatos do site"]));
  add(["Atualizado em " + Utilities.formatDate(agora, FUSO, "dd/MM/yyyy 'às' HH:mm")]);
  add([]);

  titulos.push(add(["Por campanha"]));
  cabecalhos.push(add(["Campanha", "Contatos", "Últimos 7 dias", "Este mês", "Agendados", "Cliques no WhatsApp (30 dias)", "Cliques em Ligar (30 dias)"]));
  const listaCampanhas = Object.keys(campanhas).map(function (k) { return campanhas[k]; }).sort(porTotal);
  if (!listaCampanhas.length) add(["Nenhum contato ainda."]);
  listaCampanhas.forEach(function (c) { add([c.nome, c.total, c.semana, c.mes, c.agendados, c.whatsapp, c.ligar]); });
  add([]);

  titulos.push(add(["Por origem (de onde a pessoa veio)"]));
  cabecalhos.push(add(["Origem", "Contatos", "Últimos 7 dias", "Este mês", "Agendados"]));
  const listaOrigens = Object.keys(origens).map(function (k) { return Object.assign({ whatsapp: 0 }, origens[k]); }).sort(porTotal);
  if (!listaOrigens.length) add(["Nenhum contato ainda."]);
  listaOrigens.forEach(function (o) { add([o.nome, o.total, o.semana, o.mes, o.agendados]); });
  add([]);

  titulos.push(add(["Situação dos contatos"]));
  cabecalhos.push(add(["Situação", "Contatos"]));
  SITUACOES.concat(Object.keys(situacoes).filter(function (s) { return SITUACOES.indexOf(s) < 0; }))
    .forEach(function (s) { add([s, situacoes[s] || 0]); });
  add([]);
  add(["As visitas às páginas (quem só olhou, sem deixar contato) ficam no Google Analytics e no Gerenciador de Anúncios da Meta."]);

  const aba = ss.getSheetByName(ABA_RESUMO) || ss.insertSheet(ABA_RESUMO);
  aba.clear();
  aba.getRange(1, 1, linhas.length, largura).setValues(linhas);
  titulos.forEach(function (n, i) {
    aba.getRange(n, 1).setFontWeight("bold").setFontSize(i === 0 ? 15 : 12).setFontColor(COR_MARCA);
  });
  cabecalhos.forEach(function (n) {
    aba.getRange(n, 1, 1, largura).setFontWeight("bold").setBackground(COR_CLARA).setWrap(true);
  });
  aba.setColumnWidth(1, 300);
  for (let c = 2; c <= largura; c++) aba.setColumnWidth(c, 130);
}

/** Linhas com data válida na coluna A (pula linha em branco que a equipe deixar). */
function linhasComData(aba, colunas, maximo) {
  if (!aba || aba.getLastRow() < 2) return [];
  const n = maximo ? Math.min(aba.getLastRow() - 1, maximo) : aba.getLastRow() - 1;
  return aba.getRange(2, 1, n, colunas).getValues().filter(function (l) { return l[0] instanceof Date; });
}

/* ───────────────────────── Planilha ───────────────────────── */

/** A planilha deste código. No App da Web, cai no id guardado pelo configurar. */
function planilha() {
  const ativa = SpreadsheetApp.getActiveSpreadsheet();
  if (ativa) return ativa;
  const id = PropertiesService.getScriptProperties().getProperty("planilha_id");
  if (!id) throw new Error("Rode a função configurar uma vez pelo editor (passo 3 da instalação).");
  return SpreadsheetApp.openById(id);
}

/** Rode uma vez pelo editor (passo 3 da instalação). Pode rodar de novo sem problema. */
function configurar() {
  const ss = planilha();
  PropertiesService.getScriptProperties().setProperty("planilha_id", ss.getId());
  ss.setSpreadsheetTimeZone(FUSO);
  formatarAba(garantirAba(ABA_LEADS, COLUNAS_LEADS), COLUNAS_LEADS);
  formatarAba(garantirAba(ABA_CLIQUES, COLUNAS_CLIQUES), COLUNAS_CLIQUES);
  atualizarResumo();

  // Ordem das abas: Leads, Resumo, Cliques.
  [ABA_LEADS, ABA_RESUMO, ABA_CLIQUES].forEach(function (nome, i) {
    ss.setActiveSheet(ss.getSheetByName(nome));
    ss.moveActiveSheet(i + 1);
  });
  ss.setActiveSheet(ss.getSheetByName(ABA_LEADS));

  // O Resumo se atualiza sozinho de hora em hora (o celular não roda o onOpen).
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "atualizarResumoAgendado") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("atualizarResumoAgendado").timeBased().everyHours(1).create();

  // Já pede a autorização do e-mail de aviso agora, e não no primeiro contato.
  MailApp.getRemainingDailyQuota();
  console.log("Pronto. Agora publique como App da Web (passo 4 da instalação).");
}

function atualizarResumoAgendado() {
  const trava = LockService.getScriptLock();
  if (!trava.tryLock(10000)) return;
  try {
    atualizarResumo();
  } finally {
    trava.releaseLock();
  }
}

/** Menu "Vittalis" na planilha e Resumo em dia a cada abertura. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Vittalis").addItem("Atualizar resumo", "atualizarResumoAgendado").addToUi();
  try {
    atualizarResumoAgendado();
  } catch (erro) {
    console.warn("Resumo não atualizado ao abrir: " + erro);
  }
}

function garantirAba(nome, colunas) {
  const ss = planilha();
  let aba = ss.getSheetByName(nome);
  if (!aba) {
    // Planilha nova: a primeira aba (vazia ou só com o cabeçalho, mesmo que
    // ele tenha entrado todo numa célula) vira a de Leads.
    const primeira = ss.getSheets()[0];
    const aproveita = nome === ABA_LEADS && primeira && primeira.getLastRow() <= 1 &&
      (primeira.getLastRow() === 0 || String(primeira.getRange(1, 1).getValue()).indexOf(colunas[0]) === 0);
    aba = aproveita ? primeira.setName(nome) : ss.insertSheet(nome);
  }
  const props = PropertiesService.getScriptProperties();
  // Cabeçalho velho (sem as colunas novas do fim) também é refeito.
  const semColunasNovas = aba.getMaxColumns() < colunas.length ||
    aba.getRange(1, colunas.length).getValue() !== colunas[colunas.length - 1];
  if (aba.getRange(1, 1).getValue() !== colunas[0] || semColunasNovas || props.getProperty("formatada_" + nome) !== "sim") {
    formatarAba(aba, colunas);
  }
  return aba;
}

function formatarAba(aba, colunas) {
  if (aba.getMaxRows() < 200) aba.insertRowsAfter(aba.getMaxRows(), 200 - aba.getMaxRows());
  if (aba.getMaxColumns() < colunas.length) aba.insertColumnsAfter(aba.getMaxColumns(), colunas.length - aba.getMaxColumns());
  aba.getRange(1, 1, 1, colunas.length)
    .setValues([colunas])
    .setFontWeight("bold")
    .setBackground(COR_MARCA)
    .setFontColor("#FFFFFF")
    .setWrap(true)
    .setVerticalAlignment("middle");
  aba.setFrozenRows(1);
  aba.setRowHeight(1, 36);
  colunas.forEach(function (c, i) { aba.setColumnWidth(i + 1, LARGURAS[c] || 140); });
  const linhas = aba.getMaxRows() - 1;
  aba.getRange(2, 1, linhas, 1).setNumberFormat("dd/MM/yyyy HH:mm");
  if (colunas === COLUNAS_LEADS) aba.getRange(2, L.situacao + 1, linhas, 1).setDataValidation(regraSituacao());
  PropertiesService.getScriptProperties().setProperty("formatada_" + aba.getName(), "sim");
}

/** Linha nova logo abaixo do cabeçalho, com o formato de linha comum. */
function escreverNoTopo(aba, valores) {
  aba.insertRowAfter(1);
  aba.getRange(2, 1, 1, valores.length)
    .setValues([valores])
    .setFontWeight("normal")
    .setBackground(null)
    .setFontColor(null)
    .setWrap(false);
  aba.setRowHeight(2, 21);
  aba.getRange(2, 1).setNumberFormat("dd/MM/yyyy HH:mm");
}

function regraSituacao() {
  return SpreadsheetApp.newDataValidation().requireValueInList(SITUACOES, true).setAllowInvalid(true).build();
}

/* ───────────────────────── Textos ───────────────────────── */

/** Texto limpo: sem quebra de linha nem caractere de controle, com limite. */
function texto(valor, maximo) {
  const s = String(valor === null || valor === undefined ? "" : valor)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return maximo ? s.slice(0, maximo) : s;
}

/** Texto que começa com = + - @ viraria fórmula na planilha. O apóstrofo impede. */
function seguro(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function slugValido(valor) {
  return /^[a-z0-9-]{1,60}$/.test(texto(valor));
}

function soDigitos(valor) {
  return texto(valor, 40).replace(/\D/g, "");
}

/** Tira o 55 do Brasil se vier junto: fica DDD + número. */
function telefoneLocal(digitos) {
  return digitos.length > 11 && digitos.indexOf("55") === 0 ? digitos.slice(2) : digitos;
}

function formatarTelefone(local) {
  const m = local.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : local;
}

function nomeCampanha(d) {
  return texto(d.campanha_nome, 120) || texto(d.campanha, 60);
}

/**
 * De onde a pessoa veio, em português. Ordem: a UTM do anúncio, a rede
 * social da página anterior, a marca de clique de anúncio (fbclid/gclid)
 * e, por fim, o site anterior.
 */
function origemDe(d) {
  const utm = texto(d.utm_source, 100);
  if (utm) return NOME_ORIGEM[utm.toLowerCase()] || utm;
  const site = texto(d.veio_de, 100).toLowerCase();
  if (/(^|\.)instagram\.com$/.test(site)) return "Instagram";
  if (/(^|\.)facebook\.com$/.test(site) || site === "fb.me") return "Facebook";
  const auto = texto(d.origem, 40).toLowerCase();
  if (auto) return NOME_ORIGEM[auto] || auto;
  if (/(^|\.)google\.[a-z.]+$/.test(site)) return "Google (busca)";
  if (/whatsapp|^wa\.me$/.test(site)) return "WhatsApp";
  return site || "Direto ou desconhecido";
}

/** Freio contra rajada de robô: no máximo N por minuto. */
function passouDoLimite(tipo, maximo) {
  try {
    const cache = CacheService.getScriptCache();
    const chave = "limite_" + tipo + "_" + Math.floor(Date.now() / 60000);
    const n = Number(cache.get(chave) || 0) + 1;
    cache.put(chave, String(n), 120);
    return n > maximo;
  } catch (erro) {
    return false;
  }
}
