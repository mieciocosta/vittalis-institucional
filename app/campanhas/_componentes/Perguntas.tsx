"use client";

import { useId, useState } from "react";
import type { Pergunta } from "@/lib/content/campanhas";
import s from "./campanha.module.css";

/** Accordion acessível: botão com aria-expanded + região ligada por id. */
export function Perguntas({ itens }: { itens: Pergunta[] }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const base = useId();

  return (
    <div className={s.perguntas}>
      {itens.map((item, i) => {
        const idBotao = `${base}-p${i}`;
        const idResposta = `${base}-r${i}`;
        const expandida = aberta === i;
        return (
          <div key={item.pergunta} className={s.pergunta}>
            <h3>
              <button
                type="button"
                id={idBotao}
                className={s.perguntaBotao}
                aria-expanded={expandida}
                aria-controls={idResposta}
                onClick={() => setAberta(expandida ? null : i)}
              >
                <span>{item.pergunta}</span>
                <svg className={s.perguntaIcone} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div id={idResposta} role="region" aria-labelledby={idBotao} hidden={!expandida} className={s.resposta}>
              <p>{item.resposta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
