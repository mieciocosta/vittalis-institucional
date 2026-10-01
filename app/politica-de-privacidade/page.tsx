import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL, responsavelTecnico } from "@/lib/legal";

// Política de Privacidade (LGPD, Lei 13.709/2018). Rascunho para revisão
// jurídica: ajustar com o advogado da clínica.

export const metadata: Metadata = {
  title: "Política de Privacidade | Vittalis Saúde",
  description: "Como a Vittalis Saúde trata os dados enviados pelo site, com base na Lei Geral de Proteção de Dados.",
  alternates: { canonical: "https://www.vittalissaude.com.br/politica-de-privacidade" },
};

const ATUALIZADA_EM = "1º de outubro de 2026";

const cor = { texto: "#374544", titulo: "#1A2B2A", link: "#185C74" };

export default function PoliticaDePrivacidade() {
  const rt = responsavelTecnico();
  const email = <a href={`mailto:${LEGAL.email}`} style={{ color: cor.link, fontWeight: 600 }}>{LEGAL.email}</a>;
  return (
    <div style={{ background: "#FAFBF9", minHeight: "100vh", color: cor.texto }}>
      <header style={{ background: "white", borderBottom: "1px solid #E8EDEC" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-horizontal.png" alt="Vittalis Saúde" style={{ width: 150, height: "auto" }} />
          </Link>
          <Link href="/" style={{ color: cor.link, fontWeight: 600, fontSize: 15 }}>← Voltar ao site</Link>
        </div>
      </header>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "40px 20px 64px", fontSize: 17, lineHeight: 1.7 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 6vw, 48px)", fontWeight: 600, color: cor.titulo, lineHeight: 1.1 }}>
          Política de Privacidade
        </h1>
        <p style={{ marginTop: 8, color: "#5A706E" }}>Última atualização: {ATUALIZADA_EM}.</p>

        <Bloco titulo="1. Quem cuida dos seus dados">
          <p>
            O controlador dos dados é a {LEGAL.razaoSocial} (nome fantasia {LEGAL.nomeFantasia}), CNPJ {LEGAL.cnpj}, com endereço na {LEGAL.endereco}.
            Para qualquer assunto sobre seus dados, escreva para {email}.
          </p>
        </Bloco>

        <Bloco titulo="2. Quais dados coletamos no site">
          <ul style={{ paddingLeft: 22 }}>
            <li>Quando você preenche um formulário: nome e telefone ou WhatsApp, e as informações que você escolher enviar no contato.</li>
            <li>Informações da campanha ou do link que trouxe você ao site, como a origem do anúncio. Elas não identificam você.</li>
            <li>Dados de navegação coletados por ferramentas de medição (Google Analytics e Google Tag Manager), como páginas visitadas e tipo de aparelho.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            O site não pede informações de saúde, documentos, diagnóstico ou histórico. Esses assuntos são tratados apenas no atendimento, com a equipe.
          </p>
        </Bloco>

        <Bloco titulo="3. Para que usamos">
          <p>
            Os dados de contato servem só para a equipe falar com você e organizar o atendimento que você pediu. Os dados de navegação ajudam a entender
            quais páginas são mais úteis e a melhorar o site.
          </p>
        </Bloco>

        <Bloco titulo="4. Base legal">
          <p>
            O contato é feito com base no seu consentimento (art. 7º, I, da LGPD) e nos procedimentos preliminares ao atendimento que você solicitou
            (art. 7º, V). Você pode retirar o consentimento quando quiser.
          </p>
        </Bloco>

        <Bloco titulo="5. Com quem compartilhamos">
          <p>
            Não vendemos nem cedemos seus dados. Eles passam apenas pelos serviços que fazem o site e o atendimento funcionarem: a hospedagem do site
            (Cloudflare), os canais de atendimento (telefone e WhatsApp) e as ferramentas de medição do Google. Esses parceiros tratam os dados seguindo
            nossas instruções.
          </p>
        </Bloco>

        <Bloco titulo="6. Por quanto tempo guardamos">
          <p>
            Os dados de contato ficam guardados pelo tempo necessário para o retorno e o atendimento, ou até você pedir a exclusão, salvo quando a lei
            exigir guarda por mais tempo.
          </p>
        </Bloco>

        <Bloco titulo="7. Seus direitos">
          <p>
            Você pode pedir a confirmação de que tratamos seus dados, o acesso, a correção, a exclusão, a portabilidade e informações sobre o
            compartilhamento, além de retirar o consentimento (art. 18 da LGPD). Basta escrever para {email}.
          </p>
        </Bloco>

        <Bloco titulo="8. Cookies e medição">
          <p>
            O site usa cookies do Google Analytics e do Google Tag Manager para medir visitas. Você pode bloquear ou apagar cookies nas configurações do
            seu navegador, sem prejuízo para o uso das páginas.
          </p>
        </Bloco>

        <Bloco titulo="9. Mudanças nesta política">
          <p>Esta política pode ser atualizada. A data da última versão fica sempre no topo da página.</p>
        </Bloco>
      </main>

      <footer style={{ background: "#1A2B2A", color: "#A3B5B3", fontSize: 14, lineHeight: 1.7 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px" }}>
          <p>{LEGAL.razaoSocial} · CNPJ {LEGAL.cnpj}</p>
          <p>{LEGAL.endereco}</p>
          {rt && <p>Responsável técnico: {rt}</p>}
          {LEGAL.licencaSanitaria && <p>Licença sanitária: {LEGAL.licencaSanitaria}</p>}
        </div>
      </footer>
    </div>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 21, fontWeight: 700, color: cor.titulo, marginBottom: 8 }}>{titulo}</h2>
      {children}
    </section>
  );
}
