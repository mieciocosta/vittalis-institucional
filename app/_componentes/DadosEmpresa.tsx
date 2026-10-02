import { BRAND } from "@/lib/brand";

// Bloco "Dados da empresa" do rodapé de TODAS as páginas (home,
// especialidades, campanhas, privacidade). Um componente só para o texto
// sair idêntico em todo lugar: a 360dialog confere letra por letra com as
// Informações da empresa da Meta. Os dados moram em lib/brand.ts.

type Cores = { texto: string; titulo: string; link: string };

export function DadosEmpresa({ cores, centralizado = false }: { cores: Cores; centralizado?: boolean }) {
  const linha: React.CSSProperties = { margin: 0 };
  const link: React.CSSProperties = { color: cores.link, textDecoration: "underline" };
  return (
    <section
      aria-label="Dados da empresa"
      style={{ fontSize: 13.5, lineHeight: 1.7, color: cores.texto, textAlign: centralizado ? "center" : "left" }}
    >
      <p style={{ ...linha, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: cores.titulo, marginBottom: 6 }}>
        Dados da empresa
      </p>
      <p style={{ ...linha, color: cores.titulo, fontWeight: 600 }}>
        {BRAND.legalName} · CNPJ {BRAND.cnpj}
      </p>
      <p style={linha}>{BRAND.legalAddress}</p>
      <p style={linha}>
        Telefone: <a href={BRAND.commercialPhoneTel} style={link}>{BRAND.commercialPhone}</a>
      </p>
      <p style={linha}>
        E-mail: <a href={`mailto:${BRAND.email}`} style={link}>{BRAND.email}</a>
      </p>
    </section>
  );
}
