import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ENDERECO, HORARIOS, SITE_URL } from "@/lib/config/contato";
import { RESSALVA } from "@/lib/content/campanhas";
import { DEPOIMENTOS, FOTO, INTERESSES, PASSOS, PERGUNTAS, PRODUTOS, VARIANTES, type SlugVariante } from "@/lib/content/vacinacao";
import { LinkRastreado } from "../campanhas/_componentes/Rastreio";
import { Perguntas } from "../campanhas/_componentes/Perguntas";
import { RodapeLegal } from "../campanhas/_componentes/RodapeLegal";
import { Ico } from "../campanhas/_componentes/Icones";
import { fonteTitulo } from "../campanhas/_componentes/fonteTitulo";
import { FormularioVacina } from "./FormularioVacina";
import { LinkWhatsOrigem } from "./LinkWhatsOrigem";
import s from "../campanhas/_componentes/campanha.module.css";
import v from "./vacinas.module.css";

// ═══════════════════════════════════════════════════════════════
// LANDING DE VACINAÇÃO (pedido do master, 28/10): /vacinacao,
// /planos-vacinais e /pacotes-de-vacinas são a mesma página, com título,
// ordem dos cards e opção do formulário diferentes (lib/content/vacinacao.ts).
//
// Feita para Google Ads e Meta Ads: HTML estático (abre rápido em 4G), um
// objetivo só (WhatsApp com a mensagem pronta e identificada), nenhum pop-up.
// Usa o visual e os componentes das campanhas (campanha.module.css).
// ═══════════════════════════════════════════════════════════════

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

export function metadadosDaVariante(slug: SlugVariante): Metadata {
  const p = VARIANTES[slug];
  const url = `${SITE_URL}/${slug}`;
  const imagem = `${SITE_URL}/images/campanhas/${FOTO.arquivo.replace("-hero", "-og")}.jpg`;
  return {
    title: p.meta.titulo,
    description: p.meta.descricao,
    keywords: null,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Vittalis Saúde",
      url,
      title: p.meta.titulo,
      description: p.meta.descricao,
      images: [{ url: imagem, width: 1200, height: 630, alt: FOTO.alt }],
    },
    twitter: { card: "summary_large_image", title: p.meta.titulo, description: p.meta.descricao, images: [imagem] },
  };
}

/** Dados estruturados: a clínica (MedicalClinic) e as perguntas (FAQPage). */
function dadosEstruturados(slug: SlugVariante) {
  const p = VARIANTES[slug];
  return [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinica`,
      name: BRAND.name,
      legalName: BRAND.legalName,
      taxID: BRAND.cnpj,
      description: p.meta.descricao,
      url: `${SITE_URL}/${slug}`,
      image: `${SITE_URL}/images/campanhas/${FOTO.arquivo}-1280.webp`,
      telephone: BRAND.commercialPhoneTel.replace("tel:", ""),
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: BRAND.street,
        addressLocality: BRAND.city,
        addressRegion: BRAND.state,
        postalCode: BRAND.cep,
        addressCountry: "BR",
      },
      geo: { "@type": "GeoCoordinates", latitude: BRAND.lat, longitude: BRAND.lng },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
      ],
      areaServed: { "@type": "City", name: "São Luís" },
      sameAs: [BRAND.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PERGUNTAS.map((q) => ({ "@type": "Question", name: q.pergunta, acceptedAnswer: { "@type": "Answer", text: q.resposta } })),
    },
  ];
}

export function LandingVacinas({ variante }: { variante: SlugVariante }) {
  const p = VARIANTES[variante];
  const produtos = p.ordem.map((id) => PRODUTOS.find((x) => x.id === id)).filter((x) => x !== undefined);
  const geral = { mensagem: p.mensagemGeral, slug: p.slug, nomeCampanha: p.nome };

  return (
    <div className={s.pagina}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados(variante)) }} />
      <a href="#conteudo" className={s.pular}>Pular para o conteúdo</a>

      <header className={s.topo}>
        <div className={s.topoInterno}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/campanhas/logo-topo.png" alt="Vittalis Saúde" width={296} height={40} className={s.logo} unoptimized loading="eager" />
          </Link>
          <LinkRastreado href={BRAND.commercialPhoneTel} evento="click_phone" slug={p.slug} nomeCampanha={p.nome} className={s.topoTelefone}>
            <Ico nome="telefone" tamanho={18} /> {BRAND.commercialPhone}
          </LinkRastreado>
        </div>
      </header>

      <main id="conteudo">
        {/* 1. Topo: título, 3 pontos, WhatsApp e o mini-formulário à vista */}
        <section className={s.hero} aria-labelledby="titulo-vacinacao">
          <div className={`${s.container} ${s.heroGrade}`}>
            <div>
              <p className={s.selo}>{p.selo}</p>
              <h1 id="titulo-vacinacao" className={`${s.titulo} ${fonteTitulo.className}`}>
                <Titulo texto={p.titulo} destaque={p.destaque} />
              </h1>
              <p className={s.subtitulo}>{p.subtitulo}</p>
              <ul className={s.pontos}>
                {p.pontos.map((ponto) => (
                  <li key={ponto} className={s.ponto}>
                    <span className={s.pontoIcone}><Ico nome="check" tamanho={18} /></span>
                    {ponto}
                  </li>
                ))}
              </ul>
              <LinkWhatsOrigem {...geral} className={`${s.botao} ${s.botaoPrimario} ${v.botaoGrande}`}>
                <Ico nome="whats" tamanho={24} /> Falar no WhatsApp
              </LinkWhatsOrigem>
              <p className={v.dicaHero}>Resposta da equipe no horário de atendimento.</p>
            </div>

            <div className={s.heroLado}>
              <FormularioVacina slug={p.slug} nomePagina={p.nome} interesses={INTERESSES} interessePadrao={p.interessePadrao} />
            </div>
          </div>
        </section>

        {/* 2. Um card por produto, cada um com o próprio WhatsApp */}
        <section className={s.secao} aria-labelledby="planos">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Planos e pacotes</p>
              <h2 id="planos" className={s.secaoTitulo}>Escolha o cuidado da sua família</h2>
              <p className={s.secaoIntro}>Toque no plano e a conversa abre no WhatsApp já dizendo o que você quer saber.</p>
            </div>
            <ul className={v.produtos}>
              {produtos.map((x) => (
                <li key={x.id} className={v.produto}>
                  <div className={v.produtoTopo}>
                    <span className={s.cartaoIcone}><Ico nome={x.icone} tamanho={24} /></span>
                    <h3 className={v.produtoNome}>{x.nome}</h3>
                  </div>
                  <p className={s.cardTexto}>{x.resumo}</p>
                  <ul className={v.produtoItens}>
                    {x.itens.map((item) => (
                      <li key={item}><Ico nome="check" tamanho={18} /> {item}</li>
                    ))}
                  </ul>
                  {x.valor && <p className={v.produtoValor}>{x.valor}</p>}
                  <LinkWhatsOrigem
                    mensagem={x.mensagem}
                    slug={p.slug}
                    nomeCampanha={`${p.nome}: ${x.nome}`}
                    className={`${s.botao} ${s.botaoSecundario} ${v.produtoBotao}`}
                    ariaLabel={`Quero saber mais sobre ${x.nome} pelo WhatsApp`}
                  >
                    <Ico nome="whats" tamanho={20} /> Quero saber mais
                  </LinkWhatsOrigem>
                </li>
              ))}
            </ul>
            <p className={s.ressalva}><Ico nome="info" tamanho={20} /> {RESSALVA}</p>
          </div>
        </section>

        {/* 3. Como funciona */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="como-funciona">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Simples assim</p>
              <h2 id="como-funciona" className={s.secaoTitulo}>Como funciona</h2>
            </div>
            <ol className={s.passos}>
              {PASSOS.map((passo, i) => (
                <li key={passo.titulo} className={s.passo}>
                  <span className={s.passoNumero}>
                    <Ico nome={passo.icone} tamanho={26} />
                    <b aria-hidden="true">{i + 1}</b>
                  </span>
                  <div>
                    <h3 className={s.cardTitulo}>{passo.titulo}</h3>
                    <p className={s.cardTexto}>{passo.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Prova social: foto, endereço, horário e depoimentos reais (se houver) */}
        <section className={s.secao} aria-labelledby="onde-estamos">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Onde estamos</p>
              <h2 id="onde-estamos" className={s.secaoTitulo}>Na clínica ou na sua casa</h2>
            </div>
            <div className={v.onde}>
              <Image
                src={`/images/campanhas/${FOTO.arquivo}.webp`}
                alt={FOTO.alt}
                width={FOTO.largura}
                height={FOTO.altura}
                sizes="(min-width: 1024px) 560px, 100vw"
                className={v.foto}
                loading="lazy"
              />
              <div className={s.contatoInfo}>
                <div className={s.contatoItem}>
                  <span className={s.contatoIcone}><Ico nome="local" /></span>
                  <div>
                    <p className={s.contatoRotulo}>Endereço</p>
                    <p className={s.contatoTexto}>{BRAND.legalAddress}</p>
                    <LinkRastreado href={ENDERECO.mapsUrl} evento="click_maps" slug={p.slug} nomeCampanha={p.nome} externo className={s.contatoLink}>
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
                  <span className={s.contatoIcone}><Ico nome="casa" /></span>
                  <div>
                    <p className={s.contatoRotulo}>Vacinação em domicílio</p>
                    <p className={s.contatoTexto}>Em São Luís, com dia e horário combinados pelo WhatsApp.</p>
                  </div>
                </div>
              </div>
            </div>

            {DEPOIMENTOS.length > 0 && (
              <ul className={v.depoimentos} aria-label="Depoimentos de famílias">
                {DEPOIMENTOS.map((d) => (
                  <li key={d.autor + d.texto} className={v.depoimento}>
                    <blockquote>
                      <p>{d.texto}</p>
                      <footer>{d.autor}{d.detalhe ? `, ${d.detalhe}` : ""}</footer>
                    </blockquote>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 5. Perguntas frequentes */}
        <section className={`${s.secao} ${s.secaoClara}`} aria-labelledby="perguntas">
          <div className={s.container}>
            <div className={s.secaoCabeca}>
              <p className={s.etiqueta}>Dúvidas</p>
              <h2 id="perguntas" className={s.secaoTitulo}>Perguntas frequentes</h2>
            </div>
            <Perguntas itens={PERGUNTAS} />
          </div>
        </section>

        {/* 6. Chamada final */}
        <section className={s.chamada} aria-labelledby="chamada-final">
          <div className={s.container}>
            <h2 id="chamada-final" className={s.chamadaTitulo}>Vamos montar o calendário da sua família?</h2>
            <p className={s.chamadaTexto}>Chame a equipe no WhatsApp e conte o que você procura.</p>
            <div className={s.botoesChamada}>
              <LinkWhatsOrigem {...geral} className={`${s.botao} ${s.botaoClaro}`}>
                <Ico nome="whats" tamanho={20} /> Falar no WhatsApp
              </LinkWhatsOrigem>
              <a href="#formulario" className={`${s.botao} ${s.botaoContorno}`}>Preencher o formulário</a>
            </div>
          </div>
        </section>
      </main>

      <RodapeLegal />

      {/* Botão fixo do WhatsApp no celular, em todas as seções */}
      <nav className={`${s.barraMobile} ${v.barraUnica}`} aria-label="Ação rápida">
        <LinkWhatsOrigem {...geral} className={`${s.botao} ${s.botaoPrimario}`}>
          <Ico nome="whats" tamanho={22} /> Falar no WhatsApp
        </LinkWhatsOrigem>
      </nav>
    </div>
  );
}
