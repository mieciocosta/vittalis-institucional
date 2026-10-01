// Carregador usado só pelo check:campanhas: permite ao Node ler os .ts do
// projeto (lib/content/campanhas.ts etc.) sem depender da versão do Node
// do build da Cloudflare. Usa o TypeScript que já é dependência do projeto.
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Imports sem extensão ("../config/contato") viram ".ts".
export async function resolve(especificador, contexto, proximo) {
  try {
    return await proximo(especificador, contexto);
  } catch (erro) {
    const relativo = especificador.startsWith("./") || especificador.startsWith("../");
    if (relativo && !/\.[cm]?[jt]sx?$/.test(especificador)) return proximo(`${especificador}.ts`, contexto);
    throw erro;
  }
}

export async function load(url, contexto, proximo) {
  if (url.startsWith("file:") && url.endsWith(".ts")) {
    const fonte = await readFile(new URL(url), "utf8");
    const { outputText } = ts.transpileModule(fonte, {
      fileName: url,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return proximo(url, contexto);
}
