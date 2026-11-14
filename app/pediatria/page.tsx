import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/config/contato";
import { Pediatria } from "./Pediatria";
import { FOTOS, PERGUNTAS } from "./conteudo";

// Página própria de Pediatria (14/11, pedido da direção: "achei a pediatria
// muito parecida com a neuropediatria", com uma clínica pediátrica que
// ranqueia bem no Google como modelo). Os anúncios de pediatria do Google
// levam para cá. Sai do app/[especialidade] (COM_ROTA_PROPRIA).
const TITULO = "Pediatra em São Luís | Consulta Pediátrica e Puericultura | Vittalis Saúde";
const DESCRICAO =
  "Pediatra em São Luís no Jardim Renascença: consulta pediátrica sem pressa, puericultura do recém-nascido ao adolescente e vacinação no mesmo lugar. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: `${SITE_URL}/pediatria` },
  keywords: [
    "pediatra São Luís", "pediatra em São Luís", "clínica pediátrica São Luís", "consulta pediátrica São Luís",
    "puericultura São Luís", "pediatra particular São Luís", "pediatra Renascença", "pediatra Cohama",
    "pediatra Calhau", "pediatra recém-nascido São Luís", "clínica infantil São Luís",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: BRAND.name,
    url: `${SITE_URL}/pediatria`,
    title: TITULO,
    description: DESCRICAO,
    images: [{ url: `${SITE_URL}${FOTOS.capa}`, alt: FOTOS.capaAlt }],
  },
};

export default function Pagina() {
  const clinica = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `Pediatria · ${BRAND.name}`,
    description: DESCRICAO,
    url: `${SITE_URL}/pediatria`,
    medicalSpecialty: "Pediatric",
    telephone: BRAND.commercialPhoneTel.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.street,
      addressLocality: BRAND.city,
      addressRegion: BRAND.state,
      postalCode: BRAND.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: BRAND.lat, longitude: BRAND.lng },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((p) => ({ "@type": "Question", name: p.pergunta, acceptedAnswer: { "@type": "Answer", text: p.resposta } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinica) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Pediatria />
    </>
  );
}
