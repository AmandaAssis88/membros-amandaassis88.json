/**
 * Mesmos IDs e nomes da votação do onboarding (src/components/style-picker.tsx).
 * O voto original fica privado no Supabase; aqui cada aluno escolhe sua própria preferência.
 */
export const TEMAS = [
  {
    id: "lofi",
    nome: "Lo-fi Café",
    descricao: "Chuva, café quentinho e um ritmo só seu.",
    emoji: "☕",
    imagem: "/temas/lofi.svg",
    miniatura: "/temas/thumbs/lofi.svg",
  },
  {
    id: "gamificado",
    nome: "Gamificado",
    descricao: "Mais uma missão, mais um nível alcançado.",
    emoji: "🎮",
    imagem: "/temas/gamificado.svg",
    miniatura: "/temas/thumbs/gamificado.svg",
  },
  {
    id: "floresta",
    nome: "Fantasia florestal",
    descricao: "Um cantinho encantado para novas descobertas.",
    emoji: "🌿",
    imagem: "/temas/floresta.svg",
    miniatura: "/temas/thumbs/floresta.svg",
  },
  {
    id: "clean",
    nome: "Profissional clean",
    descricao: "Espaço leve, claro e sem distrações.",
    emoji: "✨",
    imagem: "/temas/clean.svg",
    miniatura: "/temas/thumbs/clean.svg",
  },
  {
    id: "terminal",
    nome: "Terminal hacker",
    descricao: "Código, terminal e foco em cada comando.",
    emoji: "⌨️",
    imagem: "/temas/terminal.svg",
    miniatura: "/temas/thumbs/terminal.svg",
  },
  {
    id: "brutalismo",
    nome: "Neo-brutalismo",
    descricao: "Cores ousadas e criatividade sem limites.",
    emoji: "🎨",
    imagem: "/temas/brutalismo.svg",
    miniatura: "/temas/thumbs/brutalismo.svg",
  },
] as const;

export type TemaId = (typeof TEMAS)[number]["id"];
export const TEMA_PADRAO: TemaId = "lofi";
export const CHAVE_TEMA = "unidunedev:estudos:tema:v1";

export function temaValido(valor: unknown): valor is TemaId {
  return typeof valor === "string" && TEMAS.some((t) => t.id === valor);
}

export const MENSAGENS = [
  "Você não precisa ser o melhor programador hoje. Só precisa continuar estudando.",
  "Respeite seu processo. Não se cobre para aprender rápido. Volte aqui e repita.",
  "Toda pessoa que programa começou sem saber. O importante é não desistir de aprender.",
  "Um conceito de cada vez. Um commit de cada vez. Você está construindo seu caminho.",
  "Não compare seu capítulo um com o capítulo vinte de outra pessoa.",
  "Hoje pode ser só uma revisão. Consistência também se constrói com calma.",
  "Não entendeu de primeira? Tudo bem. Aprender também é tentar de novo.",
  "Seu ritmo não precisa ser igual ao dos outros para te levar longe.",
  "O código melhora aos poucos. Você também.",
  "Pequenos avanços merecem ser comemorados. Continue.",
  "Você pode descansar e ainda assim estar evoluindo.",
  "Estude com curiosidade, não com medo de errar.",
] as const;

/** A frase varia por dia e username, mas não muda a cada renderização. */
export function fraseDoDia(github: string, dataLocal: string): string {
  const chave = github.trim().toLowerCase() + "|" + dataLocal;
  let hash = 2166136261;
  for (const letra of chave) {
    hash ^= letra.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return MENSAGENS[(hash >>> 0) % MENSAGENS.length] ?? MENSAGENS[0];
}

export function dataLocalHoje(agora = new Date()): string {
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
