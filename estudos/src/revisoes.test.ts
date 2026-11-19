import { agendar, revisar, somarDias, vencidas } from "./revisoes";

describe("revisão espaçada", () => {
  it("soma dias atravessando o mês", () => {
    expect(somarDias("2026-11-30", 1)).toBe("2026-12-01");
  });

  it("agenda a primeira revisão para o dia seguinte e não duplica", () => {
    const a = agendar({}, "logica/condicionais", "2026-11-19");
    expect(a["logica/condicionais"]).toEqual({ etapa: 0, proxima: "2026-11-20" });
    expect(agendar(a, "logica/condicionais", "2026-11-25")).toBe(a);
  });

  it("segue 1, 3, 7 e 14 dias e depois sai da agenda", () => {
    let a = agendar({}, "x", "2026-11-01");
    a = revisar(a, "x", "2026-11-02");
    expect(a["x"]).toEqual({ etapa: 1, proxima: "2026-11-05" });
    a = revisar(a, "x", "2026-11-05");
    expect(a["x"]?.proxima).toBe("2026-11-12");
    a = revisar(a, "x", "2026-11-12");
    expect(a["x"]?.proxima).toBe("2026-11-26");
    a = revisar(a, "x", "2026-11-26");
    expect(a["x"]).toBeUndefined();
  });

  it("lista só o que venceu, do mais antigo para o mais novo", () => {
    const a = {
      b: { etapa: 0, proxima: "2026-11-19" },
      a: { etapa: 1, proxima: "2026-11-10" },
      c: { etapa: 0, proxima: "2026-11-20" },
    };
    expect(vencidas(a, "2026-11-19")).toEqual(["a", "b"]);
  });
});
