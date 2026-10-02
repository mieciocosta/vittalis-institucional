// ═══════════════════════════════════════════════════════════════
// VITTALIS SAÚDE — CONFIGURAÇÃO DA MARCA
// Altere aqui os dados da empresa, endereço, redes sociais etc.
// O número de WhatsApp mora em lib/config/contato.ts
// (variável NEXT_PUBLIC_WHATSAPP_NUMBER).
// ═══════════════════════════════════════════════════════════════

import { WHATSAPP_NUMERO, WHATSAPP_EXIBICAO, linkWhatsApp } from "./config/contato";

// DADOS OFICIAIS DA EMPRESA: copiados LETRA POR LETRA das "Informações da
// empresa" do portfólio da Meta (inclusive maiúsculas e "Maranhao" sem
// acento). A 360dialog confere o rodapé do site contra esse cadastro para
// registrar o WhatsApp na API oficial. Não "arrume" a grafia aqui: se o
// cadastro mudar, mude aqui e em nenhum outro lugar.
const LEGAL_NAME = "SANTOS COSTA COMERCIO DE VACINAS LTDA";
const CNPJ = "35.857.936/0001-18";
const LEGAL_ADDRESS = "AVENIDA CEL COLARES MOREIRA, ED. BUSINESS CENTER RENASCENCA LOJA 37 3, RENASCENCA, SAO LUIS, Maranhao 65075-441, Brasil";
const COMMERCIAL_PHONE = "+55 98 98827-8736";
const COMMERCIAL_PHONE_TEL = "tel:+5598988278736";

export const BRAND = {
  name: "Vittalis Saúde",
  tagline: "Cuidado completo para você e sua família",

  // Dados oficiais (iguais às Informações da empresa da Meta)
  legalName: LEGAL_NAME,
  cnpj: CNPJ,
  legalAddress: LEGAL_ADDRESS,
  commercialPhone: COMMERCIAL_PHONE,
  commercialPhoneTel: COMMERCIAL_PHONE_TEL,
  officialSite: "https://vittalissaude.com.br/",

  // Contato
  whatsappNumber: WHATSAPP_NUMERO,
  whatsappDisplay: WHATSAPP_EXIBICAO,
  // Mensagem neutra (sem nome de serviço, vacina ou doença), igual em todo o site.
  whatsappUrl: linkWhatsApp(),
  phone: COMMERCIAL_PHONE,
  email: "atendimento@vittalissaude.com.br",

  // Endereço (o oficial é legalAddress; os campos abaixo servem aos dados
  // estruturados para o Google)
  address: LEGAL_ADDRESS,
  street: "AVENIDA CEL COLARES MOREIRA, ED. BUSINESS CENTER RENASCENCA LOJA 37 3",
  neighborhood: "RENASCENCA",
  city: "SAO LUIS",
  state: "Maranhao",
  cep: "65075-441",
  fullAddress: LEGAL_ADDRESS,
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
