// Revisão espaçada: quem conclui uma aula recebe lembretes para revisá-la
// em 1, 3, 7 e 14 dias. Revisar pouco antes de esquecer é o que fixa na memória.
// Fica só no navegador, como o progresso: é uma conveniência.
import { useSyncExternalStore } from "react";

export const INTERVALOS = [1, 3, 7, 14] as const;
const CHAVE = "unidunedev:estudos:revisoes:v1";
const DIA = 24 * 60 * 60 * 1000;

export type Revisao = { etapa: number; proxima: string };
type Agenda = Record<string, Revisao>;

const ouvintes = new Set<() => void>();
let cache: Agenda | null = null;

/** "2026-11-19" no fuso de quem estuda. */
export function hoje(agora = new Date()): string {
  const d = new Date(agora.getTime() - agora.getTimezoneOffset() * 60_000);
  return d.toISOString().slice(0, 10);
}

export function somarDias(data: string, dias: number): string {
  const [a, m, d] = data.split("-").map(Number) as [number, number, number];
  return new Date(Date.UTC(a, m - 1, d) + dias * DIA).toISOString().slice(0, 10);
}

/** Primeira revisão: amanhã. */
export function agendar(agenda: Agenda, id: string, dia: string): Agenda {
  if (agenda[id]) return agenda;
  return { ...agenda, [id]: { etapa: 0, proxima: somarDias(dia, INTERVALOS[0]) } };
}

/** Revisou: passa para o próximo intervalo; depois do último, a aula sai da agenda. */
export function revisar(agenda: Agenda, id: string, dia: string): Agenda {
  const atual = agenda[id];
  if (!atual) return agenda;
  const etapa = atual.etapa + 1;
  const { [id]: _removida, ...resto } = agenda;
  if (etapa >= INTERVALOS.length) return resto;
  return { ...resto, [id]: { etapa, proxima: somarDias(dia, INTERVALOS[etapa]!) } };
}

export function vencidas(agenda: Agenda, dia: string): string[] {
  return Object.entries(agenda)
    .filter(([, r]) => r.proxima <= dia)
    .sort(([, a], [, b]) => a.proxima.localeCompare(b.proxima))
    .map(([id]) => id);
}

function ler(): Agenda {
  if (cache) return cache;
  try {
    const bruto: unknown = JSON.parse(localStorage.getItem(CHAVE) ?? "{}");
    cache = {};
    if (bruto && typeof bruto === "object") {
      for (const [id, r] of Object.entries(bruto as Record<string, unknown>)) {
        const v = r as Partial<Revisao>;
        if (typeof v?.etapa === "number" && typeof v.proxima === "string") cache[id] = v as Revisao;
      }
    }
  } catch {
    cache = {};
  }
  return cache;
}

function gravar(agenda: Agenda) {
  cache = agenda;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(agenda));
  } catch {
    // Sem armazenamento: vale só nesta visita.
  }
  ouvintes.forEach((f) => f());
}

export const agendarRevisao = (id: string) => gravar(agendar(ler(), id, hoje()));
export const marcarRevisada = (id: string) => gravar(revisar(ler(), id, hoje()));
export function tirarDaAgenda(id: string) {
  const { [id]: _removida, ...resto } = ler();
  gravar(resto);
}

export function useAgenda(): Agenda {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    ler,
    () => ({}),
  );
}
