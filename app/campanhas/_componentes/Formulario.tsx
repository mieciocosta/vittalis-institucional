"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackCampanha } from "@/lib/analytics";
import { capturarUtms } from "@/lib/campanhas/utm";
import { capturarOrigem } from "@/lib/campanhas/origem";
import { linkWhatsApp, mensagemComReferencia } from "@/lib/config/contato";
import { enviarParaPlanilha, planilhaLigada } from "@/lib/planilha";
import { EXEMPLO_TELEFONE, PADRAO_TELEFONE, TAMANHO_TELEFONE, mascararTelefone } from "@/lib/telefone";
import { LinkRastreado } from "./Rastreio";
import { Ico, type NomeIcone } from "./Icones";
import s from "./campanha.module.css";

// Formulário em 3 etapas: começa com uma pergunta de um toque ("para quem
// é?"), que puxa a pessoa para dentro antes de pedir o contato. Formulário
// em etapas converte mais que o formulário inteiro de uma vez.
//
// LGPD: só o mínimo para a equipe retornar. Nada de dado de saúde,
// documento, idade exata ou qual vacina. O contato vai por POST (nunca na
// URL) para a planilha da equipe (lib/planilha.ts), com a campanha e a
// origem do anúncio, e o sucesso aparece aqui mesmo, sem trocar de página.
//
// 20/10, pedido do master: o formulário manda SÓ para a planilha, nunca
// leva a pessoa para o WhatsApp. Se a planilha não responder, tenta de novo
// uma vez sozinho e, se ainda falhar, pede para tocar em Enviar de novo
// (os campos continuam preenchidos).
//
// Única exceção: enquanto a planilha não estiver ligada (PLANILHA_URL vazio
// em lib/config/planilha.ts), o formulário oferece o WhatsApp com o nome e o
// período já escritos. É só a rede de segurança para nenhum cliente se perder
// antes de a planilha existir.

type Estado =
  | { tipo: "pronto" }
  | { tipo: "enviando" }
  | { tipo: "sucesso" }
  | { tipo: "erro"; mensagem: string }
  | { tipo: "whatsapp"; link: string };

const PARA_QUEM: { valor: string; rotulo: string; icone: NomeIcone }[] = [
  { valor: "para_mim", rotulo: "Para mim", icone: "coracao" },
  { valor: "para_meu_filho", rotulo: "Para meu filho(a)", icone: "bebe" },
  { valor: "outra_pessoa", rotulo: "Outra pessoa", icone: "equipe" },
];

const PERIODO_TEXTO: Record<string, string> = { manha: "pela manhã", tarde: "à tarde", qualquer: "em qualquer horário" };

const PERIODOS = [
  { valor: "manha", rotulo: "Manhã" },
  { valor: "tarde", rotulo: "Tarde" },
  { valor: "qualquer", rotulo: "Qualquer horário" },
];

const TOTAL = 3;
const ERRO_ENVIO = "Não conseguimos enviar agora. Confira sua internet e toque em Enviar de novo.";

type Props = { slug: string; refCampanha: string; nomeCampanha: string; titulo: string; texto: string };

export function Formulario({ slug, refCampanha, nomeCampanha, titulo, texto }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "pronto" });
  const [etapa, setEtapa] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const tituloEtapaRef = useRef<HTMLHeadingElement>(null);
  const montadoEm = useRef(0);
  const trocouEtapa = useRef(false);

  // Guarda as UTMs e a origem logo ao abrir: elas seguem com o contato.
  useEffect(() => {
    montadoEm.current = Date.now();
    capturarUtms();
    capturarOrigem();
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

    const nome = String(dados.get("nome") ?? "").trim();

    // Rede de segurança (só sem a planilha ligada): a mesma mensagem neutra da
    // campanha + nome e período. Nada de saúde, vacina ou "para quem".
    if (!planilhaLigada) {
      const periodo = PERIODO_TEXTO[String(dados.get("periodo"))] ?? "";
      const link = linkWhatsApp({
        mensagem: `${mensagemComReferencia(refCampanha)} Meu nome é ${nome}.${periodo ? ` Prefiro contato ${periodo}.` : ""}`,
      });
      setEstado({ tipo: "whatsapp", link });
      return;
    }

    setEstado({ tipo: "enviando" });
    const lead = {
      formulario: "campanha" as const,
      nome,
      telefone: String(dados.get("telefone") ?? ""),
      para_quem: String(dados.get("para_quem") ?? ""),
      periodo: String(dados.get("periodo") ?? ""),
      campanha: slug,
      campanha_nome: nomeCampanha,
      ref: refCampanha,
      consentimento: dados.get("consentimento") === "on",
      empresa: String(dados.get("empresa") ?? ""),
      tempo_ms: Date.now() - montadoEm.current,
    };
    let resposta = await enviarParaPlanilha(lead);
    // Rede ruim ou planilha lenta: mais uma tentativa sozinho. Se a primeira
    // chegou a gravar, a planilha reconhece o repetido e não duplica.
    if (!resposta.ok && !resposta.erro) {
      await new Promise((pronto) => setTimeout(pronto, 1500));
      resposta = await enviarParaPlanilha(lead);
    }
    if (resposta.ok) {
      trackCampanha("generate_lead", { campaign_slug: slug, ...capturarUtms() });
      setEstado({ tipo: "sucesso" });
      return;
    }
    // A planilha recusou algum campo (a pessoa corrige) ou não respondeu.
    setEstado({ tipo: "erro", mensagem: resposta.erro || ERRO_ENVIO });
  }

  if (estado.tipo === "whatsapp") {
    return (
      <div className={s.formCartao} id="formulario">
        <div className={s.sucesso} role="status" aria-live="polite">
          <div className={s.sucessoIcone} aria-hidden="true">
            <Ico nome="whats" tamanho={34} />
          </div>
          <h2 className={s.formTitulo}>Falta só um toque</h2>
          <p className={s.formTexto}>Toque no botão abaixo e envie a mensagem que já deixamos escrita. A equipe responde por lá.</p>
          <p className={s.planoB}>
            <LinkRastreado href={estado.link} evento="click_whatsapp" slug={slug} refCampanha={refCampanha} nomeCampanha={nomeCampanha} externo className={`${s.botao} ${s.botaoPrimario}`}>
              <Ico nome="whats" tamanho={20} /> Enviar pelo WhatsApp
            </LinkRastreado>
          </p>
        </div>
      </div>
    );
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
      <form ref={formRef} method="post" onSubmit={enviar}>
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
              <input id="lead-nome" name="nome" className={s.entrada} type="text" autoComplete="name" required minLength={2} maxLength={80} />
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
                maxLength={TAMANHO_TELEFONE}
                pattern={PADRAO_TELEFONE}
                title={`Digite o WhatsApp com DDD, por exemplo ${EXEMPLO_TELEFONE}`}
                placeholder={EXEMPLO_TELEFONE}
                onInput={(e) => {
                  e.currentTarget.value = mascararTelefone(e.currentTarget.value);
                }}
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
      </form>

      <p className={s.privacidadeNota}>
        <Ico nome="escudo" tamanho={16} /> Seus dados ficam só com a equipe. Não pedimos informações de saúde.
      </p>
    </div>
  );
}
