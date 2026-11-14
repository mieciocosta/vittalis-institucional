// Bebês desenhados à mão em SVG para o quadro "Desenvolvimento do bebê"
// (14/11, pedido da direção: "coloca tipo assim com imagens de bebês").
// Desenho próprio, sem foto de banco: cada pose mostra um marco do
// desenvolvimento. Pra trocar por fotos reais depois, basta trocar este
// componente por <Image> em Pediatria.tsx.

const PELE = "#f6c9a6";
const PELE_SOMBRA = "#e9b28b";
const FRALDA = "#ffffff";
const CABELO = "#b9773f";

type P = [number, number];

function Membro({ de, ate, w = 12 }: { de: P; ate: P; w?: number }) {
  return (
    <g>
      <line x1={de[0]} y1={de[1]} x2={ate[0]} y2={ate[1]} stroke={PELE_SOMBRA} strokeWidth={w + 2} strokeLinecap="round" />
      <line x1={de[0]} y1={de[1]} x2={ate[0]} y2={ate[1]} stroke={PELE} strokeWidth={w} strokeLinecap="round" />
      <circle cx={ate[0]} cy={ate[1]} r={w * 0.62} fill={PELE} stroke={PELE_SOMBRA} strokeWidth={1.2} />
    </g>
  );
}

function Cabeca({ x, y, r = 22, olhando = 0, rosto = true }: { x: number; y: number; r?: number; olhando?: number; rosto?: boolean }) {
  const o = olhando;
  return (
    <g>
      <circle cx={x - r * 0.92} cy={y + 3} r={r * 0.22} fill={PELE} stroke={PELE_SOMBRA} strokeWidth={1.2} />
      <circle cx={x + r * 0.92} cy={y + 3} r={r * 0.22} fill={PELE} stroke={PELE_SOMBRA} strokeWidth={1.2} />
      <circle cx={x} cy={y} r={r} fill={PELE} stroke={PELE_SOMBRA} strokeWidth={1.4} />
      <path d={`M${x - r * 0.55} ${y - r * 0.72} q${r * 0.3} ${-r * 0.42} ${r * 0.62} ${-r * 0.18} q${r * 0.18} ${-r * 0.3} ${r * 0.42} ${r * 0.05}`} fill="none" stroke={CABELO} strokeWidth={2.6} strokeLinecap="round" />
      {rosto && (
        <>
          <ellipse cx={x - r * 0.36 + o} cy={y + r * 0.02} rx={r * 0.09} ry={r * 0.12} fill="#2b2b2b" />
          <ellipse cx={x + r * 0.36 + o} cy={y + r * 0.02} rx={r * 0.09} ry={r * 0.12} fill="#2b2b2b" />
          <circle cx={x - r * 0.33 + o} cy={y - r * 0.03} r={r * 0.03} fill="#fff" />
          <circle cx={x + r * 0.39 + o} cy={y - r * 0.03} r={r * 0.03} fill="#fff" />
          <ellipse cx={x - r * 0.56 + o} cy={y + r * 0.32} rx={r * 0.16} ry={r * 0.1} fill="#f49aae" opacity={0.6} />
          <ellipse cx={x + r * 0.56 + o} cy={y + r * 0.32} rx={r * 0.16} ry={r * 0.1} fill="#f49aae" opacity={0.6} />
          <path d={`M${x - r * 0.2 + o} ${y + r * 0.36} q${r * 0.2} ${r * 0.22} ${r * 0.4} 0`} fill="none" stroke="#b4565c" strokeWidth={2} strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

function Corpo({ x, y, rx, ry, rot = 0 }: { x: number; y: number; rx: number; ry: number; rot?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${rot} ${x} ${y})`} fill={PELE} stroke={PELE_SOMBRA} strokeWidth={1.4} />;
}

function Fralda({ x, y, rx, ry, rot = 0 }: { x: number; y: number; rx: number; ry: number; rot?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${rot} ${x} ${y})`} fill={FRALDA} stroke="#dfe6ea" strokeWidth={1.6} />;
}

function Sombra({ x, w }: { x: number; w: number }) {
  return <ellipse cx={x} cy={126} rx={w} ry={4} fill="#000" opacity={0.08} />;
}

const POSES: Record<number, React.ReactNode> = {
  // 0 a 2 meses: deitado de costas, mãos fechadas
  1: (
    <>
      <Sombra x={86} w={58} />
      <Membro de={[72, 92]} ate={[66, 66]} />
      <Membro de={[92, 90]} ate={[98, 64]} />
      <Membro de={[118, 96]} ate={[132, 72]} />
      <Membro de={[124, 100]} ate={[148, 84]} />
      <Corpo x={92} y={102} rx={32} ry={17} />
      <Fralda x={120} y={102} rx={14} ry={16} />
      <Cabeca x={44} y={98} r={23} olhando={-1} />
    </>
  ),
  // 2 a 4 meses: de bruços, sustenta a cabeça
  2: (
    <>
      <Sombra x={92} w={62} />
      <Corpo x={98} y={110} rx={36} ry={14} />
      <Fralda x={128} y={108} rx={14} ry={13} />
      <Membro de={[136, 112]} ate={[156, 116]} />
      <Membro de={[72, 112]} ate={[58, 118]} w={11} />
      <Cabeca x={54} y={80} r={23} />
    </>
  ),
  // 4 a 6 meses: apoia nas mãos e rola
  3: (
    <>
      <Sombra x={92} w={62} />
      <Corpo x={100} y={102} rx={36} ry={15} rot={-18} />
      <Fralda x={130} y={112} rx={14} ry={13} />
      <Membro de={[140, 114]} ate={[158, 118]} />
      <Membro de={[72, 92]} ate={[68, 120]} />
      <Membro de={[84, 90]} ate={[84, 120]} />
      <Cabeca x={60} y={64} r={23} />
    </>
  ),
  // 6 a 9 meses: senta sem apoio
  4: (
    <>
      <Sombra x={84} w={46} />
      <Membro de={[72, 112]} ate={[50, 120]} />
      <Membro de={[96, 112]} ate={[118, 120]} />
      <Corpo x={84} y={88} rx={21} ry={25} />
      <Fralda x={84} y={110} rx={24} ry={11} />
      <Membro de={[66, 80]} ate={[58, 104]} w={11} />
      <Membro de={[102, 78]} ate={[118, 56]} w={11} />
      <Cabeca x={84} y={46} r={24} />
    </>
  ),
  // 7 a 10 meses: engatinha
  5: (
    <>
      <Sombra x={92} w={56} />
      <Membro de={[118, 92]} ate={[122, 118]} />
      <Membro de={[122, 118]} ate={[146, 120]} w={11} />
      <Corpo x={94} y={86} rx={32} ry={16} rot={-4} />
      <Fralda x={122} y={86} rx={14} ry={15} />
      <Membro de={[70, 92]} ate={[66, 118]} />
      <Membro de={[82, 94]} ate={[84, 118]} />
      <Cabeca x={52} y={70} r={23} />
    </>
  ),
  // 9 a 12 meses: fica em pé com apoio
  6: (
    <>
      <Sombra x={98} w={50} />
      <rect x={104} y={76} width={44} height={48} rx={5} fill="#d9b48a" stroke="#c39a6c" strokeWidth={1.6} />
      <line x1={104} y1={92} x2={148} y2={92} stroke="#c39a6c" strokeWidth={1.4} />
      <Membro de={[70, 98]} ate={[68, 122]} />
      <Membro de={[84, 98]} ate={[88, 122]} />
      <Corpo x={77} y={72} rx={18} ry={22} />
      <Fralda x={77} y={92} rx={19} ry={11} />
      <Membro de={[90, 64]} ate={[110, 80]} w={11} />
      <Membro de={[88, 74]} ate={[110, 90]} w={11} />
      <Cabeca x={76} y={34} r={23} olhando={2} />
    </>
  ),
  // 12 a 18 meses: anda sozinho
  7: (
    <>
      <Sombra x={84} w={34} />
      <Membro de={[78, 98]} ate={[66, 122]} />
      <Membro de={[90, 98]} ate={[102, 120]} />
      <Corpo x={84} y={72} rx={18} ry={22} />
      <Fralda x={84} y={92} rx={19} ry={11} />
      <Membro de={[70, 64]} ate={[48, 56]} w={11} />
      <Membro de={[98, 64]} ate={[120, 52]} w={11} />
      <Cabeca x={84} y={34} r={23} />
    </>
  ),
  // 18 a 24 meses: corre e brinca com bola
  8: (
    <>
      <Sombra x={84} w={38} />
      <circle cx={136} cy={110} r={14} fill="#f0a3b6" stroke="#d9668a" strokeWidth={1.6} />
      <path d="M124 102 q12 8 24 0 M126 120 q10 -8 20 0" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      <Membro de={[76, 98]} ate={[58, 116]} />
      <Membro de={[88, 98]} ate={[104, 122]} />
      <Corpo x={82} y={72} rx={18} ry={22} rot={8} />
      <Fralda x={82} y={92} rx={19} ry={11} />
      <Membro de={[70, 66]} ate={[54, 82]} w={11} />
      <Membro de={[96, 62]} ate={[116, 46]} w={11} />
      <Cabeca x={86} y={34} r={23} olhando={2} />
    </>
  ),
};

export function Bebe({ pose }: { pose: number }) {
  return (
    <svg viewBox="0 0 170 132" role="img" aria-hidden width="100%" height="100%">
      {POSES[pose]}
    </svg>
  );
}

// Crianças maiores para "depois dos 2 anos" (14/11): mesma família de traço
// dos bebês, com roupa e um objeto de cada fase.
function Perna({ x, y1, y2, cor, w = 11 }: { x: number; y1: number; y2: number; cor: string; w?: number }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={cor} strokeWidth={w} strokeLinecap="round" />
      <ellipse cx={x + 3} cy={y2 + 3} rx={8} ry={4.5} fill="#ffffff" stroke="#c9d3da" strokeWidth={1.4} />
    </g>
  );
}

const CRIANCAS: Record<number, React.ReactNode> = {
  // 2 a 5 anos: com o ursinho
  1: (
    <>
      <ellipse cx={86} cy={127} rx={34} ry={4} fill="#000" opacity={0.08} />
      <Perna x={79} y1={96} y2={120} cor={PELE} />
      <Perna x={93} y1={96} y2={120} cor={PELE} />
      <rect x={68} y={84} width={36} height={16} rx={7} fill="#6f93d6" />
      <Membro de={[70, 62]} ate={[58, 84]} w={10} />
      <rect x={67} y={54} width={38} height={36} rx={14} fill="#8ccbe3" />
      <g>
        <circle cx={126} cy={76} r={13} fill="#c98b5a" />
        <circle cx={117} cy={64} r={6} fill="#c98b5a" /><circle cx={135} cy={64} r={6} fill="#c98b5a" />
        <circle cx={126} cy={74} r={9} fill="#d9a073" />
        <circle cx={122} cy={72} r={1.6} fill="#3a2a20" /><circle cx={130} cy={72} r={1.6} fill="#3a2a20" />
        <ellipse cx={126} cy={78} rx={3} ry={2} fill="#3a2a20" />
        <circle cx={126} cy={95} r={12} fill="#c98b5a" />
      </g>
      <Membro de={[102, 64]} ate={[116, 80]} w={10} />
      <Cabeca x={86} y={33} r={23} />
    </>
  ),
  // 6 a 11 anos: mochila da escola
  2: (
    <>
      <ellipse cx={86} cy={127} rx={32} ry={4} fill="#000" opacity={0.08} />
      <rect x={96} y={50} width={26} height={34} rx={8} fill="#ffc94d" stroke="#e8ad2c" strokeWidth={1.5} />
      <rect x={100} y={66} width={18} height={10} rx={4} fill="#ffdb85" />
      <Perna x={79} y1={92} y2={121} cor={PELE} w={10} />
      <Perna x={93} y1={92} y2={121} cor={PELE} w={10} />
      <path d="M70 80 h32 l4 16 h-40 z" fill="#5b7fc0" />
      <Membro de={[71, 56]} ate={[60, 80]} w={9} />
      <rect x={69} y={46} width={34} height={38} rx={12} fill="#f4a6bd" />
      <line x1={96} y1={48} x2={92} y2={80} stroke="#e8ad2c" strokeWidth={4} strokeLinecap="round" />
      <Membro de={[100, 54]} ate={[114, 34]} w={9} />
      <Cabeca x={86} y={27} r={21} />
    </>
  ),
  // 12 a 18 anos: fone de ouvido e celular
  3: (
    <>
      <ellipse cx={86} cy={127} rx={30} ry={4} fill="#000" opacity={0.08} />
      <Perna x={79} y1={84} y2={121} cor="#3f5f8f" w={12} />
      <Perna x={93} y1={84} y2={121} cor="#3f5f8f" w={12} />
      <rect x={68} y={40} width={36} height={48} rx={13} fill="#6aa7c9" />
      <path d="M76 40 q10 12 20 0" fill="none" stroke="#4f8db1" strokeWidth={3} />
      <Membro de={[71, 50]} ate={[66, 80]} w={9} />
      <Membro de={[101, 50]} ate={[92, 66]} w={9} />
      <rect x={84} y={56} width={10} height={16} rx={2.5} fill="#2b2b2b" transform="rotate(-12 89 64)" />
      <path d="M58 22 q-2 -24 28 -26 q30 2 28 26 q4 18 0 20 q-8 -6 -6 -24 q-22 -14 -44 0 q2 18 -6 24 q-4 -2 0 -20z" fill="#6b4226" />
      <Cabeca x={86} y={21} r={19} />
      <path d="M66 18 q20 -26 40 0" fill="none" stroke="#444" strokeWidth={3.2} strokeLinecap="round" />
      <rect x={61} y={14} width={8} height={13} rx={3.5} fill="#ee8fab" />
      <rect x={103} y={14} width={8} height={13} rx={3.5} fill="#ee8fab" />
    </>
  ),
};

export function Crianca({ fase }: { fase: number }) {
  return (
    <svg viewBox="0 0 170 132" role="img" aria-hidden width="100%" height="100%">
      {CRIANCAS[fase]}
    </svg>
  );
}
