// Linguagens que aparecem nas trilhas de profissões.
// Se existir uma trilha com o mesmo id (ex.: "c", "python"), o chip vira link automaticamente.
// Para uma linguagem nova virar link, basta criar a trilha dela no catalogo.ts com esse id.

export type InfoLinguagem = { nome: string; cor: string };

export const LINGUAGENS: Record<string, InfoLinguagem> = {
  c: { nome: "C", cor: "#5c8dd6" },
  python: { nome: "Python", cor: "#3776ab" },
  java: { nome: "Java", cor: "#e76f00" },
  javascript: { nome: "JavaScript", cor: "#d4b106" },
  typescript: { nome: "TypeScript", cor: "#3178c6" },
  "html-css": { nome: "HTML e CSS", cor: "#e44d26" },
  dart: { nome: "Dart", cor: "#0175c2" },
  kotlin: { nome: "Kotlin", cor: "#7f52ff" },
  swift: { nome: "Swift", cor: "#f05138" },
  csharp: { nome: "C#", cor: "#68217a" },
  go: { nome: "Go", cor: "#00add8" },
  php: { nome: "PHP", cor: "#777bb4" },
  sql: { nome: "SQL", cor: "#336791" },
  bash: { nome: "Bash", cor: "#4eaa25" },
};
