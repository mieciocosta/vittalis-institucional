"use client";

import type { ReactNode } from "react";
import { trackCampanha, type EventoCampanha } from "@/lib/analytics";
import { capturarUtms } from "@/lib/campanhas/utm";
import { registrarCliquePlanilha, type Botao } from "@/lib/planilha";

const BOTAO_DO_EVENTO: Partial<Record<EventoCampanha, Botao>> = {
  click_whatsapp: "whatsapp",
  click_phone: "telefone",
  click_maps: "mapa",
};

/**
 * Link comum que, no clique, dispara um evento neutro de campanha e conta o
 * toque na planilha (aba Cliques, sem dado da pessoa).
 */
export function LinkRastreado({
  href,
  evento,
  slug,
  refCampanha,
  nomeCampanha,
  className,
  externo,
  children,
  ariaLabel,
}: {
  href: string;
  evento: EventoCampanha;
  slug: string;
  refCampanha?: string;
  nomeCampanha?: string;
  className?: string;
  externo?: boolean;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        trackCampanha(evento, { campaign_slug: slug, ...capturarUtms() });
        const botao = BOTAO_DO_EVENTO[evento];
        if (botao) registrarCliquePlanilha(botao, { slug, ref: refCampanha, nome: nomeCampanha });
      }}
    >
      {children}
    </a>
  );
}
