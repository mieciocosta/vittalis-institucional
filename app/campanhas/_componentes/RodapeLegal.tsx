import Image from "next/image";
import Link from "next/link";
import { LEGAL, responsavelTecnico } from "@/lib/legal";
import { RESSALVA } from "@/lib/content/campanhas";
import { DadosEmpresa } from "../../_componentes/DadosEmpresa";
import s from "./campanha.module.css";

/** Identificação legal (CFM 2.336/2023) + link da Política de Privacidade. */
export function RodapeLegal() {
  // Só aparece quando preenchido em lib/legal.ts ("pendente" no ar pega mal
  // na análise da Meta). O check:campanhas continua avisando a pendência.
  const rt = responsavelTecnico();
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
              {rt && <li>Responsável técnico: {rt}</li>}
              {licenca && <li>Licença sanitária: {licenca}</li>}
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
