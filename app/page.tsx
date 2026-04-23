"use client";
// @ts-nocheck

import { useState, useEffect, useRef, ReactNode } from "react";
// import Image from "next/image";

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  VITTALIS SAÚDE — LANDING PAGE PREMIUM                         ║
   ║  Edite os dados abaixo para personalizar o site                 ║
   ╚══════════════════════════════════════════════════════════════════╝ */


// ═══ Mapeamento de nomes para slugs das landing pages ═══
const SLUG_MAP: Record<string, string> = {
  "Pediatria": "pediatria",
  "Ginecologia e Obstetrícia": "ginecologia",
  "Clínica Geral": "clinica-geral",
  "Dermatologia": "dermatologia",
  "Pneumologia": "pneumologia",
  "Psicologia Infantil": "psicologia-infantil",
  "Psicologia ABA": "psicologia-aba",
  "Psicologia para Adultos": "psicologia-adulto",
  "Neuropsicologia": "neuropsicologia",
  "Psicopedagogia": "psicopedagogia",
  "Fonoaudiologia": "fonoaudiologia",
  "Nutrição Infantil e Adulta": "nutricao-infantil",
  "Fisioterapia": "fisioterapia-infantil",
  "Terapia Ocupacional": "terapia-ocupacional-infantil",
  "Neurofeedback": "neurofeedback",
};

// ═══════════════════════════════════════════════════════════════════
// DADOS EDITÁVEIS — Altere aqui telefone, WhatsApp, endereço etc.
// ═══════════════════════════════════════════════════════════════════
const BRAND = {
  whatsapp:
    "https://wa.me/5598984221002?text=Olá!%20Gostaria%20de%20agendar%20um%20atendimento%20na%20Vittalis%20Saúde.",
  whatsappNumber: "(98) 98422-1002",
  phone: "(98) 98422-1002",
  email: "contato@vittalissaude.com.br",
  address: "Business Center — Av. Coronel Colares Moreira, 3, Sala 36 e 37 — Jardim Renascença, São Luís – MA",
  cep: "CEP: 65075-441",
  hours: {
    week: "Segunda a Sexta — 08h às 18h",
    sat: "Sábado — 08h às 12h",
  },
  instagram: "https://www.instagram.com/vittalissaudeslz/",
  // facebook: removido,
  mapsUrl: "https://maps.app.goo.gl/35Vernq6NtWw9vBLA",
};

// ═══════════════════════════════════════════════════════════════════
// SVG ICONS (inline para não depender de lib externa)
// ═══════════════════════════════════════════════════════════════════
const icons = {
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  ),
  users: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  baby: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>
  ),
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
  ),
  stethoscope: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
  ),
  syringe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>
  ),
  chevronDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
  chevronRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  mapPin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
  ),
  menu: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  x: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  sparkles: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  award: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  activity: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
  ),
  handHeart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/></svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
  ),
  smile: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
  ),
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 20 2 20 2s-1.7 5.3-3 10.3A7 7 0 0 1 11 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
  ),
  messageCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
  ),
  eye: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// DADOS DE CONTEÚDO — Edite textos, serviços, depoimentos e FAQ
// ═══════════════════════════════════════════════════════════════════
const DIFERENCIAIS = [
  { icon: "handHeart", title: "Atendimento Humanizado", desc: "Empatia, escuta ativa e respeito em cada atendimento." },
  { icon: "award", title: "Estrutura Moderna", desc: "Conforto e sofisticação em cada detalhe da clínica." },
  { icon: "syringe", title: "Vacinação com Mais Conforto", desc: "Técnicas suaves e ambiente acolhedor para os pequenos." },
  { icon: "calendar", title: "Planejamento Vacinal", desc: "Carteira vacinal organizada e personalizada." },
  { icon: "users", title: "Equipe Multidisciplinar", desc: "Saúde física, emocional e desenvolvimento integrados." },
  { icon: "home", title: "Atendimento Domiciliar", desc: "A qualidade da clínica no conforto do seu lar." },
  { icon: "heart", title: "Todas as Fases da Vida", desc: "Cuidado completo para toda a família, em um só lugar." },
  { icon: "shield", title: "Segurança Clínica", desc: "Protocolos rigorosos e compromisso com a excelência." },
];

const ESPECIALIDADES_MEDICAS = [
  { icon: "baby", name: "Pediatria", desc: "Cuidado completo para crianças e adolescentes" },
  { icon: "heart", name: "Ginecologia e Obstetrícia", desc: "Acompanhamento integral da saúde da mulher" },
  { icon: "stethoscope", name: "Clínica Geral", desc: "Atendimento adulto preventivo e curativo" },
  { icon: "eye", name: "Dermatologia", desc: "Cuidados com pele, cabelos e unhas" },
  { icon: "activity", name: "Pneumologia", desc: "Saúde respiratória com excelência" },
];

const TERAPIAS = [
  { icon: "brain", name: "Psicologia Infantil", desc: "Suporte emocional e comportamental" },
  { icon: "sparkles", name: "Psicologia ABA", desc: "Terapia comportamental aplicada ao autismo" },
  { icon: "heart", name: "Psicologia para Adultos", desc: "Acompanhamento terapêutico personalizado" },
  { icon: "brain", name: "Neuropsicologia", desc: "Avaliação e reabilitação cognitiva" },
  { icon: "leaf", name: "Psicopedagogia", desc: "Apoio ao aprendizado e desenvolvimento" },
  { icon: "messageCircle", name: "Fonoaudiologia", desc: "Cuidado com fala, linguagem e audição" },
  { icon: "smile", name: "Nutrição Infantil e Adulta", desc: "Alimentação saudável para todas as idades" },
  { icon: "activity", name: "Fisioterapia", desc: "Reabilitação e desenvolvimento motor" },
  { icon: "handHeart", name: "Terapia Ocupacional", desc: "Autonomia e qualidade de vida" },
  { icon: "sparkles", name: "Neurofeedback", desc: "Tecnologia aplicada ao cuidado cerebral" },
];

const DEPOIMENTOS = [
  { name: "Camila Rodrigues", role: "Mãe do Pedro, 4 anos", text: "A Vittalis mudou a forma como cuidamos da saúde do nosso filho. O acolhimento é real, desde a recepção até o consultório. Finalmente encontramos um lugar que trata a família como prioridade.", rating: 5 },
  { name: "Fernanda Almeida", role: "Paciente de Ginecologia", text: "Me senti ouvida e respeitada em cada consulta. A estrutura é linda, moderna e muito confortável. Recomendo para todas as mulheres que buscam um cuidado verdadeiramente humano.", rating: 5 },
  { name: "Rafael e Juliana Santos", role: "Pais da Bia, 2 anos", text: "A vacinação da Bia sempre foi tranquila na Vittalis. A equipe tem um carinho especial com as crianças e o planejamento vacinal nos deu muita segurança como pais de primeira viagem.", rating: 5 },
];

const FAQ_DATA = [
  { q: "A clínica atende apenas crianças?", a: "Não. A Vittalis Saúde atende todas as faixas etárias: bebês, crianças, adolescentes, adultos e idosos, com especialidades médicas, psicológicas e terapias para todas as fases da vida." },
  { q: "Posso agendar vacinação e consulta no mesmo dia?", a: "Sempre que possível, nossa equipe organiza o atendimento para otimizar sua rotina. A confirmação é feita no momento do agendamento pelo WhatsApp." },
  { q: "A Vittalis realiza atendimento domiciliar?", a: "Sim. Levamos nossa equipe multidisciplinar até você, com vacinação domiciliar e atendimentos específicos, mantendo o mesmo padrão de qualidade da clínica." },
  { q: "Quais especialidades atendem na clínica?", a: "Oferecemos pediatria, ginecologia, clínica geral, dermatologia, pneumologia, psicologia (infantil, ABA e adultos), neuropsicologia, fonoaudiologia, nutrição, fisioterapia, terapia ocupacional, psicopedagogia e neurofeedback." },
  { q: "Como funciona o agendamento?", a: "O agendamento é simples e rápido pelo WhatsApp. Basta enviar uma mensagem e nossa equipe irá orientar sobre horários disponíveis e preparação para o atendimento." },
  { q: "A Vittalis atende particular?", a: "As informações sobre formas de atendimento e pagamento são passadas diretamente pelo WhatsApp, de forma clara e personalizada para cada paciente." },
  { q: "Como falar com a equipe?", a: "Você pode falar conosco pelo WhatsApp, telefone ou visitando nossa clínica. Estamos sempre prontos para atender você e sua família." },
];

const BENEFICIOS = [
  { icon: "shield", title: "Mais Segurança", desc: "Protocolos clínicos rigorosos e profissionais qualificados" },
  { icon: "heart", title: "Mais Acolhimento", desc: "Ambiente e equipe preparados para gerar confiança" },
  { icon: "sparkles", title: "Experiência Premium", desc: "Estrutura moderna, confortável e sofisticada" },
  { icon: "users", title: "Suporte à Família", desc: "Orientação contínua para pais e responsáveis" },
  { icon: "handHeart", title: "Cuidado Personalizado", desc: "Planos terapêuticos individualizados" },
  { icon: "home", title: "Mais Comodidade", desc: "Atendimento na clínica ou no conforto do lar" },
];

// ═══════════════════════════════════════════════════════════════════
// HELPER: Retorna o SVG do ícone pelo nome
// ═══════════════════════════════════════════════════════════════════
function Icon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const icon = icons[name as keyof typeof icons];
  if (!icon) return null;
  return (
    <span style={{ display: "inline-flex", width: size, height: size }} className={className}>
      {icon}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: Intersection Observer para animações on-scroll
// ═══════════════════════════════════════════════════════════════════
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, isVisible };
}


// ═══ Animated Counter (triggered by parent visibility) ═══
function AnimatedNumber({ target, duration = 2000, visible }: { target: number; duration?: number; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <>{count}</>;
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENTES DE UI
// ═══════════════════════════════════════════════════════════════════

function SectionTitle({ badge, title, subtitle, center = true, light = false }: { badge?: string; title: string; subtitle?: string; center?: boolean; light?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 48 }}>
      {badge && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: light ? "rgba(255,255,255,0.15)" : "var(--vit-primary-light)", color: light ? "white" : "var(--vit-primary)", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 100, marginBottom: 16, letterSpacing: "0.03em", textTransform: "uppercase" }}>
          {icons.sparkles} {badge}
        </div>
      )}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: light ? "white" : "var(--vit-charcoal)", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: center ? 700 : "none", margin: center ? "0 auto" : 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.6vw, 17px)", color: light ? "rgba(255,255,255,0.8)" : "var(--vit-gray-500)", lineHeight: 1.7, marginTop: 16, maxWidth: center ? 600 : "none", margin: center ? "16px auto 0" : "16px 0 0" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CTAButton({ children, href = BRAND.whatsapp, variant = "primary", size = "md" }: { children: ReactNode; href?: string; variant?: string; size?: string }) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontWeight: 600, textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 100,
    transition: "all 0.3s ease", cursor: "pointer", border: "none",
    fontSize: size === "lg" ? 16 : 14,
    padding: size === "lg" ? "16px 36px" : "12px 28px",
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--vit-primary)", color: "white", boxShadow: "0 4px 16px rgba(0,184,192,0.25)" },
    secondary: { background: "transparent", color: "var(--vit-primary)", border: "2px solid var(--vit-primary)" },
    white: { background: "rgba(255,255,255,0.95)", color: "var(--vit-secondary-dark)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" },
    gold: { background: "var(--vit-gold)", color: "white", boxShadow: "0 4px 16px rgba(196,151,59,0.25)" },
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}>
      {children} {icons.arrowRight}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 0. NAVBAR
// ═══════════════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [espOpen, setEspOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const espMedicas = [
    { name: "Pediatria", slug: "pediatria", icon: "👶" },
    { name: "Ginecologia", slug: "ginecologia", icon: "🌸" },
    { name: "Clínica Geral", slug: "clinica-geral", icon: "🩺" },
    { name: "Dermatologia", slug: "dermatologia", icon: "✨" },
    { name: "Pneumologia", slug: "pneumologia", icon: "🫁" },
  ];
  const espTerapias = [
    { name: "Psicologia Infantil", slug: "psicologia-infantil", icon: "🧸" },
    { name: "Psicologia ABA", slug: "psicologia-aba", icon: "🧩" },
    { name: "Fonoaudiologia", slug: "fonoaudiologia", icon: "🗣️" },
    { name: "Fisioterapia", slug: "fisioterapia-infantil", icon: "🤸" },
    { name: "Terapia Ocupacional", slug: "terapia-ocupacional-infantil", icon: "🎨" },
    { name: "Neurofeedback", slug: "neurofeedback", icon: "⚡" },
  ];

  return (
    <>

            {/* ════ MAIN NAV ════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid rgba(0,184,192,0.06)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.04)" : "none",
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center" }}>
            <img src="/images/logo-vertical.png" alt="Vittalis Saúde" style={{ height: 42, width: "auto" }} />
          </a>

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <a href="#hero" style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)", textDecoration: "none", borderRadius: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-light)"; e.currentTarget.style.color = "var(--vit-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--vit-gray-700)"; }}>
              Início
            </a>

            {/* Mega menu trigger */}
            <div style={{ position: "relative" }}
              onMouseEnter={() => setEspOpen(true)}
              onMouseLeave={() => setEspOpen(false)}>
              <button style={{
                padding: "10px 16px", fontSize: 13, fontWeight: 500,
                color: espOpen ? "var(--vit-primary)" : "var(--vit-gray-700)",
                background: espOpen ? "var(--vit-primary-light)" : "transparent",
                border: "none", borderRadius: 8, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "var(--font-body)", transition: "all .25s",
              }}>
                Especialidades
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform .3s", transform: espOpen ? "rotate(180deg)" : "none" }}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {/* ════ MEGA MENU ════ */}
              {espOpen && (
                <div style={{
                  position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                  width: 580, background: "white",
                  borderRadius: 20, padding: "28px 32px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,184,192,0.06)",
                  animation: "fadeIn .2s ease",
                  marginTop: 4,
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    {/* Consultas médicas */}
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--vit-primary)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Consultas Médicas</p>
                      {espMedicas.map(e => (
                        <a key={e.slug} href={`/${e.slug}`} style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          borderRadius: 10, textDecoration: "none", transition: "all .2s",
                          marginBottom: 2,
                        }}
                        onMouseEnter={ev => { ev.currentTarget.style.background = "var(--vit-primary-50)"; }}
                        onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; }}>
                          <span style={{ fontSize: 18 }}>{e.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--vit-charcoal)" }}>{e.name}</span>
                        </a>
                      ))}
                    </div>
                    {/* Terapias */}
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--vit-primary)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Terapias</p>
                      {espTerapias.map(e => (
                        <a key={e.slug} href={`/${e.slug}`} style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          borderRadius: 10, textDecoration: "none", transition: "all .2s",
                          marginBottom: 2,
                        }}
                        onMouseEnter={ev => { ev.currentTarget.style.background = "var(--vit-primary-50)"; }}
                        onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; }}>
                          <span style={{ fontSize: 18 }}>{e.icon}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--vit-charcoal)" }}>{e.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  {/* Vacinação destaque */}
                  <a href="/vacinacao" style={{
                    display: "flex", alignItems: "center", gap: 14, marginTop: 16, padding: "14px 16px",
                    background: "linear-gradient(135deg, var(--vit-primary-light), #E0F7F8)",
                    borderRadius: 14, textDecoration: "none",
                    border: "1px solid rgba(0,184,192,0.1)", transition: "all .2s",
                  }}
                  onMouseEnter={ev => { ev.currentTarget.style.transform = "translateY(-1px)"; ev.currentTarget.style.boxShadow = "0 4px 16px rgba(0,184,192,0.1)"; }}
                  onMouseLeave={ev => { ev.currentTarget.style.transform = "none"; ev.currentTarget.style.boxShadow = "none"; }}>
                    <span style={{ fontSize: 24 }}>💉</span>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-charcoal)" }}>Vacinação Particular</span>
                      <span style={{ display: "block", fontSize: 12, color: "var(--vit-gray-500)" }}>Bebês, crianças, adultos e idosos — com conforto</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--vit-primary)" strokeWidth="2" style={{ marginLeft: "auto" }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
              )}
            </div>

            <a href="#sobre" style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)", textDecoration: "none", borderRadius: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-light)"; e.currentTarget.style.color = "var(--vit-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--vit-gray-700)"; }}>
              Sobre
            </a>
            <a href="#depoimentos" style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)", textDecoration: "none", borderRadius: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-light)"; e.currentTarget.style.color = "var(--vit-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--vit-gray-700)"; }}>
              Depoimentos
            </a>
            <a href="#faq" style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)", textDecoration: "none", borderRadius: 8, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-light)"; e.currentTarget.style.color = "var(--vit-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--vit-gray-700)"; }}>
              FAQ
            </a>

            <div style={{ width: 1, height: 28, background: "var(--vit-gray-100)", margin: "0 12px" }} />

            {/* Phone */}
            <a href="tel:5598984221002" style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
              fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)",
              textDecoration: "none", borderRadius: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--vit-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (98) 98422-1002
            </a>

            {/* CTA */}
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" style={{
              fontSize: 13, fontWeight: 600,
              background: "var(--vit-primary)", color: "white",
              padding: "11px 24px", borderRadius: 100, textDecoration: "none",
              boxShadow: "0 2px 12px rgba(0,184,192,0.2)",
              transition: "all .3s ease",
              display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-dark)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,184,192,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--vit-primary)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,184,192,0.2)"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Agendar consulta
            </a>
          </div>

          {/* Mobile button */}
          <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none", background: "none", border: "none", padding: 8, color: "var(--vit-charcoal)", cursor: "pointer" }}>
            {mobileOpen ? icons.x : icons.menu}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(255,255,255,0.99)", backdropFilter: "blur(24px)",
            padding: "8px 24px 24px", maxHeight: "80vh", overflowY: "auto",
            boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
            animation: "fadeIn .2s ease",
          }}>
            {[
              { l: "Início", h: "#hero" },
              { l: "Vacinação", h: "/vacinacao" },
              { l: "Sobre", h: "#sobre" },
              { l: "Depoimentos", h: "#depoimentos" },
              { l: "FAQ", h: "#faq" },
            ].map(link => (
              <a key={link.h} href={link.h} onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "16px 0", fontSize: 16, fontWeight: 500, color: "var(--vit-charcoal)", borderBottom: "1px solid var(--vit-gray-100)", textDecoration: "none" }}>
                {link.l}
              </a>
            ))}
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--vit-primary)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 16, marginBottom: 8 }}>Especialidades</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
              {[...espMedicas, ...espTerapias].map(e => (
                <a key={e.slug} href={`/${e.slug}`} onClick={() => setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", borderRadius: 10, background: "var(--vit-cream)", textDecoration: "none", fontSize: 13, fontWeight: 500, color: "var(--vit-charcoal)" }}>
                  <span>{e.icon}</span> {e.name}
                </a>
              ))}
            </div>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "16px", borderRadius: 100, background: "var(--vit-primary)", color: "white", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Agendar pelo WhatsApp
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WHATSAPP FAB
// ═══════════════════════════════════════════════════════════════════
function WhatsAppFab() {
  return (
    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.3s ease" }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 1. HERO SECTION
// ═══════════════════════════════════════════════════════════════════

// ═══ Animated Hero Counters ═══
function HeroCounters() {
  const { ref, isVisible } = useInView();
  return (
    <div className="hero-badges" ref={ref} style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--vit-gray-100)" }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--vit-primary)", lineHeight: 1 }}>+<AnimatedNumber target={1200} duration={2200} visible={isVisible} /></div>
        <div style={{ fontSize: 11, color: "var(--vit-gray-500)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Atendimentos</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--vit-primary)", lineHeight: 1 }}>+<AnimatedNumber target={15} duration={1500} visible={isVisible} /></div>
        <div style={{ fontSize: 11, color: "var(--vit-gray-500)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Especialidades</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--vit-primary)", lineHeight: 1 }}><AnimatedNumber target={5} duration={800} visible={isVisible} />.0★</div>
        <div style={{ fontSize: 11, color: "var(--vit-gray-500)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Avaliação Google</div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, var(--vit-cream) 0%, var(--vit-primary-50) 30%, #E0F4F5 60%, var(--vit-cream) 100%)" }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,184,192,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,151,59,0.05) 0%, transparent 70%)" }} />

      <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 24px 80px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--vit-gold-light)", color: "var(--vit-gold)", fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 100, marginBottom: 24, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(196,151,59,0.15)" }}>
            {icons.award} Sua vida é preciosa
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Sua saúde em boas mãos.{" "}
            <span style={{ color: "var(--vit-primary)", fontStyle: "italic" }}>Cuidado completo</span>{" "}
            para toda a família
          </h1>

          <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: "var(--vit-gray-500)", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
            Clínica premium em São Luís com consultas médicas, vacinação particular e terapias especializadas. Agendar consulta pelo WhatsApp.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <CTAButton size="lg">Agende pelo WhatsApp</CTAButton>
            <CTAButton variant="secondary" size="lg" href="#especialidades">Nossas Especialidades</CTAButton>
          </div>

          {/* Trust badges */}
          <HeroCounters />
        </div>

        {/* Hero image placeholder */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(0.9)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,184,192,0.15), 0 10px 30px rgba(0,0,0,0.06)" }}>
            <img src="/images/vittalis_pediatria_2.png" alt="Família sendo atendida na clínica Vittalis Saúde em São Luís" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Floating card */}
          <div className="hero-float-card" style={{ position: "absolute", bottom: 24, left: -30, background: "white", borderRadius: 16, padding: "16px 20px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 14, animation: "float 5s ease-in-out infinite" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--vit-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vit-primary)" }}>
              {icons.shield}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-charcoal)" }}>Segurança Clínica</div>
              <div style={{ fontSize: 12, color: "var(--vit-gray-500)" }}>Protocolos certificados</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 100px !important; gap: 40px !important; }
          .hero-float-card { left: 16px !important; bottom: 16px !important; }
          .hero-badges { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2. DIFERENCIAIS
// ═══════════════════════════════════════════════════════════════════
function DiferenciaisSection() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--vit-white)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection>
          <SectionTitle badge="Nossos Diferenciais" title="Por que mais de 1.200 famílias confiam na Vittalis" subtitle="Atendimento humanizado em São Luís com estrutura moderna e equipe especializada." />
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {DIFERENCIAIS.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div style={{ padding: 28, borderRadius: 20, background: "var(--vit-cream)", border: "1px solid var(--vit-gray-100)", transition: "all 0.35s ease", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--vit-primary-50)"; e.currentTarget.style.borderColor = "rgba(0,184,192,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,184,192,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--vit-cream)"; e.currentTarget.style.borderColor = "var(--vit-gray-100)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--vit-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--vit-primary)" }}>
                  <Icon name={d.icon} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 8, lineHeight: 1.2 }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.65 }}>{d.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3. ESPECIALIDADES
// ═══════════════════════════════════════════════════════════════════
function ServiceCard({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  const slug = SLUG_MAP[name] || "";
  const href = slug ? `/${slug}` : BRAND.whatsapp;
  const isExternal = !slug;
  return (
    <a href={href} {...(isExternal ? {target:"_blank", rel:"noopener noreferrer"} : {})}
      style={{ padding: "24px 22px", borderRadius: 18, background: "white", border: "1px solid var(--vit-gray-100)", transition: "all 0.3s ease", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--vit-primary)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,184,192,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--vit-gray-100)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)"; }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--vit-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, color: "var(--vit-primary)" }}>
        <Icon name={icon} />
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 6 }}>{name}</h4>
      <p style={{ fontSize: 13, color: "var(--vit-gray-500)", lineHeight: 1.55 }}>{desc}</p>
    </a>
  );
}

function EspecialidadesSection() {
  return (
    <section id="especialidades" style={{ padding: "100px 24px", background: "linear-gradient(180deg, var(--vit-primary-50) 0%, var(--vit-white) 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection>
          <SectionTitle badge="Especialidades" title="Especialidades médicas e terapias em São Luís" subtitle="Consultas particulares para crianças, adolescentes, adultos e idosos. Agende pelo WhatsApp." />
        </AnimatedSection>

        <AnimatedSection><h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 24, textAlign: "center" }}>Especialidades Médicas</h3></AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 56 }}>
          {ESPECIALIDADES_MEDICAS.map((s, i) => <AnimatedSection key={i} delay={i * 0.05}><ServiceCard {...s} /></AnimatedSection>)}
        </div>

        <AnimatedSection>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 8, textAlign: "center" }}>Terapias e Cuidado do Desenvolvimento</h3>
          <p style={{ fontSize: 15, color: "var(--vit-gray-500)", textAlign: "center", maxWidth: 550, margin: "0 auto 24px" }}>Cuidado emocional, cognitivo e funcional para todas as fases da vida.</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {TERAPIAS.map((s, i) => <AnimatedSection key={i} delay={i * 0.04}><ServiceCard {...s} /></AnimatedSection>)}
        </div>

        <AnimatedSection delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <CTAButton size="lg">Quero agendar minha consulta</CTAButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4. VACINAÇÃO
// ═══════════════════════════════════════════════════════════════════
function VacinacaoSection() {
  const checks = ["Vacinas de rotina e especiais", "Planejamento vacinal individualizado", "Organização da carteira vacinal", "Técnicas para redução do desconforto", "Atendimento domiciliar", "Orientação completa aos pais"];

  return (
    <section id="vacinacao" style={{ padding: "100px 24px", background: "linear-gradient(135deg, var(--vit-secondary-dark) 0%, var(--vit-secondary) 50%, var(--vit-primary-dark) 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <AnimatedSection>
          <SectionTitle badge="Vacinação Particular" title="Vacinação particular em São Luís" light subtitle="Proteja sua família em todas as fases da vida — com atendimento acolhedor, técnicas para redução do desconforto e planejamento vacinal individualizado." />
        </AnimatedSection>

        <div className="vac-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <AnimatedSection>
            <div style={{ aspectRatio: "4/3", borderRadius: 20, overflow: "hidden" }}>
              <img src="/images/vacinas_02.jpg" alt="Vacinação com conforto acolhedora na Vittalis Saúde" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                Atendemos <strong style={{ color: "white" }}>bebês, crianças, adolescentes, adultos e idosos</strong> com vacinas de rotina e especiais, em um ambiente preparado para oferecer tranquilidade a toda a família.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {checks.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                      {icons.check}
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}><CTAButton variant="white" size="lg">Agendar vacinação</CTAButton></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .vac-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5. CUIDADO MULTIDISCIPLINAR
// ═══════════════════════════════════════════════════════════════════
function MultidisciplinarSection() {
  const items = [
    { icon: "stethoscope", text: "Consultas médicas integradas com terapias" },
    { icon: "brain", text: "Avaliação multidisciplinar do desenvolvimento" },
    { icon: "heart", text: "Planos terapêuticos individualizados" },
    { icon: "users", text: "Equipe que se comunica sobre cada caso" },
  ];

  return (
    <section style={{ padding: "100px 24px", background: "var(--vit-white)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="multi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <AnimatedSection>
            <div>
              <SectionTitle badge="Cuidado Integrado" title="Saúde completa em um só lugar" center={false} subtitle="Na Vittalis Saúde, as especialidades médicas e terapias se comunicam para oferecer uma visão contínua, preventiva e personalizada de cada paciente." />
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 14, background: "var(--vit-primary-50)", border: "1px solid rgba(0,184,192,0.06)", color: "var(--vit-primary)" }}>
                    <Icon name={item.icon} size={20} />
                    <span style={{ fontSize: 15, color: "var(--vit-charcoal)", fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}><CTAButton>Fale com nossa equipe</CTAButton></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div style={{ aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,184,192,0.1)" }}>
              <img src="/images/multidisciplinar_01.jpg" alt="Equipe multidisciplinar da Vittalis Saúde em São Luís" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </AnimatedSection>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .multi-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 6. SOBRE A CLÍNICA
// ═══════════════════════════════════════════════════════════════════
function SobreSection() {
  return (
    <section id="sobre" style={{ padding: "100px 24px", background: "linear-gradient(180deg, var(--vit-cream) 0%, var(--vit-primary-50) 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection><SectionTitle badge="Sobre a Vittalis" title="Uma nova referência em cuidado com a saúde em São Luís" /></AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div style={{ padding: "48px 40px", borderRadius: 24, background: "white", boxShadow: "0 8px 40px rgba(0,184,192,0.05)", border: "1px solid var(--vit-gray-100)" }}>
            <p style={{ fontSize: 17, color: "var(--vit-gray-700)", lineHeight: 1.85, marginBottom: 24 }}>
              A <strong style={{ color: "var(--vit-primary)" }}>Vittalis Saúde</strong> é uma clínica multidisciplinar no Jardim Renascença, em São Luís. Aqui, a saúde vai além do tratamento: é prevenção, cuidado contínuo e qualidade de vida para toda a família.
            </p>
            <p style={{ fontSize: 17, color: "var(--vit-gray-700)", lineHeight: 1.85, marginBottom: 24 }}>
              Cada paciente é tratado como uma <strong style={{ color: "var(--vit-charcoal)" }}>joia rara</strong> — com atenção, respeito e um cuidado que vai do primeiro sorriso à maturidade.
            </p>
            <p style={{ fontSize: 17, color: "var(--vit-gray-700)", lineHeight: 1.85 }}>
              Nosso propósito é cuidar das pessoas para que vivam bem. Cada detalhe foi pensado para você se sentir seguro e acolhido.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--vit-gray-100)", flexWrap: "wrap" }}>
              {[{ l: "Missão", t: "Promover qualidade de vida e longevidade por meio do cuidado com a saúde, em um ambiente humanizado e acolhedor que estimula o autocuidado." }, { l: "Visão", t: "Ser reconhecida como referência e excelência em atendimento humanizado na área da saúde." }, { l: "Valores", t: "Ética, Disciplina, Empatia e Zelo — tratar cada paciente como uma joia rara." }].map((item, i) => (
                <div key={i} style={{ flex: "1 1 220px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--vit-primary)", marginBottom: 8 }}>{item.l}</div>
                  <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6 }}>{item.t}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 7. BENEFÍCIOS
// ═══════════════════════════════════════════════════════════════════
function BeneficiosSection() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--vit-white)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection><SectionTitle badge="Vantagens" title="Por que escolher a Vittalis Saúde" subtitle="Tudo pensado para oferecer a melhor experiência em saúde para você e sua família." /></AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {BENEFICIOS.map((b, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 18, padding: "24px 20px", borderRadius: 18, background: "var(--vit-cream)", border: "1px solid var(--vit-gray-100)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,184,192,0.15)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,184,192,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--vit-gray-100)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: "var(--vit-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vit-primary)" }}>
                  <Icon name={b.icon} />
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 4 }}>{b.title}</h4>
                  <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 8. DEPOIMENTOS
// ═══════════════════════════════════════════════════════════════════
function DepoimentosSection() {
  return (
    <section id="depoimentos" style={{ padding: "100px 24px", background: "linear-gradient(180deg, var(--vit-primary-50) 0%, var(--vit-cream) 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <AnimatedSection><SectionTitle badge="Depoimentos" title="O que dizem sobre a Vittalis Saúde" subtitle="A confiança e o carinho das famílias que cuidamos é nosso maior reconhecimento." /></AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {DEPOIMENTOS.map((d, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div style={{ padding: "32px 28px", borderRadius: 20, background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid var(--vit-gray-100)", transition: "all 0.3s ease", height: "100%", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,184,192,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"; }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 18, color: "var(--vit-gold)" }}>
                  {[...Array(d.rating)].map((_, j) => <span key={j}>{icons.star}</span>)}
                </div>
                <p style={{ fontSize: 15, color: "var(--vit-gray-700)", lineHeight: 1.7, fontStyle: "italic", flex: 1, marginBottom: 20 }}>
                  &ldquo;{d.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 18, borderTop: "1px solid var(--vit-gray-100)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--vit-primary-light), #C8EDE9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--vit-primary)" }}>
                    {d.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-charcoal)" }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: "var(--vit-gray-500)" }}>{d.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 9. FAQ
// ═══════════════════════════════════════════════════════════════════
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "100px 24px", background: "var(--vit-white)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <AnimatedSection><SectionTitle badge="Dúvidas Frequentes" title="Tire suas dúvidas sobre a Vittalis Saúde" subtitle="Encontre respostas rápidas sobre nossos serviços, agendamento e atendimento." /></AnimatedSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_DATA.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.04}>
              <div style={{ borderRadius: 16, background: open === i ? "var(--vit-primary-50)" : "var(--vit-cream)", border: `1px solid ${open === i ? "rgba(0,184,192,0.12)" : "var(--vit-gray-100)"}`, overflow: "hidden", transition: "all 0.3s ease" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.4, paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none", color: "var(--vit-primary)" }}>
                    {icons.chevronDown}
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ padding: "0 24px 20px", fontSize: 15, color: "var(--vit-gray-500)", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 10. CTA FINAL
// ═══════════════════════════════════════════════════════════════════
function CTAFinalSection() {
  return (
    <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, var(--vit-secondary-dark) 0%, var(--vit-secondary) 50%, var(--vit-primary-dark) 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <AnimatedSection>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", fontSize: 13, fontWeight: 600, padding: "6px 16px", borderRadius: 100, marginBottom: 24, letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {icons.heart} Fale Conosco
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 600, color: "white", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
            Agende sua consulta na <em>Vittalis Saúde</em>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: 36 }}>
            Atendimento na clínica ou no conforto da sua casa. Agendar consulta, vacinação ou avaliação e descubra a experiência Vittalis Saúde.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <CTAButton variant="white" size="lg">Agende pelo WhatsApp</CTAButton>
            <CTAButton variant="gold" size="lg" href={`tel:${BRAND.phone.replace(/\D/g, "")}`}>
              {icons.phone} Ligar Agora
            </CTAButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 11. FOOTER
// ═══════════════════════════════════════════════════════════════════
function Footer() {
  const linkStyle: React.CSSProperties = { color: "var(--vit-gray-500)", fontSize: 14, lineHeight: 2, transition: "color 0.2s", display: "block" };

  return (
    <footer style={{ padding: "64px 24px 0", background: "var(--vit-charcoal)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img src="/images/logo-vertical.png" alt="Vittalis Saúde" style={{ height: 40, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Clínica multidisciplinar premium em São Luís. Consultas médicas, vacinação particular e terapias para toda a família.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[{ icon: "instagram", href: "https://www.instagram.com/vittalissaudeslz/" }].map(({ icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--vit-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>Navegação</h4>
            {["Início", "Especialidades", "Vacinação", "Sobre", "Depoimentos", "FAQ"].map(l => (
              <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--vit-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--vit-gray-500)")}>{l}</a>
            ))}
          </div>

          {/* Especialidades */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>Especialidades</h4>
            {["Pediatria", "Ginecologia", "Vacinação", "Psicologia", "Fonoaudiologia", "Fisioterapia", "Nutrição"].map(s => (
              <span key={s} style={{ ...linkStyle, cursor: "default" }}>{s}</span>
            ))}
          </div>

          {/* Contato */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>Contato</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--vit-primary)" }}>
                {icons.phone}
                <a href="tel:5598984221002" style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.5, textDecoration: "none" }}>{BRAND.phone}</a>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--vit-primary)" }}>
                {icons.mail}
                <a href="mailto:contato@vittalissaude.com.br" style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.5, textDecoration: "none" }}>{BRAND.email}</a>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--vit-primary)" }}>
                {icons.mapPin}
                <a href="https://maps.app.goo.gl/35Vernq6NtWw9vBLA" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.5, textDecoration: "none" }}>{BRAND.address} ↗</a>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--vit-primary)" }}>
                {icons.clock}
                <div style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.5 }}>
                  <div>{BRAND.hours.week}</div>
                  <div>{BRAND.hours.sat}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} Vittalis Saúde. Todos os direitos reservados.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Este site respeita a sua privacidade conforme a LGPD.</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ═══════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <DiferenciaisSection />
      <EspecialidadesSection />
      <VacinacaoSection />
      <MultidisciplinarSection />
      <SobreSection />
      <BeneficiosSection />
      <DepoimentosSection />
      <FAQSection />
      <CTAFinalSection />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
