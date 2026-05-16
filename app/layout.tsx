import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-1T4S5WGY9W";

export const metadata: Metadata = {
  title: "Vittalis Saúde — Clínica Premium em São Luís | Consultas, Vacinação e Terapias",
  description:
    "Clínica multidisciplinar premium em São Luís. Consultas médicas, vacinação particular, psicologia, fonoaudiologia, fisioterapia e terapias para crianças, adolescentes, adultos e idosos. Atendimento humanizado e seguro.",
  keywords: [
    "clínica em São Luís", "clínica premium em São Luís", "vacinação particular em São Luís",
    "vacina infantil em São Luís", "planejamento vacinal", "pediatria em São Luís",
    "ginecologia em São Luís", "psicologia infantil", "psicologia ABA", "neuropsicologia",
    "fonoaudiologia", "fisioterapia infantil", "terapia ocupacional", "atendimento multidisciplinar",
    "atendimento domiciliar", "saúde da família", "consultas médicas particulares",
    "clínica com atendimento humanizado", "desenvolvimento infantil", "clínica moderna e acolhedora",
    "neurofeedback",
  ],
  authors: [{ name: "Vittalis Saúde" }],
  creator: "Vittalis Saúde",
  publisher: "Vittalis Saúde",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "pt_BR",
    url: "https://www.vittalissaude.com.br",
    siteName: "Vittalis Saúde",
    title: "Vittalis Saúde — Clínica Premium em São Luís",
    description: "Consultas médicas, vacinação particular, terapias especializadas e acompanhamento multidisciplinar com segurança, acolhimento e estrutura moderna.",
    images: [{ url: "https://www.vittalissaude.com.br/images/og-vittalis.jpg", width: 1200, height: 630, alt: "Vittalis Saúde — Clínica Premium em São Luís" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vittalis Saúde — Clínica Premium em São Luís",
    description: "Consultas médicas, vacinação particular e terapias com atendimento humanizado.",
    images: ["https://www.vittalissaude.com.br/images/og-vittalis.jpg"],
  },
  alternates: { canonical: "https://www.vittalissaude.com.br" },
  metadataBase: new URL("https://www.vittalissaude.com.br"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Vittalis Saúde",
  alternateName: "Clínica Vittalis Saúde",
  description: "Clínica multidisciplinar premium em São Luís — consultas médicas, vacinação particular, psicologia, fonoaudiologia, fisioterapia e terapias para toda a família.",
  url: "https://www.vittalissaude.com.br",
  logo: "https://www.vittalissaude.com.br/images/logo-horizontal.png",
  image: "https://www.vittalissaude.com.br/images/og-vittalis.jpg",
  telephone: "+5598984221002",
  email: "contato@vittalissaude.com.br",
  address: { "@type": "PostalAddress", streetAddress: "Business Center — Av. Coronel Colares Moreira, 3, Sala 36 e 37", addressLocality: "São Luís", addressRegion: "MA", postalCode: "65075-441", addressCountry: "BR" },
  geo: { "@type": "GeoCoordinates", latitude: -2.4966, longitude: -44.2826 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
  ],
  medicalSpecialty: ["Pediatrics","Gynecology","Dermatology","Pulmonology","Psychology","SpeechTherapy","PhysicalTherapy","OccupationalTherapy"],
  priceRange: "$$$",
  areaServed: { "@type": "City", name: "São Luís", containedInPlace: { "@type": "State", name: "Maranhão" } },
  sameAs: ["https://www.instagram.com/vittalissaudeslz/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00B8C0" />
        <link rel="icon" href="/images/icone.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/icone.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MRC6N43D" height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {children}

        {/* ═══════════════════════════════════════════════════════════
            GOOGLE ANALYTICS 4 — ID: G-1T4S5WGY9W
            
            Implementação com next/script (strategy="afterInteractive"):
            - Carrega após a hidratação do React (não bloqueia render)
            - O gtag.js rastreia pageviews automaticamente em
              navegações SPA do App Router do Next.js
            - Compatível com SSR — não causa erros de hidratação
            - Pronto para receber dados em tempo real no GA4
            ═══════════════════════════════════════════════════════════ */}
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MRC6N43D');`}
        </Script>

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
