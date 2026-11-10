// ═══════════════════════════════════════════════════════════════
// VITTALIS SAÚDE — DADOS DE TODAS AS ESPECIALIDADES
// Imagens reais via Unsplash (gratuitas para uso comercial)
// ═══════════════════════════════════════════════════════════════

export interface Specialty {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  category: "medica" | "terapia" | "vacinacao";
  headline: string;
  subheadline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  benefits: string[];
  forWhom: string[];
  howItWorks: string[];
  differentials: string[];
  painPoints: string[];
  faq: { q: string; a: string }[];
  ctaText: string;
  waMessage: string;
  accentColor: string;
}

// 10/11: as fotos saíram dos JPG de 7 a 8 MB (a página levava segundos para
// abrir no 4G e o lead do anúncio desistia) para WebP de ~50 KB em
// /images/otim. Cada especialidade com a foto que combina com ela: antes a
// fono mostrava a foto de vacina e a neuropsicologia, a de dermatologia.
const O = (n: string) => `/images/otim/${n}.webp`;
const IMG = {
  vacinacao: "/images/vittalis_vacinacao_1.png",
  pediatria: O("pediatria_02_logo"),
  neuropediatria: O("pediatria_01_logo"),
  ginecologia: O("ginecologia_01"),
  clinicaGeral: O("clinica_geral_01"),
  dermatologia: O("dermatologia_01"),
  pneumologia: O("pneumologia_01"),
  psicoInfantil: O("n_psicologia_aba"),
  psicoAba: O("n_psicologia_infantil"),
  psicoAdulto: O("neuropsicologia_01"),
  neuro: O("n_psicologia_infantil"),
  psicoped: O("n_neuropsicologia"),
  fono: O("atendimento_multidisciplinar_logo"),
  nutriInfantil: O("nutricao_infantil_v2_01"),
  nutriAdulta: O("clinica_geral_02"),
  fisioInfantil: O("n_terapia_ocupacional"),
  fisioAdulta: O("pneumologia_02"),
  toInfantil: O("n_psicologia_aba"),
  toAdulta: O("clinica_geral_02"),
  neurofeedback: O("neurofeedback_02"),
  musicoterapia: O("n_psicologia_infantil"),
  hero: "/images/vittalis_pediatria_2.png",
  equipe: O("multidisciplinar_01"),
  clinica: "/images/vittalis_vacinacao_1.png",
  vacinacaoHero: "/images/vacinas_02.jpg",
};

export { IMG };

export const SPECIALTIES: Specialty[] = [
  {
    slug: "vacinacao",
    name: "Vacinação Particular",
    shortName: "Vacinação",
    icon: "💉",
    category: "vacinacao",
    accentColor: "#00B8C0",
    headline: "Vacinação com mais conforto, segurança e orientação",
    subheadline: "Proteja sua família em todas as fases da vida com atendimento acolhedor e planejamento vacinal individualizado em São Luís.",
    description: "A Vittalis Saúde oferece vacinação particular para bebês, crianças, adolescentes, adultos e idosos. Nosso atendimento prioriza o conforto do paciente, com técnicas para redução do desconforto, ambiente acolhedor e orientação clara sobre cada vacina. Contamos com vacinas de rotina e especiais, em um espaço preparado para oferecer tranquilidade a toda a família.",
    metaTitle: "Vacinação Particular em São Luís | Vittalis Saúde — Clínica Premium",
    metaDescription: "Vacinação particular em São Luís com conforto e segurança. Vacinas de rotina e especiais para bebês, crianças, adultos e idosos. Planejamento vacinal individualizado. Agende pelo WhatsApp.",
    heroImage: IMG.vacinacao,
    painPoints: ["Medo de reações adversas sem orientação", "Dificuldade em organizar a carteira vacinal", "Crianças com medo ou trauma de agulhas", "Falta de tempo para ir a postos lotados", "Dúvidas sobre quais vacinas são realmente necessárias"],
    benefits: ["Vacinas de rotina e especiais de alta qualidade", "Planejamento vacinal individualizado por faixa etária", "Organização completa da carteira vacinal", "Técnicas exclusivas para redução do desconforto", "Atendimento domiciliar disponível em São Luís", "Orientação médica completa para pais e famílias"],
    forWhom: ["Bebês e recém-nascidos", "Crianças em fase escolar", "Adolescentes", "Gestantes", "Adultos", "Idosos", "Viajantes internacionais"],
    howItWorks: ["Agendamento rápido pelo WhatsApp em menos de 2 minutos", "Avaliação completa da sua carteira vacinal pela equipe", "Planejamento vacinal personalizado conforme sua idade e necessidades", "Aplicação com técnicas de conforto em ambiente acolhedor", "Acompanhamento pós-vacina e lembretes de doses futuras"],
    differentials: ["Ambiente especialmente preparado para crianças", "Profissionais especializados em vacinação pediátrica", "Técnicas de distração e conforto para os pequenos", "Horários flexíveis inclusive aos sábados", "Atendimento domiciliar em São Luís e região"],
    faq: [
      { q: "Quais vacinas estão disponíveis na Vittalis?", a: "Oferecemos todas as vacinas do calendário nacional e vacinas especiais, incluindo pneumocócica 13-valente, meningocócica ACWY e B, HPV, gripe tetravalente, herpes-zóster, febre amarela, hepatite A e B, e vacinas para viajantes internacionais." },
      { q: "Vocês fazem vacinação em domicílio?", a: "Sim! Levamos nossa equipe até o conforto da sua casa em São Luís, com o mesmo padrão de qualidade e segurança da clínica. Ideal para recém-nascidos, idosos e famílias com rotina intensa." },
      { q: "Como funciona o planejamento vacinal?", a: "Avaliamos a carteira vacinal completa do paciente, identificamos vacinas em atraso ou faltantes, e criamos um plano personalizado respeitando intervalos, prioridades e o conforto da família." },
      { q: "Meu bebê pode tomar mais de uma vacina no mesmo dia?", a: "Sim, desde que respeitados os protocolos técnicos vigentes. Nossa equipe orienta sobre a melhor combinação para cada caso, priorizando sempre o conforto e a segurança do bebê." },
      { q: "A vacinação particular é mais segura?", a: "As vacinas são igualmente seguras. O diferencial da vacinação particular está no atendimento personalizado, orientação médica detalhada, ambiente confortável, horários flexíveis e acompanhamento individualizado." },
    ],
    ctaText: "Agendar vacinação",
    waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "pediatria",
    name: "Pediatria",
    shortName: "Pediatria",
    icon: "👶",
    category: "medica",
    accentColor: "#5BC0C5",
    headline: "Pediatria com acolhimento, ciência e muito carinho",
    subheadline: "Acompanhamento completo do crescimento e desenvolvimento do seu filho, do recém-nascido ao adolescente, com a dedicação que sua família merece.",
    description: "A pediatria na Vittalis Saúde vai além da consulta médica. Oferecemos acompanhamento integral do desenvolvimento físico, emocional e cognitivo, com foco em prevenção e orientação familiar. Nosso ambiente foi pensado para acolher os pequenos com segurança e carinho.",
    metaTitle: "Pediatria em São Luís | Vittalis Saúde — Clínica Premium para Crianças",
    metaDescription: "Pediatria em São Luís com atendimento humanizado e acolhedor. Acompanhamento do crescimento, desenvolvimento infantil e consultas preventivas. Agende na Vittalis Saúde.",
    heroImage: IMG.pediatria,
    painPoints: ["Preocupação com marcos de desenvolvimento", "Dificuldade em encontrar pediatra que escute", "Consultas apressadas sem orientação clara", "Ansiedade sobre alimentação e sono do bebê", "Falta de acompanhamento contínuo"],
    benefits: ["Consultas de puericultura completas e sem pressa", "Acompanhamento dos marcos de desenvolvimento", "Avaliação do crescimento com curvas atualizadas", "Orientação sobre alimentação, sono e rotina", "Comunicação clara e acessível com os pais", "Integração com terapias quando necessário"],
    forWhom: ["Recém-nascidos e bebês", "Crianças de 1 a 5 anos", "Crianças em idade escolar", "Pré-adolescentes e adolescentes", "Pais buscando acompanhamento preventivo"],
    howItWorks: ["Agendamento rápido e fácil pelo WhatsApp", "Consulta completa com avaliação de crescimento e desenvolvimento", "Análise de marcos do desenvolvimento neuropsicomotor", "Orientação personalizada e plano de acompanhamento", "Retornos programados e integração com especialidades"],
    differentials: ["Ambiente lúdico e colorido para crianças", "Consultas sem pressa — tempo real para cada família", "Pediatra atualizada em neurodesenvolvimento", "Integração direta com fonoaudiologia, psicologia e terapia ocupacional", "Vacinação disponível no mesmo local"],
    faq: [
      { q: "A partir de que idade posso levar meu filho?", a: "Atendemos desde os primeiros dias de vida, com consultas de puericultura para recém-nascidos. Quanto mais cedo o acompanhamento, melhor para o desenvolvimento." },
      { q: "A consulta inclui avaliação de desenvolvimento?", a: "Sim! Avaliamos marcos motores, cognitivos, de linguagem e sociais em cada consulta. Quando identificamos algo que precisa de atenção, encaminhamos para avaliação especializada dentro da própria clínica." },
      { q: "Quanto tempo dura a consulta?", a: "Nossas consultas duram em média 40 a 50 minutos. Acreditamos que tempo é essencial para uma avaliação completa e para acolher as dúvidas dos pais." },
    ],
    ctaText: "Agendar consulta",
    waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },  // 10/11, pedido da direção ("uma página para todas as áreas"): a página
  // que junta neuropediatria, neuropsicologia, fono, ABA, psicologia,
  // terapia ocupacional e psicopedagogia (a pediatria fica na página dela). É a página dos anúncios de busca
  // ampla (autismo, TDAH, atraso no desenvolvimento); quem busca uma área
  // específica continua indo para a página dela. category "terapia" = WhatsApp
  // do setor de terapias (92005-3606).
  {
    slug: "desenvolvimento-infantil",
    name: "Desenvolvimento Infantil",
    shortName: "Desenvolvimento Infantil",
    icon: "🧩",
    category: "terapia",
    accentColor: "#00B8C0",
    headline: "Autismo, TDAH e atraso no desenvolvimento: toda a equipe num só lugar",
    subheadline: "Uma equipe que trabalha junta pela sua criança, em São Luís. Toque na especialidade para saber mais:",
    description: "Quando a família percebe que algo no desenvolvimento da criança merece atenção, a primeira dúvida é por onde começar. Na Vittalis Saúde a família encontra a consulta médica, a avaliação e as terapias no mesmo endereço, com profissionais que conversam entre si e um plano de cuidado combinado com os pais e, quando necessário, com a escola.",
    metaTitle: "Autismo, TDAH e Desenvolvimento Infantil em São Luís | Vittalis Saúde",
    metaDescription: "Neuropediatra, neuropsicologia, fono, ABA, terapia ocupacional, musicoterapia, nutrição e psicologia infantil no mesmo lugar em São Luís. Avaliação e acompanhamento de autismo, TDAH e atraso no desenvolvimento.",
    heroImage: IMG.equipe,
    painPoints: ["Suspeita de autismo ou TDAH e nenhuma resposta clara", "Atraso na fala, no andar ou na interação", "Agitação, birras e comportamento difícil em casa e na escola", "Correr de um consultório para outro sem ninguém conversar", "Listas de espera longas para começar as terapias", "Escola pedindo laudo ou avaliação"],
    benefits: ["Consulta médica, avaliação e terapias no mesmo endereço", "Profissionais que conversam entre si sobre a sua criança", "Plano de cuidado combinado com a família", "Orientação para os pais continuarem em casa", "Contato com a escola quando necessário", "Ambiente lúdico e acolhedor para crianças"],
    forWhom: ["Crianças com suspeita ou diagnóstico de autismo (TEA)", "Crianças com suspeita ou diagnóstico de TDAH", "Bebês e crianças com atraso no desenvolvimento", "Crianças com atraso na fala", "Crianças com dificuldade de aprendizagem", "Famílias que buscam uma segunda opinião"],
    howItWorks: ["Conversa pelo WhatsApp para entender o que a família está vivendo", "Indicação do primeiro passo: consulta médica, avaliação ou terapia", "Avaliação da criança com o profissional indicado", "Plano de cuidado com as terapias necessárias, no mesmo lugar", "Retornos e conversa contínua entre a equipe e os pais"],
    differentials: ["Neuropediatra e terapias no mesmo endereço", "Equipe que trabalha junto, não em consultórios isolados", "Salas pensadas para crianças", "Comunicação próxima com os pais"],
    faq: [
      { q: "Por onde começo se desconfio de autismo ou TDAH?", a: "Fale com a nossa equipe pelo WhatsApp. Pela idade e pelo que vocês estão observando, indicamos o primeiro passo: em geral a consulta com a neuropediatra ou a avaliação neuropsicológica." },
      { q: "Preciso de laudo para começar as terapias?", a: "Não necessariamente. Muitas famílias começam a estimulação enquanto a avaliação acontece, porque quanto mais cedo a criança recebe apoio, melhor. A equipe orienta em cada caso." },
      { q: "Os profissionais conversam entre si?", a: "Sim. Neuropediatra, neuropsicologia e terapias ficam na mesma clínica e compartilham o plano de cuidado da criança, com a autorização da família." },
      { q: "Vocês atendem por plano de saúde?", a: "O atendimento é particular. Pelo WhatsApp a equipe explica como funciona cada atendimento." },
    ],
    ctaText: "Falar com a equipe",
    waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  // 10/11, pedido da direção: página nova para os anúncios do Google de
  // neuropediatria. Leva ao WhatsApp do setor de terapias (usaWhatsappTerapias).
  // Sem promessa de resultado e sem preço (regras do CFM).
  {
    slug: "neuropediatria",
    name: "Neuropediatria",
    shortName: "Neuropediatria",
    icon: "🧠",
    category: "medica",
    accentColor: "#4A8FC0",
    headline: "Neuropediatria com escuta, cuidado e olhar atento ao desenvolvimento",
    subheadline: "Avaliação neurológica da criança e do adolescente, com tempo para ouvir a família e integração com as terapias da clínica.",
    description: "A neuropediatria cuida do sistema nervoso da criança: desenvolvimento, comportamento, aprendizagem, sono, crises e dores de cabeça. Na Vittalis Saúde, a consulta é feita com calma, ouvindo a história da família, e quando é preciso o acompanhamento segue junto com fonoaudiologia, psicologia, ABA e terapia ocupacional no mesmo lugar.",
    metaTitle: "Neuropediatra em São Luís | Vittalis Saúde",
    metaDescription: "Neuropediatra em São Luís. Avaliação do desenvolvimento, comportamento, aprendizagem e sono da criança, com integração às terapias. Agende na Vittalis Saúde.",
    heroImage: IMG.neuropediatria,
    painPoints: ["Dúvidas sobre atraso na fala ou no andar", "Suspeita de autismo ou TDAH sem orientação", "Dificuldade de aprendizagem na escola", "Sono agitado, crises ou dores de cabeça frequentes", "Família sem saber por onde começar"],
    benefits: ["Consulta com tempo para ouvir a família", "Avaliação do desenvolvimento neuropsicomotor", "Orientação clara sobre os próximos passos", "Pedido e leitura de exames quando necessário", "Integração com fono, psicologia, ABA e terapia ocupacional", "Acompanhamento ao longo do crescimento"],
    forWhom: ["Bebês com atraso nos marcos do desenvolvimento", "Crianças com suspeita de autismo (TEA) ou TDAH", "Crianças com dificuldade de aprendizagem ou de comportamento", "Crianças com crises, desmaios ou dores de cabeça", "Famílias que buscam uma segunda opinião"],
    howItWorks: ["Agendamento pelo WhatsApp", "Consulta com a história completa da criança e da família", "Exame neurológico e avaliação do desenvolvimento", "Orientação e plano de cuidado combinado com a família", "Retornos e encaminhamento às terapias da clínica quando indicado"],
    differentials: ["Ambiente acolhedor pensado para crianças", "Consulta sem pressa", "Terapias integradas no mesmo local", "Comunicação próxima com os pais"],
    faq: [
      { q: "Quando procurar um neuropediatra?", a: "Quando há dúvida sobre o desenvolvimento (fala, andar, interação), suspeita de autismo ou TDAH, dificuldade de aprendizagem, crises, desmaios ou dores de cabeça frequentes. Na dúvida, a consulta ajuda a entender o que está acontecendo." },
      { q: "Preciso de encaminhamento do pediatra?", a: "Não é obrigatório. Se a criança já tem exames ou relatórios da escola e de outros profissionais, leve na consulta." },
      { q: "A clínica tem as terapias depois da consulta?", a: "Sim. Fonoaudiologia, psicologia infantil, ABA, neuropsicologia e terapia ocupacional ficam na própria Vittalis, o que facilita o acompanhamento." },
    ],
    ctaText: "Agendar consulta",
    waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },

  {
    slug: "ginecologia",name: "Ginecologia e Obstetrícia",shortName: "Ginecologia",icon: "🌸",category: "medica",accentColor: "#D4A0B9",
    headline: "Saúde da mulher com cuidado, escuta e respeito",
    subheadline: "Acompanhamento integral da saúde feminina em todas as fases, com abordagem humanizada e sem julgamentos.",
    description: "Na Vittalis Saúde, a ginecologia é praticada com escuta ativa, respeito e acolhimento. Oferecemos consultas preventivas, pré-natal, planejamento familiar e acompanhamento em todas as fases da vida da mulher.",
    metaTitle: "Ginecologia em São Luís | Vittalis Saúde — Saúde da Mulher com Acolhimento",
    metaDescription: "Ginecologia e obstetrícia em São Luís com atendimento humanizado. Consultas preventivas, pré-natal e saúde da mulher. Agende na Vittalis Saúde.",
    heroImage: IMG.ginecologia,
    painPoints: ["Consultas frias e impessoais","Falta de escuta sobre suas queixas","Medo ou desconforto durante exames","Dificuldade em encontrar médica que entenda","Falta de acompanhamento contínuo"],
    benefits: ["Consulta ginecológica preventiva completa","Acompanhamento pré-natal humanizado","Planejamento familiar personalizado","Saúde da mulher em todas as fases","Abordagem empática e livre de julgamentos","Solicitação e interpretação de exames"],
    forWhom: ["Adolescentes em primeira consulta","Mulheres adultas","Gestantes","Mulheres na perimenopausa","Mulheres na menopausa"],
    howItWorks: ["Agendamento pelo WhatsApp","Consulta acolhedora e completa","Solicitação de exames quando necessário","Retorno para resultados e acompanhamento"],
    differentials: ["Ambiente preparado para conforto feminino","Escuta ativa e abordagem sem pressa","Integração com outras especialidades da clínica","Orientação clara em cada etapa"],
    faq: [
      {q:"A clínica faz pré-natal?",a:"Sim. Oferecemos pré-natal completo com consultas mensais, solicitação de exames, orientação nutricional e preparação para o parto."},
      {q:"Posso fazer exame preventivo na clínica?",a:"Orientamos sobre os exames necessários e realizamos encaminhamentos quando preciso."},
      {q:"Atende adolescentes?",a:"Sim. Primeira consulta ginecológica é muito importante e é feita com todo cuidado e respeito."},
    ],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "clinica-geral",name: "Clínica Geral",shortName: "Clínica Geral",icon: "🩺",category: "medica",accentColor: "#4A9BA8",
    headline: "Atendimento clínico completo para adultos e idosos",
    subheadline: "Check-up, prevenção e acompanhamento de saúde com atenção integral e orientação clara.",
    description: "Consultas clínicas completas com foco em prevenção, diagnóstico precoce e acompanhamento de condições crônicas. Atendimento sem pressa, com escuta ativa e orientação personalizada.",
    metaTitle: "Clínica Geral em São Luís | Vittalis Saúde — Consultas Particulares",
    metaDescription: "Consultas de clínica geral em São Luís com atendimento humanizado. Check-up, prevenção e acompanhamento. Agende na Vittalis Saúde.",
    heroImage: IMG.clinicaGeral,
    painPoints: ["Consultas apressadas sem exame completo","Dificuldade em organizar exames de rotina","Falta de orientação sobre prevenção","Encaminhamentos sem acompanhamento"],
    benefits: ["Check-up preventivo completo","Acompanhamento de doenças crônicas","Solicitação e interpretação de exames","Orientação nutricional e de hábitos","Encaminhamentos coordenados","Atendimento integral e humanizado"],
    forWhom: ["Adultos saudáveis buscando prevenção","Pacientes com hipertensão ou diabetes","Idosos","Pessoas com queixas gerais de saúde"],
    howItWorks: ["Agendamento pelo WhatsApp","Consulta clínica completa e detalhada","Solicitação de exames complementares","Retorno para acompanhamento e ajustes"],
    differentials: ["Consulta com tempo adequado","Abordagem preventiva e integral","Integração com nutrição e terapias","Comunicação clara e acessível"],
    faq: [{q:"Preciso de encaminhamento?",a:"Não. Agende diretamente pelo WhatsApp."},{q:"Fazem check-up completo?",a:"Sim. Avaliamos sua saúde de forma integral e orientamos sobre os exames necessários."}],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "dermatologia",name: "Dermatologia",shortName: "Dermatologia",icon: "✨",category: "medica",accentColor: "#C4973B",
    headline: "Cuidados especializados com a pele, cabelos e unhas",
    subheadline: "Dermatologia clínica com diagnóstico preciso e tratamento personalizado em São Luís.",
    description: "Atendimento dermatológico completo para todas as idades, com foco em saúde da pele, diagnóstico preciso e prevenção.",
    metaTitle: "Dermatologia em São Luís | Vittalis Saúde",metaDescription: "Dermatologia em São Luís com atendimento especializado. Agende na Vittalis Saúde.",
    heroImage: IMG.dermatologia,
    painPoints: ["Problemas de pele sem diagnóstico claro","Tratamentos genéricos que não funcionam","Falta de orientação sobre cuidados diários"],
    benefits: ["Avaliação completa da pele","Diagnóstico preciso","Tratamento personalizado","Prevenção de doenças de pele","Orientação sobre rotina de cuidados"],
    forWhom: ["Crianças com dermatites","Adolescentes com acne","Adultos com problemas de pele","Idosos"],
    howItWorks: ["Agendamento pelo WhatsApp","Avaliação dermatológica","Diagnóstico e plano de tratamento","Acompanhamento e retornos"],
    differentials: ["Atendimento humanizado para todas as idades","Abordagem personalizada","Integração com pediatria quando necessário"],
    faq: [{q:"Atende crianças?",a:"Sim. Nossa dermatologia atende todas as faixas etárias, incluindo bebês e crianças."}],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "pneumologia",name: "Pneumologia",shortName: "Pneumologia",icon: "🫁",category: "medica",accentColor: "#88BED0",
    headline: "Saúde respiratória com atenção e cuidado",
    subheadline: "Diagnóstico e tratamento especializado de doenças respiratórias para crianças e adultos.",
    description: "Consultas de pneumologia com avaliação completa, diagnóstico preciso e acompanhamento contínuo de asma, bronquite e outras condições respiratórias.",
    metaTitle: "Pneumologia em São Luís | Vittalis Saúde",metaDescription: "Pneumologia em São Luís com atendimento especializado. Agende na Vittalis Saúde.",
    heroImage: IMG.pneumologia,painPoints: ["Crises respiratórias frequentes","Asma sem controle adequado","Tosse persistente sem diagnóstico"],
    benefits: ["Avaliação respiratória completa","Diagnóstico e controle de asma","Acompanhamento de doenças crônicas","Orientação sobre prevenção e cuidados"],
    forWhom: ["Crianças com asma ou bronquite","Adultos com doenças respiratórias","Idosos","Pacientes alérgicos"],
    howItWorks: ["Agendamento pelo WhatsApp","Consulta especializada","Exames e diagnóstico","Tratamento e acompanhamento contínuo"],
    differentials: ["Especialista em saúde respiratória","Abordagem integral","Integração com pediatria"],
    faq: [{q:"Atende asma infantil?",a:"Sim. Oferecemos acompanhamento completo de asma e doenças respiratórias em crianças e adultos."}],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "psicologia-infantil",name: "Psicologia Infantil",shortName: "Psicologia Infantil",icon: "🧸",category: "terapia",accentColor: "#FFB74D",
    headline: "Cuidado emocional e comportamental para crianças",
    subheadline: "Acompanhamento psicológico infantil com abordagem lúdica, acolhedora e individualizada — porque cada criança é única.",
    description: "A psicologia infantil na Vittalis Saúde oferece suporte emocional e comportamental para crianças em todas as fases, com sessões individualizadas em ambiente seguro e lúdico, e comunicação contínua com a família e a escola.",
    metaTitle: "Psicologia Infantil em São Luís | Vittalis Saúde — Atendimento Humanizado",
    metaDescription: "Psicologia infantil em São Luís com abordagem lúdica e acolhedora. Suporte emocional para crianças. Agende na Vittalis Saúde.",
    heroImage: IMG.psicoInfantil,
    painPoints: ["Criança com dificuldade de socialização","Mudanças de comportamento repentinas","Ansiedade, medos ou insegurança","Dificuldade de adaptação na escola","Separação dos pais ou mudanças familiares"],
    benefits: ["Avaliação psicológica completa e cuidadosa","Abordagem lúdica adaptada por idade","Suporte emocional individualizado","Orientação contínua para pais e responsáveis","Integração com escola e outras terapias","Desenvolvimento de habilidades socioemocionais"],
    forWhom: ["Crianças com dificuldades emocionais","Crianças com comportamentos desafiadores","Crianças em fase de adaptação escolar","Crianças com ansiedade, medos ou tristeza","Crianças vivendo mudanças familiares"],
    howItWorks: ["Acolhimento e entrevista inicial com os pais","Sessões de avaliação com a criança","Devolutiva com plano terapêutico","Sessões regulares semanais ou quinzenais","Orientação contínua à família e à escola"],
    differentials: ["Sala lúdica preparada especialmente para crianças","Profissionais especializados em infância e adolescência","Integração com ABA, fono e terapia ocupacional","Comunicação ativa e transparente com os pais"],
    faq: [
      {q:"A partir de que idade vocês atendem?",a:"Atendemos crianças a partir de 2 anos, com abordagens adaptadas para cada faixa etária e necessidade."},
      {q:"Os pais participam das sessões?",a:"Depende da abordagem e da idade da criança. Em geral, os pais participam de sessões de orientação e recebem devolutivas regulares sobre o progresso."},
      {q:"Como é feito o acompanhamento?",a:"Cada criança é única. O plano e a frequência das sessões são definidos na avaliação e revistos com a família ao longo do acompanhamento."},
    ],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "psicologia-aba",name: "Psicologia ABA",shortName: "Psicologia ABA",icon: "🧩",category: "terapia",accentColor: "#5BACC0",
    headline: "Terapia ABA para desenvolvimento, comunicação e autonomia",
    subheadline: "Análise do Comportamento Aplicada com abordagem individualizada e baseada em evidências para crianças com TEA e atrasos no desenvolvimento.",
    description: "A terapia ABA na Vittalis Saúde é conduzida por profissionais com formação em ABA, com planos individualizados baseados em evidências científicas. Trabalhamos para promover habilidades de comunicação, socialização e autonomia, com acompanhamento intensivo e orientação familiar.",
    metaTitle: "Psicologia ABA em São Luís | Vittalis Saúde — Terapia para TEA e Desenvolvimento",
    metaDescription: "Terapia ABA em São Luís para crianças com TEA e atrasos no desenvolvimento. Abordagem individualizada com evidências. Agende na Vittalis Saúde.",
    heroImage: IMG.psicoAba,
    painPoints: ["Diagnóstico de TEA sem orientação clara","Dificuldade em encontrar profissionais qualificados em ABA","Listas de espera longas","Falta de integração com outras terapias","Família sem orientação sobre como ajudar em casa"],
    benefits: ["Plano terapêutico individualizado","Baseado em evidências científicas","Desenvolvimento de habilidades de comunicação","Promoção da socialização e da autonomia","Redução de comportamentos desadaptativos","Orientação intensiva e prática para famílias"],
    forWhom: ["Crianças com Transtorno do Espectro Autista (TEA)","Crianças com atrasos globais de desenvolvimento","Crianças com dificuldades severas de comunicação","Crianças com comportamentos desadaptativos recorrentes"],
    howItWorks: ["Avaliação comportamental detalhada e individualizada","Definição de metas claras e mensuráveis","Sessões terapêuticas regulares (frequência personalizada)","Coleta contínua de dados para medir progresso","Supervisão clínica e ajustes frequentes no plano","Orientação familiar prática para generalização"],
    differentials: ["Profissionais com formação e supervisão em ABA","Supervisão clínica contínua com análise de dados","Integração com fono, T.O. e neuropsicologia","Comunicação ativa e transparente com a família","Ambiente preparado e acolhedor para cada criança"],
    faq: [
      {q:"O que é terapia ABA?",a:"ABA (Análise do Comportamento Aplicada) é uma abordagem científica reconhecida mundialmente como a intervenção com maior evidência para TEA. Utiliza princípios de aprendizagem para desenvolver habilidades e reduzir comportamentos que prejudicam o desenvolvimento."},
      {q:"Preciso de laudo para iniciar?",a:"Não necessariamente. Nossa equipe pode realizar a avaliação inicial e orientar sobre diagnóstico e próximos passos, incluindo encaminhamento para neuropediatra quando necessário."},
      {q:"Com que frequência são as sessões?",a:"A frequência ideal varia conforme a necessidade de cada criança. Pode ser de 2 a 5 vezes por semana, definida em conjunto com a família."},
      {q:"Os pais participam?",a:"Sim! A orientação familiar é parte fundamental da ABA. Os pais recebem orientação para aplicar estratégias em casa e dar continuidade ao trabalho no dia a dia."},
    ],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "psicologia-adulto",name: "Psicologia para Adultos",shortName: "Psicologia",icon: "🧠",category: "terapia",accentColor: "#8A70A8",
    headline: "Psicoterapia com escuta, acolhimento e profundidade",
    subheadline: "Acompanhamento terapêutico individualizado para quem busca autoconhecimento, equilíbrio emocional e qualidade de vida.",
    description: "Sessões de psicoterapia para adultos com foco em saúde emocional, manejo de ansiedade, autoconhecimento e superação de desafios pessoais e profissionais.",
    metaTitle: "Psicologia para Adultos em São Luís | Vittalis Saúde",
    metaDescription: "Psicoterapia para adultos em São Luís com acolhimento e escuta ativa. Agende na Vittalis Saúde.",
    heroImage: IMG.psicoAdulto,painPoints: ["Ansiedade que não passa","Dificuldade em lidar com mudanças","Relacionamentos conflituosos","Esgotamento emocional","Autoestima baixa"],
    benefits: ["Psicoterapia individualizada e sigilosa","Manejo da ansiedade e do estresse","Autoconhecimento profundo","Melhora nos relacionamentos","Desenvolvimento de recursos emocionais","Qualidade de vida e bem-estar"],
    forWhom: ["Adultos com ansiedade ou depressão","Pessoas em fase de transição de vida","Profissionais com esgotamento","Pessoas buscando autoconhecimento"],
    howItWorks: ["Agendamento pelo WhatsApp","Sessão de acolhimento e compreensão da demanda","Plano terapêutico personalizado","Sessões regulares semanais ou quinzenais"],
    differentials: ["Escuta ativa e empática sem julgamentos","Abordagens baseadas em evidências","Ambiente seguro e confortável","Flexibilidade de horários"],
    faq: [{q:"Qual abordagem é utilizada?",a:"Trabalhamos com diferentes abordagens terapêuticas baseadas em evidências, sempre adaptadas às necessidades e ao perfil de cada paciente."},{q:"A sessão é presencial?",a:"Sim, nossas sessões são presenciais no consultório da Vittalis Saúde, em ambiente confortável e sigiloso."}],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "neuropsicologia",name: "Neuropsicologia",shortName: "Neuropsicologia",icon: "🔬",category: "terapia",accentColor: "#3A9898",
    headline: "Avaliação neuropsicológica completa e precisa",
    subheadline: "Avaliação das funções cognitivas com instrumentos validados, relatório detalhado e plano de intervenção personalizado.",
    description: "Avaliação neuropsicológica para crianças, adolescentes e adultos, com investigação de atenção, memória, funções executivas, linguagem e aprendizagem. Relatório completo para escola, médicos e plano terapêutico.",
    metaTitle: "Neuropsicologia em São Luís | Vittalis Saúde — Avaliação Cognitiva",
    metaDescription: "Neuropsicologia em São Luís. Avaliação cognitiva completa com relatório. Agende na Vittalis Saúde.",
    heroImage: IMG.neuro,painPoints: ["Suspeita de TDAH sem avaliação adequada","Dificuldades escolares sem explicação","Necessidade de laudo para escola ou médico","Declínio cognitivo em idosos"],
    benefits: ["Avaliação neuropsicológica com instrumentos validados","Investigação de atenção, memória e funções executivas","Relatório detalhado e completo","Orientação para escola, família e médicos","Plano de reabilitação cognitiva"],
    forWhom: ["Crianças com dificuldades de aprendizagem","Pessoas com suspeita de TDAH","Pacientes pós lesão cerebral","Idosos com declínio cognitivo"],
    howItWorks: ["Entrevista inicial detalhada","Aplicação de testes neuropsicológicos","Análise e interpretação dos resultados","Devolutiva com relatório completo","Plano de intervenção e reabilitação"],
    differentials: ["Instrumentos atualizados e validados","Integração com psicologia e pedagogia","Relatório aceito por escolas e médicos","Profissional especializado em neuropsicologia"],
    faq: [{q:"Quanto tempo leva a avaliação?",a:"Em geral, entre 4 a 6 sessões de 50 minutos, dependendo da complexidade e da idade do paciente."},{q:"O resultado serve como laudo?",a:"Sim. O relatório neuropsicológico pode ser utilizado por escolas, médicos e para processos legais quando necessário."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "psicopedagogia",name: "Psicopedagogia",shortName: "Psicopedagogia",icon: "📚",category: "terapia",accentColor: "#68A850",
    headline: "Apoio ao aprendizado e desenvolvimento educacional",
    subheadline: "Avaliação e intervenção em dificuldades de aprendizagem com abordagem individualizada e integração com a escola.",
    description: "Suporte psicopedagógico para crianças e adolescentes com dificuldades de aprendizagem, dislexia, TDAH e outros desafios educacionais.",
    metaTitle: "Psicopedagogia em São Luís | Vittalis Saúde",metaDescription: "Psicopedagogia em São Luís. Apoio ao aprendizado. Agende na Vittalis Saúde.",
    heroImage: IMG.psicoped,painPoints: ["Notas baixas sem melhora com reforço","Dificuldade de leitura e escrita","Falta de concentração nos estudos","Baixa autoestima acadêmica"],
    benefits: ["Avaliação psicopedagógica completa","Intervenção individualizada","Estimulação cognitiva e de aprendizagem","Comunicação com a escola","Desenvolvimento de autonomia nos estudos"],
    forWhom: ["Crianças com dificuldades de leitura e escrita","Crianças com dislexia","Crianças com TDAH","Adolescentes com dificuldades escolares"],
    howItWorks: ["Avaliação inicial com família e criança","Aplicação de instrumentos diagnósticos","Plano de intervenção personalizado","Sessões regulares de estimulação","Comunicação contínua com a escola"],
    differentials: ["Integração com neuropsicologia e fonoaudiologia","Abordagem lúdica e motivadora","Comunicação ativa com escola e família"],
    faq: [{q:"Qual a diferença de psicopedagogia e reforço escolar?",a:"A psicopedagogia investiga e trata as causas das dificuldades de aprendizagem, não apenas o conteúdo escolar. Trabalhamos os processos cognitivos que sustentam o aprender."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "fonoaudiologia",name: "Fonoaudiologia",shortName: "Fonoaudiologia",icon: "🗣️",category: "terapia",accentColor: "#D09040",
    headline: "Cuidado com fala, linguagem, audição e alimentação",
    subheadline: "Avaliação e terapia fonoaudiológica para crianças e adultos, com abordagem individualizada e integrada.",
    description: "Fonoaudiologia na Vittalis Saúde para avaliação e tratamento de distúrbios de fala, linguagem, audição, motricidade orofacial e dificuldades alimentares.",
    metaTitle: "Fonoaudiologia em São Luís | Vittalis Saúde",metaDescription: "Fonoaudiologia em São Luís com atendimento especializado. Agende na Vittalis Saúde.",
    heroImage: IMG.fono,painPoints: ["Criança que demora a falar","Troca de letras ao falar ou escrever","Dificuldade de alimentação","Gagueira","Voz rouca ou cansada"],
    benefits: ["Avaliação completa de fala e linguagem","Terapia de comunicação personalizada","Estimulação de linguagem em bebês","Tratamento de motricidade orofacial","Orientação familiar prática"],
    forWhom: ["Bebês com atraso de fala","Crianças com troca de sons","Crianças com TEA","Pessoas com gagueira","Profissionais com problemas de voz"],
    howItWorks: ["Avaliação fonoaudiológica completa","Devolutiva e plano terapêutico","Sessões regulares individualizadas","Orientação à família para prática em casa","Reavaliação periódica do progresso"],
    differentials: ["Integração com ABA, T.O. e neuropsicologia","Abordagem lúdica para crianças","Profissionais especializados em linguagem infantil"],
    faq: [{q:"A partir de que idade a criança pode fazer fono?",a:"Desde os primeiros meses de vida, especialmente quando há dificuldades de amamentação ou quando os marcos de comunicação não são atingidos na idade esperada."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    // 10/11, pedido da direção: página da musicoterapia infantil, no mesmo modelo
    // das terapias (WhatsApp do setor de terapias). Sem promessa de resultado.
    // Foto provisória: falta uma foto real de sessão com instrumentos.
    slug: "musicoterapia",name: "Musicoterapia",shortName: "Musicoterapia",icon: "🎵",category: "terapia",accentColor: "#8A70A8",
    headline: "Musicoterapia infantil: a música como caminho para se comunicar e se regular",
    subheadline: "Sessões com instrumentos, canções e ritmo para crianças com autismo, TDAH, atraso no desenvolvimento ou dificuldade de lidar com as emoções.",
    description: "Na musicoterapia a música vira linguagem. Com instrumentos, canções, ritmo e improviso, a musicoterapeuta cria um espaço em que a criança se expressa, interage, espera a vez, imita e se acalma, muitas vezes de um jeito que as palavras ainda não alcançam. Na Vittalis Saúde a musicoterapia faz parte do plano de cuidado da criança, junto com ABA, fono, terapia ocupacional e psicologia.",
    metaTitle: "Musicoterapia Infantil em São Luís | Vittalis Saúde",metaDescription: "Musicoterapia infantil em São Luís para crianças com autismo, TDAH e atraso no desenvolvimento, integrada às terapias da clínica. Agende na Vittalis Saúde.",
    heroImage: IMG.musicoterapia,painPoints: ["Criança que se comunica pouco ou não fala","Dificuldade de interagir e brincar com outras crianças","Agitação, crises e dificuldade de se acalmar","Pouca atenção compartilhada","Criança que responde muito bem à música e a família quer aproveitar isso"],
    benefits: ["Sessões individuais com instrumentos e canções","Estímulo à comunicação, à interação e à atenção","Trabalho de regulação emocional e sensorial","Objetivos combinados com a família","Integração com ABA, fono e terapia ocupacional","Orientação para usar a música em casa"],
    forWhom: ["Crianças com autismo (TEA)","Crianças com TDAH","Crianças com atraso na fala ou no desenvolvimento","Crianças com dificuldade de regular emoções","Crianças com questões sensoriais"],
    howItWorks: ["Conversa pelo WhatsApp para entender a criança","Avaliação musicoterapêutica, com a família","Plano com objetivos de comunicação, interação e regulação","Sessões semanais com instrumentos, canções e improviso","Retornos com a família e troca com a equipe da clínica"],
    differentials: ["Sala preparada com instrumentos para crianças","Integração com as outras terapias no mesmo lugar","Abordagem lúdica, no ritmo da criança","Comunicação próxima com os pais"],
    faq: [
      {q:"A criança precisa saber música?",a:"Não. A musicoterapia usa a música como forma de comunicação, não como aula. Não é preciso nenhum conhecimento musical."},
      {q:"Musicoterapia ajuda crianças com autismo?",a:"A música costuma ser uma porta de entrada para a comunicação e a interação de muitas crianças com TEA. A musicoterapeuta avalia a criança e define objetivos junto com a família e a equipe."},
      {q:"Musicoterapia substitui a fono ou a ABA?",a:"Não. Ela complementa as outras terapias. Na Vittalis os profissionais trabalham juntos no plano de cuidado da criança."},
      {q:"Vocês atendem por plano de saúde?",a:"O atendimento é particular. Pelo WhatsApp a equipe explica como funciona."},
    ],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    // 10/11, pedido da direção: a nutrição infantil vira a página da
    // SELETIVIDADE ALIMENTAR (a queixa que mais traz as famílias, muito comum
    // no autismo), com fotos e a seção de queixas. Sem promessa (CFN).
    slug: "nutricao-infantil",name: "Nutrição Infantil",shortName: "Nutrição Infantil",icon: "🥦",category: "terapia",accentColor: "#50A868",
    headline: "Seu filho come só meia dúzia de alimentos? A gente cuida da seletividade alimentar",
    subheadline: "Nutricionista infantil que trabalha a seletividade com calma, sem forçar e junto com a família, inclusive em crianças com autismo e TDAH.",
    description: "A seletividade alimentar vai além da criança enjoada para comer: é quando o cardápio fica tão pequeno que preocupa a família, deixa a hora da refeição pesada e pode faltar nutriente para o crescimento. Na Vittalis Saúde a nutricionista avalia a alimentação, o crescimento e a rotina, e monta com a família um plano de pequenos passos para a criança ir conhecendo novos alimentos sem pressão. Quando é preciso, o cuidado segue junto com a fono, a terapia ocupacional e a pediatria da clínica.",
    metaTitle: "Seletividade Alimentar e Nutrição Infantil em São Luís | Vittalis Saúde",metaDescription: "Nutricionista infantil em São Luís para seletividade alimentar, inclusive no autismo e TDAH. Abordagem sem forçar, com plano para a família. Agende na Vittalis Saúde.",
    heroImage: IMG.nutriInfantil,painPoints: ["Criança que aceita poucos alimentos e sempre os mesmos","Hora da refeição virou briga ou choro","Recusa tudo que é verde, misturado ou de textura diferente","Engasga, vomita ou passa mal ao provar algo novo","Medo de faltar nutriente para o crescimento","Seletividade junto com autismo ou TDAH"],
    benefits: ["Avaliação da alimentação, do crescimento e da rotina","Plano de pequenos passos para ampliar o cardápio","Estratégias sem forçar, sem chantagem e sem castigo","Ideias práticas de refeições para a família","Acompanhamento do crescimento e dos nutrientes","Integração com fono, terapia ocupacional e pediatria"],
    forWhom: ["Crianças com seletividade alimentar","Crianças com autismo (TEA) que comem poucos alimentos","Crianças com TDAH e alimentação desorganizada","Bebês em introdução alimentar","Crianças com baixo peso ou sobrepeso","Famílias cansadas da briga na hora de comer"],
    howItWorks: ["Conversa pelo WhatsApp para entender a rotina de alimentação","Consulta com avaliação nutricional e do crescimento","Mapa dos alimentos que a criança aceita e dos próximos passos","Plano para casa, com combinados simples para a família","Retornos para ajustar e comemorar cada novo alimento"],
    differentials: ["Abordagem sem forçar a criança","Experiência com seletividade no autismo","Integração com fono, TO e pediatria no mesmo lugar","Foco no prazer de comer, não só no prato limpo"],
    faq: [
      {q:"Meu filho é muito seletivo. A nutricionista pode ajudar?",a:"Sim. A nutricionista trabalha com estratégias graduais e respeitosas para a criança ir aceitando novos alimentos, sem forçar e sem transformar a refeição em briga."},
      {q:"Seletividade alimentar é comum no autismo?",a:"É bem comum. Muitas crianças com TEA têm sensibilidade a texturas, cores e cheiros. Nesses casos a nutricionista costuma trabalhar junto com a terapia ocupacional e a fono."},
      {q:"Quando a seletividade preocupa?",a:"Quando a criança aceita poucos alimentos, recusa grupos inteiros (frutas, verduras ou carnes), tem dificuldade para ganhar peso ou a hora da refeição gera sofrimento para todos. Na dúvida, vale uma avaliação."},
      {q:"Vocês atendem por plano de saúde?",a:"O atendimento é particular. Pelo WhatsApp a equipe explica como funciona a consulta."},
    ],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "nutricao-adulta",name: "Nutrição Adulta",shortName: "Nutrição",icon: "🥗",category: "terapia",accentColor: "#408858",
    headline: "Alimentação equilibrada para qualidade de vida",
    subheadline: "Orientação nutricional personalizada — sem dietas restritivas, com foco em mudança real de hábitos.",
    description: "Acompanhamento nutricional para adultos com foco em reeducação alimentar, emagrecimento saudável e manejo de condições clínicas.",
    metaTitle: "Nutrição para Adultos em São Luís | Vittalis Saúde",metaDescription: "Nutrição para adultos em São Luís. Agende na Vittalis Saúde.",
    heroImage: IMG.nutriAdulta,painPoints: ["Dietas que não funcionam","Relação difícil com a comida","Ganho de peso sem controle","Diabetes ou hipertensão sem orientação nutricional"],
    benefits: ["Plano alimentar personalizado e realista","Emagrecimento saudável e sustentável","Manejo nutricional de diabetes e hipertensão","Reeducação alimentar sem sofrimento","Acompanhamento contínuo com ajustes"],
    forWhom: ["Adultos buscando emagrecimento","Pacientes com diabetes","Pacientes com hipertensão","Gestantes","Pessoas com intolerâncias alimentares"],
    howItWorks: ["Avaliação nutricional e antropométrica","Entendimento da rotina e preferências","Plano alimentar sob medida","Consultas de retorno para ajustes","Metas realistas e acompanhamento"],
    differentials: ["Sem dietas restritivas ou modas","Foco em mudança real de hábitos","Integração com clínica geral"],
    faq: [{q:"Preciso fazer dieta restritiva?",a:"Não. Trabalhamos com reeducação alimentar personalizada, respeitando seu estilo de vida e suas preferências, sem restrições extremas."}],
    ctaText: "Agendar consulta",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "fisioterapia-infantil",name: "Fisioterapia Infantil",shortName: "Fisioterapia Infantil",icon: "🤸",category: "terapia",accentColor: "#4890B0",
    headline: "Desenvolvimento motor e reabilitação com carinho",
    subheadline: "Fisioterapia pediátrica com abordagem lúdica, individualizada e integrada às demais terapias da clínica.",
    description: "Estimulação do desenvolvimento motor, reabilitação e promoção da funcionalidade para bebês e crianças com atraso motor, prematuridade ou condições neurológicas.",
    metaTitle: "Fisioterapia Infantil em São Luís | Vittalis Saúde",metaDescription: "Fisioterapia infantil em São Luís. Desenvolvimento motor e reabilitação. Agende na Vittalis Saúde.",
    heroImage: IMG.fisioInfantil,painPoints: ["Bebê que demora a sentar ou andar","Prematuridade e necessidade de estimulação","Atraso motor identificado pelo pediatra","Falta de coordenação ou equilíbrio"],
    benefits: ["Estimulação precoce do desenvolvimento motor","Reabilitação neuromotora pediátrica","Fortalecimento e coordenação","Abordagem lúdica e motivadora","Orientação aos pais para exercícios em casa"],
    forWhom: ["Bebês prematuros","Crianças com atraso motor","Crianças com paralisia cerebral","Crianças com síndromes genéticas","Crianças com dificuldade de coordenação"],
    howItWorks: ["Avaliação fisioterapêutica detalhada","Plano de tratamento individualizado","Sessões regulares com abordagem lúdica","Orientação para exercícios em casa","Reavaliação e ajustes periódicos"],
    differentials: ["Especialização em pediatria","Ambiente lúdico e seguro","Integração com T.O. e pediatria"],
    faq: [{q:"A partir de que idade pode fazer fisioterapia?",a:"Desde os primeiros dias de vida, especialmente para bebês prematuros ou com alterações no desenvolvimento motor."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "fisioterapia-adulta",name: "Fisioterapia Adulta",shortName: "Fisioterapia",icon: "💪",category: "terapia",accentColor: "#387898",
    headline: "Reabilitação, prevenção e qualidade de vida",
    subheadline: "Fisioterapia individualizada para adultos e idosos com foco em recuperação funcional e bem-estar.",
    description: "Atendimento fisioterapêutico para adultos com foco em reabilitação ortopédica, tratamento de dores crônicas, prevenção de lesões e melhora da qualidade de vida.",
    metaTitle: "Fisioterapia para Adultos em São Luís | Vittalis Saúde",metaDescription: "Fisioterapia para adultos em São Luís. Agende na Vittalis Saúde.",
    heroImage: IMG.fisioAdulta,painPoints: ["Dores crônicas nas costas ou articulações","Recuperação lenta pós-cirurgia","Perda de mobilidade com a idade","Lesões esportivas repetitivas"],
    benefits: ["Reabilitação ortopédica especializada","Tratamento de dores crônicas","Prevenção de novas lesões","Melhora da mobilidade e flexibilidade","Orientação postural e de exercícios"],
    forWhom: ["Adultos com dores musculoesqueléticas","Pacientes em pós-operatório","Idosos com perda funcional","Atletas amadores"],
    howItWorks: ["Avaliação fisioterapêutica completa","Plano de tratamento personalizado","Sessões individuais regulares","Orientação de exercícios para casa","Reavaliação de progresso"],
    differentials: ["Atendimento individual e personalizado","Profissionais atualizados","Ambiente confortável e equipado"],
    faq: [{q:"Preciso de encaminhamento médico?",a:"Não é obrigatório, mas recomendamos trazer exames recentes quando disponíveis para uma avaliação mais precisa."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "terapia-ocupacional-infantil",name: "Terapia Ocupacional Infantil",shortName: "T.O. Infantil",icon: "🎨",category: "terapia",accentColor: "#A07090",
    headline: "Autonomia, funcionalidade e integração sensorial",
    subheadline: "Terapia ocupacional infantil para promover independência, habilidades motoras finas e regulação sensorial.",
    description: "Atendimento de T.O. para crianças com foco em independência nas atividades diárias, integração sensorial, habilidades motoras finas e preparação para atividades escolares.",
    metaTitle: "Terapia Ocupacional Infantil em São Luís | Vittalis Saúde",metaDescription: "Terapia ocupacional infantil em São Luís. Autonomia e desenvolvimento. Agende na Vittalis Saúde.",
    heroImage: IMG.toInfantil,painPoints: ["Dificuldade em segurar lápis ou talheres","Hipersensibilidade a texturas ou sons","Dificuldade em se vestir sozinho","Crianças que não brincam com outros","Desregulação emocional frequente"],
    benefits: ["Integração sensorial especializada","Desenvolvimento de habilidades motoras finas","Independência em atividades cotidianas","Regulação emocional e comportamental","Preparação para atividades escolares"],
    forWhom: ["Crianças com TEA","Crianças com atraso de desenvolvimento","Crianças com dificuldades de coordenação motora fina","Crianças com dificuldades sensoriais"],
    howItWorks: ["Avaliação ocupacional completa","Identificação de necessidades sensoriais e funcionais","Plano terapêutico individualizado","Sessões regulares em ambiente preparado","Orientação familiar e escolar"],
    differentials: ["Sala com equipamentos de integração sensorial","Abordagem lúdica e funcional","Integração com ABA, fono e psicologia"],
    faq: [{q:"O que é integração sensorial?",a:"É uma abordagem que ajuda a criança a processar e responder adequadamente aos estímulos do ambiente (sons, texturas, movimentos), melhorando sua participação nas atividades do dia a dia."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "terapia-ocupacional-adulta",name: "Terapia Ocupacional Adulta",shortName: "T.O. Adulta",icon: "🤲",category: "terapia",accentColor: "#906880",
    headline: "Funcionalidade e qualidade de vida para adultos",
    subheadline: "Terapia ocupacional para adultos e idosos com foco em recuperar e manter a independência nas atividades cotidianas.",
    description: "Reabilitação funcional para adultos e idosos que perderam autonomia por doença, lesão ou envelhecimento.",
    metaTitle: "Terapia Ocupacional para Adultos em São Luís | Vittalis Saúde",metaDescription: "Terapia ocupacional para adultos em São Luís. Agende na Vittalis Saúde.",
    heroImage: IMG.toAdulta,painPoints: ["Perda de independência após AVC","Dificuldade em atividades simples do dia a dia","Declínio funcional com a idade","Necessidade de adaptação do ambiente"],
    benefits: ["Reabilitação funcional personalizada","Recuperação da independência","Adaptação de ambientes e atividades","Orientação para cuidadores","Melhora da qualidade de vida"],
    forWhom: ["Adultos pós-AVC","Idosos com perda funcional","Pacientes com doenças neurológicas","Pessoas com doenças reumáticas"],
    howItWorks: ["Avaliação funcional detalhada","Plano terapêutico com metas claras","Sessões individuais de reabilitação","Orientação para cuidadores e família","Adaptação do ambiente domiciliar"],
    differentials: ["Atendimento individualizado","Profissionais especializados","Orientação para adaptação do lar"],
    faq: [{q:"Atendem pacientes acamados?",a:"Sim. Também oferecemos atendimento domiciliar para pacientes com dificuldade de locomoção."}],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
  {
    slug: "neurofeedback",name: "Neurofeedback",shortName: "Neurofeedback",icon: "⚡",category: "terapia",accentColor: "#3860A8",
    headline: "Tecnologia de ponta a serviço do seu cérebro",
    subheadline: "Neurofeedback como recurso terapêutico complementar para autorregulação cognitiva, emocional e comportamental.",
    description: "O Neurofeedback na Vittalis Saúde é uma abordagem terapêutica inovadora que utiliza tecnologia para treinar a atividade cerebral, como recurso complementar no cuidado com a atenção e o controle emocional.",
    metaTitle: "Neurofeedback em São Luís | Vittalis Saúde — Tecnologia e Cuidado",
    metaDescription: "Neurofeedback em São Luís como recurso terapêutico para atenção, ansiedade e performance. Agende na Vittalis Saúde.",
    heroImage: IMG.neurofeedback,
    painPoints: ["TDAH com dificuldade de controle medicamentoso","Ansiedade persistente","Dificuldade de concentração nos estudos ou trabalho","Insônia crônica","Busca por tratamento complementar não invasivo"],
    benefits: ["Treinamento não invasivo da atividade cerebral","Treino da atenção e da concentração","Autorregulação emocional e comportamental","Pode complementar o acompanhamento do TDAH, com indicação profissional","Recurso complementar no cuidado com a ansiedade","Recurso complementar no cuidado com o sono"],
    forWhom: ["Crianças com TDAH","Adolescentes com dificuldade de concentração","Adultos com ansiedade crônica","Pessoas com insônia","Profissionais buscando alta performance cognitiva"],
    howItWorks: ["Avaliação inicial e mapeamento cerebral (EEG)","Definição do protocolo de treinamento personalizado","Sessões regulares de treinamento cerebral (20-40 min)","Monitoramento contínuo do progresso com dados","Ajustes no protocolo conforme evolução"],
    differentials: ["Tecnologia moderna","Profissionais com formação em neurofeedback","Parte de um plano terapêutico integrado","Monitoramento com dados objetivos de progresso","Abordagem baseada em evidências científicas"],
    faq: [
      {q:"O neurofeedback substitui a terapia ou medicação?",a:"Não. É um recurso complementar que complementa o tratamento quando integrado a um plano terapêutico. A decisão sobre medicação é sempre do médico."},
      {q:"A partir de que idade pode fazer?",a:"Geralmente a partir dos 6 anos, dependendo da avaliação clínica e da capacidade de colaboração da criança."},
      {q:"Quantas sessões são necessárias?",a:"O número e a frequência das sessões são definidos na avaliação, conforme cada caso."},
    ],
    ctaText: "Agendar avaliação",waMessage: "Olá! Vim pelo site da Vittalis e gostaria de atendimento.",
  },
];

export function getSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find(s => s.slug === slug);
}
export function getByCategory(cat: Specialty["category"]): Specialty[] {
  return SPECIALTIES.filter(s => s.category === cat);
}
export function getAllSlugs(): string[] {
  return SPECIALTIES.map(s => s.slug);
}
