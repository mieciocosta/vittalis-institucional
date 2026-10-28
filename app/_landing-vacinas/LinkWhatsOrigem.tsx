"use client";

import type { ReactNode } from "react";
import { trackCampanha } from "@/lib/analytics";
import { capturarUtms } from "@/lib/campanhas/utm";
import { comOrigem } from "@/lib/campanhas/origem";
import { linkWhatsApp } from "@/lib/config/contato";
import { registrarCliquePlanilha } from "@/lib/planilha";

/**
 * Botão de WhatsApp da landing de vacinação. O HTML sai com a mensagem do
 * produto; no toque, o link ganha a origem guardada ("[origem: google/cpc/
 * vacinas]"), que o servidor não conhece. Trocar o href dentro do onClick
 * funciona porque o navegador só segue o link depois do clique terminar.
 * Também conta o toque: evento neutro no GA4 e linha na aba Cliques.
 */
export function LinkWhatsOrigem({
  mensagem,
  slug,
  nomeCampanha,
  className,
  children,
  ariaLabel,
}: {
  mensagem: string;
  slug: string;
  /** Aparece na aba Cliques da planilha (ex.: "Vacinação: Pacote Gestante"). */
  nomeCampanha: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={linkWhatsApp({ mensagem })}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.currentTarget.href = linkWhatsApp({ mensagem: comOrigem(mensagem) });
        trackCampanha("click_whatsapp", { campaign_slug: slug, ...capturarUtms() });
        registrarCliquePlanilha("whatsapp", { slug, nome: nomeCampanha });
      }}
    >
      {children}
    </a>
  );
}
