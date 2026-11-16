import { describe, expect, it } from "vitest";

import { AREAS } from "./community";
import {
  ESCOLHAS_INICIAIS,
  LINGUAGENS_MISSAO,
  MISSOES,
  CHAVE_ESCOLHAS_MISSOES,
  eAreaMissao,
  eLinguagemMissao,
  listarMissoes,
  normalizarEscolhas,
  procurarMissao,
  lerEscolhasMissoes,
  salvarEscolhasMissoes,
} from "./missoes";

describe("Missões da Comunidade — Desafio 2", () => {
  it("tem 12 histórias diferentes, com roteiro e critérios claros", () => {
    expect(MISSOES).toHaveLength(12);
    expect(new Set(MISSOES.map((missao) => missao.id)).size).toBe(12);

    for (const missao of MISSOES) {
      expect(missao.titulo.length).toBeGreaterThan(8);
      expect(missao.historia.length).toBeGreaterThan(60);
      expect(missao.passos.length).toBeGreaterThanOrEqual(3);
      expect(missao.criterios.length).toBeGreaterThanOrEqual(3);
      expect(missao.conceitos.length).toBeGreaterThanOrEqual(3);
      expect(LINGUAGENS_MISSAO.some((linguagem) => linguagem.id === missao.linguagem)).toBe(true);
      expect(missao.areas.every((area) => AREAS.includes(area))).toBe(true);
    }
  });

  it("mantém a missão do incêndio entre os projetos de C", () => {
    const incendio = procurarMissao("incendio");
    expect(incendio?.linguagem).toBe("c");
    expect(incendio?.objetivo.toLowerCase()).toContain("água");
    expect(procurarMissao("missao-inexistente")).toBeUndefined();
  });

  it("filtra por linguagem sem impedir a escolha de outras carreiras", () => {
    const lista = listarMissoes("python", "Mobile");
    expect(lista).toHaveLength(3);
    expect(lista.every((missao) => missao.linguagem === "python")).toBe(true);

    const todas = listarMissoes("", "Back-end");
    expect(todas).toHaveLength(12);
    expect(todas[0]?.areas).toContain("Back-end");
  });

  it("não aceita identificadores falsos nas preferências", () => {
    expect(eAreaMissao("Mobile")).toBe(true);
    expect(eAreaMissao("astronauta")).toBe(false);
    expect(eLinguagemMissao("c")).toBe(true);
    expect(eLinguagemMissao("kotlin")).toBe(false);
    expect(normalizarEscolhas({ area: "astronauta", linguagem: "dart", missaoId: "x" })).toEqual(
      ESCOLHAS_INICIAIS,
    );
  });

  it("guarda só opções validadas e sabe recuperar um rascunho local", () => {
    const escolhas = {
      area: "Front-end" as const,
      linguagem: "javascript" as const,
      missaoId: "pinguim",
    };
    localStorage.removeItem(CHAVE_ESCOLHAS_MISSOES);
    salvarEscolhasMissoes(escolhas);
    expect(lerEscolhasMissoes()).toEqual(escolhas);
    localStorage.setItem(CHAVE_ESCOLHAS_MISSOES, "{json malformado");
    expect(lerEscolhasMissoes()).toEqual(ESCOLHAS_INICIAIS);
    localStorage.removeItem(CHAVE_ESCOLHAS_MISSOES);
  });
});
