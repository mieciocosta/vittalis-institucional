import { LandingVacinas, metadadosDaVariante } from "../_landing-vacinas/LandingVacinas";

// Landing de vacinação para Google Ads e Meta Ads (texto em lib/content/vacinacao.ts).
export const metadata = metadadosDaVariante("vacinacao");

export default function Pagina() {
  return <LandingVacinas variante="vacinacao" />;
}
