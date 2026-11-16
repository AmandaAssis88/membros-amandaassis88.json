/**
 * O Supabase da comunidade só permite INSERT aos visitantes por RLS.
 * Usamos os perfis PUBLICADOS no mural (membros/*.json), nunca inscrições privadas.
 * Vite inclui esses dados públicos no build do site de estudos.
 */
export type PerfilPublico = {
  github: string;
  nome: string;
  avatar: string;
  periodo: string;
  areas: string[];
  frase: string;
  entrouEm: string;
};

export const CHAVE_PERFIL = "unidunedev:estudos:github:v1";
export const PADRAO_GITHUB = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

const arquivos = import.meta.glob("../../../membros/*.json", { eager: true, import: "default" });
const avatares = import.meta.glob("../../../public/avatares/**/*.svg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function ePerfilPublico(valor: unknown): valor is PerfilPublico {
  if (!valor || typeof valor !== "object") return false;
  const p = valor as Partial<PerfilPublico>;
  return typeof p.github === "string" && PADRAO_GITHUB.test(p.github) &&
    typeof p.nome === "string" && p.nome.length > 0 &&
    typeof p.avatar === "string" &&
    typeof p.periodo === "string" &&
    typeof p.frase === "string" &&
    typeof p.entrouEm === "string" &&
    Array.isArray(p.areas) && p.areas.every((a) => typeof a === "string");
}

const PERFIS = new Map<string, PerfilPublico>();
for (const [caminho, conteudo] of Object.entries(arquivos)) {
  if (caminho.split("/").at(-1)?.startsWith("_") || !ePerfilPublico(conteudo)) continue;
  PERFIS.set(conteudo.github.toLowerCase(), conteudo);
}

export function buscarPerfil(github: string): PerfilPublico | null {
  return PERFIS.get(github.trim().replace(/^@/, "").toLowerCase()) ?? null;
}

export function normalizarGitHub(valor: string): string {
  return valor.trim().replace(/^@/, "").toLowerCase();
}

export function avatarDoPerfil(perfil: PerfilPublico): string {
  if (perfil.avatar.startsWith("/avatares/")) {
    // Avatares da comunidade são importados como assets do build de estudos.
    return avatares[`../../../public${perfil.avatar}`] || `https://github.com/${perfil.github}.png?size=160`;
  }
  return /^https:\/\/\S+$/.test(perfil.avatar)
    ? perfil.avatar
    : `https://github.com/${perfil.github}.png?size=160`;
}
