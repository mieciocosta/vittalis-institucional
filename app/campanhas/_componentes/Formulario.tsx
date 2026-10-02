"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackCampanha } from "@/lib/analytics";
import { CHAVES_UTM, capturarUtms } from "@/lib/campanhas/utm";
import { Ico, type NomeIcone } from "./Icones";
import s from "./campanha.module.css";

// Formulário em 3 etapas: começa com uma pergunta de um toque ("para quem
// é?"), que puxa a pessoa para dentro antes de pedir o contato. Formulário
// em etapas converte mais que o formulário inteiro de uma vez.
//
// LGPD: só o mínimo para a equipe retornar. Nada de dado de saúde,
// documento, idade exata ou qual vacina. Envio por POST com JSON (nunca
// na URL) e o sucesso aparece aqui mesmo, sem trocar de página.

type Estado = { tipo: "pronto" } | { tipo: "enviando" } | { tipo: "sucesso" } | { tipo: "erro"; mensagem: string };

const PARA_QUEM: { valor: string; rotulo: string; icone: NomeIcone }[] = [
  { valor: "para_mim", rotulo: "Para mim", icone: "coracao" },
  { valor: "para_meu_filho", rotulo: "Para meu filho(a)", icone: "bebe" },
  { valor: "outra_pessoa", rotulo: "Outra pessoa", icone: "equipe" },
];

const PERIODOS = [
  { valor: "manha", rotulo: "Manhã" },
  { valor: "tarde", rotulo: "Tarde" },
  { valor: "qualquer", rotulo: "Qualquer horário" },
];

const TOTAL = 3;
const ERRO_PADRAO = "Não conseguimos enviar agora. Tente de novo em instantes ou fale com a equipe pelo WhatsApp.";

export function Formulario({ slug, titulo, texto }: { slug: string; titulo: string; texto: string }) {
  const [estado, setEstado] = useState<Estado>({ tipo: "pronto" });
  const [etapa, setEtapa] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const tituloEtapaRef = useRef<HTMLHeadingElement>(null);
  const montadoEm = useRef(0);
  const trocouEtapa = useRef(false);

  // Campos ocultos das UTMs: preenchidos direto no DOM ao abrir a página.
  useEffect(() => {
    montadoEm.current = Date.now();
    const utms = capturarUtms();
    const form = formRef.current;
    if (!form) return;
    for (const chave of CHAVES_UTM) {
      const campo = form.elements.namedItem(chave);
      if (campo instanceof HTMLInputElement) campo.value = utms[chave] ?? "";
    }
  }, []);

  // Acessibilidade: ao trocar de etapa, o leitor de tela vai para o título
  // da etapa nova (no primeiro carregamento, não mexe no foco).
  useEffect(() => {
    if (trocouEtapa.current) tituloEtapaRef.current?.focus();
  }, [etapa]);

  function irPara(n: number) {
    trocouEtapa.current = true;
    setEtapa(n);
  }

  function campo(nome: string) {
    return formRef.current?.elements.namedItem(nome) as HTMLInputElement | RadioNodeList | null;
  }

  function etapa2Valida(): boolean {
    const nome = campo("nome") as HTMLInputElement | null;
    const tel = campo("telefone") as HTMLInputElement | null;
    return Boolean(nome?.reportValidity() && tel?.reportValidity());
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = new FormData(form);
    if (!dados.get("para_quem")) return irPara(1);
    if (etapa < 3) {
      if (etapa === 2 && etapa2Valida()) irPara(3);
      return;
    }
    if (!form.reportValidity()) return;

    const corpo: Record<string, string | number | boolean> = {};
    dados.forEach((v, k) => {
      corpo[k] = String(v);
    });
    corpo.consentimento = dados.get("consentimento") === "on";
    corpo.tempo_ms = Date.now() - montadoEm.current;

    setEstado({ tipo: "enviando" });
    try {
      const resp = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(corpo),
      });
      const json = (await resp.json().catch(() => ({}))) as { ok?: boolean; erro?: string };
      if (!resp.ok || !json.ok) {
        setEstado({ tipo: "erro", mensagem: json.erro || ERRO_PADRAO });
        return;
      }
      trackCampanha("generate_lead", { campaign_slug: slug, ...capturarUtms() });
      setEstado({ tipo: "sucesso" });
    } catch {
      setEstado({ tipo: "erro", mensagem: ERRO_PADRAO });
    }
  }

  if (estado.tipo === "sucesso") {
    return (
      <div className={s.formCartao} id="formulario">
        <div className={s.sucesso} role="status" aria-live="polite">
          <div className={s.sucessoIcone} aria-hidden="true">
            <Ico nome="check" tamanho={34} />
          </div>
          <h2 className={s.formTitulo}>Recebemos seu contato!</h2>
          <p className={s.formTexto}>A equipe da Vittalis vai falar com você pelo telefone informado, no período escolhido.</p>
        </div>
      </div>
    );
  }

  const enviando = estado.tipo === "enviando";
  const oculta = (n: number) => (etapa === n ? s.etapa : `${s.etapa} ${s.etapaOculta}`);

  return (
    <div className={s.formCartao} id="formulario">
      <p className={s.formSelo}>Leva menos de 1 minuto</p>
      <h2 className={s.formTitulo}>{titulo}</h2>
      <p className={s.formTexto}>{texto}</p>

      <div
        className={s.progresso}
        role="progressbar"
        aria-label={`Etapa ${etapa} de ${TOTAL}`}
        aria-valuemin={1}
        aria-valuemax={TOTAL}
        aria-valuenow={etapa}
      >
        <span style={{ width: `${(etapa / TOTAL) * 100}%` }} />
      </div>
      <p className={s.progressoTexto} aria-hidden="true">Etapa {etapa} de {TOTAL}</p>

      {/* Sem JavaScript, as 3 etapas aparecem juntas. */}
      <noscript>
        <style>{`.${s.etapaOculta}{display:block!important}`}</style>
      </noscript>

      {/* method="post": se o JavaScript ainda não carregou, os dados nunca vão para a URL. */}
      <form ref={formRef} method="post" action="/api/lead" onSubmit={enviar}>
        {/* Etapa 1: um toque */}
        <fieldset className={oculta(1)}>
          <legend className={s.etapaTitulo}>
            <span ref={etapa === 1 ? tituloEtapaRef : undefined} tabIndex={-1}>Para quem é o atendimento?</span>
          </legend>
          <div className={s.opcoesGrandes}>
            {PARA_QUEM.map((o) => (
              <label key={o.valor} className={s.opcaoGrande}>
                <input type="radio" name="para_quem" value={o.valor} required onChange={() => setTimeout(() => irPara(2), 180)} />
                <span className={s.opcaoIcone}><Ico nome={o.icone} tamanho={26} /></span>
                <span className={s.opcaoRotulo}>{o.rotulo}</span>
                <Ico nome="seta" tamanho={20} className={s.opcaoSeta} />
              </label>
            ))}
          </div>
        </fieldset>

        {/* Etapa 2: contato */}
        <fieldset className={oculta(2)}>
          <legend className={s.etapaTitulo}>
            <span ref={etapa === 2 ? tituloEtapaRef : undefined} tabIndex={-1}>Como podemos falar com você?</span>
          </legend>
          <div className={s.campos}>
            <div className={s.campo}>
              <label htmlFor="lead-nome" className={s.rotuloCampo}>Seu nome</label>
              <input id="lead-nome" name="nome" className={s.entrada} type="text" autoComplete="name" required />
            </div>
            <div className={s.campo}>
              <label htmlFor="lead-telefone" className={s.rotuloCampo}>WhatsApp com DDD</label>
              <input
                id="lead-telefone"
                name="telefone"
                className={s.entrada}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </div>
          </div>
          <div className={s.navEtapa}>
            <button type="button" className={s.voltar} onClick={() => irPara(1)}>
              <Ico nome="voltar" tamanho={18} /> Voltar
            </button>
            <button type="button" className={`${s.botao} ${s.botaoPrimario}`} onClick={() => etapa2Valida() && irPara(3)}>
              Continuar <Ico nome="seta" tamanho={20} />
            </button>
          </div>
        </fieldset>

        {/* Etapa 3: período + autorização */}
        <fieldset className={oculta(3)}>
          <legend className={s.etapaTitulo}>
            <span ref={etapa === 3 ? tituloEtapaRef : undefined} tabIndex={-1}>Qual o melhor período para a equipe ligar?</span>
          </legend>
          <div className={s.chips}>
            {PERIODOS.map((o) => (
              <label key={o.valor} className={s.chip}>
                <input type="radio" name="periodo" value={o.valor} required />
                {o.rotulo}
              </label>
            ))}
          </div>

          <label className={s.consentimento}>
            <input type="checkbox" name="consentimento" required />
            <span>
              Autorizo a Vittalis Saúde a usar estes dados para falar comigo sobre o atendimento, conforme a{" "}
              <Link href="/politica-de-privacidade" target="_blank" rel="noopener">Política de Privacidade</Link>.
            </span>
          </label>

          {estado.tipo === "erro" && (
            <p className={s.erro} role="alert">{estado.mensagem}</p>
          )}

          <div className={s.navEtapa}>
            <button type="button" className={s.voltar} onClick={() => irPara(2)}>
              <Ico nome="voltar" tamanho={18} /> Voltar
            </button>
            <button type="submit" className={`${s.botao} ${s.botaoPrimario}`} disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar"} {!enviando && <Ico nome="check" tamanho={20} />}
            </button>
          </div>
        </fieldset>

        {/* Anti-spam: campo que só robô preenche. */}
        <div className={s.mel} aria-hidden="true">
          <label htmlFor="lead-empresa">Empresa</label>
          <input id="lead-empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="campanha" value={slug} />
        {CHAVES_UTM.map((k) => (
          <input key={k} type="hidden" name={k} defaultValue="" />
        ))}
      </form>

      <p className={s.privacidadeNota}>
        <Ico nome="escudo" tamanho={16} /> Seus dados ficam só com a equipe. Não pedimos informações de saúde.
      </p>
    </div>
  );
}
