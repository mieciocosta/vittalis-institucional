import localFont from "next/font/local";

// Fonte do título das campanhas, pré-carregada SÓ nestas páginas.
// Por quê: com a fonte reserva o título quebrava em uma linha a mais e,
// quando a Cormorant chegava, a foto pulava para cima (CLS 0,17 no
// Lighthouse). Pré-carregando os 2 arquivos do título (~50 KB) e usando
// display "block", o título já nasce com a fonte certa e nada se mexe.
export const fonteTitulo = localFont({
  src: [
    { path: "../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
  display: "block",
  preload: true,
  adjustFontFallback: "Times New Roman",
});
