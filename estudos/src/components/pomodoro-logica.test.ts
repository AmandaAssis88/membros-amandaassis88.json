import { describe, expect, it } from "vitest";
import {
  avancarSessao,
  CONFIG_PADRAO,
  formatarTempo,
  minutosValidos,
  MS_MINUTO,
  novaSessao,
  tempoRestante,
} from "./pomodoro-logica";

describe("Pomodoro do Café de Estudos", () => {
  it("começa com 25 minutos de foco e 5 de descanso", () => {
    const sessao = novaSessao(CONFIG_PADRAO);
    expect(sessao.fase).toBe("foco");
    expect(sessao.restanteMs).toBe(25 * MS_MINUTO);
    expect(sessao.fimEm).toBeNull();
    expect(CONFIG_PADRAO.descanso).toBe(5);
  });

  it("passa automaticamente de foco para descanso", () => {
    const sessao = { ...novaSessao(CONFIG_PADRAO), fimEm: 100_000 };
    const seguinte = avancarSessao(sessao, CONFIG_PADRAO, 100_001);
    expect(seguinte.fase).toBe("pausa");
    expect(seguinte.fimEm).toBe(100_000 + 5 * MS_MINUTO);
  });

  it("após o descanso, aguarda a pessoa iniciar outro ciclo", () => {
    const pausa = { ...novaSessao(CONFIG_PADRAO, "pausa"), fimEm: 100_000 + 5 * MS_MINUTO };
    const terminado = avancarSessao(pausa, CONFIG_PADRAO, 100_000 + 5 * MS_MINUTO);
    expect(terminado.fase).toBe("pronto");
    expect(terminado.fimEm).toBeNull();
    expect(terminado.restanteMs).toBe(25 * MS_MINUTO);
  });

  it("respeita a escolha de não fazer descanso automático", () => {
    const config = { ...CONFIG_PADRAO, usarDescanso: false };
    const focando = { ...novaSessao(config), fimEm: 60_000 };
    expect(avancarSessao(focando, config, 60_001).fase).toBe("pronto");
  });

  it("compensa longos intervalos em abas suspensas e não reinicia sozinho", () => {
    const focando = { ...novaSessao(CONFIG_PADRAO), fimEm: 60_000 };
    expect(avancarSessao(focando, CONFIG_PADRAO, 999_999).fase).toBe("pronto");
  });

  it("não avança uma sessão pausada", () => {
    const pausado = { ...novaSessao(CONFIG_PADRAO), restanteMs: 2 * MS_MINUTO };
    expect(avancarSessao(pausado, CONFIG_PADRAO, 999_999)).toBe(pausado);
    expect(tempoRestante(pausado, 999_999)).toBe(2 * MS_MINUTO);
  });

  it("respeita a passagem do tempo usando o timestamp de término", () => {
    const rodando = { ...novaSessao(CONFIG_PADRAO), fimEm: 180_000 };
    expect(tempoRestante(rodando, 120_000)).toBe(60_000);
    expect(formatarTempo(tempoRestante(rodando, 120_000))).toBe("01:00");
    expect(formatarTempo(999)).toBe("00:01");
    expect(formatarTempo(0)).toBe("00:00");
  });

  it("limita minutos de estudo e de descanso", () => {
    expect(minutosValidos(0, 180, 25)).toBe(1);
    expect(minutosValidos(500, 180, 25)).toBe(180);
    expect(minutosValidos(Number.NaN, 60, 5)).toBe(5);
  });
});
