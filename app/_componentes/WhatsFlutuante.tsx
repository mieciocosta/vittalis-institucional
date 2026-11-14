"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import { MENSAGEM_NEUTRA, WHATSAPP_TERAPIAS, mensagemComReferencia, usaWhatsappTerapias } from "@/lib/config/contato";
import { getCampanha } from "@/lib/content/campanhas";
import { getSpecialty } from "@/lib/specialties";
import s from "./whatsFlutuante.module.css";

// Botão do WhatsApp chamativo e convidativo em TODAS as páginas (14/11,
// pedido da direção). Fica fixo no canto, flutua de leve, tem a onda verde
// em volta e, depois de alguns segundos, um balão convidando a conversar.
// Número: especialidades (consultas e terapias) e pediatria vão pro setor de
// terapias (usaWhatsappTerapias); vacinação, home e o resto, pra central.
// No celular, as páginas que já têm a barra fixa de WhatsApp embaixo não
// mostram este botão (pra não ter dois); nas outras ele aparece redondo.

const PAGINAS_COM_BARRA = ["", "vacinas", "vacinacao", "planos-vacinais", "pacotes-de-vacinas", "campanhas", "pediatria"];

function destino(caminho: string) {
  const slug = caminho.split("/").filter(Boolean)[0] ?? "";
  if (slug === "pediatria") {
    return { slug, numero: WHATSAPP_TERAPIAS, mensagem: "Olá! Vim pelo site da Vittalis e gostaria de agendar uma consulta com a pediatria.", barra: true, nome: "Pediatria" };
  }
  // Campanhas: a mesma mensagem neutra com a referência da campanha (regra do check-campanhas).
  if (slug === "campanhas") {
    const c = getCampanha(caminho.split("/").filter(Boolean)[1] ?? "");
    return { slug: c?.slug ?? slug, numero: undefined, mensagem: mensagemComReferencia(c?.ref), barra: true, nome: c ? `Campanha ${c.slug}` : "Campanhas" };
  }
  const esp = slug ? getSpecialty(slug) : undefined;
  if (esp) {
    const terapias = usaWhatsappTerapias(esp);
    return {
      slug,
      numero: terapias ? WHATSAPP_TERAPIAS : undefined,
      mensagem: `Olá! Vim pelo site da Vittalis e gostaria de agendar: ${esp.name}.`,
      barra: true,
      nome: esp.name,
    };
  }
  return { slug: slug || "home", numero: undefined, mensagem: MENSAGEM_NEUTRA, barra: PAGINAS_COM_BARRA.includes(slug), nome: slug || "Home" };
}

export function WhatsFlutuante() {
  const caminho = usePathname() || "/";
  const d = destino(caminho);
  const [balao, setBalao] = useState(false);
  const [fechado, setFechado] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let jaFechou = false;
      try { jaFechou = sessionStorage.getItem("vit_balao_wa") === "1"; } catch {}
      if (!jaFechou) setBalao(true);
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  // /vacinas já tem o botão flutuante dela (com balão e a mensagem da página).
  if (caminho.startsWith("/politica") || caminho.startsWith("/vacinas")) return null;

  function fecharBalao() {
    setBalao(false);
    setFechado(true);
    try { sessionStorage.setItem("vit_balao_wa", "1"); } catch {}
  }

  return (
    <div className={`${s.caixa} ${d.barra ? s.soComputador : ""}`}>
      {balao && !fechado && (
        <div className={s.balao} role="status">
          <button type="button" className={s.fechar} onClick={fecharBalao} aria-label="Fechar">×</button>
          <strong>👋 Olá! Posso te ajudar?</strong>
          <span>A equipe da Vittalis responde no WhatsApp e já agenda pra você.</span>
        </div>
      )}
      <LinkWhatsOrigem
        mensagem={d.mensagem}
        slug={d.slug}
        nomeCampanha={`Botão flutuante: ${d.nome}`}
        numero={d.numero}
        className={s.botao}
        ariaLabel="Agendar pelo WhatsApp"
      >
        <span className={s.icone} aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" /></svg>
          <span className={s.online} />
        </span>
        <span className={s.texto}>
          <small>Fale com a gente</small>
          Agendar pelo WhatsApp
        </span>
      </LinkWhatsOrigem>
    </div>
  );
}
