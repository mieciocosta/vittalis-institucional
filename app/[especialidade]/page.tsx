import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SPECIALTIES, getSpecialty, getAllSlugs } from "@/lib/specialties";
import { BRAND } from "@/lib/brand";
import SpecialtyPageClient from "./SpecialtyPageClient";

// Gera rotas estáticas para todas as especialidades
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ especialidade: slug }));
}

// Gera metadata SEO dinâmico por especialidade
export async function generateMetadata({
  params,
}: {
  params: Promise<{ especialidade: string }>;
}): Promise<Metadata> {
  const { especialidade } = await params;
  const spec = getSpecialty(especialidade);
  if (!spec) return {};

  return {
    title: spec.metaTitle,
    description: spec.metaDescription,
    openGraph: {
      title: spec.metaTitle,
      description: spec.metaDescription,
      url: `${BRAND.siteUrl}/${spec.slug}`,
      siteName: BRAND.name,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: spec.metaTitle,
      description: spec.metaDescription,
    },
    alternates: {
      canonical: `${BRAND.siteUrl}/${spec.slug}`,
    },
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ especialidade: string }>;
}) {
  const { especialidade } = await params;
  const spec = getSpecialty(especialidade);
  if (!spec) notFound();

  // Schema.org para a especialidade
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${spec.name} — ${BRAND.name}`,
    description: spec.description,
    url: `${BRAND.siteUrl}/${spec.slug}`,
    telephone: `+${BRAND.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address,
      addressLocality: BRAND.city,
      addressRegion: BRAND.state,
      postalCode: BRAND.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: BRAND.lat, longitude: BRAND.lng },
  };

  const faqJsonLd = spec.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spec.faq.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <SpecialtyPageClient specialty={spec} />
    </>
  );
}
