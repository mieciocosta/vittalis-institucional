// ═══════════════════════════════════════════════════════════════
// LANDING DE VACINAÇÃO: todo o texto das páginas /vacinacao,
// /planos-vacinais e /pacotes-de-vacinas mora aqui. Edite à vontade.
//
// Pedido do master (28/10): página de conversão para Google Ads e Meta
// Ads. O único objetivo é a pessoa chamar no WhatsApp com a mensagem já
// dizendo o que ela quer.
//
// Regras que o `npm run check:campanhas` confere neste arquivo (o build
// trava se quebrar):
//   - nada de nome comercial de vacina;
//   - nada de promessa de resultado, escassez ("últimos dias", "vagas") ou
//     "grátis/promoção/desconto";
//   - nada de palavra em CAIXA ALTA gritada.
// "Parcelas" e valores são liberados nesta página por decisão do master.
// Atenção: preço e condição de pagamento em anúncio de saúde pesam na
// análise da Meta e do Google. Se preencher "valor", acompanhe a aprovação.
// ═══════════════════════════════════════════════════════════════

import type { Icone, Pergunta } from "./campanhas";

export type Produto = {
  id: string;
  nome: string;
  resumo: string;
  /** 3 itens curtos, lidos em 3 segundos. */
  itens: [string, string, string];
  icone: Icone;
  /** Mensagem que o botão do card já deixa escrita no WhatsApp. */
  mensagem: string;
  /** Valor ou condição para mostrar no card (ex.: "A partir de ..."). Vazio = não aparece. */
  valor?: string;
};

export const PRODUTOS: Produto[] = [
  {
    id: "plano-bebe",
    nome: "Plano Vacinal do Bebê",
    resumo: "O calendário completo do nascimento aos 18 meses, organizado pela equipe a partir da caderneta.",
    itens: ["Do nascimento aos 18 meses", "Avaliação da caderneta", "Lembrete de cada dose"],
    icone: "bebe",
    mensagem: "Olá! Quero saber sobre o Plano Vacinal do Bebê (0 a 18 meses).",
  },
  {
    id: "idade-certa",
    nome: "Plano Idade Certa",
    resumo: "Cada vacina na idade indicada, para crianças e adolescentes, com a caderneta sempre em dia.",
    itens: ["Crianças e adolescentes", "Calendário por idade", "Caderneta organizada"],
    icone: "calendario",
    mensagem: "Olá! Quero saber sobre o Plano Idade Certa.",
  },
  {
    id: "pacote-mensal",
    nome: "Pacote Mensal de Vacinas",
    resumo: "As vacinas do calendário com o pagamento dividido mês a mês.",
    itens: ["Pagamento em parcelas mensais", "Doses organizadas por mês", "Lembrete de cada aplicação"],
    icone: "caderneta",
    mensagem: "Olá! Quero saber sobre o Pacote Mensal de Vacinas.",
  },
  {
    id: "gestante",
    nome: "Pacote Gestante",
    resumo: "As vacinas indicadas na gestação, de acordo com a orientação do seu obstetra.",
    itens: ["Conforme orientação médica", "Calendário da gestação", "Na clínica ou em casa"],
    icone: "coracao",
    mensagem: "Olá! Quero saber sobre o Pacote Gestante.",
  },
  {
    id: "adulto-50",
    nome: "Pacote Adulto 50+",
    resumo: "As vacinas do adulto a partir dos 50 anos, organizadas a partir da sua carteira.",
    itens: ["A partir dos 50 anos", "Revisão da carteira", "Lembrete das próximas doses"],
    icone: "escudo",
    mensagem: "Olá! Quero saber sobre o Pacote Adulto 50+.",
  },
  {
    id: "domicilio",
    nome: "Vacinação em Domicílio",
    resumo: "A equipe vai até a sua casa em São Luís, no dia e horário combinados.",
    itens: ["Agendamento pelo WhatsApp", "Para bebês, crianças e adultos", "Mais conforto para a família"],
    icone: "casa",
    mensagem: "Olá! Quero saber sobre a Vacinação em Domicílio.",
  },
];

/** Opções do "O que você procura?" do formulário. */
export type Interesse = {
  valor: string;
  rotulo: string;
  /** Mostra o campo "idade do bebê" (opcional) para esta opção. */
  perguntaIdade: boolean;
};

export const INTERESSES: Interesse[] = [
  { valor: "plano-bebe", rotulo: "Plano vacinal do bebê", perguntaIdade: true },
  { valor: "pacote-mensal", rotulo: "Pacote mensal de vacinas", perguntaIdade: true },
  { valor: "gestante", rotulo: "Pacote gestante", perguntaIdade: false },
  { valor: "adulto-50", rotulo: "Adulto 50+", perguntaIdade: false },
  { valor: "avulsa", rotulo: "Vacina avulsa", perguntaIdade: true },
  { valor: "domicilio", rotulo: "Vacinação em domicílio", perguntaIdade: true },
];

export const PASSOS: { icone: Icone; titulo: string; texto: string }[] = [
  { icone: "conversa", titulo: "Você chama no WhatsApp", texto: "Conte o que procura. A equipe responde e tira as dúvidas." },
  { icone: "caderneta", titulo: "Montamos o calendário", texto: "A partir da caderneta, a equipe organiza as doses de cada fase." },
  { icone: "casa", titulo: "Vacinamos na clínica ou em casa", texto: "Você escolhe onde e quando prefere ser atendido." },
];

// A resposta sobre convênio é o texto oficial do master (o mesmo do VittaHub).
export const PERGUNTAS: Pergunta[] = [
  {
    pergunta: "Vocês vacinam em casa?",
    resposta: "Sim. A equipe faz vacinação em domicílio em São Luís, com dia e horário combinados pelo WhatsApp.",
  },
  {
    pergunta: "Dá para pagar parcelado?",
    resposta: "Sim. Os pacotes podem ser pagos em parcelas mensais. A equipe explica as condições pelo WhatsApp.",
  },
  {
    pergunta: "Preciso levar o cartão de vacina?",
    resposta: "Sim. Traga a caderneta ou mande uma foto dela pelo WhatsApp. É com ela que a equipe organiza as próximas doses.",
  },
  {
    pergunta: "Meu bebê nasceu prematuro. Pode vacinar?",
    resposta: "Pode. O calendário de bebês prematuros pode ter ajustes, e a indicação de cada vacina segue a avaliação do pediatra. A equipe organiza tudo a partir da caderneta e das orientações médicas.",
  },
  {
    pergunta: "Há vacinas para viagem?",
    resposta: "Sim. Para quem vai viajar, a equipe orienta sobre as vacinas recomendadas para o destino. A indicação depende de avaliação profissional.",
  },
  {
    pergunta: "Aceitam convênio ou plano de saúde?",
    resposta: "Nós atendemos somente de forma particular. Isso porque queremos garantir que cada consulta seja sem pressa, que o plano tanto exige, e com toda atenção, que cada cliente merece. Ajudamos ainda mais com o reembolso, pois emitimos a nota fiscal. E a maioria dos planos devolvem o valor. Ainda trabalhamos com parcelamento no cartão de crédito. Tudo para que o nosso cliente tenha o melhor atendimento.",
  },
];

/**
 * Depoimentos REAIS, com autorização por escrito de quem falou. A seção só
 * aparece quando houver pelo menos um. Depoimento inventado é proibido
 * (CDC, CONAR, CFM) e derruba o anúncio na análise.
 *
 * Exemplo de como preencher:
 *   { texto: "A equipe foi muito atenciosa com o meu filho.", autor: "Ana", detalhe: "mãe do Pedro" },
 */
export type Depoimento = { texto: string; autor: string; detalhe?: string };
export const DEPOIMENTOS: Depoimento[] = [];

/** Foto da seção "Onde estamos". Troque por uma foto real da clínica quando tiver. */
export const FOTO = {
  arquivo: "vac-hero",
  alt: "Menina de mãos dadas com o pai enquanto recebe um curativo no braço",
  largura: 1280,
  altura: 714,
};

export type SlugVariante = "vacinacao" | "planos-vacinais" | "pacotes-de-vacinas";

export type Variante = {
  slug: SlugVariante;
  /** Nome curto que aparece na planilha (coluna Campanha). */
  nome: string;
  selo: string;
  titulo: string;
  /** Trecho do título em turquesa e itálico. */
  destaque: string;
  subtitulo: string;
  pontos: [string, string, string];
  meta: { titulo: string; descricao: string };
  /** Ordem dos cards (ids de PRODUTOS). */
  ordem: string[];
  /** Opção já marcada no formulário ("" = a pessoa escolhe). */
  interessePadrao: string;
  /** Mensagem dos botões gerais de WhatsApp (topo, barra fixa, final). */
  mensagemGeral: string;
};

const PONTOS: [string, string, string] = ["Calendário completo do bebê", "Pacotes mensais", "Vacinação em domicílio"];

export const VARIANTES: Record<SlugVariante, Variante> = {
  vacinacao: {
    slug: "vacinacao",
    nome: "Vacinação",
    selo: "Vacinação particular",
    titulo: "Vacinação particular em São Luís, na clínica ou em casa",
    destaque: "na clínica ou em casa",
    subtitulo: "A equipe organiza o calendário de cada fase e aplica as vacinas onde for melhor para a sua família.",
    pontos: PONTOS,
    meta: {
      titulo: "Vacinação particular em São Luís, na clínica ou em casa | Vittalis Saúde",
      descricao: "Plano vacinal do bebê, pacotes mensais e vacinação em domicílio em São Luís. Fale com a equipe da Vittalis pelo WhatsApp.",
    },
    ordem: ["plano-bebe", "idade-certa", "pacote-mensal", "gestante", "adulto-50", "domicilio"],
    interessePadrao: "",
    mensagemGeral: "Olá! Vim pelo site e quero saber sobre vacinação.",
  },
  "planos-vacinais": {
    slug: "planos-vacinais",
    nome: "Planos vacinais",
    selo: "Planos vacinais",
    titulo: "Planos vacinais para o bebê em São Luís, na clínica ou em casa",
    destaque: "na clínica ou em casa",
    subtitulo: "Do nascimento aos 18 meses, a equipe organiza cada dose a partir da caderneta e lembra das próximas.",
    pontos: PONTOS,
    meta: {
      titulo: "Planos vacinais para o bebê em São Luís | Vittalis Saúde",
      descricao: "Plano vacinal do bebê do nascimento aos 18 meses, com lembrete das doses e vacinação na clínica ou em casa. Fale pelo WhatsApp.",
    },
    ordem: ["plano-bebe", "idade-certa", "pacote-mensal", "domicilio", "gestante", "adulto-50"],
    interessePadrao: "plano-bebe",
    mensagemGeral: "Olá! Vim pelo site e quero saber sobre os planos vacinais.",
  },
  "pacotes-de-vacinas": {
    slug: "pacotes-de-vacinas",
    nome: "Pacotes de vacinas",
    selo: "Pacotes de vacinas",
    titulo: "Pacotes de vacinas em São Luís, com pagamento mensal",
    destaque: "com pagamento mensal",
    subtitulo: "Escolha o pacote da sua fase e divida o pagamento mês a mês. Na clínica ou em casa.",
    pontos: PONTOS,
    meta: {
      titulo: "Pacotes de vacinas com pagamento mensal em São Luís | Vittalis Saúde",
      descricao: "Pacote mensal de vacinas, pacote gestante e adulto 50+, na clínica ou em casa em São Luís. Fale com a equipe pelo WhatsApp.",
    },
    ordem: ["pacote-mensal", "gestante", "adulto-50", "plano-bebe", "idade-certa", "domicilio"],
    interessePadrao: "pacote-mensal",
    mensagemGeral: "Olá! Vim pelo site e quero saber sobre os pacotes de vacinas.",
  },
};

export const SLUGS_VARIANTES = Object.keys(VARIANTES) as SlugVariante[];
