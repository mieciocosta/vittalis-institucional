"use client";

import { useEffect } from "react";
import { capturarUtms } from "@/lib/campanhas/utm";
import { capturarOrigem } from "@/lib/campanhas/origem";

// Guarda, já na primeira página que a pessoa abre, as UTMs do anúncio e de
// onde ela veio. Assim o contato deixado em qualquer página do site chega
// na planilha com a origem certa. Não desenha nada.
export function CapturaOrigem() {
  useEffect(() => {
    capturarUtms();
    capturarOrigem();
  }, []);
  return null;
}
