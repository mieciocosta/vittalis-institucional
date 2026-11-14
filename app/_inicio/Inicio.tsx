import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { LEGAL, responsavelTecnico } from "@/lib/legal";
import { ENDERECO, HORARIOS } from "@/lib/config/contato";
import { SPECIALTIES, IMG } from "@/lib/specialties";
import { VideoVacina } from "../vacinas/VideoVacina";
import { Perguntas } from "../campanhas/_componentes/Perguntas";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import { DadosEmpresa } from "../_componentes/DadosEmpresa";
import { AVALIACOES, NOTA_GOOGLE, BAIRROS } from "../pediatria/conteudo";
import { BUSCAS, COMO_TRABALHAMOS, DORES, MENSAGEM_GERAL, MENSAGEM_VACINA, PERGUNTAS, PRECISA, PUBLICOS } from "./conteudo";
import s from "../pediatria/pediatria.module.css";
import h from "./inicio.module.css";

// Página inicial no mesmo desenho da página de Pediatria (14/11, pedido da
// direção: "faz a página inicial igual a Pediatria, pois está mil vezes mais
// lindo"). Usa o mesmo CSS da pediatria (paleta turquesa, creme e rosa bebê)
// e um CSS próprio só para o que é da home (especialidades e vacinação).
const fonteTitulos = localFont({
  src: [
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--fonte-ped",
  display: "swap",
});

const SLUG = "home";
const NOME = "Home";

// Home vai pra central (7016), como sempre foi (regra de 10/11).
function Whats({ mensagem, nome, children, className }: { mensagem: string; nome: string; children: React.ReactNode; className?: string }) {
  return (
    <LinkWhatsOrigem mensagem={mensagem} slug={SLUG} nomeCampanha={`${NOME}: ${nome}`} className={className ?? s.botaoWhats}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
      {children}
    </LinkWhatsOrigem>
  );
}

const B = "Agendar pelo WhatsApp";
const MEDICAS = SPECIALTIES.filter((e) => e.category === "medica");
const TERAPIAS = SPECIALTIES.filter((e) => e.category === "terapia");

function Cartoes({ lista }: { lista: typeof SPECIALTIES }) {
  return (
    <div className={h.esps}>
      {lista.map((e) => (
        <Link key={e.slug} href={`/${e.slug}`} className={h.esp}>
          <span className={h.espFoto}>
            <Image src={e.heroImage} alt="" width={480} height={300} sizes="(max-width: 700px) 90vw, 280px" />
          </span>
          <span className={h.espCorpo}>
            <strong><span aria-hidden>{e.icon}</span> {e.name}</strong>
            <span className={h.espTexto}>{e.subheadline}</span>
            <span className={h.espLink}>Conhecer →</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Inicio() {
  const rt = responsavelTecnico();
  return (
    <div className={`${s.pagina} ${fonteTitulos.variable}`}>
      <meta name="color-scheme" content="only light" />

      <header className={s.topo}>
        <div className={s.topoInterno}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/otim/logo-vertical.webp" alt="Vittalis Saúde" width={900} height={273} className={s.logo} unoptimized priority />
          </Link>
          <nav className={s.menu} aria-label="Seções da página">
            <a href="#especialidades">Especialidades</a>
            <a href="#vacinacao">Vacinação</a>
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
              <span className={s.selo}>🩺 Clínica em São Luís · Jardim Renascença</span>
              <h1 id="t-capa" className={s.capaTitulo}>
                Sua saúde em boas mãos. <em>Cuidado completo</em> para toda a família.
              </h1>
              <p className={s.capaResumo}>
                Consultas médicas, vacinação particular e terapias para bebês, crianças, adolescentes, adultos e idosos, num só endereço.
              </p>
              <div className={s.capaAcoes}>
                <Whats mensagem={MENSAGEM_GERAL} nome="capa">{B}</Whats>
                <a href="#especialidades" className={s.botaoSecundario}>Ver especialidades</a>
              </div>
              <ul className={s.capaSelos}>
                <li>🩺 Consultas particulares</li>
                <li>💉 Vacinas na clínica e em casa</li>
                <li>🧩 Terapias no mesmo endereço</li>
              </ul>
            </div>
            <div className={h.capaFoto}>
              <Image src={IMG.hero} alt="Profissional da Vittalis Saúde sorrindo com um bebê no colo" width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 560px" />
              <span className={h.capaCartao}><strong>⭐ {NOTA_GOOGLE.nota} no Google</strong>{NOTA_GOOGLE.total} avaliações</span>
            </div>
          </section>
        </div>

        {/* COMO TRABALHAMOS */}
        <section id="sobre" className={s.como} aria-labelledby="t-como">
          <div className={h.comoFoto}>
            <Image src={IMG.equipe} alt="Equipe multidisciplinar da Vittalis Saúde" width={1200} height={670} sizes="(max-width: 900px) 100vw, 460px" />
          </div>
          <div>
            <span className={s.rotulo}>Vittalis Saúde</span>
            <h2 id="t-como" className={s.comoTitulo}>Você sabe como a <em>nossa equipe</em> trabalha?</h2>
            <ol className={s.passos}>
              {COMO_TRABALHAMOS.map((p, i) => (
                <li key={p.titulo}>
                  <span className={s.passoNumero}>{i + 1}</span>
                  <div><h3>{p.titulo}</h3><p>{p.texto}</p></div>
                </li>
              ))}
            </ol>
            <Whats mensagem={MENSAGEM_GERAL} nome="como trabalhamos">{B}</Whats>
          </div>
        </section>

        {/* ESPECIALIDADES */}
        <section id="especialidades" className={s.secao} aria-labelledby="t-esp">
          <span className={s.rotulo}>Nossas especialidades</span>
          <h2 id="t-esp" className={s.secaoTitulo}>Cuidado para <em>cada fase</em> da vida</h2>
          <p className={s.secaoSub}>Toque na especialidade para saber como funciona o atendimento.</p>
          <h3 className={h.grupo}>🩺 Consultas médicas</h3>
          <Cartoes lista={MEDICAS} />
          <h3 className={h.grupo}>🧩 Terapias</h3>
          <Cartoes lista={TERAPIAS} />
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="especialidades">{B}</Whats>
          </div>
        </section>

        {/* VACINAÇÃO */}
        <section id="vacinacao" className={s.precisa} aria-labelledby="t-vac">
          <div className={s.precisaInterno}>
            <div className={s.precisaTexto}>
              <span className={s.rotuloClaro}>Vacinação particular</span>
              <h2 id="t-vac">Vacinas para toda a família, <em>na clínica ou em casa</em></h2>
              <p>Sala de vacinação própria e equipe que vai até a sua casa com hora marcada. A caderneta é conferida e as doses que faltam são organizadas com você.</p>
              <div className={h.vacAcoes}>
                <Whats mensagem={MENSAGEM_VACINA} nome="vacinação" className={s.botaoClaro}>{B}</Whats>
                <Link href="/vacinas" className={h.linkVac}>Ver as vacinas →</Link>
              </div>
            </div>
            <div className={h.vacFoto}>
              <Image src={IMG.vacinacao} alt="Vacinação na Vittalis Saúde" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 520px" />
              <ul className={h.publicos}>{PUBLICOS.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
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
            <p className={s.doresFecho}>Na Vittalis, o atendimento foi pensado para ser o contrário disso.</p>
            <ul className={h.precisa}>
              {PRECISA.map((p) => <li key={p.titulo}><strong>{p.titulo}</strong>{p.texto}</li>)}
            </ul>
            <div className={s.centro}>
              <Whats mensagem={MENSAGEM_GERAL} nome="dores">{B}</Whats>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
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
              <Whats mensagem={MENSAGEM_GERAL} nome="depoimentos">{B}</Whats>
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.botaoSecundario}>⭐ Ver as avaliações no Google</a>
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <div className={s.localFundo}>
          <section id="localizacao" className={s.local} aria-labelledby="t-local">
            <div className={s.localTexto}>
              <span className={s.rotulo}>Venha nos visitar</span>
              <h2 id="t-local" className={s.comoTitulo}>No Jardim Renascença, em São Luís</h2>
              <p className={s.localEndereco}>📍 {BRAND.legalAddress}</p>
              <ul className={s.localInfo}>
                <li>🕗 {HORARIOS.semana}</li>
                <li>🕗 {HORARIOS.sabado}</li>
                <li>💬 Agendamento pelo WhatsApp</li>
                <li>📸 <a href={BRAND.instagramDirect} target="_blank" rel="noopener noreferrer">@vittalissaudeslz</a></li>
                <li>✉️ <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              </ul>
              <p className={s.localBairros}>Fácil de chegar de toda a Ilha: Cohama, Calhau, Ponta d&apos;Areia, Turu, Cohab, São José de Ribamar, Paço do Lumiar e Raposa.</p>
              <div className={s.capaAcoes}>
                <Whats mensagem={MENSAGEM_GERAL} nome="localização">{B}</Whats>
                <a href={ENDERECO.mapsUrl} target="_blank" rel="noopener noreferrer" className={s.botaoSecundario}>Abrir no Google Maps</a>
              </div>
            </div>
            <div className={s.mapa}>
              <iframe src={ENDERECO.mapaEmbed} title="Mapa da Vittalis Saúde no Jardim Renascença" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </section>
        </div>

        {/* O QUE AS FAMÍLIAS PROCURAM */}
        <section className={s.secao} aria-labelledby="t-buscas">
          <span className={s.rotulo}>Clínica em São Luís – MA</span>
          <h2 id="t-buscas" className={s.secaoTitulo}>Procurando <em>clínica em São Luís</em>?</h2>
          <p className={s.secaoSub}>As buscas mais feitas no Maranhão, e onde encontrar cada uma na Vittalis.</p>
          <div className={s.buscas}>
            {BUSCAS.map((b) => (
              <a key={b.busca} href={b.href} className={`${s.busca} ${h.buscaLink}`}>
                <h3>🔎 {b.busca} em São Luís</h3>
                <p>{b.resposta}</p>
                <span className={h.espLink}>Ver como funciona →</span>
              </a>
            ))}
          </div>
          <p className={s.buscasBairros}><strong>Perto de você:</strong> {BAIRROS.join(" · ")}.</p>
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="buscas">{B}</Whats>
          </div>
        </section>

        {/* DÚVIDAS */}
        <section id="duvidas" className={s.secao} aria-labelledby="t-duvidas">
          <h2 id="t-duvidas" className={s.secaoTitulo}>Dúvidas frequentes</h2>
          <div className={s.duvidas}>
            <Perguntas itens={PERGUNTAS} />
          </div>
          <p className={s.duvidaFim}>Ficou alguma dúvida? A equipe responde pelo WhatsApp.</p>
          <div className={s.centro}>
            <Whats mensagem={MENSAGEM_GERAL} nome="dúvidas">{B}</Whats>
          </div>
        </section>

        {/* DESFECHO */}
        <div className={s.finalFundo}>
          <section id="contato" className={s.final} aria-labelledby="t-final">
            <div className={s.finalTexto}>
              <h2 id="t-final">Agende hoje.<span>Sua saúde e a da sua família não podem esperar.</span></h2>
              <p>Consultas, vacinas e terapias no mesmo endereço, com uma equipe que escuta, explica e acompanha. No Jardim Renascença, em São Luís.</p>
              <div className={s.finalAcao}>
                <Whats mensagem={MENSAGEM_GERAL} nome="final" className={s.botaoFinal}>Agende agora mesmo pelo WhatsApp!</Whats>
              </div>
              <ul className={s.finalSelos}>
                <li>⭐ {NOTA_GOOGLE.nota} no Google</li>
                <li>🕗 Seg a sex 8h às 18h · Sáb 8h às 12h</li>
                <li>📍 Jardim Renascença, São Luís</li>
              </ul>
            </div>
            <div className={s.finalFoto}>
              <Image src={IMG.equipe} alt="Equipe da Vittalis Saúde" width={1200} height={670} sizes="(max-width: 900px) 80vw, 430px" />
            </div>
          </section>
        </div>
      </main>

      <footer className={s.rodape}>
        <div className={s.rodapeInterno}>
          <div>
            <Image src="/images/otim/logo-vertical.webp" alt="Vittalis Saúde" width={900} height={273} className={s.rodapeLogo} unoptimized />
            <p>Clínica multidisciplinar particular em São Luís, no Jardim Renascença.</p>
          </div>
          <nav aria-label="Especialidades">
            <strong>Especialidades</strong>
            {SPECIALTIES.slice(0, 8).map((e) => <Link key={e.slug} href={`/${e.slug}`}>{e.shortName}</Link>)}
          </nav>
          <div>
            <strong>Contato</strong>
            <p>{BRAND.street}, {BRAND.city}/{BRAND.state}</p>
            <p>{HORARIOS.semana}<br />{HORARIOS.sabado}</p>
            <p><a href={BRAND.instagramDirect} target="_blank" rel="noopener noreferrer">Instagram</a> · <a href={`mailto:${BRAND.email}`}>E-mail</a></p>
          </div>
        </div>
        {/* Dados da empresa (iguais às Informações da empresa da Meta) e identificação (CFM 2.336/2023) */}
        <div className={h.legal}>
          <DadosEmpresa cores={{ texto: "#5f5a58", titulo: "#1a1a1a", link: "#0a6f75" }} />
          {(rt || LEGAL.licencaSanitaria) && (
            <p>
              {rt && <>Responsável técnico: {rt}</>}
              {rt && LEGAL.licencaSanitaria && " · "}
              {LEGAL.licencaSanitaria && <>Licença sanitária: {LEGAL.licencaSanitaria}</>}
            </p>
          )}
          <p>A indicação de cada vacina, exame ou tratamento depende de avaliação profissional.</p>
        </div>
        <p className={s.rodapeFim}>© {BRAND.name} · Atendimento particular · <Link href="/politica-de-privacidade">Política de privacidade</Link></p>
      </footer>

      <div className={s.barraWhats}>
        <Whats mensagem={MENSAGEM_GERAL} nome="barra" className={s.barraBotao}>Agendar pelo WhatsApp</Whats>
      </div>
    </div>
  );
}
