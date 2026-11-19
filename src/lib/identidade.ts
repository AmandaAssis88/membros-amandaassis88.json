import { useSyncExternalStore } from "react";
import { loadMembers, type Member } from "@/lib/community";

/**
 * "Quem é você?" da comunidade.
 * Só reconhecemos quem já está no MURAL (membros/*.json, públicos).
 * As inscrições do Supabase continuam fechadas para leitura, por segurança.
 * O usuário fica lembrado neste navegador para mostrar a jornada e o avatar no menu.
 */
export const CHAVE_IDENTIDADE = "unidunedev:comunidade:github:v1";
export const PADRAO_GITHUB = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

const MEMBROS = new Map<string, Member>();
for (const membro of loadMembers()) MEMBROS.set(membro.github.toLowerCase(), membro);

export function normalizarGitHub(valor: string): string {
  return valor
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
}

export function buscarMembro(github: string): Member | null {
  return MEMBROS.get(normalizarGitHub(github)) ?? null;
}

export function linkDosMeusPRs(github: string): string {
  const autor = encodeURIComponent(normalizarGitHub(github));
  return `https://github.com/unidunedev/onboarding/pulls?q=is%3Apr+author%3A${autor}`;
}

const ouvintes = new Set<() => void>();
let atual: string | null | undefined;

function ler(): string | null {
  if (atual !== undefined) return atual;
  try {
    const salvo = localStorage.getItem(CHAVE_IDENTIDADE);
    atual = salvo && buscarMembro(salvo) ? normalizarGitHub(salvo) : null;
  } catch {
    atual = null;
  }
  return atual;
}

function avisar() {
  ouvintes.forEach((f) => f());
}

export function entrarComo(github: string) {
  atual = normalizarGitHub(github);
  try {
    localStorage.setItem(CHAVE_IDENTIDADE, atual);
  } catch {
    // Sem armazenamento: vale só nesta visita.
  }
  avisar();
}

export function sair() {
  atual = null;
  try {
    localStorage.removeItem(CHAVE_IDENTIDADE);
  } catch {
    // ignora
  }
  avisar();
}

/** O membro identificado neste navegador (ou null). */
export function useMembroAtual(): Member | null {
  const github = useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    ler,
    () => null,
  );
  return github ? buscarMembro(github) : null;
}
