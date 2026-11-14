// Conteúdo da página de Pediatria (14/11, pedido da direção: página própria,
// no modelo das clínicas pediátricas que ficam no topo do Google em São Luís).
// Regras: sem preço, sem promessa de resultado e sem superlativo (CFM
// 2.336/2023); a pediatra das fotos é imagem ilustrativa, sem nome nem CRM
// (a direção escolheu assim; o rodapé avisa).

export const MENSAGEM_GERAL = "Olá! Vim pelo site da Vittalis e gostaria de agendar uma consulta com a pediatria.";

// Fotos. Quando chegarem as fotos novas da pediatra (mesma pessoa em todas),
// troque só os caminhos aqui.
export const FOTOS = {
  // Recortada (sem o fundo da foto) para casar com o rosé da capa, como no modelo.
  capa: "/images/otim/ped_capa_recorte.webp",
  capaAlt: "Pediatra sorridente de jaleco com estetoscópio, sentada numa poltrona verde",
};

export type Atendimento = { icone: string; titulo: string; texto: string; itens: string[]; mensagem: string };

export const ATENDIMENTOS: Atendimento[] = [
  {
    icone: "🩺",
    titulo: "Consulta pediátrica",
    texto: "Para quando a criança está doente ou quando algo preocupa a família. Consulta com calma, exame completo e orientação clara do que fazer em casa.",
    itens: ["Do recém-nascido ao adolescente", "Febre, tosse, alergias, dor de barriga", "Pedido e leitura de exames"],
    mensagem: "Olá! Vim pelo site e quero agendar uma consulta pediátrica.",
  },
  {
    icone: "👶",
    titulo: "Puericultura",
    texto: "O acompanhamento de rotina do bebê e da criança: peso, altura, perímetro da cabeça, marcos do desenvolvimento, alimentação e sono, consulta a consulta.",
    itens: ["Primeira consulta do recém-nascido", "Consultas de rotina no primeiro ano", "Introdução alimentar e amamentação"],
    mensagem: "Olá! Vim pelo site e quero saber sobre o acompanhamento de puericultura do meu bebê.",
  },
  {
    icone: "🎒",
    titulo: "Check-up da criança e do adolescente",
    texto: "Consulta de rotina para quem está bem: avaliação do crescimento, da saúde geral, da caderneta de vacinas e dos hábitos de cada fase.",
    itens: ["Volta às aulas e esportes", "Crescimento e puberdade", "Orientação para os pais"],
    mensagem: "Olá! Vim pelo site e quero agendar um check-up pediátrico.",
  },
  {
    icone: "🧩",
    titulo: "Desenvolvimento: TDAH e TEA",
    texto: "Quando a fala, o comportamento ou a aprendizagem preocupam: a pediatra avalia e a criança segue com neuropediatria e terapias no mesmo endereço.",
    itens: ["Atraso na fala ou no andar", "Suspeita de TDAH ou autismo", "Equipe que conversa entre si"],
    mensagem: "Olá! Vim pelo site e quero falar sobre o desenvolvimento do meu filho.",
  },
];

export const DORES = [
  { icone: "⏱️", titulo: "Consulta de 10 minutos", texto: "Você sai com mais dúvidas do que entrou e sem tempo para perguntar." },
  { icone: "🔁", titulo: "Cada vez um médico diferente", texto: "Ninguém conhece a história do seu filho e tudo começa do zero." },
  { icone: "📱", titulo: "Respostas da internet", texto: "Madrugada pesquisando sintomas porque ficou sem orientação." },
  { icone: "🧩", titulo: "Encaminhamentos soltos", texto: "Fono, psicólogo, nutricionista: cada um num endereço e ninguém conversa." },
];

export const COMO_TRABALHAM = [
  { titulo: "Ouvem a história inteira", texto: "A consulta começa pela conversa: gestação, parto, rotina, alimentação, sono e o que a família tem notado." },
  { titulo: "Examinam com calma", texto: "Exame físico completo, curvas de crescimento e marcos do desenvolvimento avaliados a cada consulta." },
  { titulo: "Explicam sem complicar", texto: "Você sai sabendo o que a criança tem, o que fazer em casa e quando voltar." },
  { titulo: "Acompanham ao longo do crescimento", texto: "Retornos combinados com a família, para quem acompanha a criança conhecer a história dela." },
  { titulo: "Trabalham em equipe", texto: "Quando é preciso, a criança segue com neuropediatria, fono, psicologia, nutrição e terapia ocupacional no mesmo endereço." },
  { titulo: "Cuidam das vacinas junto", texto: "A caderneta é conferida na consulta e a vacinação é feita na própria clínica." },
];

export const QUANDO_LEVAR = [
  "Primeira consulta do recém-nascido, nos primeiros dias de vida",
  "Consultas de rotina do bebê ao longo do primeiro ano",
  "Febre, tosse, chiado, vômito ou diarreia que preocupam",
  "Dúvidas sobre amamentação, introdução alimentar, peso ou sono",
  "A criança adoece com frequência ou vive com alergias",
  "Demora para falar, andar ou interagir (a pediatra orienta e encaminha)",
  "Check-up para escola, esportes ou adolescência",
];

export const BAIRROS = ["Renascença", "Cohama", "Calhau", "Cohab", "Turu", "Ponta d'Areia", "Vinhais", "São José de Ribamar", "Paço do Lumiar"];

export const PERGUNTAS = [
  {
    pergunta: "A partir de que idade a pediatria atende?",
    resposta: "Desde os primeiros dias de vida até a adolescência. A primeira consulta do recém-nascido costuma ser feita logo na primeira semana em casa.",
  },
  {
    pergunta: "Quanto tempo dura a consulta?",
    resposta: "Em média de 40 a 50 minutos, para dar tempo de ouvir a família, examinar com calma e tirar as dúvidas.",
  },
  {
    pergunta: "Vocês atendem por plano de saúde?",
    resposta: "O atendimento é particular. Pelo WhatsApp a equipe explica como funciona a consulta e os horários disponíveis.",
  },
  {
    pergunta: "O que levar na consulta?",
    resposta: "A caderneta da criança, exames recentes e, se tiver, relatórios da escola ou de outros profissionais. Anotar as dúvidas antes também ajuda.",
  },
  {
    pergunta: "A clínica tem vacinação?",
    resposta: "Sim. A Vittalis tem sala de vacinação e também vacina em casa. A pediatra confere a caderneta e a equipe organiza as doses que faltam.",
  },
  {
    pergunta: "E se meu filho precisar de outra especialidade?",
    resposta: "Neuropediatria, fonoaudiologia, psicologia infantil, nutrição infantil e terapia ocupacional ficam na própria clínica, o que facilita o acompanhamento.",
  },
  {
    pergunta: "A pediatria atende TDAH e autismo (TEA)?",
    resposta: "A pediatra avalia o desenvolvimento e, quando é preciso, a criança segue com a neuropediatria, a neuropsicologia e as terapias da própria Vittalis.",
  },
  {
    pergunta: "Qual é o horário de atendimento?",
    resposta: "De segunda a sexta, das 8h às 18h, e aos sábados, das 8h às 12h.",
  },
  {
    pergunta: "Como agendar?",
    resposta: "Pelo WhatsApp. É só tocar em qualquer botão desta página e a equipe responde com os horários disponíveis.",
  },
];

// "O que você realmente procura" (no lugar das frases de mães do modelo: aqui
// não inventamos depoimento, falamos do que a família encontra).
export const PRECISA = [
  { titulo: "Tempo", texto: "Consulta de 40 a 50 minutos, sem olhar para o relógio." },
  { titulo: "Escuta", texto: "A história da criança contada com calma e ouvida até o fim." },
  { titulo: "Um plano claro", texto: "Você sai sabendo o que fazer em casa e quando voltar." },
  { titulo: "Tudo perto", texto: "Vacinas, exames e terapias organizados no mesmo lugar." },
];

// Calendário de consultas de rotina (puericultura) do Ministério da Saúde.
export const PUERICULTURA = [
  { quando: "1ª semana", oque: "Primeira consulta: peso, amamentação, icterícia, teste do pezinho e vacinas ao nascer." },
  { quando: "1, 2, 4 e 6 meses", oque: "Crescimento, desenvolvimento, sono, amamentação e as vacinas de cada mês." },
  { quando: "9 e 12 meses", oque: "Introdução alimentar, primeiros passos e as primeiras palavras." },
  { quando: "18 e 24 meses", oque: "Fala, comportamento, alimentação da família e vacinas de reforço." },
  { quando: "A partir dos 2 anos", oque: "Uma consulta por ano, acompanhando escola, visão, peso e puberdade." },
];
