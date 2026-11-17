import type { LinguagemMissao } from "./missoes";

/** Estruturas para copiar e completar; nenhuma delas resolve o enunciado. */
type Entrada = { objetivo: string; c: string; python: string; java: string };

const ENTRADAS: Record<string, Entrada> = {
  gatinho: {
    objetivo: "comparar o alcance da escada com a altura do galho",
    c: '    double altura, alcance;\n    if (scanf("%lf %lf", &altura, &alcance) != 2) return 0;',
    python: "altura, alcance = map(float, input().split())",
    java: "        double altura = entrada.nextDouble();\n        double alcance = entrada.nextDouble();",
  },
  incendio: {
    objetivo: "calcular quantos litros de água serão usados",
    c: '    double vazao, minutos;\n    if (scanf("%lf %lf", &vazao, &minutos) != 2) return 0;',
    python: "vazao, minutos = map(float, input().split())",
    java: "        double vazao = entrada.nextDouble();\n        double minutos = entrada.nextDouble();",
  },
  cafeteria: {
    objetivo: "calcular o valor total dos três tipos de pedidos",
    c: '    int cafes, bolos, chas;\n    if (scanf("%d %d %d", &cafes, &bolos, &chas) != 3) return 0;',
    python: "cafes, bolos, chas = map(int, input().split())",
    java: "        int cafes = entrada.nextInt();\n        int bolos = entrada.nextInt();\n        int chas = entrada.nextInt();",
  },
  nave: {
    objetivo: "verificar se há combustível suficiente para a viagem",
    c: '    double distancia, consumo, tanque;\n    if (scanf("%lf %lf %lf", &distancia, &consumo, &tanque) != 3) return 0;',
    python: "distancia, consumo, tanque = map(float, input().split())",
    java: "        double distancia = entrada.nextDouble();\n        double consumo = entrada.nextDouble();\n        double tanque = entrada.nextDouble();",
  },
  castelo: {
    objetivo: "registrar o estoque e conferir a entrada ou a retirada de itens",
    c: '    int quantidadeDeItens;\n    if (scanf("%d", &quantidadeDeItens) != 1) return 0;\n    // TODO: leia o nome e o estoque de cada item.',
    python: "quantidade_de_itens = int(input())\n# TODO: leia o nome e o estoque de cada item.",
    java: "        int quantidadeDeItens = entrada.nextInt();\n        // TODO: leia o nome e o estoque de cada item.",
  },
};

const GENERICOS: Record<LinguagemMissao, string> = {
  c: "#include <stdio.h>\n\nint main(void) {\n    // TODO: leia a entrada descrita no enunciado.\n    // TODO: implemente a lógica.\n    // TODO: imprima somente a saída exigida pelos testes.\n    return 0;\n}",
  python:
    "# TODO: leia a entrada descrita no enunciado.\n# TODO: implemente a lógica.\n# TODO: imprima somente a saída exigida pelos testes.",
  java: "import java.util.Scanner;\nimport java.util.Locale;\n\n// Main não é public: o arquivo pode se chamar seu-username.java.\nclass Main {\n    public static void main(String[] args) {\n        Scanner entrada = new Scanner(System.in);\n        entrada.useLocale(Locale.US);\n        // TODO: leia os dados e implemente a lógica.\n        // TODO: imprima a saída exata.\n        entrada.close();\n    }\n}",
};

/** Entrega um arquivo inicial que pode ser executado, mas NÃO é um gabarito. */
export function codigoInicialDaMissao(id: string, linguagem: LinguagemMissao): string {
  const info = ENTRADAS[id];
  if (!info) return GENERICOS[linguagem];

  switch (linguagem) {
    case "c":
      return [
        "#include <stdio.h>",
        "",
        "int main(void) {",
        info.c,
        "",
        "    // TODO: " + info.objetivo + ".",
        "    // TODO: imprima apenas a saída pedida no README (sem prompts extras).",
        "    return 0;",
        "}",
      ].join("\n");
    case "python":
      return [
        "# Comece lendo os dados no formato do enunciado:",
        info.python,
        "",
        "# TODO: " + info.objetivo + ".",
        "# TODO: imprima apenas a saída pedida no README (sem prompts extras).",
      ].join("\n");
    case "java":
      return [
        "import java.util.Scanner;",
        "import java.util.Locale;",
        "",
        "// Main não é public: o arquivo pode se chamar seu-username.java.",
        "class Main {",
        "    public static void main(String[] args) {",
        "        Scanner entrada = new Scanner(System.in);",
        "        entrada.useLocale(Locale.US);",
        info.java,
        "",
        "        // TODO: " + info.objetivo + ".",
        "        // TODO: imprima apenas a saída pedida no README.",
        "        entrada.close();",
        "    }",
        "}",
      ].join("\n");
  }
}
