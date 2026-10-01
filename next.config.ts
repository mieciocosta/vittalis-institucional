import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // CSS embutido no <head>: quem chega pelo anúncio é visitante novo, e o
    // CSS externo travava a primeira pintura (Lighthouse "render-blocking").
    // O CSS do site é pequeno (~5 KB comprimido), então o HTML quase não cresce.
    inlineCss: true,
  },
  images: {
    // Site estático: as larguras das imagens são geradas antes do build
    // (scripts/gerar-imagens-campanhas.mjs) e o loader só escolhe o arquivo.
    loader: "custom",
    loaderFile: "./lib/imagem-loader.ts",
    deviceSizes: [480, 768, 1280],
    imageSizes: [384],
  },
};

export default nextConfig;
