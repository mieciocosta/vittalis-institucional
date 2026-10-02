import Image from "next/image";
import Link from "next/link";
import { LEGAL, PENDENTE, responsavelTecnicoTexto } from "@/lib/legal";
import { RESSALVA } from "@/lib/content/campanhas";
import { DadosEmpresa } from "../../_componentes/DadosEmpresa";
import s from "./campanha.module.css";

/** Identificação legal (CFM 2.336/2023) + link da Política de Privacidade. */
export function RodapeLegal() {
  const rt = responsavelTecnicoTexto();
  const licenca = LEGAL.licencaSanitaria;
  return (
    <footer className={s.rodape}>
      <div className={s.container}>
        <div className={s.rodapeGrade}>
          <div>
            <Image src="/images/campanhas/logo-rodape.png" alt={LEGAL.nomeFantasia} width={300} height={40} className={s.rodapeLogo} unoptimized loading="lazy" />
            {/* Dados da empresa: iguais às Informações da empresa da Meta */}
            <DadosEmpresa cores={{ texto: "var(--vit-primary-light)", titulo: "#fff", link: "#fff" }} />
            <ul className={s.rodapeLista} style={{ marginTop: 10 }}>
              <li>
                Responsável técnico:{" "}
                <span className={rt.includes(PENDENTE) ? s.rodapePendente : undefined}>{rt}</span>
              </li>
              <li>
                Licença sanitária:{" "}
                {licenca ? licenca : <span className={s.rodapePendente}>{PENDENTE}</span>}
              </li>
            </ul>
          </div>
          <div>
            <p className={s.rodapeTitulo}>Informações</p>
            <ul className={s.rodapeLista}>
              <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
              <li><Link href="/">Site da Vittalis Saúde</Link></li>
              <li><a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>
            </ul>
          </div>
        </div>
        <p className={s.rodapeBase}>{RESSALVA}</p>
      </div>
    </footer>
  );
}
