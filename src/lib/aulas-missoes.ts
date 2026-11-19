import { ESTUDOS_URL } from "@/config";
import type { LinguagemMissao, Missao } from "@/lib/missoes";

/**
 * Ponte entre as missões (Desafio 2) e o Café de Estudos:
 * cada conceito da missão aponta para as aulas que ajudam a resolvê-la.
 * Se uma aula mudar de endereço no Café, ajuste só esta tabela.
 */
type Aula = { trilha: string; slug: string; titulo: string };
type Tema =
  "variaveis" | "operacoes" | "condicionais" | "repeticao" | "colecoes" | "funcoes" | "registros";

const LOGICA: Record<Tema, Aula> = {
  variaveis: { trilha: "logica", slug: "variaveis-e-tipos", titulo: "Lógica · Variáveis e tipos" },
  operacoes: { trilha: "logica", slug: "operadores", titulo: "Lógica · Operadores" },
  condicionais: { trilha: "logica", slug: "condicionais", titulo: "Lógica · Condicionais" },
  repeticao: { trilha: "logica", slug: "repeticoes", titulo: "Lógica · Repetições" },
  colecoes: { trilha: "logica", slug: "vetores", titulo: "Lógica · Vetores" },
  funcoes: { trilha: "logica", slug: "funcoes", titulo: "Lógica · Funções" },
  registros: { trilha: "logica", slug: "variaveis-e-tipos", titulo: "Lógica · Variáveis e tipos" },
};

const POR_LINGUAGEM: Record<LinguagemMissao, Record<Tema, Aula>> = {
  c: {
    variaveis: {
      trilha: "c",
      slug: "variaveis-printf-e-scanf",
      titulo: "C · Variáveis, printf e scanf",
    },
    operacoes: { trilha: "c", slug: "tipos-e-memoria", titulo: "C · Tipos e memória" },
    condicionais: {
      trilha: "c",
      slug: "decisoes-e-repeticoes",
      titulo: "C · Decisões e repetições",
    },
    repeticao: { trilha: "c", slug: "decisoes-e-repeticoes", titulo: "C · Decisões e repetições" },
    colecoes: { trilha: "c", slug: "vetores-e-strings", titulo: "C · Vetores e strings" },
    funcoes: { trilha: "c", slug: "funcoes", titulo: "C · Funções" },
    registros: { trilha: "c", slug: "structs", titulo: "C · Structs" },
  },
  python: {
    variaveis: { trilha: "python", slug: "primeiros-passos", titulo: "Python · Primeiros passos" },
    operacoes: { trilha: "python", slug: "primeiros-passos", titulo: "Python · Primeiros passos" },
    condicionais: {
      trilha: "python",
      slug: "decisoes-e-repeticoes",
      titulo: "Python · Decisões e repetições",
    },
    repeticao: {
      trilha: "python",
      slug: "decisoes-e-repeticoes",
      titulo: "Python · Decisões e repetições",
    },
    colecoes: {
      trilha: "python",
      slug: "listas-e-dicionarios",
      titulo: "Python · Listas e dicionários",
    },
    funcoes: { trilha: "python", slug: "funcoes", titulo: "Python · Funções" },
    registros: {
      trilha: "python",
      slug: "classes-e-objetos",
      titulo: "Python · Classes e objetos",
    },
  },
  java: {
    variaveis: {
      trilha: "java",
      slug: "tipos-variaveis-e-scanner",
      titulo: "Java · Tipos, variáveis e Scanner",
    },
    operacoes: {
      trilha: "java",
      slug: "tipos-variaveis-e-scanner",
      titulo: "Java · Tipos, variáveis e Scanner",
    },
    condicionais: {
      trilha: "java",
      slug: "decisoes-e-repeticoes",
      titulo: "Java · Decisões e repetições",
    },
    repeticao: {
      trilha: "java",
      slug: "decisoes-e-repeticoes",
      titulo: "Java · Decisões e repetições",
    },
    colecoes: { trilha: "java", slug: "arrays-e-strings", titulo: "Java · Arrays e Strings" },
    funcoes: { trilha: "java", slug: "metodos", titulo: "Java · Métodos" },
    registros: { trilha: "java", slug: "classes-e-objetos", titulo: "Java · Classes e objetos" },
  },
};

/** Traduz o texto livre dos conceitos da missão para um tema de estudo. */
export function temaDoConceito(conceito: string): Tema | null {
  const c = conceito.toLowerCase();
  if (/class|struct|registro|modelagem|estado/.test(c)) return "registros";
  if (/fun[cç]|m[ée]todo/.test(c)) return "funcoes";
  if (/lista|vetor|cole[cç]|busca|arquivo/.test(c)) return "colecoes";
  if (/la[cç]o|repeti/.test(c)) return "repeticao";
  if (/condic|valida/.test(c)) return "condicionais";
  if (/opera|decima|formata/.test(c)) return "operacoes";
  if (/vari[aá]v|entrada|sa[ií]da/.test(c)) return "variaveis";
  return null;
}

export type AulaSugerida = Aula & { url: string; conceito: string };

/**
 * As aulas para uma missão: sem linguagem escolhida, sugere Lógica (vale para todas);
 * com linguagem, aponta para a trilha dela. Sem repetir aulas.
 */
export function aulasDaMissao(missao: Missao, linguagem: LinguagemMissao | ""): AulaSugerida[] {
  const vistas = new Set<string>();
  const lista: AulaSugerida[] = [];
  for (const conceito of missao.conceitos) {
    const tema = temaDoConceito(conceito);
    if (!tema) continue;
    const aula = linguagem ? POR_LINGUAGEM[linguagem][tema] : LOGICA[tema];
    const chave = `${aula.trilha}/${aula.slug}`;
    if (vistas.has(chave)) continue;
    vistas.add(chave);
    lista.push({ ...aula, conceito, url: `${ESTUDOS_URL}/${chave}` });
  }
  return lista;
}
