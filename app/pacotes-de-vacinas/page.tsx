import { LandingVacinas, metadadosDaVariante } from "../_landing-vacinas/LandingVacinas";

// Landing de vacinação para Google Ads e Meta Ads (texto em lib/content/vacinacao.ts).
export const metadata = metadadosDaVariante("pacotes-de-vacinas");

export default function Pagina() {
  return <LandingVacinas variante="pacotes-de-vacinas" />;
}
