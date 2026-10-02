// Prepara as fotos e os vídeos REAIS da clínica para as landing pages.
//
// Uso:
//   1. Coloque os originais em midia-original/ (fora do git), por exemplo
//      midia-original/recepcao.jpg ou midia-original/tour.mp4
//   2. node scripts/preparar-midia.mjs
//   3. Copie o trecho que o script imprime para MIDIA em lib/content/campanhas.ts
//
// Saída com nomes neutros (foto-01, video-01), sem dado de saúde no nome:
//   fotos  → public/images/campanhas/foto-NN-{480,768,1280}.webp
//   vídeos → public/videos/campanhas/video-NN.mp4 (H.264, até 720p, ~2 Mbps,
//            com "faststart" para começar a tocar antes de baixar tudo)
//            + capa public/videos/campanhas/video-NN-capa.webp
// Limite do Cloudflare Pages: 25 MB por arquivo. O script avisa se passar.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ORIGEM = "midia-original";
const LARGURAS = [480, 768, 1280];
const FOTOS_DIR = "public/images/campanhas";
const VIDEOS_DIR = "public/videos/campanhas";
mkdirSync(FOTOS_DIR, { recursive: true });
mkdirSync(VIDEOS_DIR, { recursive: true });

const arquivos = readdirSync(ORIGEM).filter((n) => !n.startsWith(".")).sort();
const fotos = arquivos.filter((n) => /\.(jpe?g|png|webp|heic|heif)$/i.test(n));
const videos = arquivos.filter((n) => /\.(mp4|mov|m4v|webm|3gp)$/i.test(n));
const nn = (i) => String(i + 1).padStart(2, "0");
const saida = { fotos: [], video: undefined };

for (const [i, nome] of fotos.entries()) {
  const base = `foto-${nn(i)}`;
  // .rotate() aplica a orientação do celular (EXIF) antes de redimensionar;
  // o EXIF (com GPS, modelo do aparelho etc.) NÃO vai para o arquivo final.
  let dims;
  for (const w of LARGURAS) {
    const info = await sharp(join(ORIGEM, nome)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(FOTOS_DIR, `${base}-${w}.webp`));
    if (w === 1280) dims = info;
  }
  console.log(`foto  ${nome} → ${base} (${dims.width}x${dims.height})`);
  saida.fotos.push({ arquivo: base, alt: `DESCREVER: ${nome}`, largura: dims.width, altura: dims.height });
}

for (const [i, nome] of videos.entries()) {
  const base = `video-${nn(i)}`;
  const destino = join(VIDEOS_DIR, `${base}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", join(ORIGEM, nome),
    "-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-maxrate", "2.5M", "-bufsize", "5M",
    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-map_metadata", "-1", destino]);
  const capaTmp = join(VIDEOS_DIR, `${base}-capa.png`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1", "-i", destino, "-frames:v", "1", capaTmp]);
  await sharp(capaTmp).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(VIDEOS_DIR, `${base}-capa.webp`));
  execFileSync("rm", ["-f", capaTmp]);
  const mb = statSync(destino).size / 1024 / 1024;
  console.log(`vídeo ${nome} → ${base}.mp4 (${mb.toFixed(1)} MB)${mb > 25 ? "  ⚠️ passa de 25 MB: o Cloudflare Pages recusa" : ""}`);
  if (!saida.video) saida.video = { arquivo: `/videos/campanhas/${base}.mp4`, poster: `/videos/campanhas/${base}-capa.webp`, titulo: "DESCREVER" };
}

console.log("\nCole em MIDIA (lib/content/campanhas.ts) e troque os DESCREVER:\n");
console.log(JSON.stringify(saida, null, 2));
