import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { missoesEmCartaz } from "./missoes";

describe("Capas das missões em cartaz", () => {
  it("tem uma capa WebP e uma miniatura WebP para cada uma das cinco histórias", () => {
    const emCartaz = missoesEmCartaz();
    expect(emCartaz).toHaveLength(5);

    for (const missao of emCartaz) {
      for (const pasta of ["", "thumbs/"]) {
        const caminho = join(
          process.cwd(),
          "public",
          "missoes",
          "capas",
          pasta,
          `${missao.id}.webp`,
        );
        const conteudo = readFileSync(caminho);
        expect(conteudo.toString("ascii", 0, 4), caminho).toBe("RIFF");
        expect(conteudo.toString("ascii", 8, 12), caminho).toBe("WEBP");
        expect(statSync(caminho).size, caminho).toBeGreaterThan(1500);
        expect(statSync(caminho).size, caminho).toBeLessThan(240_000);
      }
    }
  });
});
