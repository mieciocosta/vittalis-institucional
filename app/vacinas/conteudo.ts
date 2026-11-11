// ═══════════════════════════════════════════════════════════════
// LANDING "VACINAS PARA TODA A FAMÍLIA" (pedido da direção, 10/11):
// capa com a família e uma seção por fase da vida, cada uma com as vacinas
// daquela faixa etária. As listas seguem os calendários da SBIm e do
// Ministério da Saúde; a indicação final é sempre da equipe, na avaliação.
// Sem preço e sem promessa de resultado (regras dos conselhos e do Google).
// ═══════════════════════════════════════════════════════════════

export type Vacina = { nome: string; para: string };

export type Fase = {
  id: string;
  rotulo: string;
  titulo: string;
  faixa: string;
  texto: string;
  imagem?: string;
  alt?: string;
  video?: { src: string; poster: string; titulo: string; legenda: string };
  vacinas: Vacina[];
  mensagem: string;
  icone: string;
};

const V = (n: string) => `/videos/${n}`;
const I = (n: string) => `/images/otim/${n}.webp`;

export const FASES: Fase[] = [
  {
    id: "gestante",
    rotulo: "Saúde da gestante",
    titulo: "Proteção que começa na barriga",
    faixa: "Durante a gestação",
    texto:
      "Algumas vacinas tomadas na gravidez passam anticorpos para o bebê, que nasce mais protegido nos primeiros meses, quando ainda não pode ser vacinado contra tudo. Tudo combinado com o seu obstetra.",
    video: { src: V("vacinacao-plano-vacinal.mp4"), poster: V("vacinacao-plano-vacinal.jpg"), titulo: "Tudo planejado desde o começo", legenda: "Como a equipe organiza as vacinas da família" },
    vacinas: [
      { nome: "dTpa", para: "Coqueluche, difteria e tétano" },
      { nome: "Influenza", para: "Gripe" },
      { nome: "VSR", para: "Vírus sincicial respiratório (bronquiolite no bebê)" },
      { nome: "Hepatite B", para: "Para quem não tem o esquema completo" },
      { nome: "Covid-19", para: "Conforme calendário vigente" },
    ],
    mensagem: "Olá! Estou grávida e quero saber sobre as vacinas da gestante.",
    icone: "🤰",
  },
  {
    id: "bebe",
    rotulo: "Saúde do bebê",
    titulo: "Os primeiros dois anos, com calma e cuidado",
    faixa: "Do nascimento aos 2 anos",
    texto:
      "É a fase com mais vacinas. A equipe organiza o calendário a partir da caderneta, avisa cada dose e aplica na clínica ou na sua casa.",
    video: { src: V("vacinacao-clinica.mp4"), poster: V("vacinacao-clinica.jpg"), titulo: "Um dia de vacina na Vittalis", legenda: "Da recepção ao sorriso no colo da mãe" },
    vacinas: [
      { nome: "Hexavalente acelular", para: "Difteria, tétano, coqueluche, pólio, Hib e hepatite B" },
      { nome: "Pneumocócica conjugada", para: "Pneumonia, otite e meningite por pneumococo" },
      { nome: "Meningocócica B", para: "Meningite B" },
      { nome: "Meningocócica ACWY", para: "Meningites A, C, W e Y" },
      { nome: "Rotavírus", para: "Diarreia grave por rotavírus" },
      { nome: "Influenza", para: "Gripe, a partir dos 6 meses" },
      { nome: "Hepatite A", para: "A partir de 1 ano" },
      { nome: "Tríplice viral", para: "Sarampo, caxumba e rubéola" },
      { nome: "Varicela", para: "Catapora" },
      { nome: "Febre amarela", para: "Conforme orientação" },
      { nome: "VSR (nirsevimabe)", para: "Proteção contra bronquiolite nos primeiros meses" },
    ],
    mensagem: "Olá! Quero saber sobre as vacinas do meu bebê.",
    icone: "👶",
  },
  {
    id: "crianca",
    rotulo: "Saúde da criança",
    titulo: "Reforços na idade certa",
    faixa: "De 2 a 9 anos",
    texto:
      "Depois dos dois anos vêm os reforços, que mantêm a proteção alta na escola e nas brincadeiras. A gente confere a caderneta e completa o que faltar.",
    imagem: I("vac_menino"),
    alt: "Menino mostrando o braço depois da vacina, ao lado da profissional da Vittalis de jaleco branco",
    vacinas: [
      { nome: "DTPa ou Tetra", para: "Reforço de difteria, tétano e coqueluche" },
      { nome: "Pólio", para: "Reforço" },
      { nome: "Meningocócicas ACWY e B", para: "Reforços" },
      { nome: "Varicela", para: "Segunda dose" },
      { nome: "Tríplice viral", para: "Segunda dose, se faltar" },
      { nome: "Hepatite A", para: "Completar o esquema" },
      { nome: "Influenza", para: "Todo ano" },
      { nome: "Dengue", para: "A partir dos 4 anos, com avaliação" },
    ],
    mensagem: "Olá! Quero colocar a caderneta do meu filho em dia.",
    icone: "🧒",
  },
  {
    id: "adolescente",
    rotulo: "Saúde do adolescente",
    titulo: "A fase em que a caderneta costuma ficar esquecida",
    faixa: "De 10 a 19 anos",
    texto:
      "É a idade ideal para o HPV e para os reforços das meningites. Muitos adolescentes chegam com a caderneta atrasada, e dá para colocar tudo em dia.",
    imagem: I("vac_adulto"),
    alt: "Jovem sendo vacinada no braço por profissional de saúde",
    vacinas: [
      { nome: "HPV", para: "Previne cânceres e verrugas causados pelo HPV" },
      { nome: "Meningocócica ACWY", para: "Reforço na adolescência" },
      { nome: "Meningocócica B", para: "Para quem não tomou" },
      { nome: "dTpa", para: "Reforço de difteria, tétano e coqueluche" },
      { nome: "Hepatite B", para: "Para quem não tem o esquema" },
      { nome: "Influenza", para: "Todo ano" },
      { nome: "Dengue", para: "Com avaliação" },
    ],
    mensagem: "Olá! Quero saber sobre as vacinas para adolescente (HPV e meningite).",
    icone: "🧑‍🎓",
  },
  {
    id: "mulher",
    rotulo: "Saúde da mulher",
    titulo: "Cuidado em cada fase da vida da mulher",
    faixa: "Adultas de 20 a 59 anos",
    texto: "Vacinas que protegem a mulher hoje e quem ela ama, inclusive antes de engravidar.",
    imagem: I("vac_hpv"),
    alt: "Mulher sorrindo com o curativo da Vittalis no braço depois da vacina de HPV",
    vacinas: [
      { nome: "HPV", para: "Até os 45 anos, com avaliação" },
      { nome: "dTpa", para: "Reforço a cada 10 anos" },
      { nome: "Hepatite B", para: "Três doses, se não tiver" },
      { nome: "Tríplice viral", para: "Antes de engravidar, se faltar" },
      { nome: "Influenza", para: "Todo ano" },
      { nome: "Febre amarela", para: "Conforme orientação" },
      { nome: "Dengue", para: "Com avaliação" },
    ],
    mensagem: "Olá! Quero saber sobre as vacinas para mulher.",
    icone: "👩",
  },
  {
    id: "homem",
    rotulo: "Saúde do homem",
    titulo: "Homem também se vacina",
    faixa: "Adultos de 20 a 59 anos",
    texto: "Muitos homens adultos estão com as vacinas atrasadas. Uma conversa rápida mostra o que falta.",
    imagem: I("vac_crianca_pai"),
    alt: "Pai acompanhando a vacinação da filha na clínica",
    vacinas: [
      { nome: "HPV", para: "Com avaliação da idade" },
      { nome: "Hepatites A e B", para: "Para quem não tem o esquema" },
      { nome: "dTpa", para: "Reforço a cada 10 anos" },
      { nome: "Influenza", para: "Todo ano" },
      { nome: "Tríplice viral", para: "Se faltar dose" },
      { nome: "Febre amarela", para: "Conforme orientação" },
      { nome: "Dengue", para: "Com avaliação" },
    ],
    mensagem: "Olá! Quero saber sobre as vacinas para homem.",
    icone: "👨",
  },
  {
    id: "idoso",
    rotulo: "Saúde do idoso",
    titulo: "Mais saúde para viver os melhores anos",
    faixa: "A partir dos 50 anos",
    texto:
      "Com a idade, algumas doenças ficam mais graves. As vacinas do adulto maduro ajudam a evitar internações e a manter a independência.",
    imagem: I("vac_geracoes"),
    alt: "Avó, mãe e bebê juntos, três gerações da mesma família",
    vacinas: [
      { nome: "Herpes zóster", para: "A partir dos 50 anos" },
      { nome: "Pneumocócicas", para: "Pneumonia, a partir dos 60 anos" },
      { nome: "VSR", para: "Vírus sincicial respiratório, a partir dos 60 anos" },
      { nome: "Influenza", para: "Todo ano" },
      { nome: "dTpa", para: "Reforço a cada 10 anos" },
      { nome: "Hepatite B", para: "Para quem não tem o esquema" },
    ],
    mensagem: "Olá! Quero saber sobre as vacinas para idoso (herpes zóster, pneumonia).",
    icone: "👵",
  },
];

export const MENSAGEM_GERAL = "Olá! Vim pelo site e quero saber sobre as vacinas para a minha família.";

export const PERGUNTAS = [
  { pergunta: "Vocês vacinam em casa?", resposta: "Sim. A equipe vai até a sua casa em São Luís, no dia e horário combinados pelo WhatsApp." },
  { pergunta: "Como sei quais vacinas estão faltando?", resposta: "Mande uma foto da caderneta pelo WhatsApp. A equipe confere e explica o que falta para cada pessoa da família." },
  { pergunta: "Dá para pagar parcelado?", resposta: "Sim, temos opções de pagamento parcelado e planos para organizar as vacinas da família. A equipe explica no WhatsApp." },
  { pergunta: "Atendem plano de saúde?", resposta: "Nós atendemos somente de forma particular." },
  { pergunta: "Quem decide quais vacinas tomar?", resposta: "A indicação de cada vacina depende de avaliação da equipe e segue os calendários da SBIm e do Ministério da Saúde." },
];
