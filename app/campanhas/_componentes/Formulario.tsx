"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackCampanha } from "@/lib/analytics";
import { CHAVES_UTM, capturarUtms } from "@/lib/campanhas/utm";
import s from "./campanha.module.css";

// LGPD: só o mínimo para a equipe retornar o contato. Nada de dado de
// saúde, documento, idade exata ou qual vacina. O envio é POST com JSON
// (nunca na URL) e o sucesso aparece aqui mesmo, sem trocar de página.

type Estado = { tipo: "pronto" } | { tipo: "enviando" } | { tipo: "sucesso" } | { tipo: "erro"; mensagem: string };

const PARA_QUEM = [
  { valor: "para_mim", rotulo: "Para mim" },
  { valor: "para_meu_filho", rotulo: "Para meu filho(a)" },
  { valor: "outra_pessoa", rotulo: "Outra pessoa" },
];

const PERIODOS = [
  { valor: "manha", rotulo: "Manhã" },
  { valor: "tarde", rotulo: "Tarde" },
  { valor: "qualquer", rotulo: "Qualquer horário" },
];

const ERRO_PADRAO = "Não conseguimos enviar agora. Tente de novo em instantes ou fale com a equipe pelo WhatsApp.";

export function Formulario({ slug, titulo, texto }: { slug: string; titulo: string; texto: string }) {
  const [estado, setEstado] = useState<Estado>({ tipo: "pronto" });
  const formRef = useRef<HTMLFormElement>(null);
  const montadoEm = useRef(0);

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

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const dados = new FormData(form);
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
      <div className={s.formCartao}>
        <div className={s.sucesso} role="status" aria-live="polite">
          <div className={s.sucessoIcone} aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className={s.formTitulo}>Recebemos seu contato</h3>
          <p className={s.formTexto}>Obrigado! Nossa equipe vai retornar pelo telefone informado, no período escolhido.</p>
        </div>
      </div>
    );
  }

  const enviando = estado.tipo === "enviando";

  return (
    <div className={s.formCartao}>
      <h3 className={s.formTitulo}>{titulo}</h3>
      <p className={s.formTexto}>{texto}</p>

      {/* method="post": se o JavaScript ainda não carregou, os dados nunca vão para a URL. */}
      <form ref={formRef} method="post" action="/api/lead" onSubmit={enviar} noValidate={false}>
        <div className={s.campos}>
          <div className={s.campo}>
            <label htmlFor="lead-nome" className={s.rotuloCampo}>Nome</label>
            <input id="lead-nome" name="nome" className={s.entrada} type="text" autoComplete="name" required minLength={2} maxLength={80} />
          </div>

          <div className={s.campo}>
            <label htmlFor="lead-telefone" className={s.rotuloCampo}>WhatsApp ou telefone, com DDD</label>
            <input
              id="lead-telefone"
              name="telefone"
              className={s.entrada}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              pattern="[0-9\s\(\)+\-]{10,20}"
              title="Digite o número com DDD, por exemplo (98) 90000-0000"
              placeholder="(98) 90000-0000"
            />
          </div>

          <fieldset className={s.grupo}>
            <legend className={s.grupoLegenda}>Para quem é o atendimento?</legend>
            <div className={s.opcoes}>
              {PARA_QUEM.map((o, i) => (
                <label key={o.valor} className={s.opcao}>
                  <input type="radio" name="para_quem" value={o.valor} required={i === 0} />
                  {o.rotulo}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={s.grupo}>
            <legend className={s.grupoLegenda}>Melhor período para contato</legend>
            <div className={s.opcoes}>
              {PERIODOS.map((o, i) => (
                <label key={o.valor} className={s.opcao}>
                  <input type="radio" name="periodo" value={o.valor} required={i === 0} />
                  {o.rotulo}
                </label>
              ))}
            </div>
          </fieldset>

          <label className={s.consentimento}>
            <input type="checkbox" name="consentimento" required />
            <span>
              Autorizo a Vittalis Saúde a usar estes dados para entrar em contato sobre o atendimento, conforme a{" "}
              <Link href="/politica-de-privacidade" target="_blank" rel="noopener">Política de Privacidade</Link>.
            </span>
          </label>

          {/* Anti-spam: campo que só robô preenche. */}
          <div className={s.mel} aria-hidden="true">
            <label htmlFor="lead-empresa">Empresa</label>
            <input id="lead-empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <input type="hidden" name="campanha" value={slug} />
          {CHAVES_UTM.map((k) => (
            <input key={k} type="hidden" name={k} defaultValue="" />
          ))}

          {estado.tipo === "erro" && (
            <p className={s.erro} role="alert">{estado.mensagem}</p>
          )}

          <button type="submit" className={`${s.botao} ${s.botaoPrimario} ${s.enviar}`} disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar meu contato"}
          </button>
        </div>
      </form>
      <p className={s.privacidadeNota}>Seus dados são usados só para o retorno da equipe. Não pedimos informações de saúde neste formulário.</p>
    </div>
  );
}
