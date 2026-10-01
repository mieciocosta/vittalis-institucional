// ═══════════════════════════════════════════════════════════════
// IDENTIFICAÇÃO LEGAL DA CLÍNICA
//
// A Resolução CFM 2.336/2023 exige a identificação do responsável
// técnico em toda divulgação. Este bloco aparece no rodapé das páginas
// de campanha e na Política de Privacidade.
//
// NÃO invente nomes nem números aqui. Enquanto o campo for `null`,
// a tela mostra "pendente" e o `npm run check:campanhas` avisa.
// ═══════════════════════════════════════════════════════════════

import { ENDERECO } from "./config/contato";

export const LEGAL = {
  razaoSocial: "Santos Costa Comércio de Vacinas Ltda",
  nomeFantasia: "Vittalis Saúde",
  cnpj: "35.857.936/0001-18",
  endereco: ENDERECO.completo,
  email: "atendimento@vittalissaude.com.br",

  // TODO(pendente): nome completo do responsável técnico.
  responsavelTecnicoNome: null as string | null,
  // TODO(pendente): conselho e número, ex.: "CRM-MA 0000" ou "COREN-MA 000000".
  responsavelTecnicoRegistro: null as string | null,
  // TODO(pendente): número da licença sanitária (Vigilância Sanitária).
  licencaSanitaria: null as string | null,
};

export const PENDENTE = "pendente de preenchimento";

export function responsavelTecnicoTexto(): string {
  const { responsavelTecnicoNome: nome, responsavelTecnicoRegistro: registro } = LEGAL;
  if (!nome && !registro) return PENDENTE;
  return [nome ?? PENDENTE, registro ?? PENDENTE].join(", ");
}
