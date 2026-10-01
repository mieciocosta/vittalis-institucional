// ═══════════════════════════════════════════════════════════════
// IDENTIFICAÇÃO LEGAL DA CLÍNICA
//
// A Resolução CFM 2.336/2023 exige a identificação do responsável
// técnico na divulgação. Aparece no rodapé do site e na Política de
// Privacidade.
//
// NÃO invente nomes nem números aqui. Enquanto o campo for `null`, a
// linha não aparece no site (para não publicar "pendente").
// ═══════════════════════════════════════════════════════════════

export const LEGAL = {
  razaoSocial: "Santos Costa Comércio de Vacinas Ltda",
  nomeFantasia: "Vittalis Saúde",
  cnpj: "35.857.936/0001-18",
  endereco: "Av. Coronel Colares Moreira, nº 3, Salas 36/37, Jardim Renascença, São Luís/MA",
  email: "atendimento@vittalissaude.com.br",

  // TODO(pendente): nome completo do responsável técnico.
  responsavelTecnicoNome: null as string | null,
  // TODO(pendente): conselho e número, ex.: "CRM-MA 0000" ou "COREN-MA 000000".
  responsavelTecnicoRegistro: null as string | null,
  // TODO(pendente): número da licença sanitária (Vigilância Sanitária).
  licencaSanitaria: null as string | null,
};

/** "Nome, CRM-MA 0000" quando os dois estiverem preenchidos; senão, null. */
export function responsavelTecnico(): string | null {
  const { responsavelTecnicoNome: nome, responsavelTecnicoRegistro: registro } = LEGAL;
  return nome && registro ? `${nome}, ${registro}` : null;
}
