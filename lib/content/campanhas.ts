// ═══════════════════════════════════════════════════════════════
// CAMPANHAS: todo o conteúdo das landing pages mora aqui.
//
// Para criar uma campanha nova, basta acrescentar um item em CAMPANHAS.
// A rota /campanhas/[slug], o sitemap, o formulário e o WhatsApp leem
// tudo deste arquivo.
//
// Estilo (pedido do master, 01/10): leitura em segundos. Frases curtas,
// um ícone por ideia, o detalhe fica no "Saiba mais" (que também mantém
// o conteúdo substancial que a Meta exige na revisão da página).
//
// Regras de texto (Meta, WhatsApp, RDC Anvisa 96/2008, CFM 2.336/2023):
// foco no serviço e no cuidado, tom informativo e acolhedor, sem nome
// comercial de produto, sem condição comercial, sem urgência e sem
// promessa de resultado. O `npm run check:campanhas` confere tudo isso
// antes de cada build e trava a publicação se achar termo proibido.
//
// TEXTOS EM REVISÃO: aguardam aprovação do Dr. Miécio antes de publicar.
// ═══════════════════════════════════════════════════════════════

import { HORARIOS } from "../config/contato";
import { BRAND } from "../brand";

export type Icone =
  | "caderneta" | "calendario" | "sino" | "casa" | "coracao" | "escudo"
  | "equipe" | "clinica" | "maos" | "info" | "bebe" | "estrela" | "relogio" | "conversa";

export type Item = { icone: Icone; titulo: string; texto: string };
export type Cartao = Item & { detalhe: string };
export type Pergunta = { pergunta: string; resposta: string };

export type Campanha = {
  slug: string;
  /** Código que vai na mensagem do WhatsApp e no lead. */
  ref: string;
  /** Selo pequeno acima do título. */
  rotulo: string;
  titulo: string;
  /** Trecho do título que aparece em turquesa e itálico, como na home. */
  destaque: string;
  subtitulo: string;
  /** Os 3 pontos do topo, lidos em 3 segundos. */
  pontos: [string, string, string];
  meta: { titulo: string; descricao: string };
  imagem: { arquivo: string; alt: string; largura: number; altura: number };
  /** Imagem de compartilhamento (1200×630). */
  imagemOg: string;
  passos: [Item, Item, Item];
  saber: { introducao: string; cartoes: Cartao[] };
  formulario: { titulo: string; texto: string };
  perguntas: Pergunta[];
  /** Fotos e vídeo próprios desta campanha (senão, usa MIDIA). */
  midia?: Midia;
};

/** Ressalva obrigatória em todas as páginas de campanha. */
export const RESSALVA =
  "A indicação de cada vacina depende de avaliação profissional e segue o calendário do Ministério da Saúde e as recomendações da SBIm.";

/**
 * Por que a Vittalis: faixa curta logo abaixo do topo (antes eram duas
 * seções repetindo as mesmas ideias). Frases de uma linha, sem números
 * que não dá para comprovar.
 */
export const DIFERENCIAIS: Item[] = [
  { icone: "coracao", titulo: "Atendimento humanizado", texto: "Tempo para ouvir e explicar cada etapa." },
  { icone: "equipe", titulo: "Equipe especializada", texto: "Imunização de bebês, crianças, adultos e idosos." },
  { icone: "casa", titulo: "Na clínica ou em casa", texto: "Você escolhe onde prefere ser atendido." },
  { icone: "clinica", titulo: "Clínica multidisciplinar", texto: "Pediatria, terapias e outras especialidades." },
];

/** Foto real da clínica (gerada por scripts/preparar-midia.mjs). */
export type Foto = { arquivo: string; alt: string; legenda?: string; largura: number; altura: number };
/** Vídeo curto da clínica: só carrega quando a pessoa toca no play. */
export type Video = { arquivo: string; poster: string; titulo: string; legenda?: string };
export type Midia = { fotos: Foto[]; video?: Video };

/**
 * Fotos e vídeo REAIS da clínica, comuns às campanhas (pedido do master,
 * 02/10). Vazio = a seção "Conheça a Vittalis" não aparece.
 * Regras: nada de agulha ou seringa na pele em close, nada de antes/depois
 * e paciente identificável só com autorização por escrito.
 */
export const MIDIA: Midia = {
  fotos: [],
};

const PASSOS_PADRAO = (segundo: string): [Item, Item, Item] => [
  { icone: "conversa", titulo: "Você deixa o contato", texto: "São 3 perguntas rápidas." },
  { icone: "caderneta", titulo: "A equipe conversa com você", texto: segundo },
  { icone: "calendario", titulo: "Você agenda", texto: "Na clínica ou em casa." },
];

/** Perguntas que valem para todas as campanhas. */
function perguntasComuns(oQueLevar: string): Pergunta[] {
  return [
    { pergunta: "Onde fica a clínica?", resposta: `${BRAND.legalAddress}.` },
    { pergunta: "Qual é o horário?", resposta: `${HORARIOS.semana}. ${HORARIOS.sabado}.` },
    { pergunta: "Vocês atendem em casa?", resposta: "Sim. A disponibilidade para o seu bairro é confirmada no contato." },
    { pergunta: "O que devo levar?", resposta: oQueLevar },
    {
      pergunta: "Como funciona a avaliação?",
      resposta: "A equipe confere as doses registradas e explica o que o calendário indica para aquela fase. A decisão é sempre tomada em conjunto.",
    },
    { pergunta: "Quais são as formas de pagamento?", resposta: "As formas de pagamento são informadas no atendimento." },
  ];
}

export const CAMPANHAS: Campanha[] = [
  // ─── 1. PLANEJAMENTO VACINAL INFANTIL (0 A 18 MESES) ───
  {
    slug: "planejamento-vacinal",
    ref: "PV01",
    rotulo: "Do nascimento aos 18 meses",
    titulo: "Planejamento vacinal do seu bebê, com acolhimento em cada fase",
    destaque: "com acolhimento",
    subtitulo: "A equipe avalia a caderneta e organiza o calendário do seu bebê.",
    pontos: ["Avaliação da caderneta", "Lembrete das próximas doses", "Na clínica ou em casa"],
    meta: {
      titulo: "Planejamento vacinal do bebê em São Luís | Vittalis Saúde",
      descricao:
        "Avaliação da caderneta, cronograma conforme o calendário do Ministério da Saúde e da SBIm, lembretes das próximas doses e aplicação na clínica ou em casa.",
    },
    imagem: {
      arquivo: "pv-hero",
      alt: "Profissional da Vittalis conversando com uma mãe que segura o bebê no colo, em sala de atendimento infantil",
      largura: 1280,
      altura: 731,
    },
    imagemOg: "/images/campanhas/pv-og.jpg",
    passos: PASSOS_PADRAO("Avaliamos a caderneta e tiramos as dúvidas."),
    saber: {
      introducao: "Nos primeiros 18 meses acontece a maior parte das doses do calendário infantil.",
      cartoes: [
        {
          icone: "calendario",
          titulo: "Um calendário por fase",
          texto: "Cada idade tem as suas vacinas.",
          detalhe:
            "O Ministério da Saúde e a Sociedade Brasileira de Imunizações (SBIm) organizam as vacinas por idade. Seguir o calendário ajuda a não perder nenhuma etapa.",
        },
        {
          icone: "caderneta",
          titulo: "A caderneta é o ponto de partida",
          texto: "É nela que ficam as doses aplicadas.",
          detalhe: "Com a caderneta em mãos, a equipe confere o que já foi feito e monta o planejamento das próximas doses.",
        },
        {
          icone: "sino",
          titulo: "Lembretes das próximas doses",
          texto: "Para a rotina ficar mais leve.",
          detalhe: "Depois do planejamento, a família recebe um lembrete perto de cada data.",
        },
        {
          icone: "bebe",
          titulo: "Conforto na aplicação",
          texto: "Colo, calma e um ambiente tranquilo.",
          detalhe: "Colo, amamentação quando possível e um ambiente tranquilo ajudam o bebê a passar pelo momento com mais calma.",
        },
      ],
    },
    formulario: { titulo: "Fale com a equipe", texto: "Responda 3 perguntas rápidas. A equipe retorna no período que você escolher." },
    perguntas: perguntasComuns("A caderneta de vacinação do bebê. Se houver registros de outros lugares, traga também."),
  },

  // ─── 2. PRIMEIROS MESES DO BEBÊ (CUIDADO RESPIRATÓRIO) ───
  {
    slug: "primeiros-meses",
    ref: "PM01",
    rotulo: "Primeiros meses de vida",
    titulo: "Cuidado respiratório nos primeiros meses de vida",
    destaque: "primeiros meses",
    subtitulo: "Informação clara e uma conversa com a equipe sobre cada fase do bebê.",
    pontos: ["Orientação sobre o VSR", "Avaliação da caderneta", "Na clínica ou em casa"],
    meta: {
      titulo: "Cuidado respiratório nos primeiros meses | Vittalis Saúde",
      descricao:
        "Saiba mais sobre o vírus sincicial respiratório (VSR) nos primeiros meses de vida e converse com a equipe da Vittalis sobre a avaliação do bebê.",
    },
    imagem: {
      arquivo: "pm-hero",
      alt: "Profissional da Vittalis sorrindo e segurando a mão de um bebê deitado na maca",
      largura: 1280,
      altura: 853,
    },
    imagemOg: "/images/campanhas/pm-og.jpg",
    passos: PASSOS_PADRAO("Explicamos o que é indicado para a fase do bebê."),
    saber: {
      introducao: "Nos primeiros meses, o sistema respiratório e as defesas do bebê ainda estão em formação.",
      cartoes: [
        {
          icone: "info",
          titulo: "O que é o VSR",
          texto: "Um vírus respiratório comum nos bebês.",
          detalhe:
            "O vírus sincicial respiratório circula mais em algumas épocas do ano e é uma das principais causas de bronquiolite nos bebês.",
        },
        {
          icone: "escudo",
          titulo: "Existem estratégias de prevenção",
          texto: "Para gestantes e para bebês.",
          detalhe: "A indicação de cada estratégia depende da idade, da época do ano e de avaliação profissional.",
        },
        {
          icone: "maos",
          titulo: "Cuidados do dia a dia",
          texto: "Mãos limpas e casa sem fumaça.",
          detalhe:
            "Lavar as mãos antes de pegar o bebê, evitar ambientes fechados e cheios e manter a casa livre de fumaça são cuidados simples da rotina.",
        },
        {
          icone: "conversa",
          titulo: "Acompanhamento com a equipe",
          texto: "Para planejar cada etapa com calma.",
          detalhe: "A conversa com a equipe ajuda a família a entender o calendário e a planejar as próximas etapas com tranquilidade.",
        },
      ],
    },
    formulario: { titulo: "Fale com a equipe", texto: "Responda 3 perguntas rápidas. A equipe retorna no período que você escolher." },
    perguntas: perguntasComuns("A caderneta de vacinação do bebê e, se houver, o cartão de pré-natal com as vacinas da gestação."),
  },

  // ─── 3. VACINAÇÃO DO ADULTO A PARTIR DOS 50 ───
  {
    slug: "adulto-50-mais",
    ref: "AD50",
    rotulo: "Adultos a partir dos 50 anos",
    titulo: "Vacinação do adulto a partir dos 50: saiba o que é indicado para você",
    destaque: "a partir dos 50",
    subtitulo: "A equipe avalia a sua carteira e explica o calendário do adulto.",
    pontos: ["Avaliação da carteira", "Orientação sobre herpes zóster", "Na clínica ou em casa"],
    meta: {
      titulo: "Vacinação do adulto a partir dos 50 em São Luís | Vittalis Saúde",
      descricao:
        "Informação sobre herpes zóster e as vacinas do adulto e do idoso. Avaliação da carteira de vacinação e aplicação na clínica ou em casa.",
    },
    imagem: {
      arquivo: "ad50-hero",
      alt: "Profissional de saúde conversando com uma senhora sorridente durante atendimento na clínica",
      largura: 1280,
      altura: 714,
    },
    imagemOg: "/images/campanhas/ad50-og.jpg",
    passos: PASSOS_PADRAO("Conferimos a carteira e tiramos as dúvidas."),
    saber: {
      introducao: "A vacinação não termina na infância. Com o passar dos anos, o calendário ganha novas indicações.",
      cartoes: [
        {
          icone: "info",
          titulo: "O que é o herpes zóster",
          texto: "Vem do mesmo vírus da catapora.",
          detalhe:
            "O vírus pode ficar adormecido no organismo e voltar a se manifestar anos depois. A chance aumenta com a idade.",
        },
        {
          icone: "escudo",
          titulo: "Outras vacinas do adulto",
          texto: "Gripe, tétano e outras.",
          detalhe:
            "As recomendações incluem, entre outras, vacinas contra a gripe, a doença pneumocócica, o tétano e a difteria. A partir dos 60 anos, também contra o VSR.",
        },
        {
          icone: "caderneta",
          titulo: "A carteira conta a história",
          texto: "Mostra o que está em dia.",
          detalhe: "Muita gente não lembra quais doses já tomou. A avaliação da carteira mostra o que está em dia e o que vale conversar.",
        },
        {
          icone: "relogio",
          titulo: "No seu ritmo",
          texto: "Tempo para tirar dúvidas.",
          detalhe: "A aplicação pode ser na clínica ou em casa, com tempo para conversar antes e depois.",
        },
      ],
    },
    formulario: { titulo: "Fale com a equipe", texto: "Responda 3 perguntas rápidas. A equipe retorna no período que você escolher." },
    perguntas: perguntasComuns("A carteira de vacinação, mesmo antiga ou incompleta. Se não encontrar, a equipe orienta como reconstruir o histórico."),
  },
];

export function getCampanha(slug: string): Campanha | undefined {
  return CAMPANHAS.find((c) => c.slug === slug);
}
