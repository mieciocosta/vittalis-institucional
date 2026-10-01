"use client";

// Loader do next/image para o site estático (output: "export").
// Sem servidor não existe otimização na hora, então as larguras já vêm
// prontas de scripts/gerar-imagens-campanhas.mjs: "x.webp" vira
// "x-480.webp", "x-768.webp" ou "x-1280.webp", a menor que cubra o pedido.
// Qualquer outra imagem passa direto, sem mudança.

const LARGURAS = [480, 768, 1280];

export default function imagemLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/campanhas/") || !src.endsWith(".webp")) return src;
  const w = LARGURAS.find((l) => l >= width) ?? LARGURAS[LARGURAS.length - 1];
  return src.replace(/\.webp$/, `-${w}.webp`);
}
