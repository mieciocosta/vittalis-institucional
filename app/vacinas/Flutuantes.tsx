"use client";

import { useEffect, useState } from "react";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import s from "./vacinas.module.css";

type Atalho = { id: string; rotulo: string; icone: string };

/**
 * Botões flutuantes da landing de vacinas (pedido da direção, 10/11: "site bem
 * premium, com botões flutuantes"):
 * - barra de fases que gruda no topo depois da capa e acende a fase da vez;
 * - botão de WhatsApp flutuante no computador (no celular já existe a barra
 *   fixa do rodapé), que se abre num balão com o convite;
 * - botão "voltar ao topo".
 * Tudo aparece só depois que a pessoa passa da capa, pra não poluir a entrada.
 */
export function Flutuantes({ fases, mensagem, slug, nomeCampanha }: { fases: Atalho[]; mensagem: string; slug: string; nomeCampanha: string }) {
  const [visivel, setVisivel] = useState(false);
  const [ativa, setAtiva] = useState<string>("");

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.75);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });

    const alvos = fases.map((f) => document.getElementById(f.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entradas) => {
        const vistas = entradas.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vistas[0]) setAtiva(vistas[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    alvos.forEach((a) => obs.observe(a));
    return () => {
      window.removeEventListener("scroll", aoRolar);
      obs.disconnect();
    };
  }, [fases]);

  // Mantém o chip da fase ativa à vista na barra (no celular ela rola de lado).
  useEffect(() => {
    if (!ativa) return;
    document.querySelector(`[data-chip="${ativa}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [ativa]);

  return (
    <>
      <nav className={`${s.chips} ${visivel ? s.chipsVisivel : ""}`} aria-label="Ir para a fase da vida">
        <div className={s.chipsTrilho}>
          {fases.map((f) => (
            <a key={f.id} href={`#${f.id}`} data-chip={f.id} className={`${s.chip} ${ativa === f.id ? s.chipAtivo : ""}`}>
              <span aria-hidden>{f.icone}</span> {f.rotulo.replace("Saúde d", "").replace(/^[ao] /, "")}
            </a>
          ))}
        </div>
      </nav>

      <div className={`${s.fab} ${visivel ? s.fabVisivel : ""}`}>
        <span className={s.fabBalao}>
          <strong>Tire suas dúvidas agora</strong>
          A equipe responde no WhatsApp 💬
        </span>
        <LinkWhatsOrigem mensagem={mensagem} slug={slug} nomeCampanha={nomeCampanha} className={s.fabBotao} ariaLabel="Falar com a equipe no WhatsApp">
          <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
        </LinkWhatsOrigem>
      </div>

      <button
        type="button"
        className={`${s.topoFlutuante} ${visivel ? s.topoFlutuanteVisivel : ""}`}
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden><path d="M12 5l-7 7h4.5v7h5v-7H19z" fill="currentColor" /></svg>
      </button>
    </>
  );
}
