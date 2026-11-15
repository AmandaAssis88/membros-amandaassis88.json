/** Regras puras do Pomodoro: relógio baseado em tempo real, mesmo com a aba suspensa. */
export type FasePomodoro = "foco" | "pausa" | "pronto";

export type ConfigPomodoro = {
  foco: number;
  descanso: number;
  usarDescanso: boolean;
};

export type SessaoPomodoro = {
  fase: FasePomodoro;
  /** Milissegundos restantes quando não está contando (ou duração da etapa iniciada). */
  restanteMs: number;
  /** Timestamp absoluto de término. null = parado/pausado. */
  fimEm: number | null;
};

export const CONFIG_PADRAO: ConfigPomodoro = {
  foco: 25,
  descanso: 5,
  usarDescanso: true,
};

export const MS_MINUTO = 60_000;

export function minutosValidos(valor: unknown, maximo: number, padrao: number): number {
  return typeof valor === "number" && Number.isFinite(valor)
    ? Math.max(1, Math.min(maximo, Math.round(valor)))
    : padrao;
}

export function novaSessao(config: ConfigPomodoro, fase: FasePomodoro = "foco"): SessaoPomodoro {
  return {
    fase,
    restanteMs: (fase === "pausa" ? config.descanso : config.foco) * MS_MINUTO,
    fimEm: null,
  };
}

export function tempoRestante(sessao: SessaoPomodoro, agora: number): number {
  return Math.max(0, sessao.fimEm === null ? sessao.restanteMs : sessao.fimEm - agora);
}

/** 
 * Atualiza o estado usando timestamps absolutos: a pausa começa no instante real
 * em que o foco terminou, mesmo que o navegador tenha suspendido o intervalo.
 */
export function avancarSessao(
  sessao: SessaoPomodoro,
  config: ConfigPomodoro,
  agora: number,
): SessaoPomodoro {
  if (sessao.fimEm === null || agora < sessao.fimEm) return sessao;

  if (sessao.fase === "foco" && config.usarDescanso) {
    const fimDescanso = sessao.fimEm + config.descanso * MS_MINUTO;
    if (agora < fimDescanso) {
      return {
        fase: "pausa",
        restanteMs: config.descanso * MS_MINUTO,
        fimEm: fimDescanso,
      };
    }
  }

  return novaSessao(config, "pronto");
}

export function formatarTempo(restanteMs: number): string {
  const segundos = Math.ceil(Math.max(0, restanteMs) / 1000);
  const minutos = Math.floor(segundos / 60);
  return `${String(minutos).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`;
}
