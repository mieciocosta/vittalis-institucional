// Gera as imagens leves das campanhas a partir das fotos originais.
// Rodar só quando trocar uma foto: `node scripts/gerar-imagens-campanhas.mjs`.
// As saídas vão para o git (o build do Cloudflare não precisa do sharp).
//
// Por que: as fotos originais têm de 6 a 8 MB. Página lenta derruba o
// Lighthouse e encarece o anúncio. Cada largura aqui casa com o loader
// de imagens em lib/imagem-loader.ts.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

export const LARGURAS = [480, 768, 1280];

// arquivo de saída (nome neutro) ← foto original
const FOTOS = {
  "pv-hero": "public/images/pediatria_01.jpg",
  "pm-hero": "public/images/vittalis_pediatria_2.png",
  "ad50-hero": "public/images/clinica_geral_02.jpg",
};

await mkdir("public/images/campanhas", { recursive: true });
for (const [saida, origem] of Object.entries(FOTOS)) {
  for (const w of LARGURAS) {
    const info = await sharp(origem).resize({ width: w }).webp({ quality: 72 }).toFile(`public/images/campanhas/${saida}-${w}.webp`);
    console.log(`${saida}-${w}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
  }
  const og = saida.replace("-hero", "-og");
  const info = await sharp(origem).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 78, mozjpeg: true }).toFile(`public/images/campanhas/${og}.jpg`);
  console.log(`${og}.jpg`, `${Math.round(info.size / 1024)}KB`);
}

// Logo do topo das campanhas: o original tem 3826 px e quase 400 KB.
// 296 px = 2x a largura exibida (148 px), nítido em tela retina.
const logo = await sharp("public/images/logo-horizontal.png").resize({ width: 296 }).png({ compressionLevel: 9, palette: true }).toFile("public/images/campanhas/logo-topo.png");
console.log("logo-topo.png", `${logo.width}x${logo.height}`, `${Math.round(logo.size / 1024)}KB`);
const rodape = await sharp("public/images/logo-horizontal-branco.png").resize({ width: 300 }).png({ compressionLevel: 9, palette: true }).toFile("public/images/campanhas/logo-rodape.png");
console.log("logo-rodape.png", `${rodape.width}x${rodape.height}`, `${Math.round(rodape.size / 1024)}KB`);
