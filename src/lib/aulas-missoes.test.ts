import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { aulasDaMissao, temaDoConceito } from "./aulas-missoes";
import { LINGUAGENS_MISSAO, MISSOES } from "./missoes";

// Os .mdx do Café de Estudos ficam em estudos/conteudo/<pasta>/<NN>-<slug>.mdx
const PASTAS: Record<string, string> = {
  logica: "disciplinas/logica",
  c: "linguagens/c",
  python: "linguagens/python",
  java: "linguagens/java",
};
function existeAula(trilha: string, slug: string) {
  const pasta = resolve(__dirname, "../../estudos/conteudo", PASTAS[trilha] ?? trilha);
  return readdirSync(pasta).some((f) => f.replace(/^\d+-/, "") === `${slug}.mdx`);
}

describe("ponte missões → Café de Estudos", () => {
  it("todo conceito das missões vira um tema de estudo", () => {
    const soltos = MISSOES.flatMap((m) => m.conceitos).filter((c) => temaDoConceito(c) === null);
    expect(soltos).toEqual([]);
  });

  it("todas as aulas sugeridas existem no Café", () => {
    for (const missao of MISSOES) {
      for (const linguagem of ["", ...LINGUAGENS_MISSAO.map((l) => l.id)] as const) {
        for (const aula of aulasDaMissao(missao, linguagem)) {
          expect(existeAula(aula.trilha, aula.slug), `${aula.trilha}/${aula.slug}`).toBe(true);
        }
      }
    }
  });

  it("não repete aula na mesma missão", () => {
    for (const missao of MISSOES) {
      const urls = aulasDaMissao(missao, "python").map((a) => a.url);
      expect(new Set(urls).size).toBe(urls.length);
    }
  });
});
