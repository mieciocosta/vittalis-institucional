import type { MetadataRoute } from "next";
import { CAMPANHAS } from "@/lib/content/campanhas";
import { getAllSlugs } from "@/lib/specialties";
import { SITE_URL } from "@/lib/config/contato";

// Site estático: o sitemap é gerado uma vez no build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...getAllSlugs().map((slug) => ({ url: `${SITE_URL}/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...CAMPANHAS.map((c) => ({ url: `${SITE_URL}/campanhas/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
