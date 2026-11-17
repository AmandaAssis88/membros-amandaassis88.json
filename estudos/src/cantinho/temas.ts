/** Ambientes de estudo: a escolha não altera as trilhas nem o voto do desafio 1.
 * As capas estão em WebP; a animação de chuva, vapor e luz vive no CSS.
 */
export const TEMAS = [
  {
    id: "lofi",
    nome: "Lo-fi Café",
    descricao: "Chuva na janela, café quente e código sem pressa.",
    emoji: "☕",
    imagem: "/temas/ambientes/lofi.webp",
    miniatura: "/temas/ambientes/thumbs/lofi.webp",
  },
  {
    id: "cabana",
    nome: "Cabana na Chuva",
    descricao: "Lareira acesa, madeira e um refúgio para se concentrar.",
    emoji: "🏡",
    imagem: "/temas/ambientes/cabana.webp",
    miniatura: "/temas/ambientes/thumbs/cabana.webp",
  },
  {
    id: "biblioteca",
    nome: "Biblioteca Encantada",
    descricao: "Livros, luar e um pouquinho de magia no ar.",
    emoji: "📚",
    imagem: "/temas/ambientes/biblioteca.webp",
    miniatura: "/temas/ambientes/thumbs/biblioteca.webp",
  },
  {
    id: "neon",
    nome: "Dev focado",
    descricao: "Uma noite colorida para criar e explorar ideias.",
    emoji: "🌌",
    imagem: "/temas/ambientes/neon.webp",
    miniatura: "/temas/ambientes/thumbs/neon.webp",
  },
  {
    id: "laboratorio",
    nome: "Laboratório de idéias",
    descricao: "Robôs, protótipos e curiosidade sobre a mesa.",
    emoji: "🧪",
    imagem: "/temas/ambientes/laboratorio.webp",
    miniatura: "/temas/ambientes/thumbs/laboratorio.webp",
  },
  {
    id: "solar",
    nome: "Manhãzinha",
    descricao: "Sol entrando pela janela e espaço para respirar.",
    emoji: "☀️",
    imagem: "/temas/ambientes/solar.webp",
    miniatura: "/temas/ambientes/thumbs/solar.webp",
  },
] as const;

export type TemaId = (typeof TEMAS)[number]["id"];
export const TEMA_PADRAO: TemaId = "lofi";
export const CHAVE_TEMA = "unidunedev:estudos:tema:v1";

export function temaValido(valor: unknown): valor is TemaId {
  return typeof valor === "string" && TEMAS.some((tema) => tema.id === valor);
}

/** Preferências antigas continuam aproveitáveis após a troca da coleção. */
const MIGRACAO_TEMAS: Record<string, TemaId> = {
  gamificado: "neon",
  floresta: "biblioteca",
  clean: "solar",
  terminal: "neon",
  brutalismo: "laboratorio",
};

export function normalizarTema(valor: unknown): TemaId {
  if (temaValido(valor)) return valor;
  if (typeof valor === "string") return MIGRACAO_TEMAS[valor] ?? TEMA_PADRAO;
  return TEMA_PADRAO;
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
