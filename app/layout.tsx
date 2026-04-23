import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-1T4S5WGY9W";

export const metadata: Metadata = {
  title: "Vittalis Saúde — Clínica Premium em São Luís | Consultas, Vacinação e Terapias",
  description:
    "Clínica multidisciplinar premium em São Luís. Consultas médicas, vacinação particular, psicologia, fonoaudiologia, fisioterapia e terapias para crianças, adolescentes, adultos e idosos. Atendimento humanizado e seguro.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.vittalissaude.com.br",
    siteName: "Vittalis Saúde",
    title: "Vittalis Saúde — Clínica Premium em São Luís",
    description: "Consultas médicas, vacinação particular, terapias especializadas e acompanhamento multidisciplinar.",
  },
  alternates: { canonical: "https://www.vittalissaude.com.br" },
  metadataBase: new URL("https://www.vittalissaude.com.br"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Vittalis Saúde",
  url: "https://www.vittalissaude.com.br",
  telephone: "+5598984221002",
  email: "contato@vittalissaude.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Business Center — Av. Coronel Colares Moreira, 3, Sala 36 e 37",
    addressLocality: "São Luís",
    addressRegion: "MA",
    postalCode: "65075-441",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: -2.4966, longitude: -44.2826 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
  ],
  sameAs: ["https://instagram.com/vittalissaude", "https://facebook.com/vittalissaude"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00B8C0" />
        <link rel="icon" href="/images/icone.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/icone.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}
