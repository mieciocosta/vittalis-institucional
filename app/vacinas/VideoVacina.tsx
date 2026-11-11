"use client";

import { useRef, useState } from "react";
import s from "./vacinas.module.css";

/**
 * Vídeo da clínica em pé (9:16). Só baixa quando a pessoa toca no play
 * (preload="none"), para a página continuar leve no 4G.
 */
export function VideoVacina({ src, poster, titulo, legenda }: { src: string; poster: string; titulo: string; legenda: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  return (
    <figure className={s.videoCard}>
      <div className={s.videoMoldura}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={tocando}
          className={s.video}
          onEnded={() => setTocando(false)}
          aria-label={titulo}
        />
        {!tocando && (
          <button
            type="button"
            className={s.videoPlay}
            aria-label={`Assistir: ${titulo}`}
            onClick={() => {
              setTocando(true);
              ref.current?.play().catch(() => {});
            }}
          >
            <span className={s.videoPlayIcone} aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <strong>{titulo}</strong>
        <span>{legenda}</span>
      </figcaption>
    </figure>
  );
}
