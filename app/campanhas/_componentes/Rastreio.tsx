"use client";

import type { ReactNode } from "react";
import { trackCampanha, type EventoCampanha } from "@/lib/analytics";
import { capturarUtms } from "@/lib/campanhas/utm";

/** Link comum que dispara um evento neutro de campanha no clique. */
export function LinkRastreado({
  href,
  evento,
  slug,
  className,
  externo,
  children,
  ariaLabel,
}: {
  href: string;
  evento: EventoCampanha;
  slug: string;
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
      onClick={() => trackCampanha(evento, { campaign_slug: slug, ...capturarUtms() })}
    >
      {children}
    </a>
  );
}
