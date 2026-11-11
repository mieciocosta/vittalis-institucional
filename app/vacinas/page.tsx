import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config/contato";
import { VacinasFamilia } from "./VacinasFamilia";

// Landing "Vacinas para toda a família" (pedido da direção, 10/11):
// capa com a família e uma seção por fase da vida (gestante, bebê, criança,
// adolescente, mulher, homem e idoso), com as vacinas de cada faixa etária e
// vídeos reais da clínica. Os anúncios de vacina do Google levam para cá.
const TITULO = "Vacinas para toda a família em São Luís | Vittalis Saúde";
const DESCRICAO =
  "Vacinação particular em São Luís para gestantes, bebês, crianças, adolescentes, adultos e idosos. Na clínica no Jardim Renascença ou na sua casa. Fale com a equipe pelo WhatsApp.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: `${SITE_URL}/vacinas` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Vittalis Saúde",
    url: `${SITE_URL}/vacinas`,
    title: TITULO,
    description: DESCRICAO,
    images: [{ url: `${SITE_URL}/images/otim/vac_familia.webp`, width: 1448, height: 1086, alt: "Família sorrindo junto" }],
  },
};

export default function Pagina() {
  return <VacinasFamilia />;
}
