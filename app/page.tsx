import { Inicio } from "./_inicio/Inicio";
import { PERGUNTAS } from "./_inicio/conteudo";

// Página inicial (14/11, refeita no desenho da página de Pediatria, pedido da
// direção). A versão anterior está no histórico do git.
export default function Home() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((p) => ({ "@type": "Question", name: p.pergunta, acceptedAnswer: { "@type": "Answer", text: p.resposta } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Inicio />
    </>
  );
}
