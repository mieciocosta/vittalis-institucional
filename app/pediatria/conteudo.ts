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

export const BAIRROS = [
  "Renascença", "Jardim Renascença", "Cohama", "Calhau", "Ponta d'Areia", "Ponta do Farol", "São Francisco",
  "Olho d'Água", "Turu", "Vinhais", "Cohab", "Cohatrac", "Angelim", "Bequimão", "Jardim Eldorado",
  "Araçagi", "Maiobão", "São José de Ribamar", "Paço do Lumiar", "Raposa",
];

// O que as famílias do Maranhão mais pesquisam quando procuram pediatra
// (14/11, pedido da direção: "coloque no site as palavras-chave que a
// população do Maranhão pesquisa"). Cada linha responde uma busca de verdade,
// sem prometer o que a clínica não faz (não é pronto-socorro, não é 24 horas).
export const BUSCAS = [
  { busca: "Pediatra em São Luís", resposta: "Consultório de pediatria no Jardim Renascença, perto da Cohama, do Calhau e da Ponta d'Areia." },
  { busca: "Pediatra particular", resposta: "Consulta particular de 1 hora, com retorno combinado com a família." },
  { busca: "Pediatra para recém-nascido", resposta: "Primeira consulta do bebê logo na primeira semana de vida e puericultura no primeiro ano." },
  { busca: "Pediatra que atende sábado", resposta: "Atendimento de segunda a sexta, das 8h às 18h, e aos sábados, das 8h às 12h." },
  { busca: "Clínica pediátrica e infantil", resposta: "Pediatria, neuropediatria, fono, psicologia infantil, nutrição e terapia ocupacional no mesmo endereço." },
  { busca: "Pediatra e vacinação infantil", resposta: "A caderneta é conferida na consulta e as vacinas são aplicadas na clínica ou em casa." },
  { busca: "Pediatra para TDAH e autismo", resposta: "Avaliação do desenvolvimento e encaminhamento para neuropediatria e terapias da própria Vittalis." },
  { busca: "Check-up infantil e do adolescente", resposta: "Consulta de rotina para escola, esportes, crescimento e puberdade." },
];

export const DESTAQUES_PEDIATRA = [
  "Consulta de 1 hora, sem pressa",
  "Do recém-nascido ao adolescente",
  "Puericultura e consultas de rotina",
  "Vacinação na clínica e em casa",
  "Neuropediatria e terapias no mesmo endereço",
  "Atendimento particular, também aos sábados",
];

export const PERGUNTAS = [
  {
    pergunta: "A partir de que idade a pediatria atende?",
    resposta: "Desde os primeiros dias de vida até a adolescência. A primeira consulta do recém-nascido costuma ser feita logo na primeira semana em casa.",
  },
  {
    pergunta: "Quanto tempo dura a consulta?",
    resposta: "Em média 1 hora, para dar tempo de ouvir a família, examinar com calma e tirar as dúvidas.",
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
    pergunta: "A pediatria atende aos sábados?",
    resposta: "Sim. Aos sábados o atendimento é das 8h às 12h. De segunda a sexta, das 8h às 18h.",
  },
  {
    pergunta: "Onde fica a clínica? Atendem famílias de outros bairros e cidades?",
    resposta: "A Vittalis fica na Av. Coronel Colares Moreira, no Jardim Renascença, em São Luís, perto da Cohama, do Calhau e da Ponta d'Areia. Recebemos famílias de toda a Ilha (São José de Ribamar, Paço do Lumiar e Raposa), e famílias do interior do Maranhão também podem agendar pelo WhatsApp.",
  },
  {
    pergunta: "Quanto custa a consulta com a pediatra?",
    resposta: "O valor e os horários disponíveis são informados pelo WhatsApp, junto com como funciona a consulta.",
  },
  {
    pergunta: "A Vittalis é pronto-socorro ou atende 24 horas?",
    resposta: "Não. A pediatria atende com hora marcada. Em urgência (falta de ar, convulsão, desmaio ou criança muito prostrada) procure o pronto-socorro mais próximo.",
  },
  {
    pergunta: "Como agendar?",
    resposta: "Pelo WhatsApp. É só tocar em qualquer botão desta página e a equipe responde com os horários disponíveis.",
  },
];

// "O que você realmente procura" (no lugar das frases de mães do modelo: aqui
// não inventamos depoimento, falamos do que a família encontra).
export const PRECISA = [
  { titulo: "Tempo", texto: "Consulta de 1 hora, sem olhar para o relógio." },
  { titulo: "Escuta", texto: "A história da criança contada com calma e ouvida até o fim." },
  { titulo: "Um plano claro", texto: "Você sai sabendo o que fazer em casa e quando voltar." },
  { titulo: "Tudo perto", texto: "Vacinas, exames e terapias organizados no mesmo lugar." },
];

// A pediatra de verdade da Vittalis (14/11, foto mandada pela direção, a mesma
// do Instagram "Dra. Luisa com amor e carinho"). O CFM (Res. 2.336/2023) pede
// nome completo + CRM (+ RQE se tiver título de especialista) em toda
// publicidade com o nome do médico: preencher `registro` ANTES de publicar.
export const PEDIATRA_REAL = {
  nome: "Dra. Luísa",
  // Legenda ditada pela direção (14/11).
  legenda: "A Dra. Luísa é uma das pediatras mais requisitadas e está aqui para cuidar do seu filho com muito amor e carinho.",
  registro: "",
  foto: "/images/otim/ped_luisa.webp",
  alt: "Dra. Luísa, pediatra da Vittalis Saúde, sorrindo no consultório",
  texto: [
    "No consultório da Vittalis, no Jardim Renascença, ela acompanha o bebê desde os primeiros dias, nas consultas de rotina, e a criança nas dúvidas de cada fase, com vacinas e terapias no mesmo endereço.",
  ],
  mensagem: "Olá! Vim pelo site e quero agendar uma consulta com a Dra. Luísa.",
};

// Avaliações REAIS do Google Maps da Vittalis (14/11, pedido da direção:
// "pega os comentários do google e faz imagens de avaliação"). Texto copiado
// do jeito que a família escreveu; nome só com o primeiro nome e a inicial do
// sobrenome. São avaliações da clínica (muitas falam da vacinação), não de uma
// pediatra: o título da seção diz "sobre a Vittalis". Trocar só por outra
// avaliação de verdade, nunca escrever uma.
export const NOTA_GOOGLE = { nota: "4,8", total: 49 };

export const AVALIACOES = [
  { nome: "Giulyanne T.", texto: "Encantada com o atendimento da clínica desde o primeiro contato no WhatsApp, tudo feito com tanto carinho e atenção! As técnicas que vieram aplicar as vacinas em casa foram super delicadas, pacientes e cuidadosas com o meu bebê. É um alívio enorme poder contar com um serviço tão humano e acolhedor. Recomendo!!" },
  { nome: "Paloma F.", texto: "Equipe ótima, vem na residência, explicam tudo direitinho, usam técnicas pra amenizar as dores no local da aplicação da vacina. E realizam acompanhamento pós vacinal 😍" },
  { nome: "Lara F.", texto: "Sempre muito bem atendida e recebida. As profissionais são muito atenciosas e atuam com empatia e cuidado. As vacinas são e serão sempre com essa equipe top. Agradeço demais ❤️" },
  { nome: "Jéssica A.", texto: "Amei a equipe, profissionais excelentes. Obrigada mais uma vez por cuidarem com tanto amor de nossa bebê. Parabéns." },
  { nome: "Samila T.", texto: "Muito pacientes e atendimento de qualidade, meu filho nem chorou na vacina." },
  { nome: "Daniel S.", texto: "Ótimo atendimento, muito empáticas, ótimo diálogo, me senti muito acolhido com a minha família, só tenho a elogiar. Parabéns, nota 1000." },
  { nome: "Elaine S.", texto: "Atendimento excelente. Vacino minha filha desde o primeiro mês. Indico muito." },
  { nome: "Ana A.", texto: "Atendimento muito humanizado! Profissionais muito educadas e qualificadas" },
];

// Marcos do desenvolvimento (14/11, no modelo do quadro "Desenvolvimento do
// bebê no 1º ano" mandado pela direção). Idades aproximadas, na linha da
// Caderneta da Criança do Ministério da Saúde; cada bebê tem seu tempo.
export const MARCOS = [
  { pose: 1, idade: "0-2", unidade: "meses", texto: "Deitado de costas, mãozinhas fechadas e o primeiro sorriso" },
  { pose: 2, idade: "2-4", unidade: "meses", texto: "De bruços, sustenta a cabeça" },
  { pose: 3, idade: "4-6", unidade: "meses", texto: "Apoia nas mãos e começa a rolar" },
  { pose: 4, idade: "6-9", unidade: "meses", texto: "Senta sem apoio" },
  { pose: 5, idade: "7-10", unidade: "meses", texto: "Engatinha" },
  { pose: 6, idade: "9-12", unidade: "meses", texto: "Fica em pé com apoio, primeiros passos" },
  { pose: 7, idade: "12-18", unidade: "meses", texto: "Anda sozinho" },
  { pose: 8, idade: "18-24", unidade: "meses", texto: "Corre, chuta bola e junta palavras" },
];

// Puericultura depois dos 2 anos (14/11, direção: "as consultas incluem
// bebês, crianças e adolescentes").
export const PUER_DEPOIS = [
  { icone: "🧒", idade: "2 a 5 anos", itens: ["Fala e linguagem", "Alimentação e seletividade", "Sono e desfralde", "Comportamento e birras"] },
  { icone: "🎒", idade: "6 a 11 anos", itens: ["Escola e aprendizagem", "Peso, altura e postura", "Visão e audição", "Esportes e telas"] },
  { icone: "🧑", idade: "12 a 18 anos", itens: ["Puberdade", "Saúde emocional", "Alimentação e acne", "Vacinas da adolescência"] },
];

// "Qual a idade do seu filho?" (14/11, pra converter: a família toca na idade
// e o WhatsApp já abre com a mensagem pronta, a recepção já sabe a fase).
const msgIdade = (quem: string) => `Olá! Vim pelo site. ${quem} e quero agendar a consulta de puericultura com a pediatra.`;
export const IDADES_BEBE = [
  { rotulo: "🍼 Recém-nascido", msg: "Olá! Vim pelo site. Meu bebê acabou de nascer e quero agendar a primeira consulta com a pediatra." },
  { rotulo: "1 mês", msg: msgIdade("Meu bebê tem 1 mês") },
  { rotulo: "2 meses", msg: msgIdade("Meu bebê tem 2 meses") },
  { rotulo: "4 meses", msg: msgIdade("Meu bebê tem 4 meses") },
  { rotulo: "6 meses", msg: msgIdade("Meu bebê tem 6 meses") },
  { rotulo: "9 meses", msg: msgIdade("Meu bebê tem 9 meses") },
  { rotulo: "1 ano", msg: msgIdade("Meu filho tem 1 ano") },
  { rotulo: "1 a 2 anos", msg: msgIdade("Meu filho tem entre 1 e 2 anos") },
  { rotulo: "2 a 5 anos", msg: msgIdade("Meu filho tem entre 2 e 5 anos") },
  { rotulo: "6 a 11 anos", msg: msgIdade("Meu filho tem entre 6 e 11 anos") },
  { rotulo: "🧑 Adolescente (12 a 18 anos)", msg: msgIdade("Meu filho é adolescente") },
];

// O que a família leva de cada consulta (só o que a consulta já faz).
export const LEVA_DA_CONSULTA = [
  { icone: "📈", titulo: "Curva de crescimento", texto: "Peso, altura e desenvolvimento conferidos e anotados." },
  { icone: "💉", titulo: "Caderneta em dia", texto: "Vacinas conferidas e aplicadas aqui mesmo ou em casa." },
  { icone: "🧭", titulo: "Orientação da fase", texto: "Sono, alimentação, escola e comportamento de cada idade." },
  { icone: "📅", titulo: "Retorno combinado", texto: "Você sai sabendo quando voltar, e a gente lembra pelo WhatsApp." },
];

// Calendário de consultas de rotina (puericultura) do Ministério da Saúde.
export const CONSULTAS_ROTINA = ["1ª semana", "1 mês", "2 meses", "4 meses", "6 meses", "9 meses", "12 meses", "18 meses", "24 meses", "1 vez por ano a partir dos 2 anos"];
