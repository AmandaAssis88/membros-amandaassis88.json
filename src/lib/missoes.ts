import { AREAS } from "./community";

export const LINGUAGENS_MISSAO = [
  { id: "c", nome: "C", trilha: "c" },
  { id: "python", nome: "Python", trilha: "python" },
  { id: "java", nome: "Java", trilha: "java" },
] as const;

export type LinguagemMissao = (typeof LINGUAGENS_MISSAO)[number]["id"];
export type AreaMissao = (typeof AREAS)[number];

export type Missao = {
  id: string;
  titulo: string;
  chamada: string;
  historia: string;
  objetivo: string;
  areas: AreaMissao[];
  nivel: "Primeiros passos" | "Desenvolvendo" | "Modelando dados";
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
    areas: ["Back-end", "QA/Testes", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["variáveis", "entrada e saída", "operações", "formatação"],
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
    extra: "Aceite um valor por litro e mostre o custo estimado. Use uma função para calcular.",
  },
  {
    id: "cafeteria",
    titulo: "Salve a cafeteria",
    chamada: "Os pedidos estão voando pelo balcão!",
    historia:
      "A cafeteria da cidade ficou lotada. Ninguém sabe quantos cafés foram pedidos nem quanto cada mesa deve pagar. O gatinho barista pediu uma ajudinha.",
    objetivo: "Monte um programa de pedidos com um pequeno cardápio, quantidades e total a pagar.",
    areas: ["Back-end", "PO/Produto", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["variáveis", "condicionais", "repetição", "listas ou vetores"],
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
    extra:
      "Separe o cálculo total em uma função e aplique desconto quando o cliente trouxer a própria caneca.",
  },
  {
    id: "abrigo",
    titulo: "Ajude o abrigo",
    chamada: "Os bichinhos precisam encontrar seus nomes na lista.",
    historia:
      "O abrigo Patinhas Felizes recebeu novos moradores. As fichas estão misturadas, e ninguém consegue encontrar rapidamente um animal para adoção.",
    objetivo:
      "Crie um cadastro de animais com nome, espécie e idade. Use classes em Python ou Java e structs em C para organizar os registros.",
    areas: ["Back-end", "Mobile", "Banco de Dados"],
    nivel: "Modelando dados",
    conceitos: ["registros", "classes ou structs", "coleções", "busca"],
    passos: [
      "Represente cada animal com nome, espécie e idade.",
      "Cadastre pelo menos três animais em uma lista ou vetor.",
      "Mostre a relação de animais com informações legíveis.",
      "Permita procurar um animal pelo nome.",
    ],
    criterios: [
      "Cada animal tem os campos nome, espécie e idade.",
      "A listagem mostra todos os cadastros.",
      "A busca avisa quando um nome não existe.",
    ],
    extra:
      "Em Java ou Python, experimente uma subclasse de Animal para cães ou gatos. Em C, organize os tipos com structs e funções.",
  },
  {
    id: "nave",
    titulo: "Lance a nave",
    chamada: "Faltam poucos cálculos para a decolagem!",
    historia:
      "Uma pequena nave está pronta para visitar a Lua, mas o computador de bordo perdeu a estimativa de combustível. A astronauta aguarda sua ajuda.",
    objetivo:
      "Crie um simulador que calcule quantos litros de combustível uma viagem vai consumir.",
    areas: ["DevOps", "Back-end", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["variáveis", "decimais", "condicionais", "funções"],
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
    extra: "Calcule quanto de combustível sobra. Separe o cálculo em uma função.",
  },
  {
    id: "laboratorio",
    titulo: "Organize o laboratório",
    chamada: "Um experimento bagunçou todos os registros!",
    historia:
      "O laboratório das poções trocou as etiquetas de lugar. A cientista precisa registrar seus experimentos antes que os frascos coloridos sejam confundidos.",
    objetivo:
      "Crie um cadastro de experimentos, permitindo registrar, listar e salvar as informações em um arquivo local.",
    areas: ["Banco de Dados", "Back-end", "QA/Testes"],
    nivel: "Desenvolvendo",
    conceitos: ["registros", "listas ou vetores", "funções", "arquivos"],
    passos: [
      "Crie um menu com opções de cadastrar e listar.",
      "Guarde nome, data e uma descrição em registros.",
      "Salve os dados em um arquivo local (o formato pode variar por linguagem).",
      "Ao iniciar, tente carregar os registros já salvos.",
    ],
    criterios: [
      "É possível cadastrar vários experimentos.",
      "Os registros podem ser recuperados após reiniciar.",
      "A primeira execução funciona sem arquivo existente.",
    ],
    extra: "Adicione a edição da descrição. Não é obrigatório usar um banco de dados.",
  },
  {
    id: "castelo",
    titulo: "Proteja o castelo",
    chamada: "O estoque de poções está acabando!",
    historia:
      "Um castelo amigável vai receber uma festa, mas o inventário está completamente desorganizado. A guardiã precisa contar os suprimentos.",
    objetivo:
      "Crie um inventário com itens, quantidades e operações para acrescentar e retirar suprimentos.",
    areas: ["Back-end", "Banco de Dados", "PO/Produto"],
    nivel: "Modelando dados",
    conceitos: ["modelagem de dados", "classes ou structs", "funções ou métodos", "validações"],
    passos: [
      "Modele um Item com nome e quantidade, usando classes ou structs.",
      "Crie funções ou métodos para acrescentar e retirar unidades.",
      "Impeça que a quantidade de um item fique negativa.",
      "Liste o estoque atualizado.",
    ],
    criterios: [
      "É possível atualizar o estoque.",
      "Não é permitido retirar acima do disponível.",
      "A listagem mostra as quantidades atualizadas.",
    ],
    extra:
      "Em Python/Java, crie uma classe especial para itens perecíveis. Em C, experimente campos adicionais e funções de verificação.",
  },
  {
    id: "farol",
    titulo: "Acenda o farol",
    chamada: "Os barcos não conseguem enxergar a costa!",
    historia:
      "O farol de uma ilha de papel apagou. O operador precisa de um painel que mostre se a bateria conseguirá manter a luz acesa durante a noite.",
    objetivo:
      "Crie um programa de terminal que calcula quantas horas a bateria do farol consegue funcionar.",
    areas: ["Front-end", "UI/UX Design", "DevOps"],
    nivel: "Primeiros passos",
    conceitos: ["entrada de dados", "decimais", "operações", "validação"],
    passos: [
      "Leia a energia disponível e o gasto de energia por hora.",
      "Confira se o gasto informado é maior que zero.",
      "Calcule por quantas horas a luz pode ficar ligada.",
      "Mostre a autonomia e uma mensagem clara em caso de valor inválido.",
    ],
    criterios: [
      "O cálculo considera a energia disponível e o gasto por hora.",
      "A autonomia é apresentada em horas.",
      "O programa evita divisão por zero.",
    ],
    extra: "Peça quantas horas dura a noite e informe se a bateria será suficiente.",
  },
  {
    id: "biblioteca",
    titulo: "A biblioteca encantada",
    chamada: "Os livros perderam suas prateleiras!",
    historia:
      "Uma coruja bibliotecária precisa organizar dezenas de livros encantados. Ela quer saber quais estão disponíveis e quais foram emprestados.",
    objetivo: "Crie um catálogo de livros em memória com cadastro, empréstimo e devolução.",
    areas: ["Back-end", "Banco de Dados", "Ainda não sei"],
    nivel: "Desenvolvendo",
    conceitos: ["coleções", "registros", "funções", "condicionais"],
    passos: [
      "Registre o título, autor e situação de cada livro.",
      "Mostre todos os livros, indicando disponíveis e emprestados.",
      "Permita emprestar e devolver um livro pelo título.",
      "Mostre o resultado das mudanças durante a execução.",
    ],
    criterios: [
      "Não é possível emprestar um livro já emprestado.",
      "A devolução atualiza a situação corretamente.",
      "A lista continua correta após várias operações.",
    ],
    extra: "Experimente salvar a coleção em arquivo e recarregá-la ao iniciar.",
  },
  {
    id: "robo",
    titulo: "Conserte o robô",
    chamada: "O robô entregador esqueceu a lista de tarefas!",
    historia:
      "Um robô simpático precisa entregar caixinhas na cidade, mas seu painel perdeu a memória das entregas. Você foi chamado para reorganizar sua rotina.",
    objetivo:
      "Construa um gerenciador de entregas que registra destinos, acompanha situações e mostra o trabalho do robô.",
    areas: ["Mobile", "Back-end", "QA/Testes"],
    nivel: "Modelando dados",
    conceitos: ["classes ou structs", "coleções", "métodos ou funções", "estado"],
    passos: [
      "Represente cada entrega com destino e estado (pendente ou concluída).",
      "Cadastre várias entregas em uma lista ou vetor.",
      "Crie uma função ou método para concluir uma entrega.",
      "Mostre pendentes e concluídas separadamente.",
    ],
    criterios: [
      "Cada entrega mantém sua situação.",
      "É possível atualizar uma entrega existente.",
      "A listagem identifica as tarefas pendentes.",
    ],
    extra:
      "Em Java/Python, experimente uma classe base Tarefa e uma classe Entrega. Em C, reutilize structs e funções.",
  },
  {
    id: "jardim",
    titulo: "Cuide do jardim da Lua",
    chamada: "As plantinhas estão pedindo gotinhas d'água!",
    historia:
      "No jardim lunar, flores que brilham à noite dependem de um painel de irrigação. Algumas recebem água demais; outras, quase nenhuma.",
    objetivo:
      "Crie um sistema de terminal para registrar plantas, seus consumos diários e calcular a água necessária para o jardim.",
    areas: ["Front-end", "UI/UX Design", "Mobile"],
    nivel: "Desenvolvendo",
    conceitos: ["registros", "vetores ou listas", "laços", "operações"],
    passos: [
      "Registre nome e consumo diário de água de uma planta.",
      "Permita registrar várias plantas em uma lista ou vetor.",
      "Mostre a relação de plantas e seus consumos.",
      "Calcule a soma de água usada por dia.",
    ],
    criterios: [
      "O programa guarda mais de uma planta.",
      "Cada planta aparece com seu consumo.",
      "O total corresponde à soma dos consumos.",
    ],
    extra: "Permita remover uma planta e atualizar a soma.",
  },
  {
    id: "feira",
    titulo: "A feira das estrelas",
    chamada: "Os preços das barracas estão todos misturados!",
    historia:
      "Uma feira espacial abriu suas portas, mas os vendedores não conseguem fechar o caixa. Um comerciante oferece descontos e precisa calcular o troco corretamente.",
    objetivo:
      "Crie um programa de terminal para fechar uma compra, calcular desconto e informar troco.",
    areas: ["Back-end", "PO/Produto", "QA/Testes"],
    nivel: "Primeiros passos",
    conceitos: ["decimais", "operadores", "condicionais", "formatação"],
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
    extra: "Organize o cálculo em uma função e permita repetir uma compra.",
  },
  {
    id: "pinguim",
    titulo: "Encontre o pinguim",
    chamada: "Um pinguim explorador se perdeu no mapa de gelo!",
    historia:
      "O pinguim Pipo esqueceu o caminho de casa. Cada resposta correta ajuda a encontrar uma nova pista no mapa. Ele precisa de um pequeno jogo de perguntas.",
    objetivo:
      "Crie um quiz no terminal, com perguntas, alternativas e pontuação final para ajudar Pipo a encontrar o caminho de casa.",
    areas: ["Front-end", "UI/UX Design", "QA/Testes"],
    nivel: "Desenvolvendo",
    conceitos: ["listas ou vetores", "laços", "condicionais", "funções"],
    passos: [
      "Crie pelo menos três perguntas e alternativas.",
      "Mostre uma pergunta por vez no terminal.",
      "Leia a resposta e some pontos quando houver acerto.",
      "Ao final, mostre a pontuação.",
    ],
    criterios: [
      "Cada pergunta aparece uma vez por rodada.",
      "A pontuação corresponde aos acertos.",
      "Uma mensagem final informa o resultado.",
    ],
    extra: "Permita jogar novamente e mostre uma mensagem diferente para cada faixa de pontuação.",
  },  {
    id: "gatinho",
    titulo: "Salve o gatinho",
    chamada: "Mingau subiu na árvore e precisa voltar para casa.",
    historia:
      "No quintal da comunidade, o gatinho Mingau foi atrás de uma borboleta e ficou no alto de uma árvore. A equipe de resgate está chegando com uma escada, mas precisa saber se ela alcança o galho com segurança. Uma continha simples pode ajudar a planejar o resgate sem que ninguém precise subir por conta própria.",
    objetivo:
      "Crie um programa que receba a altura do galho e o alcance da escada. Ele deve informar se a escada alcança o gatinho ou quantos metros faltam para a equipe trazer o equipamento adequado.",
    areas: ["Back-end", "QA/Testes", "Ainda não sei"],
    nivel: "Primeiros passos",
    conceitos: ["variáveis", "entrada de dados", "condicionais", "operações"],
    passos: [
      "Receba dois números: altura do galho e alcance da escada, em metros.",
      "Compare a altura do galho com o alcance da escada.",
      "Se alcançar, exiba uma mensagem de confirmação.",
      "Se não alcançar, calcule e mostre quantos metros faltam.",
    ],
    criterios: [
      "O programa lê dois valores em metros.",
      "Quando a escada alcança, mostra Alcanca.",
      "Quando não alcança, mostra Faltam: N.NN com duas casas decimais.",
    ],
    extra: "Teste galho e escada com a mesma altura e organize a comparação em uma função.",
  },

];

/** Temporada inicial: poucas missões com histórias fortes. O catálogo completo fica guardado. */
export const MISSOES_EM_CARTAZ = ["gatinho", "cafeteria", "incendio", "nave", "castelo"] as const;

export function missoesEmCartaz(): Missao[] {
  return MISSOES_EM_CARTAZ.map((id) => MISSOES.find((m) => m.id === id)).filter(
    (missao): missao is Missao => Boolean(missao),
  );
}

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

/** As missões são independentes da linguagem; a área só ordena recomendações. */
export function listarMissoes(area: AreaMissao | ""): Missao[] {
  if (!area || area === "Ainda não sei") return MISSOES;
  return [...MISSOES].sort(
    (a, b) => Number(b.areas.includes(area)) - Number(a.areas.includes(area)),
  );
}
