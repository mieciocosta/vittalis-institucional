// UTMs do anúncio que trouxe a pessoa (guardadas por 30 dias junto com o
// resto da origem: ver lib/campanhas/atribuicao.ts). Vão só no corpo do
// envio para a planilha, no texto do WhatsApp e nos eventos neutros, nunca
// na URL.

import { capturarAtribuicao, CHAVES_UTM, type Utms } from "./atribuicao";

export { CHAVES_UTM, type Utms };

export function capturarUtms(): Utms {
  return capturarAtribuicao().utms;
}
