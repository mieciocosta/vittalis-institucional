import Image from "next/image";
import Link from "next/link";
import type { Campanha } from "@/lib/content/campanhas";
import { DIFERENCIAIS, MIDIA, RESSALVA } from "@/lib/content/campanhas";
import { ENDERECO, HORARIOS, linkWhatsApp } from "@/lib/config/contato";
import { BRAND } from "@/lib/brand";
import { LinkRastreado } from "./Rastreio";
import { Perguntas } from "./Perguntas";
import { Formulario } from "./Formulario";
import { RodapeLegal } from "./RodapeLegal";
import { Ico } from "./Icones";
import { SecaoMidia } from "./Midia";
import { fonteTitulo } from "./fonteTitulo";
import s from "./campanha.module.css";

// Estrutura fixa de toda campanha; o texto vem de lib/content/campanhas.ts.
// Pedido do master (01/10): visual da home, leitura em segundos e o
// formulário logo no topo. Ação principal = formulário; o WhatsApp é
// sempre a secundária, com a mensagem neutra e o código da campanha.

const CTA_PRINCIPAL = "Quero ser atendido(a)";

/** Título com o trecho de destaque em turquesa e itálico, como na home. */
function Titulo({ texto, destaque }: { texto: string; destaque: string }) {
  const i = texto.indexOf(destaque);
  if (i < 0) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <em>{destaque}</em>
      {texto.slice(i + destaque.length)}
    </>
  );
}

export function PaginaCampanha({ campanha: c }: { campanha: Campanha }) {
  const whats = linkWhatsApp({ ref: c.ref });

  return (
    <div className={s.pagina}>
      <a href="#conteudo" className={s.pular}>Pular para o conteúdo</a>

      <header className={s.topo}>
        <div className={s.topoInterno}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/campanhas/logo-topo.png" alt="Vittalis Saúde" width={296} height={40} className={s.logo} unoptimized loading="eager" />
          </Link>
          <LinkRastreado href={BRAND.commercialPhoneTel} evento="click_phone" slug={c.slug} className={s.topoTelefone}>
            <Ico nome="telefone" tamanho={18} /> {BRAND.commercialPhone}
          </LinkRastreado>
        </div>
      </header>

      <main id="conteudo">
        {/* 1. Topo: mensagem curta + formulário à vista */}
        <section className={s.hero} aria-labelledby="titulo-campanha">
          <div className={`${s.container} ${s.heroGrade}`}>
            <div>
              <p className={s.selo}>{c.rotulo}</p>
              <h1 id="titulo-campanha" className={`${s.titulo} ${fonteTitulo.className}`}>
                <Titulo texto={c.titulo} destaque={c.destaque} />
              </h1>
              <p className={s.subtitulo}>{c.subtitulo}</p>
              <ul className={s.pontos}>
                {c.pontos.map((p) => (
                  <li key={p} className={s.ponto}>
                    <span className={s.pontoIcone}><Ico nome="check" tamanho={18} /></span>
                    {p}
                  </li>
                ))}
              </ul>
              {/* No celular estes dois botões ficam na barra fixa de baixo. */}
              <div className={s.botoes}>
                <a href="#formulario" className={`${s.botao} ${s.botaoPrimario}`}>{CTA_PRINCIPAL}</a>
                <LinkRastreado href={whats} evento="click_whatsapp" slug={c.slug} externo className={`${s.botao} ${s.botaoSecundario}`}>
                  <Ico nome="whats" tamanho={20} /> Falar no WhatsApp
                </LinkRastreado>
              </div>
              <div className={s.imagemCaixa}>
                <Image
                  src={`/images/campanhas/${c.imagem.arquivo}.webp`}
                  alt={c.imagem.alt}
                  width={c.imagem.largura}
                  height={c.imagem.altura}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className={s.heroImagem}
                  fetchPriority="high"
                  loading="eager"
                />
                <div className={s.cartaoFlutuante}>
                  <span className={s.cartaoFlutuanteIcone}><Ico nome="coracao" tamanho={22} /></span>
                  <span>
                    <span className={s.cartaoFlutuanteTitulo} style={{ display: "block" }}>Atendimento acolhedor</span>
                    <span className={s.cartaoFlutuanteTexto}>Na clínica ou em casa</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={s.heroLado}>
              <Formulario slug={c.slug} titulo={c.formulario.titulo} texto={c.formulario.texto} />
              <p className={s.ressalvaHero}>{RESSALVA}</p>
            </div>
          </div>
        </section>

        {/* Por que a Vittalis: uma faixa curta (antes eram duas seções repetidas) */}
        <section className={s.confianca} aria-label="Por que a Vittalis">
          <ul className={`${s.container} ${s.confiancaLista}`}>
            {DIFERENCIAIS.map((item) => (
              <li key={item.titulo} className={s.confiancaItem}>
                <span className={s.confiancaIcone}><Ico nome={item.icone} /></span>
                <span>
                  <span className={s.confiancaTitulo} style={{ display: "block" }}>{item.titulo}</span>
                  <span className={s.confiancaTexto}>{item.texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 2. Como funciona */}
        <section className={s.secao} aria-labelledby="como-funciona">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Simples assim</p>
              <h2 id="como-funciona" className={s.secaoTitulo}>Como funciona</h2>
            </div>
            <ol className={s.passos}>
              {c.passos.map((p, i) => (
                <li key={p.titulo} className={s.passo}>
                  <span className={s.passoNumero}>
                    <Ico nome={p.icone} tamanho={26} />
                    <b aria-hidden="true">{i + 1}</b>
                  </span>
                  <div>
                    <h3 className={s.cardTitulo}>{p.titulo}</h3>
                    <p className={s.cardTexto}>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Fotos e vídeo reais da clínica (some sozinha enquanto não houver) */}
        <SecaoMidia midia={c.midia ?? MIDIA} />

        {/* 3. O que é importante saber */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="importante-saber">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Leitura de 1 minuto</p>
              <h2 id="importante-saber" className={s.secaoTitulo}>O que é importante saber</h2>
              <p className={s.secaoIntro}>{c.saber.introducao}</p>
            </div>
            <div className={s.cartoes}>
              {c.saber.cartoes.map((card) => (
                <article key={card.titulo} className={s.cartao}>
                  <div className={s.cartaoTopo}>
                    <span className={s.cartaoIcone}><Ico nome={card.icone} tamanho={24} /></span>
                    <div>
                      <h3 className={s.cardTitulo}>{card.titulo}</h3>
                      <p className={s.cardTexto}>{card.texto}</p>
                    </div>
                  </div>
                  <details className={s.saibaMais}>
                    <summary><Ico nome="mais" tamanho={18} /> Saiba mais</summary>
                    <p>{card.detalhe}</p>
                  </details>
                </article>
              ))}
            </div>
            <p className={s.ressalva}><Ico nome="info" tamanho={20} /> {RESSALVA}</p>
          </div>
        </section>

        {/* 5. Perguntas frequentes */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="perguntas">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Dúvidas</p>
              <h2 id="perguntas" className={s.secaoTitulo}>Perguntas frequentes</h2>
            </div>
            <Perguntas itens={c.perguntas} />
          </div>
        </section>

        {/* Chamada final: leva de volta ao formulário */}
        <section className={s.chamada} aria-labelledby="chamada-final">
          <div className={s.container}>
            <h2 id="chamada-final" className={s.chamadaTitulo}>Vamos conversar?</h2>
            <p className={s.chamadaTexto}>Deixe seu contato e a equipe da Vittalis retorna no período que você escolher.</p>
            <div className={s.botoesChamada}>
              <a href="#formulario" className={`${s.botao} ${s.botaoClaro}`}>{CTA_PRINCIPAL}</a>
              <LinkRastreado href={whats} evento="click_whatsapp" slug={c.slug} externo className={`${s.botao} ${s.botaoContorno}`}>
                <Ico nome="whats" tamanho={20} /> Falar no WhatsApp
              </LinkRastreado>
            </div>
          </div>
        </section>

        {/* 6. Endereço, horário e telefone */}
        <section className={s.secao} aria-labelledby="onde-estamos">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Onde estamos</p>
              <h2 id="onde-estamos" className={s.secaoTitulo}>Visite a clínica</h2>
            </div>
            <div className={s.contatoGrade}>
              <div className={s.contatoInfo}>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Ico nome="local" /></span>
                  <div>
                    <p className={s.contatoRotulo}>Endereço</p>
                    <p className={s.contatoTexto}>{BRAND.legalAddress}</p>
                    <LinkRastreado href={ENDERECO.mapsUrl} evento="click_maps" slug={c.slug} externo className={s.contatoLink}>
                      Abrir no Google Maps
                    </LinkRastreado>
                  </div>
                </div>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Ico nome="relogio" /></span>
                  <div>
                    <p className={s.contatoRotulo}>Horário</p>
                    <p className={s.contatoTexto}>{HORARIOS.semana}<br />{HORARIOS.sabado}</p>
                  </div>
                </div>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Ico nome="telefone" /></span>
                  <div>
                    <p className={s.contatoRotulo}>Telefone e WhatsApp</p>
                    <LinkRastreado href={BRAND.commercialPhoneTel} evento="click_phone" slug={c.slug} className={s.contatoLink}>
                      {BRAND.commercialPhone}
                    </LinkRastreado>
                  </div>
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
        </section>
      </main>

      <RodapeLegal />

      {/* Barra fixa do celular: formulário primeiro, WhatsApp depois. */}
      <nav className={s.barraMobile} aria-label="Ações rápidas">
        <a href="#formulario" className={`${s.botao} ${s.botaoPrimario}`}>{CTA_PRINCIPAL}</a>
        <LinkRastreado href={whats} evento="click_whatsapp" slug={c.slug} externo className={`${s.botao} ${s.botaoSecundario}`}>
          <Ico nome="whats" tamanho={20} /> WhatsApp
        </LinkRastreado>
      </nav>
    </div>
  );
}
