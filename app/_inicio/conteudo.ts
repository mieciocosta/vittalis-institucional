// Conteúdo da página inicial (14/11, pedido da direção: "faz a página inicial
// igual à Pediatria, pois está mil vezes mais lindo"). Mesmas regras da
// pediatria: sem preço, sem promessa de resultado, sem superlativo.
import { MENSAGEM_NEUTRA } from "@/lib/config/contato";

export const MENSAGEM_GERAL = MENSAGEM_NEUTRA;
export const MENSAGEM_VACINA = "Olá! Vim pelo site da Vittalis e gostaria de informações sobre vacinação.";

export const COMO_TRABALHAMOS = [
  { titulo: "Escutam com calma", texto: "Cada atendimento começa pela conversa: a história, a rotina e o que preocupa você." },
  { titulo: "Explicam sem complicar", texto: "Você sai sabendo o que foi visto, o que fazer em casa e quando voltar." },
  { titulo: "Trabalham em equipe", texto: "Médicos e terapeutas da mesma clínica conversam entre si sobre o mesmo paciente." },
  { titulo: "Tudo num só endereço", texto: "Consultas, vacinas e terapias no Jardim Renascença, sem rodar a cidade." },
  { titulo: "Vacinam na clínica ou em casa", texto: "Sala de vacinação própria e equipe que vai até a sua casa, com hora marcada." },
  { titulo: "Acompanham ao longo do tempo", texto: "Retornos combinados, para quem cuida de você conhecer a sua história." },
];

export const DORES = [
  { icone: "⏱️", titulo: "Consulta corrida", texto: "Pouco tempo para perguntar e você sai com mais dúvidas do que entrou." },
  { icone: "🗺️", titulo: "Cada coisa num lugar", texto: "Consulta num bairro, vacina em outro, terapia do outro lado da cidade." },
  { icone: "🔁", titulo: "Ninguém conversa", texto: "Cada profissional começa do zero e a família vira mensageira." },
  { icone: "📵", titulo: "Difícil agendar", texto: "Telefone que não atende e horário que nunca encaixa na rotina." },
];

export const PRECISA = [
  { titulo: "Tempo", texto: "Atendimento sem pressa, com espaço para perguntar." },
  { titulo: "Equipe junta", texto: "Médicos e terapeutas olhando para o mesmo paciente." },
  { titulo: "Perto de casa", texto: "Jardim Renascença, fácil de chegar de toda a Ilha." },
  { titulo: "WhatsApp que responde", texto: "Agendamento direto com a equipe, sem complicação." },
];

export const PUBLICOS = ["👶 Bebês", "🧒 Crianças", "🧑 Adolescentes", "🤰 Gestantes", "🧑‍💼 Adultos", "👵 Idosos"];

// O que mais se pesquisa no Maranhão (Planejador de Palavras-chave do Google,
// média mensal nov/2025 a out/2026, 14/11): psicólogo 5.400, terapia
// ocupacional 4.400, ginecologista 2.900, fonoaudiologia 2.400, dermatologista
// 1.900, psicóloga 1.600, nutricionista 1.300, fisioterapeuta 1.000,
// pneumologista 590, terapia ABA 320, avaliação neuropsicológica 320, clínico
// geral 260, musicoterapia 210. Cada busca leva à página da especialidade.
export const BUSCAS = [
  { busca: "Psicólogo e psicóloga", resposta: "Psicologia para adultos e para crianças, com hora marcada.", href: "/psicologia-adulto" },
  { busca: "Terapia ocupacional", resposta: "Terapia ocupacional infantil e adulta, com integração sensorial.", href: "/terapia-ocupacional-infantil" },
  { busca: "Ginecologista", resposta: "Consulta ginecológica particular no Jardim Renascença.", href: "/ginecologia" },
  { busca: "Fonoaudiologia", resposta: "Fala, linguagem, alimentação e voz, para crianças e adultos.", href: "/fonoaudiologia" },
  { busca: "Dermatologista", resposta: "Consulta dermatológica com hora marcada.", href: "/dermatologia" },
  { busca: "Nutricionista", resposta: "Nutrição infantil e adulta, com plano feito para você.", href: "/nutricao-adulta" },
  { busca: "Fisioterapeuta", resposta: "Fisioterapia infantil e adulta, com acompanhamento contínuo.", href: "/fisioterapia-adulta" },
  { busca: "Pneumologista", resposta: "Asma, tosse e alergias respiratórias, em crianças e adultos.", href: "/pneumologia" },
  { busca: "Pediatra", resposta: "Consulta de 1 hora e puericultura do bebê ao adolescente.", href: "/pediatria" },
  { busca: "Terapia ABA", resposta: "Psicologia ABA para crianças com autismo, com plano individual.", href: "/psicologia-aba" },
  { busca: "Avaliação neuropsicológica", resposta: "Avaliação de TDAH, aprendizagem e memória, com laudo.", href: "/neuropsicologia" },
  { busca: "Clínico geral", resposta: "Check-up, prevenção e acompanhamento da saúde do adulto.", href: "/clinica-geral" },
  { busca: "Musicoterapia", resposta: "Sessões com música para crianças com autismo, TDAH ou atraso.", href: "/musicoterapia" },
  { busca: "Vacinação particular", resposta: "Vacinas para todas as idades, na clínica ou em casa.", href: "/vacinas" },
  { busca: "Clínica que atende sábado", resposta: "Segunda a sexta, das 8h às 18h, e sábado, das 8h às 12h.", href: "#localizacao" },
  { busca: "Clínica em São Luís", resposta: "No Jardim Renascença, perto da Cohama, do Calhau e da Ponta d'Areia.", href: "#localizacao" },
];

export const PERGUNTAS = [
  { pergunta: "Quais especialidades a Vittalis atende?", resposta: "Pediatria, neuropediatria, ginecologia, clínica geral, dermatologia e pneumologia; psicologia infantil, ABA e adulto, neuropsicologia, psicopedagogia, fonoaudiologia, nutrição, fisioterapia, terapia ocupacional, musicoterapia e neurofeedback; e vacinação particular." },
  { pergunta: "Vocês atendem por plano de saúde?", resposta: "O atendimento é particular. Pelo WhatsApp a equipe explica como funciona cada atendimento e os horários disponíveis." },
  { pergunta: "A vacinação pode ser feita em casa?", resposta: "Sim. A Vittalis tem sala de vacinação na clínica e também equipe que vai até a sua casa, com hora marcada." },
  { pergunta: "Qual é o horário de atendimento?", resposta: "De segunda a sexta, das 8h às 18h, e aos sábados, das 8h às 12h." },
  { pergunta: "Onde fica a clínica?", resposta: "Na Av. Coronel Colares Moreira, no Jardim Renascença, em São Luís, perto da Cohama, do Calhau e da Ponta d'Areia." },
  { pergunta: "Atendem adultos e idosos?", resposta: "Sim. Além das crianças, a clínica atende adolescentes, adultos, gestantes e idosos nas consultas, terapias e vacinas." },
  { pergunta: "Como agendar?", resposta: "Pelo WhatsApp. É só tocar em qualquer botão desta página e a equipe responde com os horários disponíveis." },
];
