"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import type { Specialty } from "@/lib/specialties";
import { BRAND, waLink } from "@/lib/brand";
import { WHATSAPP_TERAPIAS, usaWhatsappTerapias } from "@/lib/config/contato";
import { EXEMPLO_TELEFONE, TAMANHO_TELEFONE, mascararTelefone, telefoneCompleto } from "@/lib/telefone";
import { guardarLeadSemEsperar } from "@/lib/planilha";
import { trackEvent } from "@/lib/analytics";
import { DadosEmpresa } from "../_componentes/DadosEmpresa";
import { getCampanha, type Campanha } from "@/lib/content/campanhas";
import { QUEIXAS, QUEIXAS_POR_PAGINA, CAMINHO_DO_CUIDADO, GALERIA_INFANTIL, AREAS_INFANTIS, QUEM_CUIDA, FOTO_TOPO, FOTOS_RESERVA, TOPO_PANORAMICO, temQueixas, tituloQueixas, chamadaDoFormulario, DOR_POR_AREA, NUMEROS_DESTAQUE, DIFERENCIAIS_DESTAQUE } from "@/lib/queixas";

// Páginas de campanha ligadas a cada especialidade (bloco "Conheça também").
const CAMPANHAS_DA_ESPECIALIDADE: Record<string, string[]> = {
  vacinacao: ["planejamento-vacinal", "primeiros-meses", "adulto-50-mais"],
};

// Eventos GA4 + GTM: função única e tipada em lib/analytics.ts.

/* ─── Intersection Observer ─── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(true);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fallback = setTimeout(() => setV(true), 800);
    // Sem IntersectionObserver, o timer acima mostra o conteúdo.
    if (typeof IntersectionObserver === "undefined") return () => clearTimeout(fallback);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); clearTimeout(fallback); } }, { threshold: 0.01, rootMargin: "50px" });
    obs.observe(el); return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);
  return { ref, v };
}
function Anim({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, v } = useInView();
  return <div ref={ref} className={className} style={{ opacity: 1, transform: "translateY(0)", transition: `all .65s ease ${d}s` }}>{children}</div>;
}

/* ─── Inline SVG Icons ─── */
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const ChevDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const ArrowR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const ArrowL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MapIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const WhatsIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

/* ─── Ícone de cada dor, pelo assunto da frase (10/11) ─── */
const CORES_DORES = [
  { fundo: "#E0F6F7", borda: "#00B8C0" },
  { fundo: "#FBF1DD", borda: "#C4973B" },
  { fundo: "#EEE8F6", borda: "#8A70A8" },
  { fundo: "#E3F2E6", borda: "#50A868" },
];
function iconeDaDor(t: string): string {
  const x = t.toLowerCase();
  if (/espera|demora|fila/.test(x)) return "⏳";
  if (/seletividade/.test(x)) return "🧩";
  if (/autis|\btea\b/.test(x)) return "🧩";
  if (/refei/.test(x)) return "🍽️";
  if (/verde|misturad|textura/.test(x)) return "🥗";
  if (/engasga|vomit|passa mal/.test(x)) return "😣";
  if (/nutriente|cresc|peso/.test(x)) return "📏";
  if (/\bcome\b|aliment/.test(x)) return "🥦";
  if (/fala|palavra|comunica/.test(x)) return "🗣️";
  if (/birra|agita|comporta|crise|humor|acalmar/.test(x)) return "🌪️";
  if (/escola|nota|leitura|escrita|aprend|laudo|estud/.test(x)) return "🏫";
  if (/sono|dorm/.test(x)) return "🌙";
  if (/consult|correr|ningu/.test(x)) return "🔄";
  if (/andar|motor|coorden/.test(x)) return "🚶";
  if (/aten|concentr|tdah/.test(x)) return "⚡";
  if (/dúvida|duvida|onde começar|orienta|sem saber/.test(x)) return "🧭";
  if (/música|musica/.test(x)) return "🎵";
  if (/ansiedade|medo|preocupa/.test(x)) return "💭";
  return "💛";
}

/* ─── CTA Button ─── */
function CTA({ children, href, variant = "primary", big = false, onClick }: { children: React.ReactNode; href?: string; variant?: string; big?: boolean; onClick?: () => void }) {
  const base: React.CSSProperties = { fontFamily: "var(--font-body)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 100, transition: "all .3s", cursor: "pointer", border: "none", fontSize: big?16:14, padding: big?"16px 36px":"12px 28px" };
  const vs: Record<string, React.CSSProperties> = {
    primary: { background: "var(--vit-primary)", color: "#fff", boxShadow: "0 4px 20px rgba(0,184,192,.25)" },
    white: { background: "rgba(255,255,255,.95)", color: "var(--vit-secondary-dark)", boxShadow: "0 4px 16px rgba(0,0,0,.1)" },
    gold: { background: "var(--vit-gold)", color: "#fff", boxShadow: "0 4px 16px rgba(196,151,59,.25)" },
    outline: { background: "transparent", color: "var(--vit-primary)", border: "2px solid var(--vit-primary)" },
    whats: { background: "#1FAF57", color: "#fff", boxShadow: "0 6px 22px rgba(31,175,87,.32)" },
  };
  // 10/11: todo botão que leva ao WhatsApp conta como conversão (click_whatsapp).
  // Antes só o botão do topo e o flutuante contavam, e o Google Ads via 0
  // conversão nas campanhas novas mesmo com gente clicando no "Agendar".
  const destino = href || BRAND.whatsappUrl;
  const aoClicar = () => {
    if (destino.includes("wa.me")) trackEvent("click_whatsapp", { source: "lp_cta" });
    onClick?.();
  };
  return <a href={destino} target="_blank" rel="noopener noreferrer" onClick={aoClicar} style={{...base,...(vs[variant]||vs.primary)}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.filter="brightness(1.08)"}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.filter="none"}}>{children} <ArrowR /></a>;
}

/* ─── FAQ Accordion ─── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((f, i) => (
        <div key={i} style={{ borderRadius: 16, background: open===i?"var(--vit-primary-50)":"var(--vit-cream)", border: `1px solid ${open===i?"rgba(0,184,192,.12)":"var(--vit-gray-100)"}`, overflow: "hidden", transition: "all .3s" }}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.4, paddingRight: 16 }}>{f.q}</span>
            <span style={{ flexShrink: 0, transition: "transform .3s", transform: open===i?"rotate(180deg)":"none", color: "var(--vit-primary)" }}><ChevDown /></span>
          </button>
          <div style={{ maxHeight: open===i?300:0, overflow: "hidden", transition: "max-height .4s ease" }}>
            <p style={{ padding: "0 24px 20px", fontSize: 15, color: "var(--vit-gray-500)", lineHeight: 1.7 }}>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Lead Capture Form ─── */
function LeadForm({ specialty, slug, waUrl, numeroWa, compacto = false }: { specialty: string; slug: string; waUrl: string; numeroWa?: string; compacto?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [erro, setErro] = useState("");
  const chamada = chamadaDoFormulario(slug);

  const handleSubmit = () => {
    if (name.trim().length < 2) return setErro("Digite seu nome.");
    if (!telefoneCompleto(phone)) return setErro(`Digite o WhatsApp com DDD, por exemplo ${EXEMPLO_TELEFONE}.`);
    setErro("");
    trackEvent("generate_lead", { source: "form" });
    // Também vai para a planilha da equipe (lib/planilha.ts), sem atrasar o WhatsApp.
    guardarLeadSemEsperar({
      formulario: "especialidade",
      nome: name.trim(),
      telefone: phone,
      campanha: slug,
      campanha_nome: `Página de ${specialty}`,
      consentimento: false,
    });
    // Mensagem neutra: sem o nome do serviço (política do WhatsApp Business).
    const msg = `Olá! Meu nome é ${name || "paciente"}. Vim pelo site da Vittalis e gostaria de atendimento.${phone ? ` Meu telefone: ${phone}` : ""}`;
    window.open(waLink(msg, numeroWa), "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid var(--vit-gray-100)",
    fontSize: 15, fontFamily: "var(--font-body)", outline: "none", transition: "border-color .3s",
    background: "white", color: "var(--vit-charcoal)",
  };

  // 10/11: versão compacta, embaixo da foto do topo (a foto fica inteira, sem
  // o formulário por cima; a direção achou feio cortar a imagem).
  if (compacto) return (
    <div style={{ background: "white", borderRadius: 20, padding: "18px 18px 14px", boxShadow: "0 10px 34px rgba(0,0,0,.07)", border: "1px solid var(--vit-gray-100)" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--vit-charcoal)", marginBottom: 2 }}>{chamada.frase}</div>
      <div style={{ fontSize: 13, color: "var(--vit-gray-500)", marginBottom: 10 }}>Resposta pelo WhatsApp · Atendimento particular</div>
      <div className="vit-form-linha" style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10 }}>
        <input type="text" placeholder="Seu nome" aria-label="Seu nome" autoComplete="name" maxLength={80} value={name} onChange={e=>setName(e.target.value)} style={{ ...inputStyle, padding: "12px 14px" }} />
        <input type="tel" inputMode="tel" autoComplete="tel" placeholder={EXEMPLO_TELEFONE} aria-label="Seu WhatsApp com DDD" maxLength={TAMANHO_TELEFONE} value={phone} onChange={e=>setPhone(mascararTelefone(e.target.value))} style={{ ...inputStyle, padding: "12px 14px" }} />
        <button onClick={handleSubmit} style={{ padding: "12px 20px", borderRadius: 100, border: "none", background: "var(--vit-primary)", color: "white", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>{chamada.botao} <ArrowR /></button>
      </div>
      {erro && <p role="alert" style={{ fontSize: 14, color: "#B42318", margin: "8px 0 0" }}>{erro}</p>}
      <p style={{ fontSize: 11, color: "var(--vit-gray-300)", margin: "8px 0 0", lineHeight: 1.5 }}>Ao enviar, você concorda com nossa política de privacidade conforme a LGPD.</p>
      <style>{`@media(max-width:560px){.vit-form-linha{grid-template-columns:1fr!important}}`}</style>
    </div>
  );

  return (
    <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 12px 48px rgba(0,0,0,.08)", border: "1px solid var(--vit-gray-100)", maxWidth: 420 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 6, textAlign: "center" }}>{chamada.frase}</h3>
      <p style={{ fontSize: 14, color: "var(--vit-gray-500)", textAlign: "center", marginBottom: 24 }}>Resposta pelo WhatsApp · Atendimento particular</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input type="text" placeholder="Seu nome" aria-label="Seu nome" autoComplete="name" maxLength={80} value={name} onChange={e=>setName(e.target.value)} style={inputStyle} onFocus={e=>e.currentTarget.style.borderColor="var(--vit-primary)"} onBlur={e=>e.currentTarget.style.borderColor="var(--vit-gray-100)"} />
        <input type="tel" inputMode="tel" autoComplete="tel" placeholder={`Seu WhatsApp: ${EXEMPLO_TELEFONE}`} aria-label="Seu WhatsApp com DDD" maxLength={TAMANHO_TELEFONE} value={phone} onChange={e=>setPhone(mascararTelefone(e.target.value))} style={inputStyle} onFocus={e=>e.currentTarget.style.borderColor="var(--vit-primary)"} onBlur={e=>e.currentTarget.style.borderColor="var(--vit-gray-100)"} />
        <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", borderRadius: 100, border: "none", background: "var(--vit-primary)", color: "white", fontSize: 16, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,184,192,.25)", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          onMouseEnter={e=>{e.currentTarget.style.background="var(--vit-primary-dark)";e.currentTarget.style.transform="translateY(-1px)"}} onMouseLeave={e=>{e.currentTarget.style.background="var(--vit-primary)";e.currentTarget.style.transform="none"}}>
          Agendar pelo WhatsApp <ArrowR />
        </button>
        {erro && <p role="alert" style={{ fontSize: 14, color: "#B42318", textAlign: "center", margin: 0 }}>{erro}</p>}
        <p style={{ fontSize: 11, color: "var(--vit-gray-300)", textAlign: "center", lineHeight: 1.5 }}>Ao enviar, você concorda com nossa política de privacidade conforme a LGPD.</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SPECIALTY PAGE — Template de alta conversão
   Estrutura pensada para tráfego pago e SEO:
   1. Hero com CTA duplo + formulário
   2. Dores do público-alvo
   3. Benefícios do atendimento
   4. Para quem é indicado
   5. Como funciona (timeline)
   6. Diferenciais da Vittalis
   7. Prova social (depoimento)
   8. FAQ com Schema.org
   9. CTA final forte
   ════════════════════════════════════════════════════════════════════ */
export default function SpecialtyPageClient({ specialty: s }: { specialty: Specialty }) {
  // 04/11, pedido do master: terapias falam com o WhatsApp do setor (92005);
  // 10/11, todas as especialidades (usaWhatsappTerapias); vacinação segue no 7016.
  const numeroWa = usaWhatsappTerapias(s) ? WHATSAPP_TERAPIAS : undefined;
  const waUrl = waLink(s.waMessage, numeroWa);
  const fotoTopo = FOTO_TOPO[s.slug];
  const topoLargo = TOPO_PANORAMICO.has(s.slug);
  const catLabel = s.slug === "desenvolvimento-infantil" ? "Desenvolvimento Infantil" : s.category === "vacinacao" ? "Vacinação" : s.category === "medica" ? "Especialidade Médica" : "Terapia Especializada";

  return (
    // 10/11, pedido da direção ("a fonte dos títulos não está legal"): nas páginas
    // de especialidade os títulos usam a DM Sans (a do texto), firme e moderna,
    // no lugar da Cormorant serifada. Troca só aqui, pela variável --font-display.
    <div className="vit-lp" style={{ fontFamily: "var(--font-body)", color: "var(--vit-charcoal)", ["--font-display" as string]: "var(--font-body)" } as CSSProperties}>
      <style>{`.vit-lp h1,.vit-lp h2,.vit-lp h3{letter-spacing:-.02em;font-weight:700!important}.vit-lp h1{font-size:clamp(30px,4.2vw,46px)!important;line-height:1.12!important}.vit-lp h2{line-height:1.18!important}`}</style>

      {/* ════ NAVBAR ════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, background: "rgba(255,255,255,.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,184,192,.06)", boxShadow: "0 1px 12px rgba(0,184,192,.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <ArrowL />
            <img src="/images/logo-vertical.png" alt="Vittalis Saúde" style={{ height: 32, width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, background: "var(--vit-primary)", color: "#fff", padding: "9px 22px", borderRadius: 100, textDecoration: "none", transition: "all .3s" }}
              onMouseEnter={e=>e.currentTarget.style.background="var(--vit-primary-dark)"} onMouseLeave={e=>e.currentTarget.style.background="var(--vit-primary)"} onClick={() => trackEvent("click_whatsapp", { source: "navbar" })}>
              {s.ctaText}
            </a>
          </div>
        </div>
      </nav>

      {/* ════ 1. HERO + FORMULÁRIO ════ */}
      <section style={{ paddingTop: 110, paddingBottom: 80, background: s.slug === "pediatria" ? "linear-gradient(160deg, #FFF8F0 0%, #FFECD2 30%, #FFE0B2 50%, #FFF3E0 100%)" : "linear-gradient(160deg, var(--vit-cream) 0%, var(--vit-primary-50) 30%, #DFF3F4 60%, var(--vit-cream) 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: s.slug === "pediatria" ? "radial-gradient(circle, rgba(255,183,77,.08), transparent 70%)" : "radial-gradient(circle, rgba(0,184,192,.06), transparent 70%)" }} />
        {s.slug === "pediatria" && <>
          <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: 32, opacity: 0.12, animation: "float 4s ease-in-out infinite" }}>🧸</div>
          <div style={{ position: "absolute", bottom: "20%", left: "5%", fontSize: 28, opacity: 0.1, animation: "float 5s ease-in-out infinite 1s" }}>🌈</div>
          <div style={{ position: "absolute", top: "40%", left: "12%", fontSize: 24, opacity: 0.08, animation: "float 6s ease-in-out infinite 2s" }}>⭐</div>
        </>}
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,151,59,.04), transparent 70%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: fotoTopo ? "1fr 1fr" : "1fr 420px", gap: 56, alignItems: "center" }} className="hero-spec-grid">
          <Anim>
            <div>
              {fotoTopo && <img className="vit-hero-foto-cel" src={fotoTopo} alt="" fetchPriority="high" style={{ display: "none", width: "100%", aspectRatio: topoLargo ? "2/1" : "16/10", objectFit: "cover", borderRadius: 20, marginBottom: 20, boxShadow: "0 12px 34px rgba(0,0,0,.12)" }} />}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--vit-gold-light)", color: "var(--vit-gold)", fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: ".06em", textTransform: "uppercase", border: "1px solid rgba(196,151,59,.12)" }}>
                {catLabel} • São Luís — MA
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 18 }}>
                {s.headline}
              </h1>
              <p style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: "var(--vit-gray-500)", lineHeight: 1.75, marginBottom: 28, maxWidth: 540 }}>
                {s.subheadline}
              </p>

              {/* 10/11, pedido da direção ("falta especialidades"): na página que junta
                  todas, as especialidades aparecem logo no topo, cada uma levando à sua página. */}
              {s.slug === "desenvolvimento-infantil" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: -12, marginBottom: 26, maxWidth: 560 }}>
                  {AREAS_INFANTIS.map((a) => (
                    <Link key={a.slug} href={`/${a.slug}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-secondary-dark)", background: "white", border: "1px solid rgba(0,184,192,.35)", borderRadius: 100, padding: "8px 14px", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,184,192,.08)" }}>{a.nome}</Link>
                  ))}
                </div>
              )}

              {/* Trust signals */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
                {[
                  { icon: <ShieldIcon />, text: "Segurança clínica" },
                  { icon: <HeartIcon />, text: "Atendimento humanizado" },
                  { icon: <UsersIcon />, text: "Equipe especializada" },
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--vit-secondary)" }}>
                    {t.icon}
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--vit-gray-700)" }}>{t.text}</span>
                  </div>
                ))}
              </div>

              {/* 10/11: um botão só, verde de WhatsApp, que é onde o lead fecha. */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <CTA href={waUrl} variant="whats" big><WhatsIcon /> {s.ctaText} pelo WhatsApp</CTA>
              </div>
              <p style={{ fontSize: 13, color: "var(--vit-gray-500)", marginTop: 14, lineHeight: 1.6 }}>
                Atendimento particular · Equipe responde pelo WhatsApp em horário comercial
              </p>
            </div>
          </Anim>

          <Anim d={0.2}>
            {/* 10/11: foto de impacto no topo das páginas infantis (pedido da direção).
                No computador a foto fica inteira à direita, com o formulário compacto
                embaixo (sem cobrir a imagem); no celular a foto vai acima do título. */}
            {fotoTopo ? (
              <div style={{ position: "relative" }}>
                <img className="vit-hero-foto" src={fotoTopo} alt="" fetchPriority="high" style={{ width: "100%", aspectRatio: topoLargo ? "2/1" : "16/11", objectFit: "cover", borderRadius: 24, display: "block", boxShadow: "0 18px 50px rgba(0,0,0,.14)" }} />
                <div className="vit-hero-form" style={{ marginTop: 16 }}>
                  <LeadForm specialty={s.shortName} slug={s.slug} waUrl={waUrl} numeroWa={numeroWa} compacto />
                </div>
              </div>
            ) : (
              <LeadForm specialty={s.shortName} slug={s.slug} waUrl={waUrl} numeroWa={numeroWa} />
            )}
          </Anim>
        </div>

        <style>{`
          @media(max-width:900px){.hero-spec-grid{grid-template-columns:1fr!important;gap:36px!important}.vit-hero-foto{display:none!important}.vit-hero-foto-cel{display:block!important}.vit-hero-form{margin-top:0!important}}
          @media(max-width:600px){.hide-mobile{display:none!important}}
        `}</style>
      </section>

      {/* ════ DESTAQUE: o que a Vittalis reúne (10/11, páginas infantis) ════ */}
      {temQueixas(s.slug) && <Destaques waUrl={waUrl} />}

      {/* ════ DORES DO PÚBLICO ════ (10/11, refeita: "aqui achei pobre") */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg, var(--vit-white) 0%, var(--vit-primary-50) 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -140, right: -120, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,151,59,.10), transparent 70%)" }} />
        <div className="vit-dores" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "360px 1fr", gap: 48, alignItems: "center", position: "relative" }}>
          <Anim>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--vit-gold)", marginBottom: 12 }}>Você se identifica?</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.4vw, 40px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.12, marginBottom: 14 }}>
              {temQueixas(s.slug) ? "Situações que costumam trazer as famílias até nós" : "Situações que costumam trazer nossos pacientes"}
            </h2>
            <p style={{ fontSize: 16, color: "var(--vit-gray-500)", lineHeight: 1.7, marginBottom: 24 }}>
              {temQueixas(s.slug)
                ? "Se alguma delas faz parte da sua rotina, você não está sozinha. A nossa equipe orienta cada família com calma, escuta e sem pressa."
                : "Se alguma delas faz parte da sua rotina, a nossa equipe está pronta para orientar você com calma, escuta e sem pressa."}
            </p>
            <CTA href={waUrl} variant="whats" big><WhatsIcon /> Quero conversar</CTA>
            <p style={{ fontSize: 13, color: "var(--vit-gray-500)", marginTop: 12 }}>Resposta pelo WhatsApp · Atendimento particular</p>
          </Anim>
          {s.slug === "desenvolvimento-infantil" ? (
            <div className="vit-dores-grade" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {DOR_POR_AREA.map((d, i) => {
                const cor = CORES_DORES[i % CORES_DORES.length];
                return (
                  <Link key={d.slug} href={`/${d.slug}`} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 18, background: "white", border: "1px solid var(--vit-gray-100)", borderLeft: `4px solid ${cor.borda}`, boxShadow: "0 8px 24px rgba(0,0,0,.05)", textDecoration: "none" }}>
                    <span aria-hidden="true" style={{ width: 44, height: 44, borderRadius: 14, background: cor.fundo, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 }}>{d.icone}</span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.4 }}>{d.dor}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: cor.borda, textTransform: "uppercase", letterSpacing: ".05em" }}>{d.area} →</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
          <div className="vit-dores-grade" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {s.painPoints?.map((pain, i) => {
              const cor = CORES_DORES[i % CORES_DORES.length];
              return (
                <Anim key={i} d={i * 0.05}>
                  <div style={{ height: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 18px", borderRadius: 18, background: "white", border: "1px solid var(--vit-gray-100)", borderLeft: `4px solid ${cor.borda}`, boxShadow: "0 8px 24px rgba(0,0,0,.05)" }}>
                    <span aria-hidden="true" style={{ width: 46, height: 46, borderRadius: 14, background: cor.fundo, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{iconeDaDor(pain)}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.45 }}>{pain}</span>
                  </div>
                </Anim>
              );
            })}
          </div>
          )}
        </div>
        <style>{`@media(max-width:900px){.vit-dores{grid-template-columns:1fr!important;gap:28px!important}}@media(max-width:560px){.vit-dores-grade{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ════ Todas as áreas (só na página que junta todas, 10/11) ════ */}
      {s.slug === "desenvolvimento-infantil" && <AreasDaEquipe waUrl={waUrl} />}

      {/* ════ QUEIXAS: TDAH, autismo, agitação… (10/11, páginas infantis) ════ */}
      {temQueixas(s.slug) && <Queixas slug={s.slug} usadas={[s.heroImage, fotoTopo]} waUrl={waUrl} ctaText={s.ctaText} />}

            {/* ════ 2. DESCRIÇÃO + IMAGEM ════ */}
      <section style={{ padding: "80px 24px", background: "var(--vit-white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="spec-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <Anim>
              <div style={{ aspectRatio: "4/3", borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.08)" }}>
                <img src={s.heroImage} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Anim>
            <Anim d={0.1}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.15, marginBottom: 18 }}>
                {s.name} na Vittalis Saúde
              </h2>
              <p style={{ fontSize: 16, color: "var(--vit-gray-500)", lineHeight: 1.85, marginBottom: 28 }}>
                {s.description}
              </p>
              <p style={{ fontSize: 15, color: "var(--vit-gray-700)", lineHeight: 1.8, marginBottom: 28, paddingLeft: 16, borderLeft: "3px solid var(--vit-primary)" }}>
                Na Vittalis Saúde, cada atendimento é conduzido com <strong>segurança clínica</strong>, <strong>acolhimento humano</strong> e <strong>orientação clara</strong>, em uma estrutura moderna preparada para cuidar de você por inteiro.
              </p>
              <CTA href={waUrl}>{s.ctaText}</CTA>
            </Anim>
          </div>
        </div>
        <style>{`@media(max-width:800px){.spec-grid-2col{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ════ 3. BENEFÍCIOS ════ */}
      <section style={{ padding: "80px 24px", background: "var(--vit-primary-50)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 12, textAlign: "center" }}>
              O que você encontra neste atendimento
            </h2>
            <p style={{ fontSize: 15, color: "var(--vit-gray-500)", textAlign: "center", marginBottom: 40, maxWidth: 550, margin: "0 auto 40px" }}>
              Cada detalhe é pensado para oferecer a melhor experiência em {s.shortName.toLowerCase()}.
            </p>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {s.benefits.map((b, i) => (
              <Anim key={i} d={i * 0.05}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "22px 20px", borderRadius: 16, background: "white", border: "1px solid var(--vit-gray-100)", transition: "all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,184,192,.2)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,184,192,.06)";e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--vit-gray-100)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none"}}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--vit-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, color: "#fff" }}><Check /></div>
                  <span style={{ fontSize: 15, color: "var(--vit-gray-700)", lineHeight: 1.5, fontWeight: 500 }}>{b}</span>
                </div>
              </Anim>
            ))}
          </div>
          <Anim d={0.3}><div style={{ textAlign: "center", marginTop: 40 }}><CTA href={waUrl} big>{s.ctaText}</CTA></div></Anim>
        </div>
      </section>

      {/* ════ 4. PARA QUEM ════ */}
      <section style={{ padding: "80px 24px", background: "var(--vit-white)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 12 }}>Para quem é indicado?</h2>
            <p style={{ fontSize: 15, color: "var(--vit-gray-500)", marginBottom: 32 }}>Perfis que costumam buscar este atendimento:</p>
          </Anim>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {s.forWhom.map((item, i) => (
              <Anim key={i} d={i * 0.04}>
                <div style={{ background: "var(--vit-cream)", border: "1px solid var(--vit-gray-100)", borderRadius: 100, padding: "12px 24px", fontSize: 14, fontWeight: 500, color: "var(--vit-secondary)", transition: "all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--vit-primary)";e.currentTarget.style.background="var(--vit-primary-light)";e.currentTarget.style.color="var(--vit-primary)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--vit-gray-100)";e.currentTarget.style.background="var(--vit-cream)";e.currentTarget.style.color="var(--vit-secondary)"}}>
                  {item}
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 5. COMO FUNCIONA (Timeline) ════ */}
      <section style={{ padding: "80px 24px", background: "var(--vit-cream)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 8, textAlign: "center" }}>Como funciona o atendimento</h2>
            <p style={{ fontSize: 15, color: "var(--vit-gray-500)", textAlign: "center", marginBottom: 40 }}>Passo a passo simples e transparente</p>
          </Anim>
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 22, top: 28, bottom: 28, width: 2, background: "var(--vit-gray-100)" }} />
            
            {s.howItWorks.map((step, i) => (
              <Anim key={i} d={i * 0.08}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24, padding: "20px 0", position: "relative" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--vit-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, flexShrink: 0, zIndex: 1, boxShadow: "0 4px 12px rgba(0,184,192,.2)" }}>
                    {i + 1}
                  </div>
                  <div style={{ background: "white", borderRadius: 16, padding: "18px 22px", flex: 1, border: "1px solid var(--vit-gray-100)", boxShadow: "0 2px 8px rgba(0,0,0,.02)" }}>
                    <span style={{ fontSize: 16, color: "var(--vit-charcoal)", fontWeight: 600 }}>{step}</span>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
          <Anim d={0.3}><div style={{ textAlign: "center", marginTop: 32 }}><CTA href={waUrl} big>Começar agora</CTA></div></Anim>
        </div>
      </section>

      {/* ════ 6. DIFERENCIAIS + PROVA SOCIAL ════ */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, var(--vit-secondary-dark) 0%, var(--vit-secondary) 50%, var(--vit-primary-dark) 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,.03)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 600, color: "#fff", marginBottom: 12, textAlign: "center" }}>Por que escolher a Vittalis Saúde?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", textAlign: "center", marginBottom: 40 }}>O que torna nosso atendimento único em São Luís</p>
          </Anim>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginBottom: 40 }}>
            {s.differentials.map((d, i) => (
              <Anim key={i} d={i * 0.06}>
                <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "28px 22px", backdropFilter: "blur(4px)", textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#fff" }}><Check /></div>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.92)", lineHeight: 1.6, fontWeight: 500 }}>{d}</p>
                </div>
              </Anim>
            ))}
          </div>

          {/* 10/11: saiu o depoimento genérico ("Paciente da Vittalis"), que não era
              avaliação real de ninguém. Quando houver avaliação de verdade, com
              autorização, ela entra aqui. */}
          <Anim d={0.2}><div style={{ textAlign: "center" }}><CTA href={waUrl} variant="white" big>{s.ctaText}</CTA></div></Anim>
        </div>
      </section>

      {/* ════ Caminho do cuidado + fotos (10/11, páginas infantis) ════ */}
      {temQueixas(s.slug) && <CaminhoEGaleria slug={s.slug} />}

      {/* ════ Conheça também: páginas de campanha relacionadas ════ */}
      <ConhecaTambem slug={s.slug} />

      {/* ════ 7. FAQ ════ */}
      {s.faq.length > 0 && (
        <section style={{ padding: "80px 24px", background: "var(--vit-white)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Anim>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 8, textAlign: "center" }}>
                Perguntas frequentes sobre {s.shortName}
              </h2>
              <p style={{ fontSize: 15, color: "var(--vit-gray-500)", textAlign: "center", marginBottom: 36 }}>
                Tire suas dúvidas antes de agendar
              </p>
            </Anim>
            <Anim d={0.1}><FAQ items={s.faq} /></Anim>
          </div>
        </section>
      )}

      {/* ════ 8. INFO + MAP ════ */}
      <section style={{ padding: "60px 24px", background: "var(--vit-cream)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Anim>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {[
                { icon: <MapIcon />, title: "Localização", text: BRAND.legalAddress, link: "https://maps.app.goo.gl/35Vernq6NtWw9vBLA", linkText: "Abrir no Google Maps" },
                { icon: <ClockIcon />, title: "Horários", text: `${BRAND.hours.week}\n${BRAND.hours.sat}`, link: undefined, linkText: undefined },
                { icon: <PhoneIcon />, title: "Contato", text: "Fale com a equipe pelo WhatsApp", link: waUrl, linkText: "Falar pelo WhatsApp" },
              ].map((info, i) => (
                <div key={i} style={{ background: "white", borderRadius: 18, padding: "24px 22px", border: "1px solid var(--vit-gray-100)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, color: "var(--vit-primary)" }}>
                    {info.icon}
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-charcoal)" }}>{info.title}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{info.text}</p>
                  {info.link && <a href={info.link} target="_blank" rel="noopener noreferrer" onClick={() => { if (info.link?.includes("wa.me")) trackEvent("click_whatsapp", { source: "info" }); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--vit-primary)", marginTop: 10, textDecoration: "none" }}>{info.linkText} <ArrowR /></a>}
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </section>

      {/* ════ 9. CTA FINAL ════ */}
      <section style={{ padding: "88px 24px", background: "linear-gradient(135deg, var(--vit-secondary-dark) 0%, var(--vit-secondary) 50%, var(--vit-primary-dark) 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.03)" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 600, color: "#fff", lineHeight: 1.12, marginBottom: 18, letterSpacing: "-.02em" }}>
              {s.category === "terapia" || ["pediatria", "neuropediatria"].includes(s.slug) ? "O próximo passo é uma conversa com a nossa equipe" : "Sua saúde merece o melhor cuidado"}
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.82)", lineHeight: 1.75, marginBottom: 36 }}>
              Agende agora seu atendimento de {s.shortName.toLowerCase()} e descubra a experiência Vittalis Saúde — com acolhimento, segurança e excelência clínica.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <CTA variant="whats" big href={waUrl}><WhatsIcon /> {s.ctaText} pelo WhatsApp</CTA>
            </div>
          </Anim>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ padding: "32px 24px 24px", background: "var(--vit-charcoal)", textAlign: "center" }}>
        {/* Dados da empresa (iguais às Informações da empresa da Meta) */}
        <div style={{ maxWidth: 900, margin: "0 auto 20px" }}>
          <DadosEmpresa cores={{ texto: "var(--vit-gray-300)", titulo: "white", link: "white" }} centralizado />
        </div>
        <p style={{ fontSize: 12, color: "var(--vit-gray-300)" }}>
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados. •{" "}
          <Link href="/" style={{ color: "var(--vit-primary)", textDecoration: "none" }}>Voltar ao início</Link>
        </p>
        <p style={{ fontSize: 12, color: "var(--vit-gray-300)", marginTop: 6 }}>
          <Link href="/politica-de-privacidade" style={{ color: "white", textDecoration: "underline" }}>Política de Privacidade</Link> · Tratamos seus dados conforme a LGPD.
        </p>
      </footer>

      {/* ════ FABs: Instagram + WhatsApp ════ */}
      {/* 10/11: só o WhatsApp (o Instagram tirava a pessoa da página do anúncio).
          No celular vira uma barra fixa embaixo, sempre à mão do polegar. */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="vit-barra-wa" onClick={() => trackEvent("click_whatsapp", { source: "barra" })}
        style={{ position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 1000, display: "none", alignItems: "center", justifyContent: "center", gap: 10, padding: "15px 18px", borderRadius: 100, background: "#1FAF57", color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 26px rgba(0,0,0,.22)" }}>
        <WhatsIcon /> {s.ctaText} pelo WhatsApp
      </a>
      <style>{`@media(max-width:700px){.vit-barra-wa{display:flex!important}.vit-fab-wa{display:none!important}footer{padding-bottom:88px!important}}`}</style>
      <div className="vit-fab-wa" style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp" onClick={() => trackEvent("click_whatsapp", { source: "fab" })}
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(37,211,102,.4)", transition: "transform .3s", textDecoration: "none" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
}

function ConhecaTambem({ slug }: { slug: string }) {
  const campanhas = (CAMPANHAS_DA_ESPECIALIDADE[slug] ?? [])
    .map((c) => getCampanha(c))
    .filter((c): c is Campanha => Boolean(c));
  if (campanhas.length === 0) return null;
  return (
    <section style={{ padding: "64px 24px", background: "var(--vit-primary-50)" }} aria-labelledby="conheca-tambem">
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2 id="conheca-tambem" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 24, textAlign: "center" }}>
          Conheça também
        </h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {campanhas.map((c) => (
            <Link key={c.slug} href={`/campanhas/${c.slug}`} style={{ display: "block", background: "white", borderRadius: 16, padding: "22px 24px", border: "1px solid var(--vit-gray-100)", borderTop: "4px solid var(--vit-primary)" }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--vit-secondary-dark)", marginBottom: 6 }}>{c.rotulo}</span>
              <span style={{ display: "block", fontSize: 18, fontWeight: 700, color: "var(--vit-charcoal)", lineHeight: 1.35 }}>{c.titulo}</span>
              <span style={{ display: "inline-block", marginTop: 10, fontSize: 15, fontWeight: 600, color: "var(--vit-secondary-dark)", textDecoration: "underline" }}>Saiba mais</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Queixas das famílias (lib/queixas.ts) ─── */
function Queixas({ slug, usadas, waUrl, ctaText }: { slug: string; usadas: (string | undefined)[]; waUrl: string; ctaText: string }) {
  const itens = QUEIXAS_POR_PAGINA[slug] ?? [];
  // Na página que junta todas as áreas as queixas vêm em cartões compactos,
  // sem foto (a foto de cada área já está nos cartões de cima).
  if (slug === "desenvolvimento-infantil") return <QueixasCompactas waUrl={waUrl} />;
  return (
    <section style={{ padding: "80px 24px", background: "linear-gradient(180deg, var(--vit-cream) 0%, var(--vit-white) 100%)" }} aria-labelledby="queixas-titulo">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--vit-gold)", marginBottom: 10 }}>O que traz as famílias até nós</span>
          <h2 id="queixas-titulo" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.15, marginBottom: 12 }}>
            {tituloQueixas(slug)}
          </h2>
          <p style={{ fontSize: 16, color: "var(--vit-gray-500)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
            Veja os sinais que os pais costumam notar e como a nossa equipe cuida de cada situação.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {itens.map(({ id, comoAjuda }, i) => {
            const q = QUEIXAS[id];
            // Primeira foto que ainda não apareceu na página (topo, seção da clínica ou cartão anterior).
            const foto = [q.img, q.img2, ...FOTOS_RESERVA].find((f) => !usadas.includes(f)) ?? q.img;
            usadas.push(foto);
            return (
              <article key={id} className={`vit-queixa${i % 2 ? " inv" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "white", borderRadius: 24, overflow: "hidden", border: "1px solid var(--vit-gray-100)", boxShadow: "0 10px 36px rgba(0,0,0,.05)" }}>
                <div className="vit-queixa-foto" style={{ minHeight: 280, background: `url(${foto}) center/cover no-repeat` }} role="img" aria-label={q.alt} />
                <div style={{ padding: "32px 30px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <span aria-hidden="true">{q.emoji}</span> {q.titulo}
                  </h3>
                  <p style={{ fontSize: 15, color: "var(--vit-gray-500)", lineHeight: 1.7, marginBottom: 16 }}>{q.resumo}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--vit-secondary)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Sinais que os pais costumam notar</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {q.sinais.map((sinal) => (
                      <li key={sinal} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--vit-gray-700)", lineHeight: 1.5 }}>
                        <span style={{ color: "var(--vit-primary)", flexShrink: 0, marginTop: 2 }}><Check /></span>{sinal}
                      </li>
                    ))}
                  </ul>
                  <div style={{ background: "var(--vit-primary-50)", borderLeft: "3px solid var(--vit-primary)", borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
                    <p style={{ fontSize: 14, color: "var(--vit-gray-700)", lineHeight: 1.6, margin: 0 }}><strong>Como cuidamos:</strong> {comoAjuda}</p>
                  </div>
                  <CTA href={waUrl} variant="whats"><WhatsIcon /> {ctaText}</CTA>
                </div>
              </article>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "var(--vit-gray-500)", textAlign: "center", marginTop: 28, lineHeight: 1.6 }}>
          Estes sinais não fecham diagnóstico. Só a avaliação de um profissional pode dizer o que a criança tem e qual o melhor caminho.
        </p>
      </div>
      <style>{`
        .vit-queixa.inv .vit-queixa-foto{order:2}
        @media(max-width:800px){.vit-queixa{grid-template-columns:1fr!important}.vit-queixa.inv .vit-queixa-foto{order:0}.vit-queixa-foto{min-height:210px!important}}
      `}</style>
    </section>
  );
}

/* ─── Caminho do cuidado + fotos ─── */
function CaminhoEGaleria({ slug }: { slug: string }) {
  return (
    <section style={{ padding: "80px 24px", background: "var(--vit-white)" }} aria-labelledby="caminho-titulo">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 id="caminho-titulo" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 600, color: "var(--vit-charcoal)", textAlign: "center", marginBottom: 10 }}>
          Tudo no mesmo lugar, do primeiro sinal ao acompanhamento
        </h2>
        <p style={{ fontSize: 15, color: "var(--vit-gray-500)", textAlign: "center", maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Sem correr de um consultório para outro: os profissionais conversam entre si e a família recebe um plano só.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
          {CAMINHO_DO_CUIDADO.map((p, i) => {
            const cartao = (
              <div style={{ height: "100%", background: p.slug === slug ? "var(--vit-primary-50)" : "var(--vit-cream)", border: `1px solid ${p.slug === slug ? "var(--vit-primary)" : "var(--vit-gray-100)"}`, borderRadius: 18, padding: "22px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--vit-gold)", marginBottom: 6 }}>Passo {i + 1}</div>
                <div style={{ fontSize: 28, marginBottom: 6 }} aria-hidden="true">{p.emoji}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--vit-charcoal)", marginBottom: 6 }}>{p.titulo}</div>
                <div style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6 }}>{p.texto}</div>
              </div>
            );
            return p.slug === slug ? <div key={p.titulo}>{cartao}</div> : <Link key={p.titulo} href={`/${p.slug}`} style={{ textDecoration: "none" }}>{cartao}</Link>;
          })}
        </div>
        {/* Na página que junta todas, as fotos já estão nos cartões das áreas. */}
        {slug !== "desenvolvimento-infantil" && <div className="vit-galeria" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {GALERIA_INFANTIL.map((g) => (
            <figure key={g.src} style={{ margin: 0, borderRadius: 16, overflow: "hidden", position: "relative", aspectRatio: "4/3" }}>
              <img src={g.src} alt={g.legenda} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 12px 10px", background: "linear-gradient(transparent, rgba(0,0,0,.6))", color: "#fff", fontSize: 13, fontWeight: 600 }}>{g.legenda}</figcaption>
            </figure>
          ))}
        </div>}
        {slug !== "desenvolvimento-infantil" && (
          <p style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/desenvolvimento-infantil" style={{ fontSize: 15, fontWeight: 700, color: "var(--vit-primary-dark)" }}>Conheça toda a equipe de desenvolvimento infantil →</Link>
          </p>
        )}
        <style>{`@media(max-width:800px){.vit-galeria{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </div>
    </section>
  );
}

/* ─── Todas as áreas da equipe infantil (/desenvolvimento-infantil) ─── */
function AreasDaEquipe({ waUrl }: { waUrl: string }) {
  return (
    <section style={{ padding: "72px 24px", background: "var(--vit-white)" }} aria-labelledby="areas-titulo">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2 id="areas-titulo" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 600, color: "var(--vit-charcoal)", textAlign: "center", marginBottom: 10 }}>
          Uma equipe completa para a sua criança
        </h2>
        <p style={{ fontSize: 16, color: "var(--vit-gray-500)", textAlign: "center", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Toque na área para saber mais, ou fale com a equipe que a gente indica o primeiro passo.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
          {AREAS_INFANTIS.map((a) => (
            <Link key={a.slug} href={`/${a.slug}`} style={{ display: "flex", flexDirection: "column", background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid var(--vit-gray-100)", boxShadow: "0 8px 28px rgba(0,0,0,.05)", textDecoration: "none" }}>
              <img src={a.img} alt={a.nome} loading="lazy" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "18px 18px 20px" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--vit-charcoal)", marginBottom: 6 }}>{a.nome}</div>
                <div style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6, marginBottom: 10 }}>{a.texto}</div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--vit-primary-dark)" }}>Saiba mais →</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}><CTA href={waUrl} variant="whats" big><WhatsIcon /> Não sei por onde começar</CTA></div>
      </div>
    </section>
  );
}

/* ─── Queixas compactas com "quem cuida" (/desenvolvimento-infantil) ─── */
function QueixasCompactas({ waUrl }: { waUrl: string }) {
  const nomeDa = (slug: string) => AREAS_INFANTIS.find((a) => a.slug === slug)?.nome ?? slug;
  const ordem = ["autismo", "tdah", "agitacao", "fala", "seletividade", "sensorial", "escola"] as const;
  return (
    <section style={{ padding: "80px 24px", background: "var(--vit-primary-50)" }} aria-labelledby="queixas-titulo">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--vit-gold)", marginBottom: 10 }}>O que traz as famílias até nós</span>
          <h2 id="queixas-titulo" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.15, marginBottom: 12 }}>
            Qual é a sua preocupação? Veja quem da equipe cuida
          </h2>
          <p style={{ fontSize: 16, color: "var(--vit-gray-500)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
            Os sinais que os pais costumam notar e as áreas que trabalham juntas em cada caso.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {ordem.map((id) => {
            const q = QUEIXAS[id];
            return (
              <article key={id} style={{ background: "white", borderRadius: 20, padding: "24px 22px", border: "1px solid var(--vit-gray-100)", boxShadow: "0 8px 26px rgba(0,0,0,.04)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--vit-charcoal)", marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}><span aria-hidden="true">{q.emoji}</span>{q.titulo}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px", display: "flex", flexDirection: "column", gap: 5 }}>
                  {q.sinais.slice(0, 3).map((sinal) => (
                    <li key={sinal} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--vit-gray-700)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--vit-primary)", flexShrink: 0, marginTop: 2 }}><Check /></span>{sinal}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--vit-secondary)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Quem cuida</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {QUEM_CUIDA[id].map((slug) => (
                      <Link key={slug} href={`/${slug}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--vit-primary-dark)", background: "var(--vit-primary-light)", borderRadius: 100, padding: "6px 12px", textDecoration: "none" }}>{nomeDa(slug)}</Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "var(--vit-gray-500)", textAlign: "center", margin: "26px 0 22px", lineHeight: 1.6 }}>
          Estes sinais não fecham diagnóstico. Só a avaliação de um profissional pode dizer o que a criança tem e qual o melhor caminho.
        </p>
        <div style={{ textAlign: "center" }}><CTA href={waUrl} variant="whats" big><WhatsIcon /> Contar o que está acontecendo</CTA></div>
      </div>
    </section>
  );
}

/* ─── Faixa de destaque das páginas infantis ─── */
function Destaques({ waUrl }: { waUrl: string }) {
  return (
    <section style={{ padding: "64px 24px", background: "linear-gradient(135deg, var(--vit-secondary-dark) 0%, var(--vit-secondary) 55%, var(--vit-primary-dark) 100%)", position: "relative", overflow: "hidden" }} aria-labelledby="destaque-titulo">
      <div style={{ position: "absolute", top: -120, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        <div className="vit-dest-topo" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center", marginBottom: 36 }}>
          <div>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--vit-gold)", marginBottom: 10 }}>Por que a Vittalis</span>
            <h2 id="destaque-titulo" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 600, color: "#fff", lineHeight: 1.12, margin: 0 }}>
              Pare de correr de consultório em consultório
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.82)", lineHeight: 1.7, marginTop: 12 }}>
              Aqui a sua criança tem consulta médica, avaliação e terapias no mesmo endereço, no Renascença, com uma equipe que trabalha junta.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {NUMEROS_DESTAQUE.map((x) => (
              <div key={x.t} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 18, padding: "18px 12px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 42, fontWeight: 800, color: "var(--vit-gold)", lineHeight: 1 }}>{x.n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.9)", marginTop: 6, lineHeight: 1.35 }}>{x.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {DIFERENCIAIS_DESTAQUE.map((d) => (
            <div key={d.titulo} style={{ background: "white", borderRadius: 18, padding: "20px 18px", boxShadow: "0 10px 30px rgba(0,0,0,.12)" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }} aria-hidden="true">{d.icone}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--vit-charcoal)", marginBottom: 6 }}>{d.titulo}</div>
              <div style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6 }}>{d.texto}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 30 }}><CTA href={waUrl} variant="white" big><WhatsIcon /> Quero conhecer a equipe</CTA></div>
      </div>
      <style>{`@media(max-width:900px){.vit-dest-topo{grid-template-columns:1fr!important;gap:22px!important}}`}</style>
    </section>
  );
}
