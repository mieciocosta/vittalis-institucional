import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ENDERECO, HORARIOS, WHATSAPP_TERAPIAS } from "@/lib/config/contato";
import { VideoVacina } from "../vacinas/VideoVacina";
import { Perguntas } from "../campanhas/_componentes/Perguntas";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import { ATENDIMENTOS, BAIRROS, COMO_TRABALHAM, DORES, FOTOS, MENSAGEM_GERAL, PERGUNTAS, PRECISA, PUERICULTURA, QUANDO_LEVAR } from "./conteudo";
import s from "./pediatria.module.css";

// Títulos em Plus Jakarta Sans (14/11, pedido da direção: "quero até a paleta
// de cores" da clínica pediátrica modelo). Só nesta página.
const fonteTitulos = localFont({
  src: [
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--fonte-ped",
  display: "swap",
});

const SLUG = "pediatria";

// Retratos ilustrativos da equipe (14/11, a direção mandou as imagens; só o
// rosto e os ombros, sem os personagens dos jalecos, que têm direito autoral).
const TIME = ["/images/otim/ped_time_a1.webp", "/images/otim/ped_time_a2.webp", "/images/otim/ped_time_a3.webp"];
const EQUIPE = ["/images/otim/ped_equipe_b1.webp", "/images/otim/ped_equipe_b2.webp", "/images/otim/ped_equipe_b3.webp"];
const NOME = "Pediatria";

// Toda especialidade leva ao WhatsApp do setor de terapias (10/11, pedido da
// direção; usaWhatsappTerapias em lib/config/contato.ts).
function Whats({ mensagem, nome, children, className }: { mensagem: string; nome: string; children: React.ReactNode; className?: string }) {
  return (
    <LinkWhatsOrigem mensagem={mensagem} slug={SLUG} nomeCampanha={`${NOME}: ${nome}`} numero={WHATSAPP_TERAPIAS} className={className ?? s.botaoWhats}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
      {children}
    </LinkWhatsOrigem>
  );
}

export function Pediatria() {
  return (
    <div className={`${s.pagina} ${fonteTitulos.variable}`}>
      <meta name="color-scheme" content="only light" />

      <header className={s.topo}>
        <div className={s.topoInterno}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/otim/logo-vertical.webp" alt="Vittalis Saúde" width={900} height={273} className={s.logo} unoptimized priority />
          </Link>
          <nav className={s.menu} aria-label="Seções da página">
            <a href="#programas">Programas</a>
            <a href="#puericultura">Puericultura</a>
            <a href="#sobre">Sobre</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#localizacao">Localização</a>
            <a href="#contato">Contato</a>
          </nav>
          <Whats mensagem={MENSAGEM_GERAL} nome="topo" className={s.topoBotao}>Agendar consulta</Whats>
        </div>
      </header>

      <main>
        {/* CAPA */}
        <div className={s.capaFundo}>
        <section className={s.capa} aria-labelledby="t-capa">
          <div className={s.capaTexto}>
            <span className={s.selo}>👶 Pediatria em São Luís · Jardim Renascença</span>
            <h1 id="t-capa" className={s.capaTitulo}>
              {/* Texto da direção (14/11), palavra por palavra. */}
              A saúde do seu filho merece <em>tempo, atenção</em> e um olhar completo.
            </h1>
            <p className={s.capaResumo}>
              Consulta Particular com todo cuidado que seu filho merece.
            </p>
            <div className={s.capaAcoes}>
              <Whats mensagem={MENSAGEM_GERAL} nome="capa">Agendar pelo WhatsApp</Whats>
              <a href="#programas" className={s.botaoSecundario}>Conheça os atendimentos</a>
            </div>
            <ul className={s.capaSelos}>
              <li>⏱️ Consulta de 40 a 50 min</li>
              <li>🍼 Do recém-nascido ao adolescente</li>
              <li>💉 Vacinas na mesma clínica</li>
            </ul>
          </div>
          <div className={s.capaFoto}>
            <Image src={FOTOS.capa} alt={FOTOS.capaAlt} width={1030} height={1055} priority sizes="(max-width: 900px) 100vw, 560px" />
          </div>
        </section>
        </div>

        {/* 2ª seção, logo depois da capa (14/11, pedido da direção) */}
        {/* COMO TRABALHAM */}
        <section id="sobre" className={s.como} aria-labelledby="t-como">
          <div className={s.equipe}>
            {EQUIPE.map((src, i) => (
              <div key={src} className={`${s.equipeFoto} ${s[`equipeFoto${i + 1}`]}`}>
                <Image src={src} alt="Pediatra da equipe Vittalis sorrindo, de jaleco" width={330} height={330} sizes="(max-width: 900px) 40vw, 230px" />
              </div>
            ))}
            <p className={s.equipeLegenda}>Equipe de pediatria Vittalis</p>
          </div>
          <div>
            <span className={s.rotulo}>Pediatria Vittalis</span>
            <h2 id="t-como" className={s.comoTitulo}>Você sabe como nossos <em>pediatras</em> trabalham?</h2>
            <ol className={s.passos}>
              {COMO_TRABALHAM.map((p, i) => (
                <li key={p.titulo}>
                  <span className={s.passoNumero} aria-hidden>{i + 1}</span>
                  <div>
                    <h3>{p.titulo}</h3>
                    <p>{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Whats mensagem={MENSAGEM_GERAL} nome="como trabalham">Quero agendar uma consulta</Whats>
          </div>
        </section>

        {/* ATENDIMENTOS */}
        <section id="programas" className={s.secao} aria-labelledby="t-atendimentos">
          <span className={s.rotulo}>Nossos atendimentos</span>
          <h2 id="t-atendimentos" className={s.secaoTitulo}>Pediatria para cada <em>fase</em> do seu filho</h2>
          <p className={s.secaoSub}>Da primeira semana de vida à adolescência, com a mesma equipe acompanhando o crescimento.</p>
          <div className={`${s.cartoes} ${s.cartoes4}`}>
            {ATENDIMENTOS.map((a) => (
              <article key={a.titulo} className={s.cartao}>
                <span className={s.cartaoIcone} aria-hidden>{a.icone}</span>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
                <ul>
                  {a.itens.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <Whats mensagem={a.mensagem} nome={a.titulo} className={s.botaoCartao}>Quero saber mais</Whats>
              </article>
            ))}
          </div>
        </section>

        {/* DORES */}
        <section className={s.dores} aria-labelledby="t-dores">
          <div className={s.doresInterno}>
            <h2 id="t-dores" className={s.secaoTitulo}>Você já passou por isso?</h2>
            <p className={s.secaoSub}>Muitas famílias chegam até nós depois de viver uma destas situações.</p>
            <div className={s.doresGrade}>
              {DORES.map((d) => (
                <div key={d.titulo} className={s.dor}>
                  <span aria-hidden>{d.icone}</span>
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </div>
              ))}
            </div>
            <p className={s.doresFecho}>Na Vittalis, a consulta pediátrica foi pensada para ser o contrário disso.</p>
          </div>
        </section>

        {/* O QUE VOCÊ PROCURA */}
        <section className={s.precisa} aria-labelledby="t-precisa">
          <div className={s.precisaInterno}>
            <div className={s.precisaTexto}>
              <span className={s.rotuloClaro}>O que a família procura</span>
              <h2 id="t-precisa">Não é só uma consulta. É <em>alguém que acompanha</em> o seu filho.</h2>
              <p>Mãe e pai querem respostas claras, tempo para perguntar e a segurança de saber quem cuida da criança a cada fase. É assim que a pediatria da Vittalis funciona.</p>
              <a href="#sobre" className={s.linkClaro}>Conheça como trabalhamos →</a>
            </div>
            <ul className={s.precisaGrade}>
              {PRECISA.map((p) => (
                <li key={p.titulo}>
                  <strong>{p.titulo}</strong>
                  <span>{p.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EQUIPE (14/11, pedido da direção; retratos ilustrativos, só rosto e ombros) */}
        <section className={s.secao} aria-labelledby="t-time">
          <span className={s.rotulo}>Nossa equipe</span>
          <h2 id="t-time" className={s.secaoTitulo}>Pediatras que <em>acolhem</em> cada família</h2>
          <p className={s.secaoSub}>Atendem com calma, explicam com carinho e acompanham o crescimento do seu filho de perto.</p>
          <div className={s.time}>
            {TIME.map((src, i) => (
              <figure key={src} className={`${s.timeFoto} ${s[`timeFoto${i + 1}`]}`}>
                <Image src={src} alt="Pediatra da equipe Vittalis sorrindo, de jaleco e estetoscópio" width={528} height={632} sizes="(max-width: 760px) 80vw, 340px" />
              </figure>
            ))}
          </div>
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="equipe">Agendar com a nossa pediatria</Whats>
          </div>
        </section>

        {/* PUERICULTURA */}
        <section id="puericultura" className={s.secao} aria-labelledby="t-puer">
          <span className={s.rotulo}>Puericultura</span>
          <h2 id="t-puer" className={s.secaoTitulo}>O <em>acompanhamento</em> do bebê, consulta a consulta</h2>
          <p className={s.secaoSub}>As consultas de rotina mostram se o seu filho está crescendo e se desenvolvendo bem, e antecipam dúvidas de cada fase.</p>
          <ol className={s.linha}>
            {PUERICULTURA.map((p, i) => (
              <li key={p.quando}>
                <span className={s.linhaPonto} aria-hidden>{i + 1}</span>
                <strong>{p.quando}</strong>
                <span>{p.oque}</span>
              </li>
            ))}
          </ol>
          <p className={s.notaPequena}>Calendário de consultas de rotina do Ministério da Saúde. A pediatra ajusta para cada criança.</p>
          <div className={s.centro}>
            <Whats mensagem="Olá! Vim pelo site e quero saber sobre o acompanhamento de puericultura do meu bebê." nome="puericultura">Quero acompanhar meu bebê</Whats>
          </div>
        </section>

        {/* QUANDO LEVAR */}
        <section className={s.quando} aria-labelledby="t-quando">
          <h2 id="t-quando" className={s.secaoTitulo}>Quando levar seu filho ao pediatra?</h2>
          <p className={s.secaoSub}>Se você se identificou com algum destes itens, vale marcar uma consulta.</p>
          <ul className={s.checklist}>
            {QUANDO_LEVAR.map((q) => <li key={q}>{q}</li>)}
          </ul>
          <p className={s.emergencia}>🚑 Falta de ar, convulsão, desmaio ou criança muito prostrada: procure o pronto-socorro mais próximo.</p>
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="quando levar">Agendar pelo WhatsApp</Whats>
          </div>
        </section>

        {/* DEPOIMENTOS: vídeos reais da clínica (nada inventado) */}
        <section id="depoimentos" className={s.depo} aria-labelledby="t-depo">
          <div className={s.depoInterno}>
            <span className={s.rotulo}>Depoimentos</span>
            <h2 id="t-depo" className={s.secaoTitulo}>O que as <em>famílias</em> dizem sobre a Vittalis</h2>
            <p className={s.secaoSub}>Gente de verdade, na nossa clínica, com a nossa equipe.</p>
            <div className={s.depoGrade}>
              <VideoVacina src="/videos/vacinacao-depoimento-familia.mp4" poster="/videos/vacinacao-depoimento-familia.jpg" titulo="A família do Samuel" legenda="Os pais contam por que cuidam do bebê aqui" />
              <VideoVacina src="/videos/vacinacao-plano-vacinal.mp4" poster="/videos/vacinacao-plano-vacinal.jpg" titulo="Mãe e filha" legenda="Uma mãe conta como é o cuidado com a filha na Vittalis" />
              <VideoVacina src="/videos/vacinacao-depoimento-zoster.mp4" poster="/videos/vacinacao-depoimento-zoster.jpg" titulo="Paciente da Vittalis" legenda="Ela conta por que confia na nossa equipe" />
              <VideoVacina src="/videos/vacinacao-clinica.mp4" poster="/videos/vacinacao-clinica.jpg" titulo="Um dia na clínica" legenda="O bebê no colo da mãe, com calma e carinho" />
            </div>
            <div className={s.centro}>
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.botaoSecundario}>⭐ Ver as avaliações no Google</a>
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <div className={s.localFundo}>
        <section id="localizacao" className={s.local} aria-labelledby="t-local">
          <div className={s.localTexto}>
            <span className={s.rotulo}>Venha nos visitar</span>
            <h2 id="t-local" className={s.comoTitulo}>Pediatria no Jardim Renascença, São Luís</h2>
            <p className={s.localEndereco}>📍 {BRAND.legalAddress}</p>
            <ul className={s.localInfo}>
              <li>🕗 {HORARIOS.semana}</li>
              <li>🕗 {HORARIOS.sabado}</li>
              <li>💬 WhatsApp da pediatria pelos botões desta página</li>
              <li>📸 <a href={BRAND.instagramDirect} target="_blank" rel="noopener noreferrer">@vittalissaudeslz</a></li>
              <li>✉️ <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            </ul>
            <p className={s.localBairros}>Famílias de toda a Ilha consultam aqui: {BAIRROS.slice(0, -1).join(", ")} e {BAIRROS[BAIRROS.length - 1]}.</p>
            <div className={s.capaAcoes}>
              <Whats mensagem={MENSAGEM_GERAL} nome="localização">Falar no WhatsApp</Whats>
              <a href={ENDERECO.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.botaoSecundario}>Abrir no Google Maps</a>
            </div>
          </div>
          <div className={s.mapa}>
            <iframe src={ENDERECO.mapaEmbed} title="Mapa da Vittalis Saúde no Jardim Renascença" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
        </div>

        {/* DÚVIDAS */}
        <section id="duvidas" className={s.secao} aria-labelledby="t-duvidas">
          <h2 id="t-duvidas" className={s.secaoTitulo}>Dúvidas frequentes</h2>
          <div className={s.duvidas}>
            <Perguntas itens={PERGUNTAS} />
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section id="contato" className={s.final} aria-labelledby="t-final">
          <div className={s.finalTexto}>
            <h2 id="t-final">Agende hoje e dê ao seu filho o cuidado que ele merece.</h2>
            <p>Fale com a equipe pelo WhatsApp e escolha o horário que fica bom para vocês.</p>
            <Whats mensagem={MENSAGEM_GERAL} nome="final" className={s.botaoBranco}>Agendar consulta pediátrica</Whats>
          </div>
          <div className={s.finalFoto} aria-hidden>
            <Image src={FOTOS.capa} alt="" width={1030} height={1055} sizes="(max-width: 900px) 70vw, 380px" />
          </div>
        </section>
      </main>

      <footer className={s.rodape}>
        <div className={s.rodapeInterno}>
          <div>
            <Image src="/images/otim/logo-vertical.webp" alt="Vittalis Saúde" width={900} height={273} className={s.rodapeLogo} unoptimized />
            <p>Pediatria particular em São Luís, no Jardim Renascença.</p>
          </div>
          <nav aria-label="Links rápidos">
            <strong>Links rápidos</strong>
            <a href="#programas">Programas</a>
            <a href="#puericultura">Puericultura</a>
            <a href="#sobre">Sobre</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div>
            <strong>Contato</strong>
            <p>{BRAND.street}, {BRAND.city}/{BRAND.state}</p>
            <p>{HORARIOS.semana}<br />{HORARIOS.sabado}</p>
            <p><a href={BRAND.instagramDirect} target="_blank" rel="noopener noreferrer">Instagram</a> · <a href={`mailto:${BRAND.email}`}>E-mail</a></p>
          </div>
        </div>
        <p className={s.rodapeFim}>© {BRAND.name} · Imagens ilustrativas · Atendimento particular · <Link href="/politica-de-privacidade">Política de privacidade</Link> · <Link href="/">Site da Vittalis</Link></p>
      </footer>

      <div className={s.barraWhats}>
        <Whats mensagem={MENSAGEM_GERAL} nome="barra" className={s.barraBotao}>Agendar consulta pelo WhatsApp</Whats>
      </div>
    </div>
  );
}
