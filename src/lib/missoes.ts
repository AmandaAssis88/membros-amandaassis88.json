import { AREAS } from "./community";

export const LINGUAGENS_MISSAO = [
  { id: "c", nome: "C", trilha: "c" },
  { id: "python", nome: "Python", trilha: "python" },
  { id: "java", nome: "Java", trilha: "java" },
  { id: "javascript", nome: "JavaScript", trilha: null },
] as const;

export type LinguagemMissao = (typeof LINGUAGENS_MISSAO)[number]["id"];
export type AreaMissao = (typeof AREAS)[number];

export type Missao = {
  id: string;
  titulo: string;
  chamada: string;
  historia: string;
  objetivo: string;
  linguagem: LinguagemMissao;
  areas: AreaMissao[];
  nivel: "Primeiros passos" | "Próximo passo";
  conceitos: string[];
  passos: string[];
  criterios: string[];
  extra: string;
};

/**
 * Desafio 2: projetos pequenos, com contexto lúdico e requisitos que cabem numa
 * primeira experiência. As escolhas de carreira são interesses, não pré-requisitos.
 * A lista é local; equipes e WhatsApp precisam de confirmação no servidor futuramente.
 */
export const MISSOES: Missao[] = [
  {
    id: "incendio",
    titulo: "Apague o incêndio",
    chamada: "Os bombeirinhos precisam calcular a reserva de água!",
    historia:
      "Uma vila de brinquedo está em apuros: o painel da estação de bombeiros parou de calcular o consumo de água. A equipe precisa saber quantos litros vai utilizar antes de começar o resgate.",
    objetivo:
      "Crie uma calculadora de consumo que receba a vazão de água por minuto e o tempo de uso, mostrando o total de litros utilizados.",
    linguagem: "c",
    areas: ["Back-end", "QA/Testes", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["variáveis", "scanf e printf", "multiplicação", "formatação"],
    passos: [
      "Receba a vazão de água em litros por minuto.",
      "Peça o tempo de uso, em minutos.",
      "Calcule e exiba o consumo total, com a unidade litros.",
      "Teste com valores pequenos e com tempo igual a zero.",
    ],
    criterios: [
      "O programa solicita dois valores numéricos.",
      "O consumo é calculado por vazão × tempo.",
      "A saída deixa claro que o resultado está em litros.",
    ],
    extra: "Aceite também o preço por litro e calcule o gasto total do exercício.",
  },
  {
    id: "cafeteria",
    titulo: "Salve a cafeteria",
    chamada: "Os pedidos estão voando pelo balcão!",
    historia:
      "A cafeteria da cidade ficou lotada. Ninguém sabe quantos cafés foram pedidos nem quanto cada mesa deve pagar. O gatinho barista pediu uma ajudinha.",
    objetivo: "Monte um programa de pedidos com um pequeno cardápio, quantidades e total a pagar.",
    linguagem: "python",
    areas: ["Back-end", "PO/Produto", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["input", "condicionais", "listas", "repetição"],
    passos: [
      "Defina três produtos com preços fictícios.",
      "Deixe a pessoa escolher um item e informar uma quantidade.",
      "Permita adicionar mais um pedido ou encerrar.",
      "Mostre os pedidos e o total da conta.",
    ],
    criterios: [
      "O menu apresenta produtos e preços.",
      "O total soma corretamente os pedidos.",
      "Existe uma opção clara para encerrar a compra.",
    ],
    extra: "Calcule um desconto para clientes que trouxeram sua própria caneca.",
  },
  {
    id: "abrigo",
    titulo: "Ajude o abrigo",
    chamada: "Os bichinhos precisam encontrar seus nomes na lista.",
    historia:
      "O abrigo Patinhas Felizes recebeu novos moradores. As fichas estão misturadas, e ninguém consegue encontrar rapidamente um animal para adoção.",
    objetivo: "Crie um cadastro de animais em memória usando uma classe com nome, espécie e idade.",
    linguagem: "java",
    areas: ["Back-end", "Mobile", "Banco de Dados"],
    nivel: "Próximo passo",
    conceitos: ["classes", "objetos", "ArrayList", "Scanner"],
    passos: [
      "Crie uma classe Animal com nome, espécie e idade.",
      "Cadastre ao menos três animais em uma lista.",
      "Liste os animais com informações legíveis.",
      "Permita procurar pelo nome do animal.",
    ],
    criterios: [
      "Cada animal é representado por um objeto.",
      "A lista mostra todos os cadastros.",
      "Uma busca informa quando o nome não existe.",
    ],
    extra: "Adicione um atributo adotado e exiba apenas os animais disponíveis.",
  },
  {
    id: "nave",
    titulo: "Lance a nave",
    chamada: "Faltam poucos cálculos para a decolagem!",
    historia:
      "Uma pequena nave está pronta para visitar a Lua, mas o computador de bordo perdeu a estimativa de combustível. A astronauta aguarda sua ajuda.",
    objetivo:
      "Crie um simulador que calcule quantos litros de combustível uma viagem vai consumir.",
    linguagem: "c",
    areas: ["DevOps", "Back-end", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["float", "operadores", "if", "printf"],
    passos: [
      "Receba a distância da viagem e o consumo por quilômetro.",
      "Calcule o combustível necessário.",
      "Pergunte quantos litros existem no tanque.",
      "Avise se a reserva é suficiente ou se falta combustível.",
    ],
    criterios: [
      "O programa calcula uma necessidade numérica.",
      "A mensagem muda conforme a quantidade no tanque.",
      "Os valores decimais são apresentados com duas casas.",
    ],
    extra: "Exiba também quantos litros sobram após a missão.",
  },
  {
    id: "laboratorio",
    titulo: "Organize o laboratório",
    chamada: "Um experimento bagunçou todos os registros!",
    historia:
      "O laboratório das poções trocou as etiquetas de lugar. A cientista precisa registrar seus experimentos antes que os frascos coloridos sejam confundidos.",
    objetivo:
      "Crie um cadastro simples de experimentos que seja salvo e carregado de um arquivo JSON local.",
    linguagem: "python",
    areas: ["Banco de Dados", "Back-end", "QA/Testes"],
    nivel: "Próximo passo",
    conceitos: ["dicionários", "listas", "funções", "JSON"],
    passos: [
      "Crie um menu para cadastrar e listar experimentos.",
      "Guarde nome, data e descrição curta em um dicionário.",
      "Salve a lista em um arquivo JSON local.",
      "Carregue os registros novamente quando o programa iniciar.",
    ],
    criterios: [
      "É possível cadastrar mais de um experimento.",
      "Os registros permanecem após encerrar e abrir o programa.",
      "O programa lida com a primeira execução sem arquivo.",
    ],
    extra: "Permita editar a descrição de um experimento existente.",
  },
  {
    id: "castelo",
    titulo: "Proteja o castelo",
    chamada: "O estoque de poções está acabando!",
    historia:
      "Um castelo amigável vai receber uma festa, mas o inventário está completamente desorganizado. A guardiã precisa contar os suprimentos.",
    objetivo:
      "Crie um inventário com itens, quantidades e métodos para adicionar e retirar unidades.",
    linguagem: "java",
    areas: ["Back-end", "Banco de Dados", "PO/Produto"],
    nivel: "Próximo passo",
    conceitos: ["classes", "métodos", "ArrayList", "validação"],
    passos: [
      "Modele um Item com nome e quantidade.",
      "Crie métodos para adicionar e retirar unidades.",
      "Impeça que a quantidade fique negativa.",
      "Mostre todos os itens e seus estoques.",
    ],
    criterios: [
      "O estoque é atualizado pelos métodos.",
      "Retiradas acima do disponível são rejeitadas.",
      "A lista apresenta quantidades atualizadas.",
    ],
    extra: "Marque itens com menos de três unidades como 'estoque baixo'.",
  },
  {
    id: "farol",
    titulo: "Acenda o farol",
    chamada: "Os barcos não conseguem enxergar a costa!",
    historia:
      "O farol de uma ilha de papel apagou. O operador precisa de um painel que mostre se a bateria conseguirá manter a luz acesa durante a noite.",
    objetivo:
      "Crie uma página com formulário para calcular quantas horas a bateria do farol consegue durar.",
    linguagem: "javascript",
    areas: ["Front-end", "UI/UX Design", "DevOps"],
    nivel: "Primeiros passos",
    conceitos: ["HTML", "eventos", "DOM", "operações"],
    passos: [
      "Monte dois campos: energia disponível e gasto por hora.",
      "Ao clicar em Calcular, leia os campos com JavaScript.",
      "Mostre quantas horas o farol poderá funcionar.",
      "Exiba um aviso para valores vazios, zero ou negativos.",
    ],
    criterios: [
      "O cálculo acontece sem recarregar a página.",
      "O resultado aparece na própria interface.",
      "Valores inválidos geram uma mensagem compreensível.",
    ],
    extra: "Mude a cor do farol na interface quando a autonomia for baixa.",
  },
  {
    id: "biblioteca",
    titulo: "A biblioteca encantada",
    chamada: "Os livros perderam suas prateleiras!",
    historia:
      "Uma coruja bibliotecária precisa organizar dezenas de livros encantados. Ela quer saber quais estão disponíveis e quais foram emprestados.",
    objetivo:
      "Desenvolva um catálogo de livros com cadastro, empréstimo e devolução usando dados locais.",
    linguagem: "python",
    areas: ["Back-end", "Banco de Dados", "Ainda não sei"],
    nivel: "Próximo passo",
    conceitos: ["listas", "dicionários", "funções", "persistência"],
    passos: [
      "Cadastre título e autor de cada livro.",
      "Liste os livros com situação disponível ou emprestado.",
      "Permita emprestar e devolver um livro pelo título.",
      "Salve as alterações em JSON para a próxima execução.",
    ],
    criterios: [
      "Não é possível emprestar um livro indisponível.",
      "A devolução altera corretamente a situação.",
      "Os dados continuam disponíveis depois de reiniciar.",
    ],
    extra: "Adicione uma busca de livros pelo nome do autor.",
  },
  {
    id: "robo",
    titulo: "Conserte o robô",
    chamada: "O robô entregador esqueceu a lista de tarefas!",
    historia:
      "Um robô simpático precisa entregar caixinhas na cidade, mas seu painel perdeu a memória das entregas. Você foi chamado para reorganizar sua rotina.",
    objetivo: "Modele entregas e um robô que registra tarefas pendentes e concluídas.",
    linguagem: "java",
    areas: ["Mobile", "Back-end", "QA/Testes"],
    nivel: "Próximo passo",
    conceitos: ["classes", "objetos", "listas", "métodos"],
    passos: [
      "Crie uma classe Entrega com destino e situação.",
      "Cadastre entregas em uma lista.",
      "Crie um método para marcar uma entrega como concluída.",
      "Liste separadamente entregas pendentes e finalizadas.",
    ],
    criterios: [
      "Cada entrega possui uma situação.",
      "O robô consegue atualizar uma entrega da lista.",
      "A listagem diferencia pendentes e concluídas.",
    ],
    extra: "Mostre a porcentagem de entregas já realizadas.",
  },
  {
    id: "jardim",
    titulo: "Cuide do jardim da Lua",
    chamada: "As plantinhas estão pedindo gotinhas d'água!",
    historia:
      "No jardim lunar, flores que brilham à noite dependem de um painel de irrigação. Algumas recebem água demais; outras, quase nenhuma.",
    objetivo:
      "Crie uma página interativa para registrar plantas e calcular a água necessária para todas elas.",
    linguagem: "javascript",
    areas: ["Front-end", "UI/UX Design", "Mobile"],
    nivel: "Primeiros passos",
    conceitos: ["arrays", "objetos", "DOM", "eventos"],
    passos: [
      "Defina um nome e uma necessidade diária de água para cada planta.",
      "Permita adicionar novas plantas pelo formulário.",
      "Mostre a lista atualizada na página.",
      "Calcule a quantidade total de água por dia.",
    ],
    criterios: [
      "Novas plantas aparecem sem recarregar a página.",
      "A lista apresenta o consumo de cada planta.",
      "O total é atualizado ao adicionar uma planta.",
    ],
    extra: "Crie um botão para remover uma planta do jardim.",
  },
  {
    id: "feira",
    titulo: "A feira das estrelas",
    chamada: "Os preços das barracas estão todos misturados!",
    historia:
      "Uma feira espacial abriu suas portas, mas os vendedores não conseguem fechar o caixa. Um comerciante oferece descontos e precisa calcular o troco corretamente.",
    objetivo: "Faça um programa de caixa que soma uma compra, aplica desconto e informa o troco.",
    linguagem: "c",
    areas: ["Back-end", "PO/Produto", "QA/Testes"],
    nivel: "Primeiros passos",
    conceitos: ["float", "scanf", "if", "porcentagem"],
    passos: [
      "Receba o preço de dois produtos e as quantidades.",
      "Calcule o subtotal da compra.",
      "Aplique um desconto percentual informado.",
      "Receba o valor pago e exiba o troco ou o que falta.",
    ],
    criterios: [
      "O desconto é calculado sobre o subtotal.",
      "O troco nunca é apresentado como positivo se faltou dinheiro.",
      "Valores monetários aparecem com duas casas decimais.",
    ],
    extra: "Adicione uma opção para repetir o cálculo com outros produtos.",
  },
  {
    id: "pinguim",
    titulo: "Encontre o pinguim",
    chamada: "Um pinguim explorador se perdeu no mapa de gelo!",
    historia:
      "O pinguim Pipo esqueceu o caminho de casa. Cada resposta correta ajuda a encontrar uma nova pista no mapa. Ele precisa de um pequeno jogo de perguntas.",
    objetivo: "Crie um quiz na página com perguntas, alternativas e pontuação final.",
    linguagem: "javascript",
    areas: ["Front-end", "UI/UX Design", "QA/Testes"],
    nivel: "Primeiros passos",
    conceitos: ["arrays", "condicionais", "eventos", "estado"],
    passos: [
      "Crie ao menos três perguntas com alternativas.",
      "Mostre uma pergunta por vez na página.",
      "Some pontos quando a resposta estiver correta.",
      "Ao final, apresente a pontuação e um botão para recomeçar.",
    ],
    criterios: [
      "Cada pergunta aparece uma única vez por partida.",
      "A pontuação corresponde aos acertos.",
      "É possível jogar novamente sem atualizar a página.",
    ],
    extra: "Adicione uma animação de comemoração quando Pipo chegar em casa.",
  },
];

export const CHAVE_ESCOLHAS_MISSOES = "unidunedev:missoes:escolhas:v1";

export type EscolhasMissoes = {
  area: AreaMissao | "";
  linguagem: LinguagemMissao | "";
  missaoId: string;
};

export const ESCOLHAS_INICIAIS: EscolhasMissoes = {
  area: "",
  linguagem: "",
  missaoId: "",
};

export function eLinguagemMissao(valor: unknown): valor is LinguagemMissao {
  return LINGUAGENS_MISSAO.some((linguagem) => linguagem.id === valor);
}

export function eAreaMissao(valor: unknown): valor is AreaMissao {
  return AREAS.some((area) => area === valor);
}

export function procurarMissao(id: string): Missao | undefined {
  return MISSOES.find((missao) => missao.id === id);
}

export function normalizarEscolhas(valor: unknown): EscolhasMissoes {
  if (!valor || typeof valor !== "object") return { ...ESCOLHAS_INICIAIS };
  const registro = valor as Record<string, unknown>;
  return {
    area: eAreaMissao(registro["area"]) ? registro["area"] : "",
    linguagem: eLinguagemMissao(registro["linguagem"]) ? registro["linguagem"] : "",
    missaoId:
      typeof registro["missaoId"] === "string" && procurarMissao(registro["missaoId"])
        ? registro["missaoId"]
        : "",
  };
}

export function lerEscolhasMissoes(): EscolhasMissoes {
  try {
    const armazenado = localStorage.getItem(CHAVE_ESCOLHAS_MISSOES);
    return normalizarEscolhas(armazenado ? JSON.parse(armazenado) : null);
  } catch {
    return { ...ESCOLHAS_INICIAIS };
  }
}

export function salvarEscolhasMissoes(escolhas: EscolhasMissoes): void {
  try {
    localStorage.setItem(CHAVE_ESCOLHAS_MISSOES, JSON.stringify(escolhas));
  } catch {
    // Sem armazenamento: o catálogo permanece utilizável durante a visita.
  }
}

export function listarMissoes(linguagem: LinguagemMissao | "", area: AreaMissao | ""): Missao[] {
  const lista = MISSOES.filter((missao) => !linguagem || missao.linguagem === linguagem);
  if (!area || area === "Ainda não sei") return lista;
  return [...lista].sort((a, b) => Number(b.areas.includes(area)) - Number(a.areas.includes(area)));
}
