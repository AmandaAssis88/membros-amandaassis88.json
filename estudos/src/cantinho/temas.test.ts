import { describe, expect, it } from "vitest";
import {
  CHAVE_TEMA,
  dataLocalHoje,
  fraseDoDia,
  MENSAGENS,
  TEMA_PADRAO,
  TEMAS,
  temaValido,
  normalizarTema,
} from "./temas";

describe("Personalização do Café de Estudos", () => {
  it("oferece seis ambientes próprios de estudo com WebP e miniaturas distintas", () => {
    expect(TEMAS.map((t) => t.id)).toEqual([
      "lofi",
      "cabana",
      "biblioteca",
      "neon",
      "laboratorio",
      "solar",
    ]);
    expect(new Set(TEMAS.map((t) => t.imagem)).size).toBe(6);
    expect(new Set(TEMAS.map((t) => t.miniatura)).size).toBe(6);
    for (const tema of TEMAS) {
      expect(tema.imagem).toBe(`/temas/ambientes/${tema.id}.webp`);
      expect(tema.miniatura).toBe(`/temas/ambientes/thumbs/${tema.id}.webp`);
      expect(tema.descricao.length).toBeGreaterThan(24);
    }
  });

  it("migra os temas antigos e mantém o tema padrão sem perder preferências", () => {
    expect(temaValido("lofi")).toBe(true);
    expect(temaValido("cabana")).toBe(true);
    expect(temaValido("gamificado")).toBe(false);
    expect(normalizarTema("gamificado")).toBe("neon");
    expect(normalizarTema("floresta")).toBe("biblioteca");
    expect(normalizarTema("clean")).toBe("solar");
    expect(normalizarTema("terminal")).toBe("neon");
    expect(normalizarTema("brutalismo")).toBe("laboratorio");
    expect(normalizarTema("solar")).toBe("solar");
    expect(normalizarTema("desconhecido")).toBe("lofi");
    expect(normalizarTema(undefined)).toBe("lofi");
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
