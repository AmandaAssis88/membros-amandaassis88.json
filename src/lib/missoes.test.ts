import { describe, expect, it } from "vitest";

import { AREAS } from "./community";
import { orientacaoDaMissao } from "./orientacoes-missoes";
import {
  CHAVE_ESCOLHAS_MISSOES,
  ESCOLHAS_INICIAIS,
  LINGUAGENS_MISSAO,
  MISSOES,
  MISSOES_EM_CARTAZ,
  missoesEmCartaz,
  eAreaMissao,
  eLinguagemMissao,
  lerEscolhasMissoes,
  listarMissoes,
  normalizarEscolhas,
  procurarMissao,
  salvarEscolhasMissoes,
} from "./missoes";

describe("Missões da Comunidade — Desafio 2", () => {
  it("preserva as missões antigas e adiciona o resgate do gatinho", () => {
    expect(MISSOES).toHaveLength(13);
    expect(new Set(MISSOES.map((m) => m.id)).size).toBe(13);
    for (const missao of MISSOES) {
      expect(missao.titulo.length).toBeGreaterThan(8);
      expect(missao.historia.length).toBeGreaterThan(60);
      expect(missao.passos.length).toBeGreaterThanOrEqual(3);
      expect(missao.criterios.length).toBeGreaterThanOrEqual(3);
      expect(missao.conceitos.length).toBeGreaterThanOrEqual(3);
      expect(missao.areas.every((area) => AREAS.includes(area))).toBe(true);
    }
  });

  it("mostra só cinco histórias na estreia e preserva as outras para depois", () => {
    expect(MISSOES_EM_CARTAZ).toEqual(["gatinho", "cafeteria", "incendio", "nave", "castelo"]);
    expect(missoesEmCartaz()).toHaveLength(5);
    expect(missoesEmCartaz()[0]?.titulo).toBe("Salve o gatinho");
    expect(procurarMissao("laboratorio")).toBeDefined();
  });

  it("ensina o resgate do gatinho sem depender de JavaScript ou escalada", () => {
    const gatinho = procurarMissao("gatinho");
    expect(gatinho?.historia).toContain("equipe de resgate");
    expect(gatinho?.criterios.join(" ")).toContain("Faltam:");
    for (const linguagem of LINGUAGENS_MISSAO) {
      expect(orientacaoDaMissao("gatinho", linguagem.id).pistas).toHaveLength(3);
    }
  });

  it("libera somente as três linguagens que estão no Café de Estudos", () => {
    expect(LINGUAGENS_MISSAO.map((linguagem) => linguagem.id)).toEqual(["c", "python", "java"]);
    expect(eLinguagemMissao("javascript")).toBe(false);
    expect(eLinguagemMissao("java")).toBe(true);
    expect(procurarMissao("missao-inexistente")).toBeUndefined();
  });

  it("oferece pistas para todas as missões em C Python e Java sem entregar código", () => {
    for (const missao of MISSOES) {
      for (const linguagem of LINGUAGENS_MISSAO) {
        const guia = orientacaoDaMissao(missao.id, linguagem.id);
        expect(guia.descricao.length).toBeGreaterThan(70);
        expect(guia.pontoDePartida.length).toBeGreaterThan(40);
        expect(guia.pistas).toHaveLength(3);
        expect(guia.pistas.every((pista) => pista.length > 30)).toBe(true);
      }
    }
    expect(orientacaoDaMissao("castelo", "c").descricao).toContain("C não tem classes");
  });

  it("usa a área como sugestão sem ocultar nenhuma das missões", () => {
    const todas = listarMissoes("");
    expect(todas).toHaveLength(13);
    const mobile = listarMissoes("Mobile");
    expect(mobile).toHaveLength(13);
    expect(mobile[0]?.areas).toContain("Mobile");
    const backend = listarMissoes("Back-end");
    expect(backend).toHaveLength(13);
    expect(backend[0]?.areas).toContain("Back-end");
  });

  it("guarda apenas valores válidos e descarta uma linguagem ainda não lançada", () => {
    expect(eAreaMissao("Mobile")).toBe(true);
    expect(eAreaMissao("astronauta")).toBe(false);
    expect(
      normalizarEscolhas({ area: "astronauta", linguagem: "javascript", missaoId: "x" }),
    ).toEqual(ESCOLHAS_INICIAIS);
  });

  it("persiste e recupera a escolha local sem servidor", () => {
    const escolhas = {
      area: "Front-end" as const,
      linguagem: "python" as const,
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
