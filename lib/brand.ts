// ═══════════════════════════════════════════════════════════════
// VITTALIS SAÚDE — CONFIGURAÇÃO DA MARCA
// Altere aqui os dados da empresa, endereço, redes sociais etc.
// O número (telefone e WhatsApp) mora em lib/config/contato.ts.
// ═══════════════════════════════════════════════════════════════

import { WHATSAPP_NUMERO, WHATSAPP_EXIBICAO, TELEFONE_EXIBICAO, TELEFONE_TEL, linkWhatsApp } from "./config/contato";

// DADOS OFICIAIS DA EMPRESA. A 360dialog confere o rodapé do site contra as
// "Informações da empresa" da Meta: se mudar algo aqui, mude lá também.
// Razão social e CNPJ como estão no cadastro (a razão social em maiúsculas).
const LEGAL_NAME = "SANTOS COSTA COMERCIO DE VACINAS LTDA";
const CNPJ = "35.857.936/0001-18";

// Endereço correto da clínica (20/10, pedido do master). É o que o site
// tinha antes de 01/10; a cópia da Meta ("LOJA 37 3", tudo em maiúsculas)
// estava errada. Fonte única: rodapés, landing pages, Política de
// Privacidade e dados para o Google saem daqui.
const RUA = "Av. Coronel Colares Moreira, nº 3";
const COMPLEMENTO = "Ed. Business Center Renascença, Salas 36 e 37";
const BAIRRO = "Jardim Renascença";
const CIDADE = "São Luís";
const UF = "MA";
const CEP = "65075-441";
// Espaço que não quebra (\u00a0) em "nº 3", "São Luís" e "CEP 65075-441":
// no celular a linha não corta esses pedaços no meio.
const NBSP = "\u00a0";
const LEGAL_ADDRESS = `${RUA.replace(" 3", NBSP + "3")}, ${COMPLEMENTO}, ${BAIRRO}, ${CIDADE.replace(" ", NBSP)}/${UF}, CEP${NBSP}${CEP}`;
// O telefone é o mesmo número do WhatsApp (02/10, pedido do master).
const COMMERCIAL_PHONE = TELEFONE_EXIBICAO;
const COMMERCIAL_PHONE_TEL = TELEFONE_TEL;

export const BRAND = {
  name: "Vittalis Saúde",
  tagline: "Cuidado completo para você e sua família",

  // Dados oficiais (os mesmos das Informações da empresa da Meta)
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
  street: `${RUA}, ${COMPLEMENTO}`,
  neighborhood: BAIRRO,
  city: CIDADE,
  state: UF,
  cep: CEP,
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
  // Perfil: só para o Google saber que é nossa conta (sameAs). Todo botão
  // de Instagram abre o Direct (02/10, pedido do master).
  instagram: "https://www.instagram.com/vittalissaudeslz/",
  instagramDirect: "https://ig.me/m/vittalissaudeslz",
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
