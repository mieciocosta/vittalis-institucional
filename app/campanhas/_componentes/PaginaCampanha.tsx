import Link from "next/link";
import Image from "next/image";
import type { Campanha } from "@/lib/content/campanhas";
import { DIFERENCIAIS, RESSALVA } from "@/lib/content/campanhas";
import { ENDERECO, HORARIOS, TELEFONE_TEL, WHATSAPP_EXIBICAO, linkWhatsApp } from "@/lib/config/contato";
import { LinkRastreado } from "./Rastreio";
import { Perguntas } from "./Perguntas";
import { Formulario } from "./Formulario";
import { RodapeLegal } from "./RodapeLegal";
import s from "./campanha.module.css";

// Estrutura fixa de toda campanha. O texto vem de lib/content/campanhas.ts.
// Ação principal = formulário. WhatsApp é sempre a secundária, com a
// mensagem neutra e o código de referência da campanha.

const CTA_PRINCIPAL = "Quero ser atendido(a)";

function IconeWhats() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

function Icone({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const ICONE_LOCAL = "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z";
const ICONE_RELOGIO = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2";
const ICONE_TELEFONE = "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z";

export function PaginaCampanha({ campanha: c }: { campanha: Campanha }) {
  const whats = linkWhatsApp({ ref: c.ref });

  return (
    <div className={s.pagina}>
      <a href="#conteudo" className={s.pular}>Pular para o conteúdo</a>

      <header className={s.topo}>
        <div className={`${s.container} ${s.topoInterno}`}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/campanhas/logo-topo.png" alt="Vittalis Saúde" width={296} height={40} className={s.logo} unoptimized />
          </Link>
          <LinkRastreado href={TELEFONE_TEL} evento="click_phone" slug={c.slug} className={s.topoTelefone}>
            <Icone d={ICONE_TELEFONE} /> {WHATSAPP_EXIBICAO}
          </LinkRastreado>
        </div>
      </header>

      <main id="conteudo">
        {/* 1. Hero */}
        <section className={s.hero} aria-labelledby="titulo-campanha">
          <div className={`${s.container} ${s.heroGrade}`}>
            <div>
              <p className={s.rotulo}>{c.rotulo}</p>
              <h1 id="titulo-campanha" className={s.titulo}>{c.titulo}</h1>
              <p className={s.subtitulo}>{c.subtitulo}</p>
              <div className={s.botoes}>
                <a href="#formulario" className={`${s.botao} ${s.botaoPrimario}`}>{CTA_PRINCIPAL}</a>
                <LinkRastreado href={whats} evento="click_whatsapp" slug={c.slug} externo className={`${s.botao} ${s.botaoSecundario}`}>
                  <IconeWhats /> Falar no WhatsApp
                </LinkRastreado>
              </div>
              <p className={s.ressalvaHero}>{RESSALVA}</p>
            </div>
            <Image
              src={`/images/campanhas/${c.imagem.arquivo}.webp`}
              alt={c.imagem.alt}
              width={c.imagem.largura}
              height={c.imagem.altura}
              sizes="(min-width: 1024px) 540px, 100vw"
              className={s.heroImagem}
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </section>

        {/* 2. Como funciona */}
        <section className={s.secao} aria-labelledby="como-funciona">
          <div className={s.container}>
            <h2 id="como-funciona" className={s.secaoTitulo}>Como funciona</h2>
            <ol className={s.passos}>
              {c.passos.map((p) => (
                <li key={p.titulo} className={s.passo}>
                  <h3 className={s.cardTitulo}>{p.titulo}</h3>
                  <p className={s.cardTexto}>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. O que é importante saber */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="importante-saber">
          <div className={s.container}>
            <h2 id="importante-saber" className={s.secaoTitulo}>{c.saber.titulo}</h2>
            <p className={s.secaoIntro}>{c.saber.introducao}</p>
            <div className={s.cards}>
              {c.saber.cards.map((card) => (
                <article key={card.titulo} className={s.card}>
                  <h3 className={s.cardTitulo}>{card.titulo}</h3>
                  <p className={s.cardTexto}>{card.texto}</p>
                </article>
              ))}
            </div>
            <p className={s.ressalva}>{RESSALVA}</p>
          </div>
        </section>

        {/* 4. Diferenciais */}
        <section className={s.secao} aria-labelledby="diferenciais">
          <div className={s.container}>
            <h2 id="diferenciais" className={s.secaoTitulo}>Por que a Vittalis</h2>
            <div className={`${s.cards} ${s.cardsQuatro}`}>
              {DIFERENCIAIS.map((d) => (
                <article key={d.titulo} className={`${s.card} ${s.cardDiferencial}`}>
                  <h3 className={s.cardTitulo}>{d.titulo}</h3>
                  <p className={s.cardTexto}>{d.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Perguntas frequentes */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="perguntas">
          <div className={s.container}>
            <h2 id="perguntas" className={s.secaoTitulo}>Perguntas frequentes</h2>
            <Perguntas itens={c.perguntas} />
          </div>
        </section>

        {/* 6. Formulário, endereço e telefone */}
        <section id="formulario" className={s.secao} aria-labelledby="fale-com-a-equipe">
          <div className={s.container}>
            <h2 id="fale-com-a-equipe" className={s.secaoTitulo}>Fale com a equipe</h2>
            <div className={s.contatoGrade}>
              <Formulario slug={c.slug} titulo={c.formulario.titulo} texto={c.formulario.texto} />

              <div className={s.contatoInfo}>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Icone d={ICONE_LOCAL} /></span>
                  <div>
                    <p className={s.contatoRotulo}>Endereço</p>
                    <p className={s.contatoTexto}>{ENDERECO.completo}</p>
                    <LinkRastreado href={ENDERECO.mapsUrl} evento="click_maps" slug={c.slug} externo className={s.contatoLink}>
                      Abrir no Google Maps
                    </LinkRastreado>
                  </div>
                </div>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Icone d={ICONE_RELOGIO} /></span>
                  <div>
                    <p className={s.contatoRotulo}>Horário</p>
                    <p className={s.contatoTexto}>{HORARIOS.semana}<br />{HORARIOS.sabado}</p>
                  </div>
                </div>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Icone d={ICONE_TELEFONE} /></span>
                  <div>
                    <p className={s.contatoRotulo}>Telefone e WhatsApp</p>
                    <LinkRastreado href={TELEFONE_TEL} evento="click_phone" slug={c.slug} className={s.contatoLink}>
                      {WHATSAPP_EXIBICAO}
                    </LinkRastreado>
                  </div>
                </div>
                <iframe
                  className={s.mapa}
                  src={ENDERECO.mapaEmbed}
                  title="Mapa com a localização da Vittalis Saúde"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <RodapeLegal />

      {/* Barra fixa do celular: formulário primeiro, WhatsApp depois. */}
      <nav className={s.barraMobile} aria-label="Ações rápidas">
        <a href="#formulario" className={`${s.botao} ${s.botaoPrimario}`}>{CTA_PRINCIPAL}</a>
        <LinkRastreado href={whats} evento="click_whatsapp" slug={c.slug} externo className={`${s.botao} ${s.botaoSecundario}`}>
          <IconeWhats /> WhatsApp
        </LinkRastreado>
      </nav>
    </div>
  );
}
