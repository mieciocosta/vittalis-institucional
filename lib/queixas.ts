// ═══════════════════════════════════════════════════════════════
// QUEIXAS DAS FAMÍLIAS nas páginas infantis (10/11, pedido da direção:
// "TDAH, autismo e agitação em todos eles, fale da queixa e coloque
// imagens, deixe as páginas ricas").
//
// Cada página infantil mostra as queixas que mais trazem as famílias, com
// foto, os sinais que os pais costumam notar e o que AQUELA especialidade
// faz em cada caso. Regras dos conselhos (CFM, CFP, Coffito, CRFa): sem
// promessa de resultado, sem "cura", sem preço. Quem diagnostica é médico
// ou neuropsicólogo; as terapias avaliam e acompanham.
// ═══════════════════════════════════════════════════════════════

const O = (n: string) => `/images/otim/${n}.webp`;

export type QueixaId = "tdah" | "autismo" | "agitacao" | "fala" | "escola" | "sensorial" | "seletividade";

export type Queixa = {
  id: QueixaId;
  emoji: string;
  titulo: string;
  resumo: string;
  sinais: string[];
  img: string;
  /** Foto reserva, usada quando a principal já é a foto do topo da página. */
  img2: string;
  alt: string;
};

export const QUEIXAS: Record<QueixaId, Queixa> = {
  seletividade: {
    id: "seletividade",
    emoji: "🥦",
    titulo: "Seletividade alimentar",
    resumo: "Quando a criança aceita poucos alimentos, sempre os mesmos, e recusa o resto pela cor, cheiro ou textura. A refeição vira briga e a família se preocupa com o crescimento. É muito comum em crianças com autismo e merece cuidado, não castigo.",
    sinais: ["Come menos de 15 a 20 alimentos diferentes", "Recusa grupos inteiros: frutas, verduras ou carnes", "Só aceita uma marca, uma cor ou um jeito de preparo", "Engasga, faz ânsia ou chora diante de comida nova", "Refeição demorada, com briga, tela ou chantagem"],
    img: O("nutricao_infantil_v2_02"),
    img2: O("nutricao_infantil_v2_01"),
    alt: "Nutricionista com criança sorridente em consulta",
  },
  tdah: {
    id: "tdah",
    emoji: "⚡",
    titulo: "TDAH e falta de atenção",
    resumo: "O Transtorno do Déficit de Atenção e Hiperatividade aparece na dificuldade de manter o foco, no excesso de movimento e na impulsividade, em casa e na escola. Nem toda criança agitada tem TDAH, e é justamente a avaliação que ajuda a família a entender o que está acontecendo.",
    sinais: ["Não consegue terminar tarefas e se distrai com facilidade", "Esquece recados, perde material, parece não escutar", "Não para quieta, levanta da cadeira, fala sem parar", "Age por impulso e tem dificuldade de esperar a vez", "Recados frequentes da escola sobre comportamento ou atenção"],
    img: O("psicopedagogia_02"),
    img2: O("psicologia_infantil_02"),
    alt: "Criança fazendo atividade de atenção com profissional",
  },
  autismo: {
    id: "autismo",
    emoji: "🧩",
    titulo: "Autismo (TEA)",
    resumo: "O Transtorno do Espectro Autista afeta a comunicação, a interação social e o comportamento, de formas muito diferentes em cada criança. Quanto mais cedo a família busca avaliação e estímulo, mais cedo a criança recebe o apoio de que precisa.",
    sinais: ["Pouco contato visual ou não atende quando é chamada pelo nome", "Atraso na fala ou fala que repete frases prontas", "Brinca sozinha, enfileira objetos, interesse muito fixo", "Movimentos repetitivos (balançar, girar, bater as mãos)", "Crises fortes com barulho, mudança de rotina ou texturas"],
    img: O("psicologia_aba_01"),
    img2: O("multidisciplinar_02"),
    alt: "Criança brincando com quebra-cabeça em sessão de terapia",
  },
  agitacao: {
    id: "agitacao",
    emoji: "🌪️",
    titulo: "Agitação, birras e comportamento",
    resumo: "Agitação constante, birras intensas, agressividade ou sono muito agitado deixam a rotina da família pesada. Às vezes é fase; às vezes é sinal de algo que merece olhar profissional, como ansiedade, questões sensoriais, TDAH ou TEA.",
    sinais: ["Birras longas e frequentes, difíceis de acalmar", "Morde, bate ou se machuca quando contrariada", "Sono agitado, acorda muitas vezes à noite", "Não aceita regras e limites em casa ou na escola", "Muda de humor de repente e sem motivo aparente"],
    img: O("psicologia_infantil_01"),
    img2: O("psicologia_aba_02"),
    alt: "Profissional brincando no chão com criança em sala acolhedora",
  },
  fala: {
    id: "fala",
    emoji: "🗣️",
    titulo: "Atraso na fala e na linguagem",
    resumo: "Cada criança tem o seu tempo, mas existem marcos esperados para cada idade. Quando a fala demora, troca muitos sons ou a criança não consegue se fazer entender, vale avaliar cedo.",
    sinais: ["Aos 2 anos fala poucas palavras ou nenhuma", "Aos 3 anos não forma frases curtas", "Troca ou omite sons e pessoas de fora não entendem", "Gagueira que não passa ou que incomoda a criança", "Aponta e puxa a mão do adulto em vez de pedir"],
    img: O("atendimento_multidisciplinar"),
    img2: O("multidisciplinar_02"),
    alt: "Fonoaudióloga brincando com criança usando argolas coloridas",
  },
  escola: {
    id: "escola",
    emoji: "📚",
    titulo: "Dificuldade na escola",
    resumo: "Notas que não melhoram, dificuldade para ler, escrever ou fazer contas e uma criança que passa a não gostar da escola. Por trás disso pode haver dislexia, TDAH, ansiedade ou outra questão que a avaliação ajuda a enxergar.",
    sinais: ["Demora para ler ou troca letras com frequência", "Não consegue acompanhar a turma mesmo com reforço", "Esquece o que estudou de um dia para o outro", "Chora ou reclama para ir à escola", "Professores relatam dificuldade de concentração"],
    img: O("psicopedagogia_01"),
    img2: O("psicopedagogia_02"),
    alt: "Profissional ajudando criança em atividade de leitura",
  },
  sensorial: {
    id: "sensorial",
    emoji: "✋",
    titulo: "Questões sensoriais e coordenação",
    resumo: "Algumas crianças sentem barulhos, roupas, texturas e alimentos de forma muito intensa, ou têm dificuldade com movimentos finos e com tarefas do dia a dia. Isso interfere no brincar, na escola e na autonomia.",
    sinais: ["Tapa os ouvidos com barulhos comuns", "Recusa roupas, etiquetas ou certos alimentos pela textura", "Dificuldade para segurar o lápis, recortar ou se vestir", "Tropeça, cai ou esbarra muito nas coisas", "Busca movimento o tempo todo (pular, girar, se jogar)"],
    img: O("psicologia_aba_02"),
    img2: O("multidisciplinar_02"),
    alt: "Terapeuta e criança em atividade de coordenação com brinquedos",
  },
};

/** Queixas mostradas em cada página e o que aquela especialidade faz em cada uma. */
export const QUEIXAS_POR_PAGINA: Record<string, { id: QueixaId; comoAjuda: string }[]> = {
  pediatria: [
    { id: "tdah", comoAjuda: "A pediatra acompanha o desenvolvimento desde cedo, escuta o que a família e a escola observam e encaminha para avaliação especializada quando os sinais aparecem." },
    { id: "autismo", comoAjuda: "Nas consultas de rotina a pediatra observa os marcos do desenvolvimento e os sinais de alerta do TEA, para a família não perder tempo." },
    { id: "agitacao", comoAjuda: "A consulta investiga sono, alimentação, rotina e saúde geral, que muitas vezes estão por trás da agitação, e orienta os próximos passos." },
  ],
  neuropediatria: [
    { id: "tdah", comoAjuda: "A neuropediatra avalia a criança, conversa com a família, analisa relatórios da escola e, quando indicado, conduz o diagnóstico e o tratamento médico." },
    { id: "autismo", comoAjuda: "A neuropediatra faz a avaliação clínica do desenvolvimento, investiga outras causas e orienta o plano de cuidado junto com as terapias da clínica." },
    { id: "agitacao", comoAjuda: "A consulta investiga o que está por trás da agitação, inclusive sono, crises e questões neurológicas, e indica o caminho mais adequado." },
    { id: "fala", comoAjuda: "O atraso de fala faz parte da avaliação do desenvolvimento: a neuropediatra investiga a causa e encaminha para a fono quando é o caso." },
  ],
  neuropsicologia: [
    { id: "tdah", comoAjuda: "A avaliação neuropsicológica mede atenção, memória, controle de impulsos e funções executivas e gera um laudo que ajuda o médico, a escola e a família." },
    { id: "autismo", comoAjuda: "Testes e observação estruturada descrevem o perfil da criança e ajudam a equipe médica no diagnóstico e no plano de terapias." },
    { id: "agitacao", comoAjuda: "A avaliação ajuda a separar o que é comportamento, ansiedade, atenção ou outra questão, para o tratamento ir na direção certa." },
    { id: "escola", comoAjuda: "A avaliação mostra como a criança aprende, onde estão as dificuldades e quais adaptações podem ajudar na escola." },
  ],
  fonoaudiologia: [
    { id: "fala", comoAjuda: "A fono avalia linguagem, fala e audição e monta um plano de estimulação com brincadeiras e orientação para a família continuar em casa." },
    { id: "autismo", comoAjuda: "Na criança com TEA a fono trabalha comunicação, intenção de comunicar e, quando necessário, formas alternativas de se expressar." },
    { id: "tdah", comoAjuda: "A fono trabalha atenção auditiva, organização da linguagem e da leitura, que costumam pesar na criança com TDAH." },
    { id: "agitacao", comoAjuda: "Muitas birras vêm da dificuldade de se fazer entender. Quando a comunicação melhora, a família costuma perceber a criança mais tranquila no dia a dia." },
  ],
  "psicologia-aba": [
    { id: "autismo", comoAjuda: "A terapia ABA trabalha com metas individuais de comunicação, socialização e autonomia, registradas e revistas com a família." },
    { id: "agitacao", comoAjuda: "A ABA entende a função de cada comportamento difícil e ensina formas mais adequadas de a criança pedir, esperar e lidar com o não." },
    { id: "tdah", comoAjuda: "Estratégias de rotina, reforço e organização ajudam a criança com TDAH a manter foco e seguir combinados." },
    { id: "fala", comoAjuda: "A comunicação é uma das metas centrais da ABA e é trabalhada junto com a fonoaudiologia da clínica." },
  ],
  "psicologia-infantil": [
    { id: "agitacao", comoAjuda: "Pelo brincar a psicóloga entende o que a criança sente e trabalha com ela e com os pais formas de lidar com raiva, frustração e medo." },
    { id: "tdah", comoAjuda: "A psicoterapia ajuda a criança com TDAH a se organizar, lidar com a frustração e com a autoestima, e orienta os pais na rotina." },
    { id: "autismo", comoAjuda: "A psicologia apoia a criança com TEA e a família no dia a dia e trabalha junto com a ABA quando ela é indicada." },
  ],
  "terapia-ocupacional-infantil": [
    { id: "sensorial", comoAjuda: "A terapeuta ocupacional avalia como a criança processa os sentidos e trabalha regulação, coordenação e independência nas tarefas do dia a dia." },
    { id: "autismo", comoAjuda: "Na criança com TEA a TO trabalha questões sensoriais, alimentação, sono e autonomia, junto com a ABA e a fono." },
    { id: "tdah", comoAjuda: "A TO trabalha regulação do corpo, organização e coordenação, o que ajuda a criança a ficar mais disponível para aprender." },
    { id: "agitacao", comoAjuda: "Muita agitação tem origem sensorial: a TO ajuda a criança a encontrar formas de se acalmar e se organizar." },
  ],
  "nutricao-infantil": [
    { id: "seletividade", comoAjuda: "A nutricionista avalia o que a criança come, o crescimento e a rotina e monta com a família um plano de pequenos passos para ampliar o cardápio, sem forçar." },
    { id: "autismo", comoAjuda: "No TEA a seletividade costuma ter origem sensorial. A nutricionista adapta o plano ao jeito da criança e trabalha junto com a TO e a fono da clínica." },
    { id: "tdah", comoAjuda: "Na criança com TDAH a alimentação costuma ser desorganizada: a nutricionista ajuda a criar rotina de refeições e escolhas que funcionem para a família." },
    { id: "sensorial", comoAjuda: "Textura, cheiro e cor pesam muito na aceitação. A nutricionista apresenta os alimentos aos poucos, respeitando o tempo da criança." },
  ],
  musicoterapia: [
    { id: "autismo", comoAjuda: "A música abre caminho para a comunicação, a imitação e a interação. A musicoterapeuta define objetivos com a família e a equipe de ABA e fono." },
    { id: "agitacao", comoAjuda: "Ritmo, canções e instrumentos ajudam a criança a se organizar, a esperar a vez e a encontrar formas de se acalmar." },
    { id: "tdah", comoAjuda: "As atividades musicais trabalham atenção, escuta, controle do impulso e o seguir combinados, de um jeito lúdico." },
    { id: "fala", comoAjuda: "Cantar, imitar sons e brincar com ritmo estimulam a intenção de comunicar, em parceria com a fonoaudiologia." },
  ],
  psicopedagogia: [
    { id: "escola", comoAjuda: "A psicopedagoga avalia como a criança aprende e trabalha leitura, escrita, raciocínio e hábitos de estudo, em contato com a escola." },
    { id: "tdah", comoAjuda: "Rotina de estudo, organização do material e estratégias de atenção ajudam a criança com TDAH a acompanhar a turma." },
    { id: "autismo", comoAjuda: "A psicopedagogia ajuda a adaptar atividades e o jeito de aprender da criança com TEA, junto com a escola." },
    { id: "agitacao", comoAjuda: "Quando a escola vira sofrimento, o comportamento muda. Entender a dificuldade de aprendizagem costuma deixar o dia a dia mais leve." },
  ],
};

// A página que junta todas as áreas (/desenvolvimento-infantil): cada queixa
// diz QUEM da equipe cuida dela.
QUEIXAS_POR_PAGINA["desenvolvimento-infantil"] = [
  { id: "autismo", comoAjuda: "Neuropediatra e neuropsicologia avaliam; ABA, fono, terapia ocupacional e psicologia acompanham a criança, cada uma com metas próprias e um plano só." },
  { id: "tdah", comoAjuda: "Neuropediatra e neuropsicologia avaliam a atenção e o comportamento; psicologia, psicopedagogia e terapia ocupacional ajudam na rotina, na escola e na organização." },
  { id: "agitacao", comoAjuda: "A equipe investiga o que está por trás (sono, sensorial, ansiedade, TDAH ou TEA) e indica a terapia certa, com orientação para os pais." },
  { id: "fala", comoAjuda: "A fonoaudiologia avalia e estimula a fala; quando é preciso, a neuropediatra investiga a causa." },
  { id: "escola", comoAjuda: "Neuropsicologia e psicopedagogia mostram como a criança aprende e o que pode ajudar, em contato com a escola." },
  { id: "sensorial", comoAjuda: "A terapia ocupacional trabalha regulação, coordenação e autonomia nas tarefas do dia a dia." },
  { id: "seletividade", comoAjuda: "A nutricionista infantil cuida da seletividade alimentar com um plano de pequenos passos, junto com a TO e a fono quando a origem é sensorial." },
];

/** Na página que junta todas, cada queixa mostra as áreas que cuidam dela
 *  (etiquetas que levam à página da área). As fotos ficam nos cartões das
 *  áreas, uma por área, para não repetir imagem na mesma página. */
export const QUEM_CUIDA: Record<QueixaId, string[]> = {
  autismo: ["neuropediatria", "neuropsicologia", "psicologia-aba", "fonoaudiologia", "terapia-ocupacional-infantil", "musicoterapia", "nutricao-infantil"],
  tdah: ["neuropediatria", "neuropsicologia", "psicologia-infantil", "psicopedagogia", "terapia-ocupacional-infantil"],
  agitacao: ["neuropediatria", "psicologia-infantil", "psicologia-aba", "terapia-ocupacional-infantil", "musicoterapia"],
  fala: ["fonoaudiologia", "neuropediatria", "psicologia-aba", "musicoterapia"],
  escola: ["neuropsicologia", "psicopedagogia", "fonoaudiologia"],
  sensorial: ["terapia-ocupacional-infantil", "psicologia-aba", "nutricao-infantil"],
  seletividade: ["nutricao-infantil", "terapia-ocupacional-infantil", "fonoaudiologia"],
};

/** Áreas mostradas na página que junta todas (/desenvolvimento-infantil).
 *  A pediatria fica de fora de propósito (10/11, pedido da direção: "faz uma
 *  de pediatria separado"): ela tem a página própria, /pediatria. */
export const AREAS_INFANTIS = [
  { slug: "neuropediatria", nome: "Neuropediatria", img: O("pediatria_01"), texto: "Avaliação médica do desenvolvimento, do comportamento e do sono." },
  { slug: "neuropsicologia", nome: "Neuropsicologia", img: O("psicologia_infantil_02"), texto: "Avaliação de atenção, memória e comportamento, com laudo." },
  { slug: "psicologia-aba", nome: "Psicologia ABA", img: O("psicologia_aba_01"), texto: "Metas individuais de comunicação, socialização e autonomia." },
  { slug: "fonoaudiologia", nome: "Fonoaudiologia", img: O("multidisciplinar_02"), texto: "Fala, linguagem e comunicação, com orientação para casa." },
  { slug: "terapia-ocupacional-infantil", nome: "Terapia Ocupacional", img: O("psicologia_aba_02"), texto: "Questões sensoriais, coordenação e independência." },
  { slug: "psicologia-infantil", nome: "Psicologia Infantil", img: O("psicologia_infantil_01"), texto: "Emoções, comportamento e apoio aos pais pelo brincar." },
  { slug: "musicoterapia", nome: "Musicoterapia", img: O("psicologia_infantil_02"), texto: "Música para comunicar, interagir e se regular." },
  { slug: "nutricao-infantil", nome: "Nutrição Infantil", img: O("nutricao_infantil_v2_02"), texto: "Seletividade alimentar, sem forçar e com plano para a família." },
  { slug: "psicopedagogia", nome: "Psicopedagogia", img: O("psicopedagogia_01"), texto: "Leitura, escrita e aprendizagem, em contato com a escola." },
];

/** Caminho do cuidado na clínica, mostrado em todas as páginas infantis. */
export const CAMINHO_DO_CUIDADO = [
  { emoji: "🩺", titulo: "Consulta médica", texto: "Pediatra ou neuropediatra ouvem a história e avaliam a criança.", slug: "neuropediatria" },
  { emoji: "🔬", titulo: "Avaliação", texto: "Neuropsicologia ajuda a entender atenção, memória e comportamento.", slug: "neuropsicologia" },
  { emoji: "🧩", titulo: "Terapias", texto: "ABA, fono, terapia ocupacional, musicoterapia e psicologia, no mesmo lugar.", slug: "psicologia-aba" },
  { emoji: "👨‍👩‍👧", titulo: "Família e escola", texto: "Orientação aos pais e conversa com a escola quando necessário.", slug: "psicopedagogia" },
];

export const GALERIA_INFANTIL = [
  { src: O("multidisciplinar_02"), legenda: "Atividades à mesa, no ritmo da criança" },
  { src: O("psicologia_infantil_01"), legenda: "O brincar como caminho do cuidado" },
  { src: O("psicologia_aba_02"), legenda: "Estímulo com brinquedos e jogos" },
  { src: O("pediatria_02"), legenda: "Consulta sem pressa e com carinho" },
];

/** Título da seção de queixas; a nutrição abre pela seletividade. */
export function tituloQueixas(slug: string): string {
  if (slug === "nutricao-infantil") return "Seletividade alimentar, autismo e TDAH: sua família não precisa passar por isso sozinha";
  return "TDAH, autismo, agitação: sua família não precisa passar por isso sozinha";
}

/** Foto de impacto no topo de cada página infantil (10/11, pedido da
 *  direção: "imagens de impacto na primeira página"). Diferente da foto da
 *  seção "na Vittalis Saúde", para não repetir imagem na mesma página. */
export const FOTO_TOPO: Record<string, string> = {
  pediatria: O("vittalis_pediatria_2"),
  neuropediatria: O("pediatria_02"),
  neuropsicologia: O("psicopedagogia_02"),
  fonoaudiologia: O("multidisciplinar_02"),
  "psicologia-aba": O("psicologia_aba_02"),
  "psicologia-infantil": O("psicologia_infantil_02"),
  "terapia-ocupacional-infantil": O("multidisciplinar_02"),
  psicopedagogia: O("psicopedagogia_02"),
  "nutricao-infantil": O("nutricao_infantil_v2_02"),
  musicoterapia: O("psicologia_aba_02"),
  // 10/11, pedido da direção (03h02): a página principal abre com a fono e a criança.
  "desenvolvimento-infantil": O("atendimento_multidisciplinar"),
};

/** Fotos de reserva para os cartões de queixa quando as próprias já estão na página. */
export const FOTOS_RESERVA = [O("multidisciplinar_02"), O("psicologia_infantil_02"), O("psicologia_aba_02"), O("psicopedagogia_01"), O("pediatria_01")];

export function temQueixas(slug: string): boolean {
  return Boolean(QUEIXAS_POR_PAGINA[slug]);
}
