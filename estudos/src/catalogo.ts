import type { ComponentType } from "react";

// Catálogo do site de estudos: as trilhas, a ordem das aulas e onde fica cada arquivo.
// Para adicionar uma aula: crie o .mdx em estudos/conteudo/<pasta>/ e coloque uma linha aqui.
// O teste catalogo.test.ts confere se cada aula listada tem o seu arquivo (e vice-versa).

export type TrilhaId =
  | "fundamentos"
  | "logica"
  | "algoritmos"
  | "c"
  | "python"
  | "java"
  | "poo"
  | "git"
  | "ia"
  | "sql"
  | "seguranca"
  | "produto"
  | "front-end"
  | "back-end"
  | "mobile"
  | "devops"
  | "ui-ux"
  | "qa"
  | "ciberseguranca";

export type Aula = {
  /** Parte final da URL: /c/ponteiros */
  slug: string;
  /** Nome do arquivo em estudos/conteudo/<pasta>/ (sem .mdx) */
  arquivo: string;
  titulo: string;
  resumo: string;
  minutos: number;
};

export type Trilha = {
  id: TrilhaId;
  nome: string;
  /** Pasta no repositório estudos (e em estudos/conteudo/) */
  pasta: string;
  grupo:
    | "fundamentos"
    | "disciplinas"
    | "linguagens"
    | "paradigmas"
    | "ferramentas"
    | "cozinha"
    | "profissoes";
  /** O item do cardápio: bebida (linguagens e bases) ou sobremesa/pão (profissões) */
  bebida: string;
  emoji: string;
  frase: string;
  sobre: string;
  aprender: string[];
  /** Profissões: quão "pesada" é a trilha (1 leve, 2 média, 3 pesada) */
  peso?: 1 | 2 | 3;
  /** Profissões: ids das linguagens mais usadas na área (viram link quando a trilha existir) */
  linguagens?: string[];
  /** Profissões: o que essa área faz no projeto do chat da Unidunedev */
  noChat?: string;
  /** Cursos recomendados (aparecem no fim da última aula quando existirem) */
  cursos?: { titulo: string; url: string; texto: string }[];
  /** Links para se aprofundar, mostrados no fim da última aula */
  documentacao?: { titulo: string; url: string; texto: string }[];
  /** Onde praticar no fim da trilha (no lugar dos desafios do repositório estudos) */
  pratica?: { titulo: string; texto: string; url: string; rotulo: string };
  /** Linguagem usada no botão "Testar" dos códigos */
  linguagem?: "c" | "python" | "java";
  aulas: Aula[];
};

export const ESTUDOS_REPO_URL = "https://github.com/unidunedev/estudos";
export const ONBOARDING_URL = "https://onboarding.unidunedev.workers.dev";

export const TESTAR_URL: Record<"c" | "python" | "java", string> = {
  c: "https://www.onlinegdb.com/online_c_compiler",
  python: "https://www.onlinegdb.com/online_python_compiler",
  java: "https://www.onlinegdb.com/online_java_compiler",
};

export const GRUPOS: { id: Trilha["grupo"]; pasta: string; titulo: string; texto: string }[] = [
  {
    id: "fundamentos",
    pasta: "fundamentos/",
    titulo: "Fundamentos",
    texto: "O que acontece por trás de qualquer linguagem.",
  },
  {
    id: "disciplinas",
    pasta: "disciplinas/",
    titulo: "Disciplinas",
    texto: "A base que vale para todas as linguagens.",
  },
  {
    id: "linguagens",
    pasta: "linguagens/",
    titulo: "Linguagens",
    texto: "Mão no código, uma linguagem por vez.",
  },
  {
    id: "paradigmas",
    pasta: "paradigmas/",
    titulo: "Paradigmas",
    texto: "Os adoçantes: um jeito de organizar o código que vai em qualquer linguagem.",
  },
  {
    id: "ferramentas",
    pasta: "ferramentas/",
    titulo: "Ferramentas",
    texto: "O prato e os talheres: sem eles, nenhuma receita chega à mesa.",
  },
  {
    id: "cozinha",
    pasta: "bastidores/",
    titulo: "Bastidores",
    texto: "A cozinha: ninguém vê, mas é ela que segura o restaurante inteiro.",
  },
  {
    id: "profissoes",
    pasta: "profissoes/",
    titulo: "Profissões",
    texto: "Cada área da tecnologia e onde ela fica no produto.",
  },
];

export const PESOS = {
  1: { rotulo: "Leve", icone: "🪶" },
  2: { rotulo: "Médio", icone: "🍽️" },
  3: { rotulo: "Pesado", icone: "🏋️" },
} as const;

export const TRILHAS: Trilha[] = [
  {
    id: "fundamentos",
    nome: "Fundamentos",
    pasta: "fundamentos",
    grupo: "fundamentos",
    bebida: "Café coado",
    emoji: "☕",
    frase: "O básico de todo dia. Sem ele, nada funciona.",
    sobre:
      "Antes de escrever código, vale entender o que o computador faz com ele: memória, processador, compilador, interpretador e as mensagens de erro que vão te acompanhar para sempre.",
    aprender: [
      "Como o computador guarda e executa um programa",
      "A diferença entre linguagens compiladas e interpretadas",
      "Ler mensagens de erro sem pânico",
      "Editor, IDE e terminal: quem é quem",
    ],
    aulas: [
      {
        slug: "como-o-computador-executa",
        arquivo: "01-como-o-computador-executa",
        titulo: "Como o computador executa um programa",
        resumo: "Processador, memória e por que tudo vira número.",
        minutos: 12,
      },
      {
        slug: "linguagens-de-programacao",
        arquivo: "02-linguagens-de-programacao",
        titulo: "Linguagens de programação",
        resumo: "Alto e baixo nível, tipagem e onde cada linguagem aparece.",
        minutos: 12,
      },
      {
        slug: "compilada-ou-interpretada",
        arquivo: "03-compilada-ou-interpretada",
        titulo: "Compilada ou interpretada?",
        resumo: "Tradutor de livro × intérprete ao vivo (e o meio-termo do Java).",
        minutos: 10,
      },
      {
        slug: "sintaxe-semantica-e-erros",
        arquivo: "04-sintaxe-semantica-e-erros",
        titulo: "Sintaxe, semântica e os 3 tipos de erro",
        resumo: "Por que o programa não roda, ou roda e faz besteira.",
        minutos: 12,
      },
      {
        slug: "ambiente-de-programacao",
        arquivo: "05-ambiente-de-programacao",
        titulo: "Seu ambiente de programação",
        resumo: "Editor, IDE, terminal, PATH e IDEs online.",
        minutos: 10,
      },
    ],
  },
  {
    id: "logica",
    nome: "Lógica de programação",
    pasta: "disciplinas/logica",
    grupo: "disciplinas",
    bebida: "Chocolate quente",
    emoji: "🍫",
    frase: "Esquenta o raciocínio antes de qualquer linguagem.",
    sobre:
      "Lógica é pensar o passo a passo antes de digitar. Cada aula mostra a ideia em pseudocódigo e depois em C, Python e Java, para você ver que a lógica é a mesma e só a escrita muda.",
    aprender: [
      "Escrever algoritmos em pseudocódigo",
      "Variáveis, operadores e condicionais",
      "Laços de repetição sem medo",
      "Vetores e funções",
    ],
    aulas: [
      {
        slug: "algoritmo",
        arquivo: "01-algoritmo",
        titulo: "O que é um algoritmo",
        resumo: "Receitas, entrada → processamento → saída e teste de mesa.",
        minutos: 10,
      },
      {
        slug: "variaveis-e-tipos",
        arquivo: "02-variaveis-e-tipos",
        titulo: "Variáveis e tipos",
        resumo: "Caixinhas com etiqueta e o problema dos dois copos.",
        minutos: 12,
      },
      {
        slug: "operadores",
        arquivo: "03-operadores",
        titulo: "Operadores",
        resumo: "Contas, comparações e o famoso resto da divisão.",
        minutos: 10,
      },
      {
        slug: "condicionais",
        arquivo: "04-condicionais",
        titulo: "Condicionais",
        resumo: "Se, senão e como testar os limites.",
        minutos: 12,
      },
      {
        slug: "repeticoes",
        arquivo: "05-repeticoes",
        titulo: "Repetições",
        resumo: "Enquanto, para, contador e acumulador.",
        minutos: 15,
      },
      {
        slug: "vetores",
        arquivo: "06-vetores",
        titulo: "Vetores",
        resumo: "Um armário com gavetas numeradas a partir do zero.",
        minutos: 12,
      },
      {
        slug: "funcoes",
        arquivo: "07-funcoes",
        titulo: "Funções",
        resumo: "Máquinas de suco: entra fruta, sai suco.",
        minutos: 12,
      },
    ],
  },
  {
    id: "algoritmos",
    nome: "Algoritmos e estruturas de dados",
    pasta: "disciplinas/algoritmos",
    grupo: "disciplinas",
    bebida: "Café moído na hora",
    emoji: "⚙️",
    frase: "O grão, o processo e a precisão: fazer funcionar bem, não só funcionar.",
    pratica: {
      titulo: "Treine com problemas de verdade",
      texto:
        "O Beecrowd é brasileiro, em português, com milhares de problemas por nível. Treine sem IA e compare depois.",
      url: "https://www.beecrowd.com.br/judge/pt/",
      rotulo: "Abrir o Beecrowd",
    },
    documentacao: [
      {
        titulo: "Python: estruturas de dados (tutorial oficial)",
        url: "https://docs.python.org/pt-br/3/tutorial/datastructures.html",
        texto:
          "Listas como pilhas e filas, deque, conjuntos e dicionários, na documentação oficial.",
      },
      {
        titulo: "VisuAlgo",
        url: "https://visualgo.net/pt",
        texto: "Animações de ordenação, buscas, pilhas, filas e tabelas hash, passo a passo.",
      },
    ],
    sobre:
      "A Lógica ensina a fazer o programa funcionar. Algoritmos e estruturas de dados ensinam a escolher, entre vários jeitos que funcionam, o que aguenta muitos dados: medir o custo com Big O, buscar e ordenar com eficiência, usar pilhas, filas, dicionários e conjuntos, e pensar recursivamente. É o que cai nas entrevistas técnicas e o raciocínio que a IA não faz por você.",
    aprender: [
      "Medir a eficiência com Big O, sem matemática pesada",
      "Busca linear e busca binária",
      "Ordenação: dos jeitos simples ao dividir para conquistar",
      "Pilhas, filas, dicionários e conjuntos",
      "Recursão e um método para resolver problemas de entrevista",
    ],
    aulas: [
      {
        slug: "eficiencia",
        arquivo: "01-eficiencia",
        titulo: "Lógica × algoritmos: o que é eficiência",
        resumo: "Contar passos e a notação Big O.",
        minutos: 20,
      },
      {
        slug: "busca",
        arquivo: "02-busca",
        titulo: "Busca linear e busca binária",
        resumo: "Um milhão de itens em 20 passos.",
        minutos: 22,
      },
      {
        slug: "ordenacao",
        arquivo: "03-ordenacao",
        titulo: "Ordenação",
        resumo: "Selection, Insertion, Merge Sort e o sort da linguagem.",
        minutos: 25,
      },
      {
        slug: "pilhas-e-filas",
        arquivo: "04-pilhas-e-filas",
        titulo: "Pilhas e filas",
        resumo: "A pilha de pratos e a fila do caixa.",
        minutos: 22,
      },
      {
        slug: "dicionarios-e-conjuntos",
        arquivo: "05-dicionarios-e-conjuntos",
        titulo: "Dicionários e conjuntos",
        resumo: "Os potes etiquetados da despensa: busca em O(1).",
        minutos: 25,
      },
      {
        slug: "recursao-e-resolucao",
        arquivo: "06-recursao-e-resolucao",
        titulo: "Recursão e como resolver problemas",
        resumo: "Bonecas russas e o método da entrevista técnica.",
        minutos: 25,
      },
    ],
  },
  {
    id: "c",
    nome: "C",
    pasta: "linguagens/c",
    grupo: "linguagens",
    bebida: "Espresso",
    emoji: "☕",
    frase: "Curto, forte e bem pertinho da máquina.",
    linguagem: "c",
    documentacao: [
      {
        titulo: "cppreference: C",
        url: "https://en.cppreference.com/w/c",
        texto:
          "A referência mais usada de C: cada função, tipo e biblioteca, com exemplos. O C não tem um site oficial (a definição oficial é o padrão ISO, que é pago), então é aqui que os devs consultam no dia a dia.",
      },
      {
        titulo: "Manual do GNU C",
        url: "https://www.gnu.org/software/gnu-c-manual/",
        texto:
          "O manual do projeto GNU, o mesmo do compilador gcc, explicando a linguagem do começo ao fim.",
      },
    ],
    sobre:
      "C é a linguagem que mostra o que as outras escondem: memória, endereços e tipos com tamanho certo. Ela é a base do Linux, do Python e de muitas linguagens. Quem entende C entende o computador.",
    aprender: [
      "Do código ao executável: o que o gcc faz",
      "printf, scanf, if e for na prática",
      "Como as variáveis moram na memória",
      "Ponteiros sem bicho-papão",
      "Structs: o mais perto de uma classe em C",
    ],
    aulas: [
      {
        slug: "do-codigo-ao-executavel",
        arquivo: "01-do-codigo-ao-executavel",
        titulo: "Do código ao executável",
        resumo: "Seu primeiro programa e o caminho até virar .exe.",
        minutos: 12,
      },
      {
        slug: "variaveis-printf-e-scanf",
        arquivo: "02-variaveis-printf-e-scanf",
        titulo: "Variáveis, printf e scanf",
        resumo: "Guardar, mostrar e ler valores do teclado.",
        minutos: 15,
      },
      {
        slug: "tipos-e-memoria",
        arquivo: "03-tipos-e-memoria",
        titulo: "Tipos e memória",
        resumo: "Quantos bytes cabem em cada caixinha (e o que acontece quando não cabem).",
        minutos: 12,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "04-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, else, switch, while e o for passo a passo.",
        minutos: 15,
      },
      {
        slug: "vetores-e-strings",
        arquivo: "05-vetores-e-strings",
        titulo: "Vetores e strings",
        resumo: "Gavetas lado a lado e o misterioso \\0.",
        minutos: 15,
      },
      {
        slug: "funcoes",
        arquivo: "06-funcoes",
        titulo: "Funções",
        resumo: "Dividir o programa em pedaços e a passagem por cópia.",
        minutos: 12,
      },
      {
        slug: "ponteiros",
        arquivo: "07-ponteiros",
        titulo: "Ponteiros",
        resumo: "Endereços, & e *, sem bicho-papão.",
        minutos: 18,
      },
      {
        slug: "structs",
        arquivo: "08-structs",
        titulo: "Structs",
        resumo: "Agrupando dados: o avô das classes.",
        minutos: 12,
      },
    ],
  },
  {
    id: "python",
    nome: "Python",
    pasta: "linguagens/python",
    grupo: "linguagens",
    bebida: "Chá gelado",
    emoji: "🧋",
    frase: "Leve, refrescante e fácil de começar.",
    linguagem: "python",
    documentacao: [
      {
        titulo: "Documentação oficial do Python",
        url: "https://docs.python.org/pt-br/3/",
        texto: "Tem versão em português! Referência completa da linguagem e da biblioteca padrão.",
      },
      {
        titulo: "Tutorial oficial do Python",
        url: "https://docs.python.org/pt-br/3/tutorial/",
        texto: "O tutorial escrito por quem mantém o Python, também em português.",
      },
    ],
    sobre:
      "Python lê quase como português (em inglês 😅). Sem ponto e vírgula, sem chaves: a indentação organiza o código. É usada em automação, dados, IA, back-end e onde mais você imaginar.",
    aprender: [
      "print, input e f-strings",
      "if, for e while com indentação",
      "Listas, dicionários e strings",
      "Funções, classes e módulos",
    ],
    aulas: [
      {
        slug: "primeiros-passos",
        arquivo: "01-primeiros-passos",
        titulo: "Primeiros passos",
        resumo: "print, input, variáveis e f-strings.",
        minutos: 12,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "02-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, elif, while, for e range.",
        minutos: 15,
      },
      {
        slug: "listas-e-dicionarios",
        arquivo: "03-listas-e-dicionarios",
        titulo: "Listas e dicionários",
        resumo: "Guardar muitos valores do jeito Python.",
        minutos: 15,
      },
      {
        slug: "strings",
        arquivo: "04-strings",
        titulo: "Strings",
        resumo: "Fatiar, juntar e transformar textos.",
        minutos: 12,
      },
      {
        slug: "funcoes",
        arquivo: "05-funcoes",
        titulo: "Funções",
        resumo: "def, return e parâmetros com valor padrão.",
        minutos: 12,
      },
      {
        slug: "classes-e-objetos",
        arquivo: "06-classes-e-objetos",
        titulo: "Classes e objetos",
        resumo: "Moldes, objetos, self e herança.",
        minutos: 18,
      },
      {
        slug: "modulos-e-bibliotecas",
        arquivo: "07-modulos-e-bibliotecas",
        titulo: "Módulos e bibliotecas",
        resumo: "import, pip e não reinventar a roda.",
        minutos: 10,
      },
    ],
  },
  {
    id: "java",
    nome: "Java",
    pasta: "linguagens/java",
    grupo: "linguagens",
    bebida: "Cappuccino",
    emoji: "☕",
    frase: "Encorpado e organizado. Java é literalmente café.",
    linguagem: "java",
    documentacao: [
      {
        titulo: "Dev.java",
        url: "https://dev.java/learn/",
        texto: "O site oficial de aprendizado do Java, com trilhas do básico ao avançado.",
      },
      {
        titulo: "Documentação da API do Java 21",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/index.html",
        texto:
          "Todas as classes do Java (String, Scanner, ArrayList...) com cada método explicado.",
      },
    ],
    sobre:
      "Java organiza tudo em classes e roda em qualquer lugar que tenha a JVM. É muito usada em bancos, empresas grandes e no Android. Começa mais formal, mas ensina a organizar programas grandes.",
    aprender: [
      "A estrutura de um programa Java (e por que class Main)",
      "Tipos, Scanner, if e for",
      "Arrays, Strings e métodos",
      "Classes, objetos, herança e ArrayList",
    ],
    aulas: [
      {
        slug: "primeiro-programa",
        arquivo: "01-primeiro-programa",
        titulo: "Primeiro programa",
        resumo: "class, main, println e o caminho até a JVM.",
        minutos: 12,
      },
      {
        slug: "tipos-variaveis-e-scanner",
        arquivo: "02-tipos-variaveis-e-scanner",
        titulo: "Tipos, variáveis e Scanner",
        resumo: "Guardar valores e ler do teclado.",
        minutos: 15,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "03-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, switch, while e for.",
        minutos: 12,
      },
      {
        slug: "arrays-e-strings",
        arquivo: "04-arrays-e-strings",
        titulo: "Arrays e Strings",
        resumo: "Listas de tamanho fixo e textos imutáveis.",
        minutos: 15,
      },
      {
        slug: "metodos",
        arquivo: "05-metodos",
        titulo: "Métodos",
        resumo: "Funções que moram dentro das classes.",
        minutos: 12,
      },
      {
        slug: "classes-e-objetos",
        arquivo: "06-classes-e-objetos",
        titulo: "Classes e objetos",
        resumo: "Moldes, construtores e encapsulamento.",
        minutos: 18,
      },
      {
        slug: "heranca-e-colecoes",
        arquivo: "07-heranca-e-colecoes",
        titulo: "Herança e coleções",
        resumo: "extends, @Override e ArrayList.",
        minutos: 15,
      },
    ],
  },
  {
    id: "poo",
    nome: "Orientação a Objetos",
    pasta: "paradigmas/orientacao-a-objetos",
    grupo: "paradigmas",
    bebida: "Cubos de açúcar",
    emoji: "🧊",
    frase: "Vai em qualquer bebida. Organiza o programa em peças que conversam.",
    pratica: {
      titulo: "Hora de modelar",
      texto:
        "Use o que aprendeu nas missões da comunidade: a do castelo pede classes, estado e comportamento de verdade.",
      url: `${ONBOARDING_URL}/missoes`,
      rotulo: "Ver as missões",
    },
    documentacao: [
      {
        titulo: "Python: Classes (tutorial oficial)",
        url: "https://docs.python.org/pt-br/3/tutorial/classes.html",
        texto: "O capítulo de classes do tutorial oficial do Python, em português.",
      },
      {
        titulo: "Dev.java: Classes e objetos",
        url: "https://dev.java/learn/classes-objects/",
        texto: "O guia oficial do Java sobre classes, objetos, herança e interfaces.",
      },
    ],
    sobre:
      "Orientação a objetos é um jeito de organizar programas: em vez de variáveis soltas e funções espalhadas, você junta dados e comportamento em objetos que representam coisas do mundo, como um pedido, uma conta ou um personagem. É o paradigma de Java, aparece muito em Python, Kotlin, C#, Dart e Swift, e é o que você vai encontrar na maioria das empresas.",
    aprender: [
      "Por que organizar o código em objetos (e quando não precisa)",
      "Classes, objetos, atributos, métodos e construtores",
      "Encapsulamento, herança e polimorfismo sem decoreba",
      "Composição e como modelar um sistema de verdade",
    ],
    aulas: [
      {
        slug: "por-que-objetos",
        arquivo: "01-por-que-objetos",
        titulo: "Por que orientar a objetos?",
        resumo: "Do código espalhado à forma de bolo: o problema que a POO resolve.",
        minutos: 20,
      },
      {
        slug: "classes-e-objetos",
        arquivo: "02-classes-e-objetos",
        titulo: "Classes e objetos, de verdade",
        resumo: "Atributos, métodos, construtor, self e this, passo a passo.",
        minutos: 25,
      },
      {
        slug: "encapsulamento",
        arquivo: "03-encapsulamento",
        titulo: "Encapsulamento",
        resumo: "Proteger o que importa: o saldo não muda sozinho.",
        minutos: 22,
      },
      {
        slug: "heranca",
        arquivo: "04-heranca",
        titulo: "Herança",
        resumo: "É um: reaproveitar sem copiar e colar (e quando não usar).",
        minutos: 22,
      },
      {
        slug: "polimorfismo-e-abstracao",
        arquivo: "05-polimorfismo-e-abstracao",
        titulo: "Polimorfismo e abstração",
        resumo: "O mesmo pedido, respostas diferentes: Pix, cartão e dinheiro.",
        minutos: 25,
      },
      {
        slug: "composicao-e-modelagem",
        arquivo: "06-composicao-e-modelagem",
        titulo: "Composição e modelagem",
        resumo: "Tem um: montando o sistema de pedidos da cafeteria.",
        minutos: 30,
      },
    ],
  },
  {
    id: "git",
    nome: "Git e GitHub",
    pasta: "ferramentas/git-e-github",
    grupo: "ferramentas",
    bebida: "Prato e talheres",
    emoji: "🍽️",
    frase: "Antes de servir qualquer receita, a mesa precisa estar posta.",
    pratica: {
      titulo: "Seu primeiro PR de verdade",
      texto:
        "O Desafio 1 da comunidade é exatamente isso: fork, branch, commit e Pull Request para entrar no mural.",
      url: `${ONBOARDING_URL}/desafio-pr`,
      rotulo: "Fazer o Desafio do PR",
    },
    documentacao: [
      {
        titulo: "Pro Git (livro oficial, em português)",
        url: "https://git-scm.com/book/pt-br/v2",
        texto: "O livro completo e gratuito do Git, do básico ao avançado.",
      },
      {
        titulo: "GitHub Docs: Introdução",
        url: "https://docs.github.com/pt/get-started",
        texto: "A documentação oficial do GitHub, com guias de repositório, PR e colaboração.",
      },
      {
        titulo: "Learn Git Branching",
        url: "https://learngitbranching.js.org/?locale=pt_BR",
        texto: "Um joguinho visual para treinar branches, merge e rebase.",
      },
    ],
    sobre:
      "Git guarda a história do seu código: cada versão, quem mudou o quê e por quê. GitHub é onde esse histórico mora na nuvem e onde as equipes trabalham juntas com Pull Requests. Toda vaga de tecnologia espera que você saiba o básico, e toda profissão do cardápio usa os dois todos os dias.",
    aprender: [
      "Por que controle de versão existe e a diferença entre Git e GitHub",
      "Commit, as três áreas do Git e mensagens que fazem sentido",
      "Voltar no tempo sem medo: log, diff, restore e revert",
      "Branches, merge e conflitos",
      "Push, pull, clone, fork e Pull Request em equipe",
    ],
    aulas: [
      {
        slug: "por-que-git",
        arquivo: "01-por-que-git",
        titulo: "Por que o Git existe?",
        resumo: "Do trabalho_final_v3_AGORA_VAI ao histórico organizado.",
        minutos: 18,
      },
      {
        slug: "primeiro-commit",
        arquivo: "02-primeiro-commit",
        titulo: "Seu primeiro repositório e commit",
        resumo: "init, status, add e commit: bancada, bandeja e livro de receitas.",
        minutos: 25,
      },
      {
        slug: "voltando-no-tempo",
        arquivo: "03-voltando-no-tempo",
        titulo: "Voltando no tempo sem medo",
        resumo: "log, diff, restore, revert e o .gitignore.",
        minutos: 22,
      },
      {
        slug: "branches-e-merge",
        arquivo: "04-branches-e-merge",
        titulo: "Branches, merge e conflitos",
        resumo: "Testar uma receita nova sem estragar o prato principal.",
        minutos: 28,
      },
      {
        slug: "github-e-remoto",
        arquivo: "05-github-e-remoto",
        titulo: "GitHub: seu código na nuvem",
        resumo: "remote, push, pull e clone, com conta e autenticação.",
        minutos: 25,
      },
      {
        slug: "pull-request-em-equipe",
        arquivo: "06-pull-request-em-equipe",
        titulo: "Pull Request e trabalho em equipe",
        resumo: "fork, PR, revisão de código e manter tudo em dia.",
        minutos: 28,
      },
    ],
  },
  {
    id: "ia",
    nome: "Programando com IA",
    pasta: "ferramentas/programando-com-ia",
    grupo: "ferramentas",
    bebida: "Máquina de espresso automática",
    emoji: "🤖",
    frase: "Ajuda muito, mas quem precisa saber de café é o barista.",
    pratica: {
      titulo: "O ciclo completo numa missão",
      texto:
        "Escolha uma missão da comunidade e aplique tudo: mini PRD, plano revisado, testes primeiro e commits pequenos.",
      url: `${ONBOARDING_URL}/missoes`,
      rotulo: "Ver as missões",
    },
    documentacao: [
      {
        titulo: "OWASP: Top 10 para aplicações com LLM",
        url: "https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/",
        texto: "Os principais riscos de segurança de sistemas que usam IA generativa.",
      },
      {
        titulo: "Anthropic: guia de engenharia de prompts",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
        texto: "Técnicas oficiais para escrever pedidos claros, com exemplos e contexto.",
      },
      {
        titulo: "GitHub Docs: boas práticas com o Copilot",
        url: "https://docs.github.com/en/copilot/get-started/best-practices",
        texto: "Como usar o assistente de código com cuidado: revisar, testar e dar contexto.",
      },
    ],
    sobre:
      "A IA escreve código rápido, mas não prova o que faz. Esta trilha ensina a usar a IA como os profissionais usam hoje: pedir com clareza, revisar e testar o que ela gera, reconhecer alucinações e código inseguro, e organizar o trabalho com SDD, o fluxo em que a especificação vem antes do código.",
    aprender: [
      "Como uma IA de texto funciona e por que ela erra com confiança",
      "Pedir bem: o pedido como especificação, com exemplos de entrada e saída",
      "Revisar o código gerado e achar os erros que o exemplo não mostra",
      "Alucinações, pacotes inventados, código inseguro e quando não usar IA",
      "SDD: PRD, Tech Spec, Tasks e execução com evidência",
      "O ciclo de trabalho com IA nas empresas",
    ],
    aulas: [
      {
        slug: "como-a-ia-funciona",
        arquivo: "01-como-a-ia-funciona",
        titulo: "Como a IA funciona (e onde ela erra)",
        resumo: "A máquina de espresso automática: rápida, mas não prova o café.",
        minutos: 18,
      },
      {
        slug: "pedir-bem",
        arquivo: "02-pedir-bem",
        titulo: "Pedir bem: o pedido é uma especificação",
        resumo: "Contexto, exemplos de entrada e saída, regras e formato.",
        minutos: 22,
      },
      {
        slug: "revisar-o-codigo-da-ia",
        arquivo: "03-revisar-o-codigo-da-ia",
        titulo: "Revisar o código da IA",
        resumo: "Ache os 3 erros: casos de borda, limites e testes com assert.",
        minutos: 25,
      },
      {
        slug: "riscos-e-quando-nao-usar",
        arquivo: "04-riscos-e-quando-nao-usar",
        titulo: "Riscos e quando não usar",
        resumo: "Alucinações, pacotes falsos, código inseguro e dados que não são seus.",
        minutos: 22,
      },
      {
        slug: "sdd-primeiro-a-spec",
        arquivo: "05-sdd-primeiro-a-spec",
        titulo: "SDD: primeiro a spec, depois o código",
        resumo: "PRD, Tech Spec, Tasks e execução, como as equipes trabalham com IA.",
        minutos: 30,
      },
      {
        slug: "ia-no-dia-a-dia-profissional",
        arquivo: "06-ia-no-dia-a-dia-profissional",
        titulo: "IA no dia a dia profissional",
        resumo: "Chat, autocompletar, agentes e o ciclo de trabalho de verdade.",
        minutos: 22,
      },
    ],
  },
  {
    id: "sql",
    nome: "Banco de dados e SQL",
    pasta: "bastidores/banco-de-dados-e-sql",
    grupo: "cozinha",
    bebida: "A despensa",
    emoji: "🫙",
    frase: "Tudo guardado, etiquetado e fácil de achar.",
    pratica: {
      titulo: "Treine no navegador",
      texto:
        "Cole o script da cafeteria no SQLite Online e invente as suas perguntas: quem mais comprou, o que mais vendeu, qual dia foi melhor.",
      url: "https://sqliteonline.com/",
      rotulo: "Abrir o SQLite Online",
    },
    documentacao: [
      {
        titulo: "SQLBolt",
        url: "https://sqlbolt.com/",
        texto: "Exercícios interativos de SQL, do SELECT ao JOIN, direto no navegador.",
      },
      {
        titulo: "PostgreSQL: tutorial oficial",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
        texto: "O tutorial do banco mais usado em startups, incluindo o Supabase.",
      },
      {
        titulo: "SQLite: documentação da linguagem",
        url: "https://www.sqlite.org/lang.html",
        texto: "Todos os comandos SQL que o SQLite entende, com exemplos.",
      },
    ],
    sobre:
      "Todo sistema guarda dados em algum lugar, e quase sempre é num banco de dados relacional. Nesta trilha você monta o banco da cafeteria e aprende a consultar, alterar com segurança, juntar tabelas, resumir números para relatórios, modelar, acelerar com índices e usar SQL de dentro do código sem abrir brecha para injeção. Também aprende a conferir o SQL que a IA escreve.",
    aprender: [
      "Tabelas, linhas, colunas, chaves primárias e estrangeiras",
      "SELECT com WHERE, ORDER BY, LIMIT e o cuidado com NULL",
      "INSERT, UPDATE, DELETE e transações, sem apagar o que não devia",
      "JOIN entre várias tabelas",
      "COUNT, SUM, AVG, GROUP BY e HAVING",
      "Modelagem, índices e consultas com parâmetros no código",
    ],
    aulas: [
      {
        slug: "por-que-banco-de-dados",
        arquivo: "01-por-que-banco-de-dados",
        titulo: "Por que um banco de dados?",
        resumo: "A despensa organizada: tabelas, chaves e o SQL.",
        minutos: 18,
      },
      {
        slug: "consultando-com-select",
        arquivo: "02-consultando-com-select",
        titulo: "Consultando com SELECT",
        resumo: "WHERE, ORDER BY, LIMIT, LIKE e a pegadinha do NULL.",
        minutos: 25,
      },
      {
        slug: "criando-e-mudando-dados",
        arquivo: "03-criando-e-mudando-dados",
        titulo: "Criando e mudando dados",
        resumo: "CREATE, INSERT, UPDATE, DELETE e transações.",
        minutos: 25,
      },
      {
        slug: "relacionamentos-e-join",
        arquivo: "04-relacionamentos-e-join",
        titulo: "Relacionamentos e JOIN",
        resumo: "Chaves estrangeiras, INNER e LEFT JOIN.",
        minutos: 25,
      },
      {
        slug: "resumindo-dados",
        arquivo: "05-resumindo-dados",
        titulo: "Resumindo dados",
        resumo: "COUNT, SUM, GROUP BY, HAVING e a contagem dobrada.",
        minutos: 25,
      },
      {
        slug: "modelagem-indices-e-codigo",
        arquivo: "06-modelagem-indices-e-codigo",
        titulo: "Modelagem, índices e SQL no código",
        resumo: "Cada coisa na sua prateleira, o sumário do livro e parâmetros.",
        minutos: 25,
      },
    ],
  },
  {
    id: "seguranca",
    nome: "Segurança para devs",
    pasta: "bastidores/seguranca-para-devs",
    grupo: "cozinha",
    bebida: "A vigilância sanitária",
    emoji: "🧾",
    frase: "Ninguém vê, mas sem ela o restaurante fecha.",
    pratica: {
      titulo: "Pratique do jeito certo",
      texto:
        "O OWASP Juice Shop é uma loja feita para ser atacada, de propósito e legalmente. Rode no seu computador e tente achar as falhas que você estudou.",
      url: "https://owasp.org/www-project-juice-shop/",
      rotulo: "Conhecer o Juice Shop",
    },
    documentacao: [
      {
        titulo: "OWASP Top 10:2025",
        url: "https://owasp.org/Top10/2025/",
        texto: "A lista oficial das dez categorias de risco mais importantes em aplicações web.",
      },
      {
        titulo: "OWASP Cheat Sheet Series",
        url: "https://cheatsheetseries.owasp.org/",
        texto: "Guias curtos e práticos: senhas, sessões, injeção, XSS, segredos e muito mais.",
      },
      {
        titulo: "Cartilha de Segurança para Internet (CERT.br)",
        url: "https://cartilha.cert.br/",
        texto: "Material brasileiro e gratuito sobre golpes, senhas, privacidade e proteção.",
      },
    ],
    sobre:
      "Segurança não é só trabalho da equipe de segurança: a maioria das falhas nasce em código comum. Esta trilha mostra o que todo dev precisa saber para não deixar portas abertas: pensar como quem ataca, guardar senhas do jeito certo, manter segredos fora do código, desconfiar da entrada do usuário, proteger o navegador e usar o OWASP Top 10 como checklist. Sem ensinar a invadir: ensinando a fechar as portas.",
    aprender: [
      "Os três pilares e a modelagem de ameaças",
      "Senhas com hash e sal, 2FA e um login bem feito",
      "Segredos fora do código e o que fazer quando vazam",
      "Injeção de SQL, validação de entrada e lista de permitidos",
      "XSS, cookies de sessão e HTTPS",
      "OWASP Top 10, controle de acesso e engenharia social",
    ],
    aulas: [
      {
        slug: "pensar-em-seguranca",
        arquivo: "01-pensar-em-seguranca",
        titulo: "Pensar em segurança",
        resumo: "A vigilância sanitária, os três pilares e a modelagem de ameaças.",
        minutos: 18,
      },
      {
        slug: "senhas-e-autenticacao",
        arquivo: "02-senhas-e-autenticacao",
        titulo: "Senhas e autenticação",
        resumo: "Hash, sal, frases-senha e 2FA.",
        minutos: 25,
      },
      {
        slug: "segredos-no-codigo",
        arquivo: "03-segredos-no-codigo",
        titulo: "Segredos fora do código",
        resumo: ".env, chaves públicas e secretas, e o que fazer quando vaza.",
        minutos: 20,
      },
      {
        slug: "injecao-e-validacao",
        arquivo: "04-injecao-e-validacao",
        titulo: "Injeção e validação de entrada",
        resumo: "O texto que vira comando e a porta da cozinha.",
        minutos: 25,
      },
      {
        slug: "o-navegador-e-o-xss",
        arquivo: "05-o-navegador-e-o-xss",
        titulo: "O navegador e o XSS",
        resumo: "Escapar a saída, cookies protegidos e HTTPS.",
        minutos: 22,
      },
      {
        slug: "owasp-e-engenharia-social",
        arquivo: "06-owasp-e-engenharia-social",
        titulo: "OWASP Top 10 e engenharia social",
        resumo: "O checklist do mercado e o ataque às pessoas.",
        minutos: 22,
      },
    ],
  },
  {
    id: "produto",
    nome: "Como um software funciona",
    pasta: "profissoes/produto",
    grupo: "profissoes",
    bebida: "Pão francês",
    emoji: "🥖",
    frase: "O pão de cada dia: comece por aqui antes de escolher uma área.",
    sobre:
      "Antes de escolher uma profissão, vale entender o produto inteiro: o que acontece entre o seu clique e a resposta na tela, quem cuida de cada parte e como todas as áreas trabalham juntas. É o mapa que você vai usar no projeto do chat.",
    aprender: [
      "Cliente, servidor, requisição e resposta",
      "HTTP, rotas e JSON sem mistério",
      "Quem cuida de cada camada do produto",
      "O chat da Unidunedev desmontado peça por peça",
    ],
    peso: 1,
    linguagens: ["javascript", "python", "java", "sql"],
    noChat: "Esta trilha é o mapa do chat inteiro: cada aula mostra uma parte dele.",
    aulas: [
      {
        slug: "do-clique-a-resposta",
        arquivo: "01-do-clique-a-resposta",
        titulo: "Do clique à resposta",
        resumo: "Cliente, servidor, HTTP e JSON: a viagem de uma requisição.",
        minutos: 15,
      },
      {
        slug: "quem-cuida-de-cada-parte",
        arquivo: "02-quem-cuida-de-cada-parte",
        titulo: "Quem cuida de cada parte",
        resumo: "As profissões no mapa e como uma funcionalidade nasce.",
        minutos: 12,
      },
      {
        slug: "o-chat-por-dentro",
        arquivo: "03-o-chat-por-dentro",
        titulo: "O chat da Unidunedev por dentro",
        resumo: "Nosso próximo projeto, desmontado camada por camada.",
        minutos: 15,
      },
    ],
  },
  {
    id: "qa",
    nome: "QA e testes",
    pasta: "profissoes/qa",
    grupo: "profissoes",
    bebida: "Pão de queijo",
    emoji: "🧀",
    frase: "Leve e viciante: experimenta tudo antes de ir para a mesa.",
    sobre:
      "QA (Quality Assurance, garantia de qualidade) é quem garante que o produto funciona antes de chegar no usuário: planeja testes, caça bugs, automatiza verificações e defende a experiência de quem vai usar.",
    aprender: [
      "Testes manuais e automatizados",
      "A pirâmide de testes",
      "Como escrever um bom relato de bug",
      "Ferramentas como Playwright, Cypress e pytest",
    ],
    peso: 1,
    linguagens: ["python", "javascript", "java"],
    noChat:
      "No chat, QA testa o fluxo inteiro: entrar, criar sala, mandar mensagem, e o que acontece se a internet cair no meio.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com QA e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "ui-ux",
    nome: "UI/UX Design",
    pasta: "profissoes/ui-ux",
    grupo: "profissoes",
    bebida: "Macaron",
    emoji: "🌈",
    frase: "Delicado, colorido e pensado nos mínimos detalhes.",
    sobre:
      "UX (experiência do usuário) é pensar como a pessoa vai usar o produto: o caminho, as dificuldades, o que ela sente. UI (interface) é o visual: cores, tipografia, botões e telas. Quem trabalha com design desenha o produto antes de existir código.",
    aprender: [
      "A diferença entre UI e UX",
      "Pesquisa, wireframe e protótipo",
      "Cores, tipografia, hierarquia e acessibilidade",
      "Figma e design systems",
    ],
    peso: 1,
    linguagens: ["html-css"],
    noChat:
      "No chat, UI/UX desenha as telas, define as cores e decide como deve ser criar uma sala ou responder uma mensagem.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com UI/UX e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "front-end",
    nome: "Front-end",
    pasta: "profissoes/front-end",
    grupo: "profissoes",
    bebida: "Cupcake",
    emoji: "🧁",
    frase: "A parte que todo mundo vê (e quer pegar primeiro).",
    sobre:
      "Front-end é quem constrói o que roda no navegador: as telas, os botões, as animações e a conversa com o back-end. Transforma o design em código e cuida para o site funcionar em qualquer tela.",
    aprender: [
      "HTML, CSS e JavaScript: quem faz o quê",
      "Componentes, estado e rotas",
      "Como o front conversa com a API",
      "Frameworks como React, Angular e Vue",
    ],
    peso: 2,
    linguagens: ["html-css", "javascript", "typescript"],
    noChat:
      "No chat, o front-end constrói a versão web: lista de salas, a conversa e o campo de mensagem que fala com a API.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com front-end e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "mobile",
    nome: "Mobile",
    pasta: "profissoes/mobile",
    grupo: "profissoes",
    bebida: "Croissant",
    emoji: "🥐",
    frase: "Várias camadas de massa, cabe na palma da mão.",
    sobre:
      "Mobile é quem cria os apps que a gente instala no celular. Usa recursos que o site não tem (câmera, notificações, GPS), precisa funcionar com internet ruim e passa pela aprovação das lojas.",
    aprender: [
      "Nativo × multiplataforma",
      "Flutter, Kotlin, Swift e React Native",
      "Arquitetura, estado e navegação no app",
      "Do código até a loja de aplicativos",
    ],
    peso: 2,
    linguagens: ["dart", "kotlin", "swift", "javascript"],
    noChat:
      "No chat, o mobile faz o app para Android e iOS, com notificação quando chega mensagem nova.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com mobile e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "back-end",
    nome: "Back-end",
    pasta: "profissoes/back-end",
    grupo: "profissoes",
    bebida: "Bolo de chocolate",
    emoji: "🎂",
    frase: "Três camadas, recheio denso: pesado, mas é ele que sustenta a festa.",
    sobre:
      "Back-end é o que roda no servidor: recebe as requisições, aplica as regras de negócio, conversa com o banco de dados e devolve as respostas. O usuário não vê, mas sem ele nada funciona.",
    aprender: [
      "APIs REST: rotas, métodos e status",
      "Regras de negócio e arquitetura em camadas",
      "Bancos de dados SQL e NoSQL",
      "Autenticação e segurança",
    ],
    peso: 3,
    linguagens: ["java", "python", "javascript", "csharp", "go", "sql"],
    noChat:
      "No chat, o back-end cria a API (login, salas, mensagens), guarda tudo no banco e entrega as mensagens em tempo real.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com back-end e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "devops",
    nome: "DevOps",
    pasta: "profissoes/devops",
    grupo: "profissoes",
    bebida: "Pão de fermentação natural",
    emoji: "🍞",
    frase: "Exige paciência e cuidado todo dia. Pesado, mas vale cada fatia.",
    sobre:
      "DevOps cuida do caminho entre o código e o usuário: servidores, nuvem, deploy automático, monitoramento e tudo que faz o sistema ficar no ar. Junta desenvolvimento (Dev) e operação (Ops).",
    aprender: [
      "Linux, terminal e redes",
      "CI/CD: testar e publicar sozinho",
      "Containers, Docker e nuvem",
      "Monitoramento e infraestrutura como código",
    ],
    peso: 3,
    linguagens: ["bash", "python", "go"],
    noChat:
      "No chat, DevOps publica cada versão automaticamente, cuida do servidor e avisa se o sistema cair.",
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz e onde fica",
        resumo: "A função de quem trabalha com DevOps e o lugar dela no produto.",
        minutos: 12,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Linguagens e ferramentas",
        resumo: "O que se usa no dia a dia (e por onde começar).",
        minutos: 12,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos e arquitetura",
        resumo: "As ideias que aparecem em qualquer empresa.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Como chegar lá aos poucos, etapa por etapa.",
        minutos: 10,
      },
    ],
  },
  {
    id: "ciberseguranca",
    nome: "Cibersegurança",
    pasta: "profissoes/ciberseguranca",
    grupo: "profissoes",
    bebida: "Bolo de rolo",
    emoji: "🌀",
    frase: "Defesa em camadas: uma fina por cima da outra.",
    sobre:
      "Cibersegurança protege sistemas, dados e pessoas: previne, detecta, responde e aprende com ataques. Tem espaço para quem gosta de investigar, de programar, de testar sistemas com autorização ou de organizar regras e riscos.",
    aprender: [
      "As áreas: defesa, resposta a incidentes, pentest, AppSec, nuvem e governança",
      "Ferramentas como Wireshark, SIEM, Burp Suite e o terminal Linux",
      "Vulnerabilidade, ameaça, risco, CVE e resposta a incidentes",
      "Como começar com CTFs, sempre de forma ética e legal",
    ],
    peso: 3,
    linguagens: ["python", "bash", "sql", "javascript"],
    noChat:
      "No chat, segurança revisa quem pode ler cada sala no banco, protege o login, procura segredos no repositório e fica de olho em tentativas de abuso.",
    documentacao: [
      {
        titulo: "OverTheWire: Bandit",
        url: "https://overthewire.org/wargames/bandit/",
        texto: "O terminal Linux em formato de jogo: cada nível dá a senha do próximo.",
      },
      {
        titulo: "picoCTF",
        url: "https://picoctf.org/",
        texto: "Desafios de segurança gratuitos, feitos para quem está começando.",
      },
    ],
    aulas: [
      {
        slug: "o-que-faz",
        arquivo: "01-o-que-faz",
        titulo: "O que faz quem trabalha com cibersegurança",
        resumo: "As áreas, o dia a dia e a ética da profissão.",
        minutos: 10,
      },
      {
        slug: "ferramentas",
        arquivo: "02-ferramentas",
        titulo: "Ferramentas e linguagens",
        resumo: "Terminal, redes, SIEM, Burp e companhia.",
        minutos: 10,
      },
      {
        slug: "conceitos",
        arquivo: "03-conceitos",
        titulo: "Conceitos da área",
        resumo: "Risco, CVE, etapas de um ataque, backup e resposta a incidentes.",
        minutos: 15,
      },
      {
        slug: "roadmap",
        arquivo: "04-roadmap",
        titulo: "Roadmap do nosso jeito",
        resumo: "Da base aos CTFs, sem pressa.",
        minutos: 10,
      },
    ],
  },
];

export function buscarTrilha(id: string): Trilha | undefined {
  return TRILHAS.find((t) => t.id === id);
}

export function buscarAula(trilha: Trilha, slug: string) {
  const indice = trilha.aulas.findIndex((a) => a.slug === slug);
  if (indice < 0) return undefined;
  return {
    aula: trilha.aulas[indice]!,
    indice,
    anterior: trilha.aulas[indice - 1],
    proxima: trilha.aulas[indice + 1],
  };
}

export function minutosDaTrilha(trilha: Trilha) {
  return trilha.aulas.reduce((total, a) => total + a.minutos, 0);
}

export function duracao(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h${m ? String(m).padStart(2, "0") : ""}` : `${m} min`;
}

export function desafiosUrl(trilha: Trilha) {
  return `${ESTUDOS_REPO_URL}/tree/main/${trilha.pasta}/desafios`;
}

/** Os arquivos .mdx são carregados só quando a aula é aberta (cada um vira um pedacinho do build). */
const ARQUIVOS = import.meta.glob<{ default: ComponentType<{ components?: object }> }>(
  "../conteudo/**/*.mdx",
);

export function carregarAula(trilha: Trilha, aula: Aula) {
  const caminho = `../conteudo/${trilha.pasta}/${aula.arquivo}.mdx`;
  return ARQUIVOS[caminho];
}

export const CAMINHOS_DOS_ARQUIVOS = Object.keys(ARQUIVOS);
