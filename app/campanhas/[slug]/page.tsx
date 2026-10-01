import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAMPANHAS, getCampanha } from "@/lib/content/campanhas";
import { SITE_URL } from "@/lib/config/contato";
import { PaginaCampanha } from "../_componentes/PaginaCampanha";

// Uma página estática por campanha de lib/content/campanhas.ts.
// Slug fora da lista = 404 (nada é gerado na hora: o site é estático).
export const dynamicParams = false;

export function generateStaticParams() {
  return CAMPANHAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampanha(slug);
  if (!c) return {};
  const url = `${SITE_URL}/campanhas/${c.slug}`;
  return {
    title: c.meta.titulo,
    description: c.meta.descricao,
    // As palavras-chave do site inteiro não valem para campanha.
    keywords: null,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Vittalis Saúde",
      url,
      title: c.meta.titulo,
      description: c.meta.descricao,
      images: [{ url: `${SITE_URL}${c.imagemOg}`, width: 1200, height: 630, alt: c.imagem.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.titulo,
      description: c.meta.descricao,
      images: [`${SITE_URL}${c.imagemOg}`],
    },
  };
}

export default async function PaginaDaCampanha({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campanha = getCampanha(slug);
  if (!campanha) notFound();
  return <PaginaCampanha campanha={campanha} />;
}
