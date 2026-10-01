// ═══════════════════════════════════════════════════════════════
// CAMPANHAS: todo o conteúdo das landing pages mora aqui.
//
// Para criar uma campanha nova, basta acrescentar um item em CAMPANHAS.
// A rota /campanhas/[slug], o sitemap, o formulário e o WhatsApp leem
// tudo deste arquivo.
//
// Regras de texto (Meta, WhatsApp, RDC Anvisa 96/2008, CFM 2.336/2023):
// foco no serviço e no cuidado, tom informativo e acolhedor, sem nome
// comercial de produto, sem condição comercial, sem urgência e sem
// promessa de resultado. O `npm run check:campanhas` confere tudo isso
// antes de cada build e trava a publicação se achar termo proibido.
//
// TEXTOS EM REVISÃO: aguardam aprovação do Dr. Miécio antes de publicar.
// ═══════════════════════════════════════════════════════════════

import { ENDERECO, HORARIOS } from "../config/contato";

export type Card = { titulo: string; texto: string };
export type Pergunta = { pergunta: string; resposta: string };

export type Campanha = {
  slug: string;
  /** Código que vai na mensagem do WhatsApp e no lead. */
  ref: string;
  /** Etiqueta pequena acima do título. */
  rotulo: string;
  titulo: string;
  subtitulo: string;
  meta: { titulo: string; descricao: string };
  imagem: { arquivo: string; alt: string; largura: number; altura: number };
  /** Imagem de compartilhamento (1200×630). */
  imagemOg: string;
  passos: [Card, Card, Card];
  saber: { titulo: string; introducao: string; cards: Card[] };
  formulario: { titulo: string; texto: string };
  perguntas: Pergunta[];
};

/** Ressalva obrigatória em todas as páginas de campanha. */
export const RESSALVA =
  "A indicação de cada vacina depende de avaliação profissional e segue o calendário do Ministério da Saúde e as recomendações da SBIm.";

export const DIFERENCIAIS: Card[] = [
  { titulo: "Atendimento humanizado", texto: "Tempo para ouvir, explicar cada etapa e respeitar o ritmo de cada pessoa." },
  { titulo: "Equipe especializada", texto: "Profissionais com experiência em imunização de bebês, crianças, adultos e idosos." },
  { titulo: "Atendimento domiciliar", texto: "A aplicação também pode ser feita em casa, com o mesmo cuidado da clínica." },
  { titulo: "Clínica multidisciplinar", texto: "Pediatria, terapias e outras especialidades no mesmo lugar, para acompanhar toda a família." },
];

const PASSO_CONTATO: Card = {
  titulo: "Você deixa seu contato",
  texto: "Preencha o formulário com seu nome e telefone. Leva menos de um minuto.",
};
const PASSO_AGENDA: Card = {
  titulo: "Agendamento na clínica ou em casa",
  texto: "Você escolhe onde prefere ser atendido. A equipe confirma o dia e o horário.",
};

/** Perguntas que valem para todas as campanhas. */
function perguntasComuns(oQueLevar: string): Pergunta[] {
  return [
    {
      pergunta: "Onde fica a clínica?",
      resposta: `${ENDERECO.completo}. No fim da página há o mapa e o link para abrir no Google Maps.`,
    },
    {
      pergunta: "Qual é o horário de atendimento?",
      resposta: `${HORARIOS.semana}. ${HORARIOS.sabado}.`,
    },
    {
      pergunta: "Vocês atendem em casa?",
      resposta: "Sim. A equipe também faz atendimento domiciliar. A disponibilidade para o seu bairro é confirmada no contato.",
    },
    { pergunta: "O que devo levar?", resposta: oQueLevar },
    {
      pergunta: "Como funciona a avaliação?",
      resposta:
        "A equipe confere as doses já registradas, conversa sobre a rotina e o histórico e explica, com calma, o que o calendário indica para aquela fase. A decisão é sempre tomada em conjunto.",
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
    subtitulo: "Avaliação da caderneta e um cronograma pensado para a rotina da sua família.",
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
    passos: [
      PASSO_CONTATO,
      {
        titulo: "A equipe avalia a caderneta",
        texto: "Conferimos as doses já registradas e explicamos o que o calendário indica para cada idade.",
      },
      PASSO_AGENDA,
    ],
    saber: {
      titulo: "O que é importante saber",
      introducao: "Nos primeiros 18 meses de vida acontece a maior parte das doses do calendário infantil.",
      cards: [
        {
          titulo: "Um calendário para cada fase",
          texto:
            "O Ministério da Saúde e a Sociedade Brasileira de Imunizações (SBIm) organizam as vacinas por idade. Seguir o calendário ajuda a não perder nenhuma etapa.",
        },
        {
          titulo: "A caderneta é o ponto de partida",
          texto:
            "É nela que ficam registradas as doses aplicadas. Com a caderneta em mãos, a equipe monta o planejamento das próximas.",
        },
        {
          titulo: "Lembretes das próximas doses",
          texto: "Depois do planejamento, a família recebe lembretes perto de cada data, para a rotina ficar mais leve.",
        },
        {
          titulo: "Conforto durante a aplicação",
          texto:
            "Colo, amamentação quando possível e um ambiente tranquilo ajudam o bebê a passar pelo momento com mais calma.",
        },
      ],
    },
    formulario: {
      titulo: "Quero ser atendido(a)",
      texto: "Deixe seu contato. A equipe retorna para conversar sobre a caderneta e combinar o melhor horário.",
    },
    perguntas: perguntasComuns(
      "A caderneta de vacinação do bebê. Se houver registros de vacinas aplicadas em outros lugares, traga também.",
    ),
  },

  // ─── 2. PRIMEIROS MESES DO BEBÊ (CUIDADO RESPIRATÓRIO) ───
  {
    slug: "primeiros-meses",
    ref: "PM01",
    rotulo: "Primeiros meses de vida",
    titulo: "Cuidado respiratório nos primeiros meses de vida",
    subtitulo: "Informação clara e uma conversa com a equipe para entender o que é indicado em cada fase.",
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
    passos: [
      PASSO_CONTATO,
      {
        titulo: "A equipe avalia a caderneta",
        texto: "Conversamos sobre a fase do bebê e explicamos as estratégias de prevenção indicadas para ela.",
      },
      PASSO_AGENDA,
    ],
    saber: {
      titulo: "O que é importante saber",
      introducao: "Nos primeiros meses de vida, o sistema respiratório e as defesas do bebê ainda estão em formação.",
      cards: [
        {
          titulo: "O que é o VSR",
          texto:
            "O vírus sincicial respiratório é um vírus comum, que circula mais em algumas épocas do ano. É uma das principais causas de bronquiolite nos bebês.",
        },
        {
          titulo: "Existem estratégias de prevenção",
          texto:
            "Hoje há estratégias para gestantes e para bebês. A indicação de cada uma depende da idade, da época do ano e de avaliação profissional.",
        },
        {
          titulo: "Cuidados do dia a dia",
          texto:
            "Lavar as mãos antes de pegar o bebê, evitar ambientes fechados e cheios e manter a casa livre de fumaça são cuidados simples que fazem parte da rotina.",
        },
        {
          titulo: "Acompanhamento com a equipe",
          texto:
            "A conversa com a equipe ajuda a família a entender o calendário e a planejar as próximas etapas com tranquilidade.",
        },
      ],
    },
    formulario: {
      titulo: "Quero ser atendido(a)",
      texto: "Deixe seu contato. A equipe retorna para conversar sobre os primeiros meses do bebê e combinar a avaliação.",
    },
    perguntas: perguntasComuns(
      "A caderneta de vacinação do bebê e, se houver, o cartão de pré-natal com as vacinas feitas na gestação.",
    ),
  },

  // ─── 3. VACINAÇÃO DO ADULTO A PARTIR DOS 50 ───
  {
    slug: "adulto-50-mais",
    ref: "AD50",
    rotulo: "Adultos a partir dos 50 anos",
    titulo: "Vacinação do adulto a partir dos 50: saiba o que é indicado para você",
    subtitulo: "Avaliação da carteira de vacinação e orientação sobre o calendário do adulto e do idoso.",
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
    passos: [
      PASSO_CONTATO,
      {
        titulo: "A equipe avalia a carteira de vacinação",
        texto: "Conferimos as doses já registradas e explicamos o que o calendário do adulto indica para a sua idade.",
      },
      PASSO_AGENDA,
    ],
    saber: {
      titulo: "O que é importante saber",
      introducao: "A vacinação não termina na infância. Com o passar dos anos, o calendário do adulto ganha novas indicações.",
      cards: [
        {
          titulo: "O que é o herpes zóster",
          texto:
            "É causado pelo mesmo vírus da catapora, que pode ficar adormecido no organismo e voltar a se manifestar anos depois. A chance aumenta com a idade.",
        },
        {
          titulo: "Outras vacinas do adulto e do idoso",
          texto:
            "As recomendações incluem, entre outras, vacinas contra a gripe, a doença pneumocócica, o tétano e a difteria. A partir dos 60 anos, também contra o VSR.",
        },
        {
          titulo: "A carteira de vacinação conta a história",
          texto:
            "Muita gente não lembra quais doses já tomou. A avaliação da carteira mostra o que está em dia e o que vale conversar com a equipe.",
        },
        {
          titulo: "Atendimento no seu ritmo",
          texto: "A aplicação pode ser na clínica ou em casa, com tempo para tirar dúvidas antes e depois.",
        },
      ],
    },
    formulario: {
      titulo: "Quero ser atendido(a)",
      texto: "Deixe seu contato. A equipe retorna para conversar sobre a carteira de vacinação e combinar o melhor horário.",
    },
    perguntas: perguntasComuns(
      "A carteira de vacinação, mesmo que antiga ou incompleta. Se não encontrar, a equipe orienta como reconstruir o histórico.",
    ),
  },
];

export function getCampanha(slug: string): Campanha | undefined {
  return CAMPANHAS.find((c) => c.slug === slug);
}
