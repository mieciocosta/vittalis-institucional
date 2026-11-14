import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ENDERECO, HORARIOS, WHATSAPP_TERAPIAS } from "@/lib/config/contato";
import { VideoVacina } from "../vacinas/VideoVacina";
import { Bebe, Crianca } from "./Bebe";
import { Perguntas } from "../campanhas/_componentes/Perguntas";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import { ATENDIMENTOS, AVALIACOES, BUSCAS, DESTAQUES_PEDIATRA, NOTA_GOOGLE, PEDIATRA_REAL, BAIRROS, COMO_TRABALHAM, DORES, FOTOS, MENSAGEM_GERAL, PERGUNTAS, CONSULTAS_ROTINA, IDADES_BEBE, LEVA_DA_CONSULTA, MARCOS, PUER_DEPOIS, PRECISA, QUANDO_LEVAR } from "./conteudo";
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

// Avaliação só sobre a equipe, ao lado do botão do recém-nascido (14/11).
const AVAL_EQUIPE = AVALIACOES.find((a) => a.nome === "Jéssica A.") ?? AVALIACOES[0];

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
              <li>⏱️ Consulta de 1 hora</li>
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

        {/* CONHEÇA A PEDIATRA (14/11, foto real da Dra. Luisa mandada pela
            direção). ANTES DE PUBLICAR: nome completo + CRM-MA (+ RQE se tiver
            título de pediatra) em PEDIATRA_REAL.registro, exigência do CFM. */}
        <section id="pediatra" className={s.luisa} aria-labelledby="t-luisa">
          <div className={s.luisaInterno}>
            <div className={s.luisaFoto}>
              <Image src={PEDIATRA_REAL.foto} alt={PEDIATRA_REAL.alt} width={1600} height={1686} sizes="(max-width: 900px) 90vw, 420px" />
            </div>
            <div className={s.luisaTexto}>
              <span className={s.rotulo}>Nossa pediatra</span>
              <h2 id="t-luisa" className={s.secaoTitulo}>Conheça a <em>{PEDIATRA_REAL.nome}</em></h2>
              {PEDIATRA_REAL.registro && <p className={s.luisaReg}>{PEDIATRA_REAL.registro}</p>}
              <p className={s.luisaLegenda}>{PEDIATRA_REAL.legenda}</p>
              {PEDIATRA_REAL.texto.map((t) => <p key={t}>{t}</p>)}
              <ul className={s.luisaDestaques}>
                {DESTAQUES_PEDIATRA.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <Whats mensagem={PEDIATRA_REAL.mensagem} nome="pediatra real">Agendar com a {PEDIATRA_REAL.nome}</Whats>
            </div>
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

        {/* PUERICULTURA (refeita em 14/11, no modelo do quadro "Desenvolvimento
            do bebê" mandado pela direção: um bebê desenhado em cada marco) */}
        <div className={s.puerFundo}>
        <section id="puericultura" className={s.puer} aria-labelledby="t-puer">
          <span className={s.rotulo}>Consultas de rotina</span>
          <h2 id="t-puer" className={s.puerTitulo}>Puericultura <em>do bebê ao adolescente</em></h2>
          <p className={s.puerSub}>
            <strong>Puericultura</strong> é o acompanhamento de rotina da saúde do seu filho, mesmo quando ele está bem.
            Consulta a consulta, a pediatra confere crescimento, desenvolvimento, alimentação, sono, vacinas e comportamento,
            e orienta a família antes que uma dúvida vire preocupação.
          </p>
          <h3 className={s.marcosTitulo}>Os marcos dos dois primeiros anos</h3>
          <ol className={s.marcos}>
            {MARCOS.map((m) => (
              <li key={m.idade} className={s.marco}>
                <div className={s.marcoImg}><Bebe pose={m.pose} /></div>
                <strong className={s.marcoIdade}>{m.idade}</strong>
                <span className={s.marcoUnidade}>{m.unidade}</span>
                <p>{m.texto}</p>
              </li>
            ))}
          </ol>
          <p className={s.puerTempo}>💛 Cada bebê tem o seu tempo. As idades são aproximadas, e é na consulta que a pediatra avalia o seu filho.</p>

          <h3 className={s.marcosTitulo}>E depois dos 2 anos, a puericultura continua</h3>
          <div className={s.depois}>
            {PUER_DEPOIS.map((d) => (
              <div key={d.idade} className={`${s.depoisCartao} ${d.cor === "rosa" ? s.depoisRosa : ""}`}>
                <div className={s.depoisTopo}><Crianca fase={d.fase} /></div>
                <div className={s.depoisCorpo}>
                  <strong className={s.marcoIdade}>{d.idade}</strong>
                  <span className={s.marcoUnidade}>anos</span>
                  <h4>{d.titulo}</h4>
                  <p>{d.texto}</p>
                  <ul>{d.itens.map(([ic, t]) => <li key={t}><span aria-hidden>{ic}</span>{t}</li>)}</ul>
                  <LinkWhatsOrigem mensagem={d.msg} slug={SLUG} nomeCampanha={`${NOME}: puericultura ${d.idade} anos`} numero={WHATSAPP_TERAPIAS} className={s.depoisLink}>
                    Agendar para essa fase →
                  </LinkWhatsOrigem>
                </div>
              </div>
            ))}
          </div>
          {/* Conversão (14/11): idade em um toque, recém-nascido em destaque,
              uma avaliação real e o que a família leva da consulta. */}
          <div className={s.converte}>
            <div className={s.idadeCartao}>
              <h3>Qual a idade do seu filho?</h3>
              <p>Toque na idade e fale com a equipe no WhatsApp. A mensagem já vai pronta.</p>
              <div className={s.idades}>
                {IDADES_BEBE.map((d) => (
                  <LinkWhatsOrigem key={d.rotulo} mensagem={d.msg} slug={SLUG} nomeCampanha={`${NOME}: idade ${d.rotulo}`} numero={WHATSAPP_TERAPIAS} className={s.idade}>
                    {d.rotulo}
                  </LinkWhatsOrigem>
                ))}
              </div>
              <p className={s.idadesNota}>📅 Calendário do Ministério da Saúde: {CONSULTAS_ROTINA.slice(0, -1).join(", ")} e {CONSULTAS_ROTINA[CONSULTAS_ROTINA.length - 1]}.</p>
            </div>
            <div className={s.converteLado}>
              <div className={s.recem}>
                <span className={s.recemSelo}>🍼 Recém-nascido</span>
                <h3>Seu bebê acabou de nascer?</h3>
                <p>A primeira consulta é na <strong>primeira semana de vida</strong>: peso, amamentação, amarelão, teste do pezinho e vacinas.</p>
                <Whats mensagem={IDADES_BEBE[0].msg} nome="recem-nascido" className={s.botaoRecem}>Agendar a 1ª consulta do meu bebê</Whats>
              </div>
              <figure className={s.puerAval}>
                <span className={s.estrelas} aria-label="5 estrelas">★★★★★</span>
                <blockquote>“{AVAL_EQUIPE.texto}”</blockquote>
                <figcaption>{AVAL_EQUIPE.nome} · avaliação no Google</figcaption>
              </figure>
            </div>
          </div>
          <h3 className={s.levaTitulo}>O que você leva de cada consulta</h3>
          <ul className={s.leva}>
            {LEVA_DA_CONSULTA.map((l) => (
              <li key={l.titulo}><span aria-hidden>{l.icone}</span><strong>{l.titulo}</strong>{l.texto}</li>
            ))}
          </ul>
        </section>
        </div>

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
            <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.notaGoogle}>
              <span className={s.notaG} aria-hidden="true">G</span>
              <strong>{NOTA_GOOGLE.nota}</strong>
              <span className={s.estrelas} aria-label="5 estrelas">★★★★★</span>
              <span>{NOTA_GOOGLE.total} avaliações no Google</span>
            </a>
            <div className={s.avalGrade}>
              {AVALIACOES.map((a) => (
                <figure key={a.nome} className={s.aval}>
                  <div className={s.avalTopo}>
                    <span className={s.avalIni} aria-hidden="true">{a.nome.split(" ").map((p) => p[0]).join("")}</span>
                    <div>
                      <strong>{a.nome}</strong>
                      <span className={s.estrelas} aria-label="5 estrelas">★★★★★</span>
                    </div>
                    <span className={s.avalG} aria-label="Avaliação do Google">G</span>
                  </div>
                  <blockquote>“{a.texto}”</blockquote>
                </figure>
              ))}
            </div>
            <h3 className={s.depoVideos}>Em vídeo</h3>
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
            <p className={s.localBairros}>Fácil de chegar de toda a Ilha: Cohama, Calhau, Ponta d&apos;Areia, Turu, Cohab, São José de Ribamar, Paço do Lumiar e Raposa.</p>
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

        {/* O QUE AS FAMÍLIAS PROCURAM (palavras-chave do Maranhão, 14/11) */}
        <section className={s.secao} aria-labelledby="t-buscas">
          <span className={s.rotulo}>Pediatra em São Luís – MA</span>
          <h2 id="t-buscas" className={s.secaoTitulo}>Procurando <em>pediatra em São Luís</em>?</h2>
          <p className={s.secaoSub}>O que as famílias do Maranhão mais procuram, e o que encontram na Vittalis.</p>
          <div className={s.buscas}>
            {BUSCAS.map((b) => (
              <div key={b.busca} className={s.busca}>
                <h3>🔎 {b.busca}</h3>
                <p>{b.resposta}</p>
              </div>
            ))}
          </div>
          <p className={s.buscasBairros}>
            <strong>Pediatra perto de você:</strong> {BAIRROS.join(" · ")}.
          </p>
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="buscas">Agendar consulta pediátrica</Whats>
          </div>
        </section>

        {/* DÚVIDAS */}
        <section id="duvidas" className={s.secao} aria-labelledby="t-duvidas">
          <h2 id="t-duvidas" className={s.secaoTitulo}>Dúvidas frequentes</h2>
          <div className={s.duvidas}>
            <Perguntas itens={PERGUNTAS} />
          </div>
        </section>

        {/* CHAMADA FINAL */}
        {/* DESFECHO (14/11, no modelo da referência e um passo além: foto
            real da pediatra, prova do Google e horário ao lado do botão) */}
        <div className={s.finalFundo}>
        <section id="contato" className={s.final} aria-labelledby="t-final">
          <div className={s.finalTexto}>
            <h2 id="t-final">Agende hoje.<span>A saúde do seu filho não pode esperar.</span></h2>
            <p>Consulta de 1 hora, escuta de verdade e acompanhamento em cada fase, do recém-nascido ao adolescente. Com vacinas e terapias no mesmo endereço, no Jardim Renascença.</p>
            <div className={s.finalAcao}>
              <Whats mensagem={PEDIATRA_REAL.mensagem} nome="final" className={s.botaoFinal}>Agende agora mesmo a consulta que seu FILHO merece!</Whats>
            </div>
            <ul className={s.finalSelos}>
              <li>⭐ {NOTA_GOOGLE.nota} no Google</li>
              <li>🕗 Seg a sex 8h às 18h · Sáb 8h às 12h</li>
              <li>📍 Jardim Renascença, São Luís</li>
            </ul>
          </div>
          <div className={s.finalFoto}>
            <Image src={PEDIATRA_REAL.foto} alt={PEDIATRA_REAL.alt} width={1600} height={1686} sizes="(max-width: 900px) 80vw, 430px" />
            <span className={s.finalCartao}>
              <strong>{PEDIATRA_REAL.nome}</strong>
              Pediatra da Vittalis
            </span>
          </div>
        </section>
        </div>
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
        <p className={s.rodapeFim}>© {BRAND.name} · Imagem da capa ilustrativa · Atendimento particular · <Link href="/politica-de-privacidade">Política de privacidade</Link> · <Link href="/">Site da Vittalis</Link></p>
      </footer>

      <div className={s.barraWhats}>
        <Whats mensagem={MENSAGEM_GERAL} nome="barra" className={s.barraBotao}>Agendar consulta pelo WhatsApp</Whats>
      </div>
    </div>
  );
}
