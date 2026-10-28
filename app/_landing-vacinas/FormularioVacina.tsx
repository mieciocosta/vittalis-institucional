"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { trackCampanha } from "@/lib/analytics";
import { capturarUtms } from "@/lib/campanhas/utm";
import { comOrigem } from "@/lib/campanhas/origem";
import { linkWhatsApp } from "@/lib/config/contato";
import { guardarLeadSemEsperar } from "@/lib/planilha";
import { EXEMPLO_TELEFONE, TAMANHO_TELEFONE, mascararTelefone, telefoneCompleto } from "@/lib/telefone";
import type { Interesse } from "@/lib/content/vacinacao";
import { Ico } from "../campanhas/_componentes/Icones";
import s from "../campanhas/_componentes/campanha.module.css";
import v from "./vacinas.module.css";

// Mini-formulário da landing de vacinação (pedido do master, 28/10): 3
// campos e 1 toque. No envio: grava na planilha, dispara generate_lead e
// click_whatsapp e abre o WhatsApp com nome, interesse, idade do bebê e
// origem já escritos.
//
// Diferente das páginas /campanhas (que mandam só para a planilha), aqui o
// objetivo é a conversa no WhatsApp. A planilha recebe o contato "sem
// esperar" (keepalive), porque o WhatsApp precisa abrir no mesmo toque: o
// navegador bloqueia janela aberta depois de uma espera.
//
// LGPD: sem caixa de autorização, porque é a própria pessoa pedindo o
// contato (art. 7º, V). O interesse e a idade vão para a planilha e para o
// WhatsApp, nunca para o Analytics.

type Campo = "nome" | "telefone" | "interesse" | "idade";
type Erros = Partial<Record<Campo, string>>;

type Props = {
  slug: string;
  /** Nome da página na planilha (ex.: "Vacinação"). */
  nomePagina: string;
  interesses: Interesse[];
  interessePadrao: string;
};

export function FormularioVacina({ slug, nomePagina, interesses, interessePadrao }: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [interesse, setInteresse] = useState(interessePadrao);
  const [idade, setIdade] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [linkAberto, setLinkAberto] = useState<string | null>(null);
  const montadoEm = useRef(0);
  const iscaRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    montadoEm.current = Date.now();
  }, []);

  const opcao = interesses.find((i) => i.valor === interesse);
  const mostraIdade = Boolean(opcao?.perguntaIdade);

  function validar(): Erros {
    const e: Erros = {};
    if (nome.trim().length < 2) e.nome = "Digite seu nome.";
    if (!telefoneCompleto(telefone)) e.telefone = `Digite o WhatsApp com DDD, por exemplo ${EXEMPLO_TELEFONE}.`;
    if (!opcao) e.interesse = "Escolha o que você procura.";
    if (mostraIdade && idade !== "" && Number(idade) > 60) e.idade = "Digite a idade em meses, de 0 a 60.";
    return e;
  }

  function enviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const encontrados = validar();
    setErros(encontrados);
    const primeiro = (Object.keys(encontrados) as Campo[])[0];
    if (primeiro || !opcao) {
      if (primeiro) document.getElementById(`${id}-${primeiro}`)?.focus();
      return;
    }

    const meses = mostraIdade && idade !== "" ? Number(idade) : null;
    const idadeTexto = meses === null ? "" : `${meses} ${meses === 1 ? "mês" : "meses"}`;
    const mensagem = comOrigem(
      `Olá! Meu nome é ${nome.trim()}. Tenho interesse em: ${opcao.rotulo}.${idadeTexto ? ` Idade do bebê: ${idadeTexto}.` : ""}`,
    );
    const link = linkWhatsApp({ mensagem });

    trackCampanha("generate_lead", { campaign_slug: slug, ...capturarUtms() });
    trackCampanha("click_whatsapp", { campaign_slug: slug, ...capturarUtms() });
    guardarLeadSemEsperar({
      formulario: "especialidade",
      nome: nome.trim(),
      telefone,
      campanha: slug,
      campanha_nome: `${nomePagina}: ${opcao.rotulo}`,
      consentimento: false,
      detalhes: idadeTexto ? `Bebê de ${idadeTexto}` : "",
      empresa: iscaRef.current?.value ?? "",
      tempo_ms: Date.now() - montadoEm.current,
    });

    const aba = window.open(link, "_blank");
    if (aba) aba.opener = null;
    else window.location.href = link;
    setLinkAberto(link);
  }

  const descrito = (campo: Campo) => (erros[campo] ? `${id}-${campo}-erro` : undefined);

  return (
    <div className={s.formCartao} id="formulario">
      <p className={s.formSelo}>Resposta pelo WhatsApp</p>
      <h2 className={s.formTitulo}>Fale com a equipe</h2>
      <p className={s.formTexto}>Preencha e abrimos o WhatsApp com a sua mensagem pronta.</p>

      <form method="post" noValidate onSubmit={enviar} className={v.miniForm}>
        <div className={s.campos}>
          <div className={s.campo}>
            <label htmlFor={`${id}-nome`} className={s.rotuloCampo}>Seu nome</label>
            <input
              id={`${id}-nome`}
              name="nome"
              className={s.entrada}
              type="text"
              autoComplete="name"
              maxLength={80}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              aria-invalid={Boolean(erros.nome)}
              aria-describedby={descrito("nome")}
            />
            {erros.nome && <p id={`${id}-nome-erro`} className={v.erroCampo}>{erros.nome}</p>}
          </div>

          <div className={s.campo}>
            <label htmlFor={`${id}-telefone`} className={s.rotuloCampo}>WhatsApp com DDD</label>
            <input
              id={`${id}-telefone`}
              name="telefone"
              className={s.entrada}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={TAMANHO_TELEFONE}
              placeholder={EXEMPLO_TELEFONE}
              value={telefone}
              onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
              aria-invalid={Boolean(erros.telefone)}
              aria-describedby={descrito("telefone")}
            />
            {erros.telefone && <p id={`${id}-telefone-erro`} className={v.erroCampo}>{erros.telefone}</p>}
          </div>

          <div className={s.campo}>
            <label htmlFor={`${id}-interesse`} className={s.rotuloCampo}>O que você procura?</label>
            <select
              id={`${id}-interesse`}
              name="interesse"
              className={`${s.entrada} ${v.selecao}`}
              value={interesse}
              onChange={(e) => setInteresse(e.target.value)}
              aria-invalid={Boolean(erros.interesse)}
              aria-describedby={descrito("interesse")}
            >
              <option value="" disabled>Escolha uma opção</option>
              {interesses.map((i) => (
                <option key={i.valor} value={i.valor}>{i.rotulo}</option>
              ))}
            </select>
            {erros.interesse && <p id={`${id}-interesse-erro`} className={v.erroCampo}>{erros.interesse}</p>}
          </div>

          {mostraIdade && (
            <div className={s.campo}>
              <label htmlFor={`${id}-idade`} className={s.rotuloCampo}>
                Idade do bebê em meses <span className={v.opcional}>(opcional)</span>
              </label>
              <input
                id={`${id}-idade`}
                name="idade"
                className={`${s.entrada} ${v.idade}`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={2}
                value={idade}
                onChange={(e) => setIdade(e.target.value.replace(/\D/g, "").slice(0, 2))}
                aria-invalid={Boolean(erros.idade)}
                aria-describedby={descrito("idade")}
              />
              {erros.idade && <p id={`${id}-idade-erro`} className={v.erroCampo}>{erros.idade}</p>}
            </div>
          )}
        </div>

        {/* Anti-spam: campo que só robô preenche. */}
        <div className={s.mel} aria-hidden="true">
          <label htmlFor={`${id}-empresa`}>Empresa</label>
          <input id={`${id}-empresa`} ref={iscaRef} name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className={`${s.botao} ${s.botaoPrimario} ${v.enviar}`}>
          <Ico nome="whats" tamanho={22} /> Enviar e abrir o WhatsApp
        </button>

        {linkAberto && (
          <p className={v.aviso} role="status">
            Abrimos o WhatsApp com a sua mensagem. Se ele não abriu,{" "}
            <a href={linkAberto} target="_blank" rel="noopener noreferrer">toque aqui</a>.
          </p>
        )}

        <p className={v.notaLgpd}>
          <Ico nome="escudo" tamanho={16} />
          {/* Texto e link num span só: no flex, cada pedaço solto virava uma coluna. */}
          <span>
            Ao enviar, você aceita que a equipe fale com você sobre o atendimento, conforme a{" "}
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>. Seus dados ficam só com a equipe.
          </span>
        </p>
      </form>
    </div>
  );
}
