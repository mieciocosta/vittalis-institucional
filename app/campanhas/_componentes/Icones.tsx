import type { Icone } from "@/lib/content/campanhas";

// Ícones em traço fino, no mesmo estilo dos ícones da home.
const DESENHOS: Record<Icone | "check" | "whats" | "telefone" | "local" | "seta" | "voltar" | "mais", string> = {
  caderneta: "M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM4 17a2 2 0 0 1 2-2h12M9 7h6M9 11h4",
  calendario: "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2",
  sino: "M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16zM10 20a2 2 0 0 0 4 0",
  casa: "M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-6h4v6",
  coracao: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  escudo: "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM9 12l2 2 4-4",
  equipe: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 11a2.5 2.5 0 1 0 0-5M17.5 20H21a5 5 0 0 0-4-4.9",
  clinica: "M4 20V8l8-4 8 4v12M4 20h16M12 9v6M9 12h6",
  maos: "M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V5a1.5 1.5 0 0 1 3 0v6M13 10.5V6a1.5 1.5 0 0 1 3 0v7a6 6 0 0 1-6 6h-.5a5 5 0 0 1-4-2l-2.3-3.2a1.5 1.5 0 0 1 2.3-1.9L7 13",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01",
  bebe: "M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM10.5 9h.01M13.5 9h.01M10.5 11a2 2 0 0 0 3 0M6 21a6 6 0 0 1 12 0",
  estrela: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5z",
  relogio: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  conversa: "M4 5h16v11H9l-5 4V5zM8 9h8M8 12h5",
  check: "M5 12.5l4.5 4.5L19 7.5",
  whats: "",
  telefone: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  local: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  seta: "M5 12h14M13 6l6 6-6 6",
  voltar: "M19 12H5M11 6l-6 6 6 6",
  mais: "M12 5v14M5 12h14",
};

export type NomeIcone = keyof typeof DESENHOS;

export function Ico({ nome, tamanho = 22, className }: { nome: NomeIcone; tamanho?: number; className?: string }) {
  if (nome === "whats") {
    return (
      <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
      </svg>
    );
  }
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={DESENHOS[nome]} />
    </svg>
  );
}
