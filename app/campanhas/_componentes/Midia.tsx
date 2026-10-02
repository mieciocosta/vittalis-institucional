"use client";

import Image from "next/image";
import { useState } from "react";
import type { Midia } from "@/lib/content/campanhas";
import { Ico } from "./Icones";
import s from "./campanha.module.css";

// Seção "Conheça a Vittalis": fotos reais e um vídeo curto, sem pesar a
// página. As fotos são leves (WebP em 3 larguras) e carregam só quando a
// pessoa chega na seção. O vídeo mostra a capa e só baixa quando a pessoa
// toca no play (nada de vídeo tocando sozinho com som).

export function SecaoMidia({ midia }: { midia: Midia }) {
  const [tocando, setTocando] = useState(false);
  const { fotos, video } = midia;
  if (fotos.length === 0 && !video) return null;

  return (
    <section className={s.secao} aria-labelledby="conheca">
      <div className={s.container}>
        <div className={s.secaoCabeca}>
          <p className={s.etiqueta}>Por dentro da clínica</p>
          <h2 id="conheca" className={s.secaoTitulo}>Conheça a Vittalis</h2>
        </div>

        {video && (
          <figure className={s.video}>
            {tocando ? (
              <video className={s.videoPlayer} src={video.arquivo} poster={video.poster} controls autoPlay playsInline preload="auto">
                Seu navegador não reproduz este vídeo.
              </video>
            ) : (
              <button type="button" className={s.videoCapa} onClick={() => setTocando(true)} aria-label={`Assistir: ${video.titulo}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.poster} alt="" className={s.videoPoster} loading="lazy" decoding="async" />
                <span className={s.videoPlay} aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
              </button>
            )}
            <figcaption className={s.videoLegenda}>
              <strong>{video.titulo}</strong>
              {video.legenda && <> · {video.legenda}</>}
            </figcaption>
          </figure>
        )}

        {fotos.length > 0 && (
          <>
            <ul className={s.galeria} aria-label="Fotos da clínica">
              {fotos.map((f) => (
                <li key={f.arquivo} className={s.galeriaItem}>
                  <figure>
                    <Image
                      src={`/images/campanhas/${f.arquivo}.webp`}
                      alt={f.alt}
                      width={f.largura}
                      height={f.altura}
                      sizes="(min-width: 1024px) 360px, 80vw"
                      className={s.galeriaFoto}
                      loading="lazy"
                    />
                    {f.legenda && <figcaption className={s.galeriaLegenda}>{f.legenda}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
            {fotos.length > 1 && (
              <p className={s.galeriaDica} aria-hidden="true">
                <Ico nome="seta" tamanho={16} /> Deslize para ver mais
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
