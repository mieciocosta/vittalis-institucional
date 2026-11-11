import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Perguntas } from "../campanhas/_componentes/Perguntas";
import { LinkWhatsOrigem } from "../_landing-vacinas/LinkWhatsOrigem";
import { VideoVacina } from "./VideoVacina";
import { FASES, MENSAGEM_GERAL, PERGUNTAS, type Fase } from "./conteudo";
import s from "./vacinas.module.css";

const SLUG = "vacinas-familia";
const NOME = "Vacinas para toda a família";

function Whats({ mensagem, nome, children, className }: { mensagem: string; nome: string; children: React.ReactNode; className?: string }) {
  return (
    <LinkWhatsOrigem mensagem={mensagem} slug={SLUG} nomeCampanha={`${NOME}: ${nome}`} className={className ?? s.botaoWhats}>
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
      {children}
    </LinkWhatsOrigem>
  );
}

function SecaoFase({ f, i }: { f: Fase; i: number }) {
  const invertida = i % 2 === 1;
  return (
    <section id={f.id} className={`${s.fase} ${invertida ? s.faseInvertida : ""}`} aria-labelledby={`t-${f.id}`}>
      <div className={s.faseMidia}>
        {f.video ? (
          <VideoVacina {...f.video} />
        ) : f.imagem ? (
          <Image src={f.imagem} alt={f.alt ?? ""} width={1200} height={900} className={s.faseImagem} sizes="(max-width: 900px) 100vw, 520px" />
        ) : (
          <div className={s.faseIcone} aria-hidden>{f.icone}</div>
        )}
      </div>
      <div className={s.faseTexto}>
        <span className={s.rotulo}>{f.icone} {f.rotulo}</span>
        <h2 id={`t-${f.id}`} className={s.faseTitulo}>{f.titulo}</h2>
        <p className={s.faixa}>{f.faixa}</p>
        <p className={s.faseDescricao}>{f.texto}</p>
        <h3 className={s.listaTitulo}>Vacinas desta fase</h3>
        <ul className={s.vacinas}>
          {f.vacinas.map((v) => (
            <li key={v.nome}>
              <strong>{v.nome}</strong>
              <span>{v.para}</span>
            </li>
          ))}
        </ul>
        <Whats mensagem={f.mensagem} nome={f.rotulo}>Quero saber sobre {f.rotulo.replace("Saúde d", "as vacinas d")}</Whats>
      </div>
    </section>
  );
}

export function VacinasFamilia() {
  const [gestante, bebe, crianca, adolescente, mulher, homem, idoso] = FASES;
  return (
    <div className={s.pagina}>
      <header className={s.topo}>
        <div className={s.topoInterno}>
          <Link href="/" aria-label="Vittalis Saúde, página inicial">
            <Image src="/images/campanhas/logo-topo.png" alt="Vittalis Saúde" width={296} height={40} className={s.logo} unoptimized priority />
          </Link>
          <Whats mensagem={MENSAGEM_GERAL} nome="topo" className={s.topoBotao}>Falar no WhatsApp</Whats>
        </div>
      </header>

      <main>
        {/* CAPA: FAMÍLIA */}
        <section className={s.capa} aria-labelledby="titulo-capa">
          <Image src="/images/otim/vac_familia.webp" alt="Pai, mãe e bebê sorrindo juntos" fill priority sizes="100vw" className={s.capaFundo} />
          <div className={s.capaVeu} />
          <div className={s.capaConteudo}>
            <span className={s.capaSelo}>💉 Vacinação particular em São Luís</span>
            <h1 id="titulo-capa" className={s.capaTitulo}>
              Vacinas para <em>toda a família</em>, em cada fase da vida
            </h1>
            <p className={s.capaTexto}>
              Da gestação aos avós: a equipe da Vittalis organiza o calendário de cada um e vacina na clínica ou na sua casa.
            </p>
            <div className={s.capaAcoes}>
              <Whats mensagem={MENSAGEM_GERAL} nome="capa">Montar o calendário da minha família</Whats>
            </div>
            <ul className={s.capaSelos}>
              <li>🏠 Vacinação em casa</li>
              <li>📋 Caderneta organizada</li>
              <li>💳 Pagamento parcelado</li>
            </ul>
          </div>
          <div className={s.capaVideo}>
            <video src="/videos/vacinacao-loop.mp4" poster="/videos/vacinacao-loop.jpg" autoPlay muted loop playsInline preload="metadata" aria-label="Momentos de vacinação na clínica Vittalis" />
            <span>Na Vittalis 💙</span>
          </div>
        </section>

        {/* NAVEGAÇÃO POR FASE */}
        <nav className={s.fasesNav} aria-label="Escolha a fase da vida">
          <h2 className={s.secaoTitulo}>Vacinas para toda a família</h2>
          <p className={s.secaoSub}>Toque em quem você quer proteger e veja as vacinas de cada faixa etária.</p>
          <div className={s.fasesGrade}>
            {FASES.map((f) => (
              <a key={f.id} href={`#${f.id}`} className={s.faseAtalho}>
                <span className={s.faseAtalhoIcone} aria-hidden>{f.icone}</span>
                <span className={s.faseAtalhoTexto}>
                  <strong>{f.rotulo}</strong>
                  <small>{f.faixa}</small>
                </span>
              </a>
            ))}
          </div>
        </nav>

        {[gestante, bebe, crianca, adolescente].map((f, i) => (
          <SecaoFase key={f.id} f={f} i={i} />
        ))}

        {/* ADULTOS: MULHER, HOMEM E IDOSO */}
        <section className={s.adultos} aria-labelledby="t-adultos">
          <h2 id="t-adultos" className={s.secaoTitulo}>Adulto também precisa de vacina</h2>
          <p className={s.secaoSub}>A maioria dos adultos está com alguma vacina atrasada. Veja o que é indicado para cada um.</p>
          <div className={s.adultosGrade}>
            {[mulher, homem, idoso].map((f) => (
              <article key={f.id} id={f.id} className={s.adultoCard}>
                {f.imagem ? (
                  <Image src={f.imagem} alt={f.alt ?? ""} width={864} height={800} className={s.adultoImagem} sizes="(max-width: 900px) 100vw, 360px" />
                ) : (
                  <div className={s.adultoIcone} aria-hidden>{f.icone}</div>
                )}
                <div className={s.adultoCorpo}>
                  <span className={s.rotulo}>{f.rotulo}</span>
                  <h3 className={s.adultoTitulo}>{f.titulo}</h3>
                  <p className={s.faixa}>{f.faixa}</p>
                  <ul className={s.vacinas}>
                    {f.vacinas.map((v) => (
                      <li key={v.nome}>
                        <strong>{v.nome}</strong>
                        <span>{v.para}</span>
                      </li>
                    ))}
                  </ul>
                  <Whats mensagem={f.mensagem} nome={f.rotulo} className={s.botaoWhatsPequeno}>Quero saber sobre {f.rotulo.replace("Saúde d", "as vacinas d")}</Whats>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* VÍDEOS */}
        <section className={s.videos} aria-labelledby="t-videos">
          <h2 id="t-videos" className={s.secaoTitulo}>Veja como é vacinar na Vittalis</h2>
          <p className={s.secaoSub}>Gente de verdade, na nossa clínica, com a nossa equipe.</p>
          <div className={s.videosGrade}>
            <VideoVacina src="/videos/vacinacao-depoimento-zoster.mp4" poster="/videos/vacinacao-depoimento-zoster.jpg" titulo="Depoimento: herpes zóster aos 50" legenda="Vandelúcia conta por que se vacinou na Vittalis" />
            <VideoVacina src="/videos/vacinacao-planejamento.mp4" poster="/videos/vacinacao-planejamento.jpg" titulo="Planejamento vacinal" legenda="A equipe explica como organiza as doses" />
            <VideoVacina src="/videos/vacinacao-rotavirus.mp4" poster="/videos/vacinacao-rotavirus.jpg" titulo="Rotavírus, em 1 minuto" legenda="O que é e por que vacinar o bebê" />
          </div>
        </section>

        {/* EM CASA */}
        <section className={s.casa} aria-labelledby="t-casa">
          <Image src="/images/otim/vac_mae_bebe.webp" alt="Mãe segurando o bebê no colo, em casa" width={1200} height={1064} className={s.casaImagem} sizes="(max-width: 900px) 100vw, 520px" />
          <div>
            <span className={s.rotulo}>🏠 Vacinação em domicílio</span>
            <h2 id="t-casa" className={s.faseTitulo}>A gente vai até você</h2>
            <p className={s.faseDescricao}>
              Sem fila, sem sair de casa e no conforto do colo de quem o bebê conhece. A equipe leva as vacinas em caixa térmica com temperatura controlada, no dia e horário que você escolher.
            </p>
            <Whats mensagem="Olá! Quero agendar vacinação em casa." nome="domicílio">Agendar vacinação em casa</Whats>
          </div>
        </section>

        {/* PERGUNTAS */}
        <section className={s.perguntas} aria-labelledby="t-perguntas">
          <h2 id="t-perguntas" className={s.secaoTitulo}>Perguntas frequentes</h2>
          <Perguntas itens={PERGUNTAS} />
        </section>

        {/* CHAMADA FINAL */}
        <section className={s.final} aria-labelledby="t-final">
          <h2 id="t-final">Vamos colocar a família toda em dia?</h2>
          <p>Mande uma foto da caderneta pelo WhatsApp. A equipe confere e explica o que falta para cada um.</p>
          <Whats mensagem={MENSAGEM_GERAL} nome="final" className={s.botaoBranco}>Falar com a equipe no WhatsApp</Whats>
          <small className={s.ressalva}>
            A indicação de cada vacina depende de avaliação profissional e segue os calendários da SBIm e do Ministério da Saúde.
          </small>
        </section>
      </main>

      <footer className={s.rodape}>
        <p><strong>{BRAND.name}</strong> · {BRAND.street}, {BRAND.city}/{BRAND.state}</p>
        <p><Link href="/politica-de-privacidade">Política de privacidade</Link> · <Link href="/">Site da Vittalis</Link></p>
      </footer>

      <div className={s.barraWhats}>
        <Whats mensagem={MENSAGEM_GERAL} nome="barra" className={s.barraBotao}>Falar com a equipe no WhatsApp</Whats>
      </div>
    </div>
  );
}
