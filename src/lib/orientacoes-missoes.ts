import type { LinguagemMissao } from "./missoes";

export type OrientacaoLinguagem = {
  descricao: string;
  pistas: readonly string[];
  pontoDePartida: string;
};

/**
 * Pistas sobre COMO começar, nunca um programa pronto.
 * As três linguagens resolvem o MESMO problema; a organização do código pode variar.
 */
const ORIENTACOES: Record<string, Record<LinguagemMissao, readonly string[]>> = {
  gatinho: {
    c: [
      "Você pode guardar as alturas em variáveis do tipo double e usar scanf para receber os valores.",
      "Uma condição compara o alcance da escada com a altura do galho; cuidado com o caso em que são iguais.",
      "Para exibir metros com duas casas, procure como usar %.2f em printf.",
    ],
    python: [
      "Comece recebendo os dois valores com input e convertendo-os em números decimais.",
      "Pense em uma condição para quando o alcance da escada for suficiente e outra para quando faltar altura.",
      "Experimente usar uma f-string para imprimir apenas a diferença com duas casas decimais.",
    ],
    java: [
      "Scanner pode ler as duas alturas e double permite trabalhar com medidas decimais.",
      "Uma condição pode comparar o alcance e a altura sem exigir várias classes.",
      "Use System.out.printf com um formato de duas casas e Locale.US quando necessário.",
    ],
  },
  incendio: {
    c: [
      "Comece identificando quais dados o operador digita e qual valor o programa deve exibir.",
      "Considere float ou double para valores de vazão e tempo; lembre de conferir se scanf leu os dados.",
      "Se o código ficar longo, coloque o cálculo em uma função que recebe os valores.",
    ],
    python: [
      "Use input para receber a vazão e o tempo. Lembre que ele devolve texto e precisa converter números.",
      "Mostre os litros com f-string e confira a unidade na saída.",
      "Experimente organizar a conta numa função pequena.",
    ],
    java: [
      "Leia os números com Scanner dentro de main e guarde-os em double.",
      "Pense na diferença entre os valores informados e o total que o programa vai mostrar.",
      "O desafio funciona com uma classe Main simples; crie um método de cálculo se quiser praticar organização.",
    ],
  },
  cafeteria: {
    c: [
      "Um menu no terminal pode ser feito com números para representar cada bebida.",
      "Você pode guardar os preços em um vetor e pedir a quantidade de cada item.",
      "Use um laço para permitir novos pedidos até o cliente escolher finalizar.",
    ],
    python: [
      "Comece com uma lista de produtos e seus preços; dicionário também é uma boa opção.",
      "Use input, laço while e uma escolha para representar o momento de fechar a conta.",
      "Se perceber repetição de código, extraia uma função de cálculo.",
    ],
    java: [
      "Você pode começar com um array de preços e um Scanner para ler as escolhas.",
      "Use while para manter o menu ativo e if ou switch para conferir o produto.",
      "Não precisa criar herança: uma classe Main com métodos simples já é suficiente.",
    ],
  },
  abrigo: {
    c: [
      "Pense em uma struct Animal que reúna nome, espécie e idade.",
      "Guarde vários animais em um vetor de structs e use um laço para procurar pelo nome.",
      "A comparação de textos em C precisa de cuidado; pesquise strcmp da biblioteca string.h.",
    ],
    python: [
      "Uma classe Animal pode reunir os dados de cada bichinho; também é possível começar com dicionários.",
      "Guarde os cadastros em uma lista e procure percorrendo os itens.",
      "Se quiser praticar orientação a objetos, crie um método que formata os dados do animal.",
    ],
    java: [
      "Modele Animal como uma classe simples com nome, espécie e idade.",
      "Use ArrayList para guardar os animais; pense em como percorrer a lista com um laço.",
      "O bônus de herança é opcional: primeiro faça o cadastro funcionar com uma classe.",
    ],
  },
  nave: {
    c: [
      "Separe distância, consumo por quilômetro e combustível disponível em variáveis.",
      "Use tipos decimais e uma condição para comparar necessidade e disponibilidade.",
      "Teste com tanque exatamente suficiente e com tanque menor que o necessário.",
    ],
    python: [
      "Use float para os valores de combustível e distância.",
      "O if pode escolher entre uma mensagem de decolagem autorizada e outra de reabastecimento.",
      "Experimente dividir entrada, cálculo e exibição em funções.",
    ],
    java: [
      "Um Scanner pode ler os números no terminal; double serve para trabalhar com decimais.",
      "Coloque a verificação de combustível numa condição simples.",
      "Você não precisa de várias classes para esta missão; uma classe com métodos está ótima.",
    ],
  },
  laboratorio: {
    c: [
      "Uma struct Experimento pode guardar identificador, data e descrição curta.",
      "Comece armazenando os dados em memória, depois estude fopen, fprintf, fgets e fclose.",
      "Você pode usar um arquivo de texto simples; JSON não é obrigatório em C.",
    ],
    python: [
      "Dicionários ou pequenas classes podem representar experimentos.",
      "O módulo json ajuda a salvar e carregar uma lista de registros.",
      "Antes de ler um arquivo, pense em como seu programa vai lidar com o caso de ele ainda não existir.",
    ],
    java: [
      "Crie uma classe Experimento com poucos campos e uma lista para armazenar os registros.",
      "Para começar, salvar texto simples com Files é mais fácil que implementar um parser JSON.",
      "Confira o que deve acontecer quando não existir arquivo na primeira execução.",
    ],
  },
  castelo: {
    c: [
      "Crie uma struct Item com nome e quantidade atual.",
      "Organize as operações de entrada e retirada em funções que recebem o item e a quantidade.",
      "Pense em como impedir uma retirada maior que o estoque sem deixar valores negativos.",
    ],
    python: [
      "Uma classe Item com atributo quantidade e métodos pode organizar o estoque.",
      "Diferencie adicionar, retirar e listar: cada responsabilidade deve ficar clara.",
      "A herança é um bônus: uma classe ItemPerecivel pode acrescentar uma informação à classe Item.",
    ],
    java: [
      "Use uma classe Item e métodos que alterem o estoque de forma controlada.",
      "Prefira validar a quantidade antes de atualizar o atributo.",
      "Para o bônus, experimente uma classe ItemPerecivel que estenda Item, sem exagerar na hierarquia.",
    ],
  },
  farol: {
    c: [
      "Leia dois valores numéricos e confira se o gasto por hora é maior que zero.",
      "Escolha float ou double se precisar de horas com casas decimais.",
      "Tente imprimir uma mensagem clara para uma entrada inválida em vez de dividir por zero.",
    ],
    python: [
      "Separe o momento de converter a entrada de texto e o momento de calcular.",
      "Uma condição pode impedir divisão por zero.",
      "Apresente a autonomia com a unidade horas, usando f-string.",
    ],
    java: [
      "Use Scanner para ler energia e consumo por hora; double é uma boa escolha.",
      "Uma condição antes da divisão impede valores inválidos.",
      "Imprima a autonomia de forma legível, sem exigir classes extras.",
    ],
  },
  biblioteca: {
    c: [
      "Uma struct Livro pode reunir título, autor e uma marcação de emprestado.",
      "Use um vetor para guardar os livros e funções para realizar empréstimo e devolução.",
      "Para procurar pelo título, pesquise comparação de strings em C.",
    ],
    python: [
      "Uma lista de livros pode guardar dicionários ou instâncias de uma classe Livro.",
      "Faça funções distintas para listar, emprestar e devolver.",
      "Pense em como avisar quando o livro não existir ou já estiver emprestado.",
    ],
    java: [
      "Experimente uma classe Livro e um ArrayList para o catálogo.",
      "Métodos de empréstimo e devolução podem alterar a disponibilidade do livro.",
      "Só depois de funcionar em memória pense em salvar os registros em arquivo.",
    ],
  },
  robo: {
    c: [
      "Use uma struct Entrega para guardar destino e situação.",
      "Um vetor permite registrar várias entregas; funções podem marcar uma tarefa como concluída.",
      "Defina antes quais estados você vai aceitar para não criar situações confusas.",
    ],
    python: [
      "Uma classe Entrega com um atributo de situação pode simplificar a organização.",
      "Guarde as entregas numa lista e altere a situação de uma delas.",
      "Use um filtro ou laço separado para mostrar as tarefas que ainda faltam.",
    ],
    java: [
      "Uma classe Entrega pode ter destino e situação; use ArrayList para manter a lista.",
      "Um método concluir pode atualizar o estado de um objeto escolhido.",
      "Se quiser herança como bônus, diferencie tipos de tarefa, mas primeiro termine o gerenciador básico.",
    ],
  },
  jardim: {
    c: [
      "Uma struct Planta pode guardar nome e necessidade diária de água.",
      "Use um vetor para armazenar várias plantas e um laço para somar os consumos.",
      "Organize o cálculo em função se quiser praticar modularização.",
    ],
    python: [
      "Represente cada planta com um dicionário ou uma classe simples.",
      "Uma lista guarda os cadastros e um laço percorre as necessidades de água.",
      "Mostre a unidade usada para a água: litros por dia, por exemplo.",
    ],
    java: [
      "Uma classe Planta pode guardar nome e consumo; uma lista reúne as plantas.",
      "Percorra a coleção para obter o total de água.",
      "O desafio não precisa de interface gráfica nem de banco de dados.",
    ],
  },
  feira: {
    c: [
      "Use variáveis decimais para preço, desconto e valor pago.",
      "Pense em como transformar um percentual informado em uma parcela do subtotal.",
      "Confira o caso em que o dinheiro entregue não cobre a compra.",
    ],
    python: [
      "Use float para os preços e converta o valor de entrada antes de fazer contas.",
      "Separe subtotal, desconto e pagamento em etapas claras.",
      "Uma função de formatação pode deixar os valores com duas casas.",
    ],
    java: [
      "Use double para os valores monetários deste exercício introdutório e Scanner para as entradas.",
      "Organize o cálculo por etapas e use uma condição para verificar o pagamento.",
      "Para aplicações financeiras reais, você estudará BigDecimal; aqui o foco é a lógica básica.",
    ],
  },
  pinguim: {
    c: [
      "Crie perguntas com alternativas numeradas e registre a opção escolhida.",
      "Um vetor pode guardar as respostas corretas; um laço ajuda a repetir as rodadas.",
      "A pontuação pode começar em zero e mudar a cada resposta correta.",
    ],
    python: [
      "Uma lista de dicionários pode organizar enunciados, opções e respostas.",
      "Percorra as perguntas e compare a escolha do participante com a alternativa correta.",
      "No final, exiba acertos sem mostrar todas as respostas antes da tentativa.",
    ],
    java: [
      "Use arrays ou ArrayList para organizar as perguntas e Scanner para as respostas.",
      "Um laço percorre as questões e a pontuação aumenta em caso de acerto.",
      "Se quiser ir além, modele Pergunta como uma classe. Não é obrigatório.",
    ],
  },
};

const POR_LINGUAGEM: Record<LinguagemMissao, { descricao: string; pontoDePartida: string }> = {
  c: {
    descricao:
      "Em C, você começa com variáveis, funções e entrada/saída no terminal. Para organizar dados relacionados, use struct e funções: C não tem classes nem herança nativas.",
    pontoDePartida:
      "Relembre stdio.h, printf, scanf, if e for. Quando a missão crescer, separe uma função de cada vez.",
  },
  python: {
    descricao:
      "Em Python, você pode começar com funções, listas e dicionários. Quando o projeto pedir registros com comportamento, experimente uma classe simples.",
    pontoDePartida:
      "Relembre input, print, if, for e funções. Se a missão pedir objetos, avance para as aulas de classes.",
  },
  java: {
    descricao:
      "Em Java, tudo começa dentro de uma classe. Você pode resolver problemas básicos em Main e avançar para classes de domínio e pequenos métodos quando fizer sentido.",
    pontoDePartida:
      "Relembre Scanner, tipos, if, loops e métodos. Se precisar representar registros, use classes e coleções.",
  },
};

export function orientacaoDaMissao(id: string, linguagem: LinguagemMissao): OrientacaoLinguagem {
  const base = POR_LINGUAGEM[linguagem];
  return {
    ...base,
    pistas: ORIENTACOES[id]?.[linguagem] ?? [
      "Leia o enunciado e anote quais informações entram e saem do programa.",
      "Monte uma versão simples antes de adicionar funcionalidades extras.",
      "Teste resultados esperados e entradas inválidas.",
    ],
  };
}
