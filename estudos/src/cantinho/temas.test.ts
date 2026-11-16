import { describe, expect, it } from "vitest";
import {
  CHAVE_TEMA,
  dataLocalHoje,
  fraseDoDia,
  MENSAGENS,
  TEMA_PADRAO,
  TEMAS,
  temaValido,
} from "./temas";

describe("Personalização do Café de Estudos", () => {
  it("reutiliza exatamente os seis temas da votação", () => {
    expect(TEMAS.map((t) => t.id)).toEqual([
      "lofi",
      "gamificado",
      "floresta",
      "clean",
      "terminal",
      "brutalismo",
    ]);
    expect(new Set(TEMAS.map((t) => t.imagem)).size).toBe(6);
    expect(new Set(TEMAS.map((t) => t.miniatura)).size).toBe(6);
  });

  it("rejeita qualquer tema salvo que não faça parte da votação", () => {
    expect(temaValido("gamificado")).toBe(true);
    expect(temaValido("gamer")).toBe(false);
    expect(temaValido(undefined)).toBe(false);
    expect(TEMA_PADRAO).toBe("lofi");
    expect(CHAVE_TEMA.length).toBeGreaterThan(0);
  });

  it("mantém a mesma frase durante o dia para a mesma pessoa", () => {
    const primeira = fraseDoDia("dev-aluno", "2026-11-16");
    expect(fraseDoDia("dev-aluno", "2026-11-16")).toBe(primeira);
    expect(MENSAGENS).toContain(primeira);
  });

  it("usa a data local, sem forçar a data UTC", () => {
    expect(dataLocalHoje(new Date(2026, 10, 16, 12))).toBe("2026-11-16");
  });
});
