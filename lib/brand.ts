// ═══════════════════════════════════════════════════════════════
// VITTALIS SAÚDE — CONFIGURAÇÃO DA MARCA
// Altere aqui endereço, redes sociais etc.
// O número de WhatsApp/telefone NÃO mora mais aqui: fonte única em
// lib/config/contato.ts (variável NEXT_PUBLIC_WHATSAPP_NUMBER).
// ═══════════════════════════════════════════════════════════════

import { WHATSAPP_NUMERO, WHATSAPP_EXIBICAO, linkWhatsApp } from "./config/contato";

export const BRAND = {
  name: "Vittalis Saúde",
  tagline: "Cuidado completo para você e sua família",
  
  // Contato
  whatsappNumber: WHATSAPP_NUMERO,
  whatsappDisplay: WHATSAPP_EXIBICAO,
  // Mensagem neutra (sem nome de serviço, vacina ou doença), igual em todo o site.
  whatsappUrl: linkWhatsApp(),
  phone: WHATSAPP_EXIBICAO,
  email: "atendimento@vittalissaude.com.br",
  
  // Endereço
  address: "Business Center — Av. Coronel Colares Moreira, 3, Sala 36 e 37",
  neighborhood: "Jardim Renascença",
  city: "São Luís",
  state: "MA",
  cep: "65075-441",
  fullAddress: "Business Center — Av. Coronel Colares Moreira, 3, Sala 36 e 37 — Jardim Renascença, São Luís – MA",
  mapsUrl: "https://maps.app.goo.gl/35Vernq6NtWw9vBLA",
  lat: -2.4966,
  lng: -44.2826,
  
  // Horários
  hours: {
    week: "Segunda a Sexta — 08h às 18h",
    sat: "Sábado — 08h às 12h",
  },
  
  // Redes Sociais
  instagram: "https://www.instagram.com/vittalissaudeslz/",
  // facebook: removido — sem página ativa,
  
  // URLs
  siteUrl: "https://vittalissaude.com.br",
  
  // Cores da marca (extraídas da logo oficial)
  colors: {
    primary: "#00B8C0",      // Turquesa — cor principal
    primaryDark: "#009BA2",
    primaryLight: "#E6F8F9",
    primary50: "#F0FBFB",
    secondary: "#207898",    // Azul-petróleo — "Vittalis"
    secondaryDark: "#185C74",
    secondaryLight: "#E8F2F6",
    gold: "#C4973B",         // Dourado accent
    goldLight: "#FBF5E9",
    charcoal: "#1A2B2A",
    gray700: "#374544",
    gray500: "#5A706E",
    gray300: "#A3B5B3",
    gray100: "#E8EDEC",
    cream: "#FAFBF9",
  },

  // Analytics (substitua pelos seus IDs)
  gaId: "", // Ex: "G-XXXXXXXXXX"
  gtmId: "", // Ex: "GTM-XXXXXXX"
  searchConsoleVerification: "",
};

// Função helper para gerar link de WhatsApp com mensagem personalizada
export function waLink(message?: string): string {
  return message ? linkWhatsApp({ mensagem: message }) : linkWhatsApp();
}
