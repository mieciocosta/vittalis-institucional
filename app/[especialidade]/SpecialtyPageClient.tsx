"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Specialty } from "@/lib/specialties";
import { BRAND, waLink } from "@/lib/brand";

/* ─── Intersection Observer ─── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, v };
}
function Anim({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, v } = useInView();
  return <div ref={ref} className={className} style={{ opacity: v?1:0, transform: v?"translateY(0)":"translateY(24px)", transition: `all .65s ease ${d}s` }}>{children}</div>;
}

/* ─── Inline SVG Icons ─── */
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const ChevDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const ArrowR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const ArrowL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MapIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const StarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

/* ─── CTA Button ─── */
function CTA({ children, href, variant = "primary", big = false }: { children: React.ReactNode; href?: string; variant?: string; big?: boolean }) {
  const base: React.CSSProperties = { fontFamily: "var(--font-body)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 100, transition: "all .3s", cursor: "pointer", border: "none", fontSize: big?16:14, padding: big?"16px 36px":"12px 28px" };
  const vs: Record<string, React.CSSProperties> = {
    primary: { background: "var(--vit-primary)", color: "#fff", boxShadow: "0 4px 20px rgba(0,184,192,.25)" },
    white: { background: "rgba(255,255,255,.95)", color: "var(--vit-secondary-dark)", boxShadow: "0 4px 16px rgba(0,0,0,.1)" },
    gold: { background: "var(--vit-gold)", color: "#fff", boxShadow: "0 4px 16px rgba(196,151,59,.25)" },
    outline: { background: "transparent", color: "var(--vit-primary)", border: "2px solid var(--vit-primary)" },
  };
  return <a href={href || BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{...base,...(vs[variant]||vs.primary)}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.filter="brightness(1.08)"}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.filter="none"}}>{children} <ArrowR /></a>;
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
function LeadForm({ specialty, waUrl }: { specialty: string; waUrl: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleSubmit = () => {
    const msg = `Olá! Meu nome é ${name || "paciente"}. Gostaria de agendar um atendimento de ${specialty}. Meu telefone: ${phone || "informar"}`;
    window.open(waLink(msg), "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid var(--vit-gray-100)",
    fontSize: 15, fontFamily: "var(--font-body)", outline: "none", transition: "border-color .3s",
    background: "white", color: "var(--vit-charcoal)",
  };

  return (
    <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 12px 48px rgba(0,0,0,.08)", border: "1px solid var(--vit-gray-100)", maxWidth: 420 }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 6, textAlign: "center" }}>Agende agora</h3>
      <p style={{ fontSize: 14, color: "var(--vit-gray-500)", textAlign: "center", marginBottom: 24 }}>Preencha e fale com a equipe pelo WhatsApp</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input type="text" placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)} style={inputStyle} onFocus={e=>e.currentTarget.style.borderColor="var(--vit-primary)"} onBlur={e=>e.currentTarget.style.borderColor="var(--vit-gray-100)"} />
        <input type="tel" placeholder="Seu WhatsApp" value={phone} onChange={e=>setPhone(e.target.value)} style={inputStyle} onFocus={e=>e.currentTarget.style.borderColor="var(--vit-primary)"} onBlur={e=>e.currentTarget.style.borderColor="var(--vit-gray-100)"} />
        <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", borderRadius: 100, border: "none", background: "var(--vit-primary)", color: "white", fontSize: 16, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,184,192,.25)", transition: "all .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          onMouseEnter={e=>{e.currentTarget.style.background="var(--vit-primary-dark)";e.currentTarget.style.transform="translateY(-1px)"}} onMouseLeave={e=>{e.currentTarget.style.background="var(--vit-primary)";e.currentTarget.style.transform="none"}}>
          Agendar pelo WhatsApp <ArrowR />
        </button>
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
  const waUrl = waLink(s.waMessage);
  const catLabel = s.category === "vacinacao" ? "Vacinação" : s.category === "medica" ? "Especialidade Médica" : "Terapia Especializada";

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--vit-charcoal)" }}>

      {/* ════ NAVBAR ════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, background: "rgba(255,255,255,.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,184,192,.06)", boxShadow: "0 1px 12px rgba(0,184,192,.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <ArrowL />
            <img src="/images/logo-vertical.png" alt="Vittalis Saúde" style={{ height: 32, width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href={`tel:${BRAND.whatsappNumber}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--vit-gray-500)", textDecoration: "none" }} className="hide-mobile">
              <PhoneIcon /> {BRAND.whatsappDisplay}
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, background: "var(--vit-primary)", color: "#fff", padding: "9px 22px", borderRadius: 100, textDecoration: "none", transition: "all .3s" }}
              onMouseEnter={e=>e.currentTarget.style.background="var(--vit-primary-dark)"} onMouseLeave={e=>e.currentTarget.style.background="var(--vit-primary)"}>
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

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 56, alignItems: "center" }} className="hero-spec-grid">
          <Anim>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--vit-gold-light)", color: "var(--vit-gold)", fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: ".06em", textTransform: "uppercase", border: "1px solid rgba(196,151,59,.12)" }}>
                {catLabel} • São Luís — MA
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, color: "var(--vit-charcoal)", lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 18 }}>
                {s.headline}
              </h1>
              <p style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: "var(--vit-gray-500)", lineHeight: 1.75, marginBottom: 28, maxWidth: 540 }}>
                {s.subheadline}
              </p>

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

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <CTA href={waUrl} big>{s.ctaText}</CTA>
                <CTA variant="outline" big href={`tel:${BRAND.whatsappNumber}`}><PhoneIcon /> Ligar agora</CTA>
              </div>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24 }}>
                <div style={{ display: "flex", gap: 2, color: "var(--vit-gold)" }}>{[...Array(5)].map((_,i)=><span key={i}><StarIcon /></span>)}</div>
                <span style={{ fontSize: 13, color: "var(--vit-gray-500)" }}>Avaliação 5.0 no Google</span>
              </div>
            </div>
          </Anim>

          <Anim d={0.2}>
            <LeadForm specialty={s.shortName} waUrl={waUrl} />
          </Anim>
        </div>

        <style>{`
          @media(max-width:900px){.hero-spec-grid{grid-template-columns:1fr!important;gap:36px!important}}
          @media(max-width:600px){.hide-mobile{display:none!important}}
        `}</style>
      </section>

      {/* ════ DORES DO PÚBLICO ════ */}
      <section style={{ padding: "64px 24px", background: "var(--vit-white)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Anim>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, color: "var(--vit-charcoal)", marginBottom: 8 }}>
              Você se identifica com alguma dessas situações?
            </h2>
            <p style={{ fontSize: 14, color: "var(--vit-gray-500)", marginBottom: 32 }}>
              Se sim, a Vittalis Saúde pode ajudar você.
            </p>
          </Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, textAlign: "left" }}>
            {s.painPoints?.map((pain, i) => (
              <Anim key={i} d={i * 0.05}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "18px 16px", borderRadius: 14, background: "var(--vit-cream)", border: "1px solid rgba(196,151,59,.1)" }}>
                  <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>😟</span>
                  <span style={{ fontSize: 14, color: "var(--vit-gray-700)", lineHeight: 1.5 }}>{pain}</span>
                </div>
              </Anim>
            ))}
          </div>
          <Anim d={0.3}>
            <div style={{ marginTop: 32, padding: "20px 28px", borderRadius: 16, background: "var(--vit-primary-light)", border: "1px solid rgba(0,184,192,.1)", display: "inline-block" }}>
              <p style={{ fontSize: 15, color: "var(--vit-secondary)", fontWeight: 500 }}>
                ✨ Na Vittalis Saúde, você encontra o cuidado certo para cada uma dessas situações.
              </p>
            </div>
          </Anim>
        </div>
      </section>

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
            <p style={{ fontSize: 15, color: "var(--vit-gray-500)", marginBottom: 32 }}>Se você se identifica com algum destes perfis, este atendimento pode ser o que você procura:</p>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginBottom: 56 }}>
            {s.differentials.map((d, i) => (
              <Anim key={i} d={i * 0.06}>
                <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "28px 22px", backdropFilter: "blur(4px)", textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#fff" }}><Check /></div>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.92)", lineHeight: 1.6, fontWeight: 500 }}>{d}</p>
                </div>
              </Anim>
            ))}
          </div>

          {/* Social proof - Depoimento */}
          <Anim d={0.2}>
            <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "36px 32px", maxWidth: 700, margin: "0 auto", backdropFilter: "blur(4px)" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16, color: "var(--vit-gold)" }}>{[...Array(5)].map((_,i)=><span key={i}><StarIcon /></span>)}</div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.9)", lineHeight: 1.75, fontStyle: "italic", marginBottom: 20 }}>
                &ldquo;O atendimento na Vittalis Saúde superou todas as minhas expectativas. A equipe é extremamente cuidadosa e o ambiente transmite muita segurança. Me senti acolhida e respeitada em cada momento.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#fff" }}>P</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Paciente da Vittalis</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>Avaliação no Google</div>
                </div>
              </div>
            </div>
          </Anim>
        </div>
      </section>

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
                { icon: <MapIcon />, title: "Localização", text: BRAND.fullAddress, link: BRAND.mapsUrl, linkText: "Ver no Google Maps" },
                { icon: <ClockIcon />, title: "Horários", text: `${BRAND.hours.week}\n${BRAND.hours.sat}`, link: undefined, linkText: undefined },
                { icon: <PhoneIcon />, title: "Contato", text: BRAND.whatsappDisplay, link: waUrl, linkText: "Falar pelo WhatsApp" },
              ].map((info, i) => (
                <div key={i} style={{ background: "white", borderRadius: 18, padding: "24px 22px", border: "1px solid var(--vit-gray-100)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, color: "var(--vit-primary)" }}>
                    {info.icon}
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--vit-charcoal)" }}>{info.title}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--vit-gray-500)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{info.text}</p>
                  {info.link && <a href={info.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--vit-primary)", marginTop: 10, textDecoration: "none" }}>{info.linkText} <ArrowR /></a>}
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
              Sua saúde merece o melhor cuidado
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.82)", lineHeight: 1.75, marginBottom: 36 }}>
              Agende agora seu atendimento de {s.shortName.toLowerCase()} e descubra a experiência Vittalis Saúde — com acolhimento, segurança e excelência clínica.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <CTA variant="white" big href={waUrl}>{s.ctaText}</CTA>
              <CTA variant="gold" big href={`tel:${BRAND.whatsappNumber}`}><PhoneIcon /> {BRAND.whatsappDisplay}</CTA>
            </div>
          </Anim>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ padding: "24px", background: "var(--vit-charcoal)", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados. •{" "}
          <Link href="/" style={{ color: "var(--vit-primary)", textDecoration: "none" }}>Voltar ao início</Link>
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.15)", marginTop: 6 }}>Este site respeita a sua privacidade conforme a LGPD.</p>
      </footer>

      {/* ════ WHATSAPP FAB ════ */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(37,211,102,.4)", transition: "transform .3s" }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
