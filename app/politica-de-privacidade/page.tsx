import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";
import { SITE_URL } from "@/lib/config/contato";
import { RodapeLegal } from "../campanhas/_componentes/RodapeLegal";
import s from "../campanhas/_componentes/campanha.module.css";

// Rascunho para revisão jurídica: cobre o formulário das campanhas
// (LGPD, Lei 13.709/2018). Ajustar com o advogado da clínica.

export const metadata: Metadata = {
  title: "Política de Privacidade | Vittalis Saúde",
  description: "Como a Vittalis Saúde trata os dados enviados pelo site, com base na Lei Geral de Proteção de Dados.",
  keywords: null,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidade` },
};

const ATUALIZADA_EM = "1º de outubro de 2026";

export default function PoliticaDePrivacidade() {
  return (
    <div className={s.pagina} style={{ paddingBottom: 0 }}>
      <main className={s.secao}>
        <article className={s.container} style={{ maxWidth: 760 }}>
          <p><Link href="/" className={s.contatoLink}>← Voltar ao site</Link></p>
          <h1 className={s.titulo} style={{ marginTop: 16 }}>Política de Privacidade</h1>
          <p className={s.secaoIntro}>Última atualização: {ATUALIZADA_EM}.</p>

          <Bloco titulo="1. Quem cuida dos seus dados">
            <p>
              O controlador dos dados é a {LEGAL.razaoSocial} (nome fantasia {LEGAL.nomeFantasia}), CNPJ {LEGAL.cnpj}, com endereço na{" "}
              {LEGAL.endereco}. Para qualquer assunto sobre seus dados, escreva para{" "}
              <a href={`mailto:${LEGAL.email}`} className={s.contatoLink}>{LEGAL.email}</a>.
            </p>
          </Bloco>

          <Bloco titulo="2. Quais dados coletamos no site">
            <ul style={{ paddingLeft: 20 }}>
              <li>No formulário de contato: nome, telefone ou WhatsApp, para quem é o atendimento e o melhor período para retorno.</li>
              <li>Informações da campanha que trouxe você ao site, como a origem do anúncio. Elas não identificam você.</li>
              <li>Dados de navegação coletados por ferramentas de medição (Google Analytics e Google Tag Manager), como páginas visitadas e tipo de aparelho.</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              O formulário não pede informações de saúde, documentos, diagnóstico ou histórico. Esses assuntos são tratados apenas no
              atendimento, com a equipe.
            </p>
          </Bloco>

          <Bloco titulo="3. Para que usamos">
            <p>
              Os dados do formulário servem só para a equipe entrar em contato e organizar o atendimento que você pediu. Os dados de
              navegação ajudam a entender quais páginas são mais úteis e a melhorar o site.
            </p>
          </Bloco>

          <Bloco titulo="4. Base legal">
            <p>
              O contato é feito com base no seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa de autorização do formulário,
              e nos procedimentos preliminares ao atendimento que você solicitou (art. 7º, V). Você pode retirar o consentimento quando
              quiser.
            </p>
          </Bloco>

          <Bloco titulo="5. Com quem compartilhamos">
            <p>
              Não vendemos nem cedemos seus dados. Eles passam apenas pelos serviços que fazem o site funcionar: a hospedagem (Cloudflare),
              a ferramenta que entrega o contato à nossa equipe e as ferramentas de medição do Google. Esses parceiros tratam os dados
              seguindo nossas instruções.
            </p>
          </Bloco>

          <Bloco titulo="6. Por quanto tempo guardamos">
            <p>
              Os dados do formulário ficam guardados pelo tempo necessário para o retorno e o atendimento, ou até você pedir a exclusão,
              salvo quando a lei exigir guarda por mais tempo.
            </p>
          </Bloco>

          <Bloco titulo="7. Seus direitos">
            <p>
              Você pode pedir a confirmação de que tratamos seus dados, o acesso, a correção, a exclusão, a portabilidade e informações
              sobre o compartilhamento, além de retirar o consentimento (art. 18 da LGPD). Basta escrever para{" "}
              <a href={`mailto:${LEGAL.email}`} className={s.contatoLink}>{LEGAL.email}</a>.
            </p>
          </Bloco>

          <Bloco titulo="8. Cookies e medição">
            <p>
              O site usa cookies do Google Analytics e do Google Tag Manager para medir visitas. Você pode bloquear ou apagar cookies nas
              configurações do seu navegador, sem prejuízo para o uso das páginas.
            </p>
          </Bloco>

          <Bloco titulo="9. Mudanças nesta política">
            <p>Esta política pode ser atualizada. A data da última versão fica sempre no topo da página.</p>
          </Bloco>
        </article>
      </main>
      <RodapeLegal />
    </div>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 32 }}>
      <h2 className={s.cardTitulo} style={{ fontSize: 21, marginBottom: 8 }}>{titulo}</h2>
      <div className={s.cardTexto}>{children}</div>
    </section>
  );
}
