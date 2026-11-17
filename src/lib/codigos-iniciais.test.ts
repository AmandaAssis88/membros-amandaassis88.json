import { describe, expect, it } from "vitest";

import { codigoInicialDaMissao } from "./codigos-iniciais";
import { LINGUAGENS_MISSAO, MISSOES, missoesEmCartaz } from "./missoes";

describe("Códigos de partida das missões", () => {
  it("fornece um começo copiável em C, Python e Java para todas as missões", () => {
    for (const missao of MISSOES) {
      for (const linguagem of LINGUAGENS_MISSAO) {
        const codigo = codigoInicialDaMissao(missao.id, linguagem.id);
        expect(codigo.length).toBeGreaterThan(100);
        expect(codigo).toContain("TODO");
        // Não podemos oferecer o gabarito como modelo.
        expect(codigo).not.toContain('printf("Alcanca');
        expect(codigo).not.toContain('print("Alcanca');
      }
    }
  });

  it("lê o começo da entrada correta das cinco histórias em cartaz", () => {
    expect(missoesEmCartaz()).toHaveLength(5);

    const gatinhoC = codigoInicialDaMissao("gatinho", "c");
    expect(gatinhoC).toContain('scanf("%lf %lf"');
    expect(gatinhoC).toContain("altura");
    expect(gatinhoC).toContain("alcance");

    const incendioPython = codigoInicialDaMissao("incendio", "python");
    expect(incendioPython).toContain("vazao, minutos = map(float, input().split())");

    const cafeteriaJava = codigoInicialDaMissao("cafeteria", "java");
    expect(cafeteriaJava).toContain("int cafes = entrada.nextInt()");
    expect(cafeteriaJava).toContain("int bolos = entrada.nextInt()");
    expect(cafeteriaJava).toContain("int chas = entrada.nextInt()");

    expect(codigoInicialDaMissao("nave", "c")).toContain("tanque");
    expect(codigoInicialDaMissao("castelo", "python")).toContain(
      "quantidade_de_itens = int(input())",
    );
  });

  it("usa uma classe Java sem public para não exigir Main.java como nome do arquivo", () => {
    const codigo = codigoInicialDaMissao("gatinho", "java");
    expect(codigo).toContain("class Main");
    expect(codigo).not.toContain("public class Main");
    expect(codigo).toContain("Locale.US");
    expect(codigo).toContain("entrada.nextDouble()");
  });
});
