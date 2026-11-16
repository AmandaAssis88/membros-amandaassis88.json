# Missões da Comunidade — Desafio 2

> Planejamento e implementação inicial em desenvolvimento na branch `feat/missoes-desafio-2`. **Não publicar antes da revisão e da liberação da comunidade.**

## Ideia

A Unidunedev ensina programação por meio de **pequenos problemas com história**. Em vez de pedir apenas "faça uma calculadora", o estudante encontra uma cena fofa e animada: uma estação de bombeiros, uma cafeteria, um castelo, uma nave. Ele vê quem precisa de ajuda, descobre os conceitos e aceita resolver o problema.

O objetivo é despertar curiosidade, não criar competição ou pressão por produtividade. Cada missão traz:

- história e personagem;
- problema em linguagem simples;
- projeto construído pelo aluno;
- linguagem e conceitos;
- roteiro em etapas;
- critérios para verificar o próprio programa;
- desafio extra opcional.

As cenas são ilustrações SVG criadas dentro do projeto, com movimentos em CSS (fogo, água, vapor, estrelas, personagens), respeitando a preferência do sistema por reduzir movimento.

## Catálogo inicial

Todas as **12 missões aceitam C, Python e Java**. A linguagem é escolhida na página de detalhes, e as pistas mudam de acordo com ela. Cada problema tem um núcleo básico verificável e uma evolução opcional.

| Missão | Projeto central | Progressão sugerida |
| --- | --- | --- |
| 🚒 Apague o incêndio | Calculadora de água | Variáveis e operações |
| ☕ Salve a cafeteria | Conta dos pedidos | Laços e funções |
| 🐾 Ajude o abrigo | Cadastro de animais | Classes ou structs |
| 🚀 Lance a nave | Combustível | Condições e decimais |
| 🧪 Organize o laboratório | Registro e arquivo local | Coleções e arquivos |
| 🏰 Proteja o castelo | Inventário | Classes, métodos ou structs |
| 🌊 Acenda o farol | Autonomia de bateria | Divisão e validação |
| 📚 Biblioteca encantada | Empréstimos e devoluções | Dados e estado |
| 🤖 Conserte o robô | Entregas | Modelagem de dados |
| 🌙 Jardim da Lua | Controle de irrigação | Coleções e somas |
| ✨ Feira das estrelas | Caixa e troco | Descontos e condições |
| 🐧 Encontre o pinguim | Quiz no terminal | Loops e pontuação |

Não exigir orientação a objetos para um aluno que ainda não conhece variáveis. Aulas de **POO** poderão entrar no Café de Estudos futuramente; por enquanto, os alunos podem avançar das trilhas existentes para as missões adequadas ao nível.

C não possui classes/herança nativas. Para modelagem com C, ensinaremos `struct`, funções e composição de dados. Em Python e Java, podemos propor uma hierarquia simples de classes como desafio **extra** em algumas missões avançadas.

## Jornada proposta

1. O visitante vê **Desafio 1** (primeiro PR, perfil no mural) e **Desafio 2** (projetos de programação) no mesmo lugar.
2. A participação no Desafio 2 não exige concluir o Desafio 1: o primeiro continua disponível para quem quiser entrar no mural.
3. O visitante escolhe uma área de interesse (Front-end, Back-end, Mobile etc.). Isso **não restringe** os projetos; apenas prioriza recomendações.
4. O aluno escolhe uma das 12 histórias e, na página da missão, escolhe C, Python ou Java. A linguagem altera as orientações e as pistas, não quais missões estão disponíveis.
5. O aluno abre uma missão, entende a história, as etapas e os critérios.
6. Ele pode marcar **Quero ajudar nesta missão**, salvando somente sua escolha no `localStorage`.
7. Constrói por conta própria um projeto pequeno, cria um arquivo na pasta de soluções do repositório `Unidunedev/estudos` e envia um PR. A liderança revisa o código.

### Estado atual da implementação

- Hub de missões: `/missoes`.
- Página compartilhável de cada projeto: `/missoes/<id>`.
- Catálogo: `src/lib/missoes.ts`.
- Orientações por linguagem: `src/lib/orientacoes-missoes.ts` (36 combinações com três pistas graduais).
- Hub permite somente C, Python e Java; outras linguagens aparecerão depois de terem trilhas disponíveis.
- Arte SVG: `src/components/cena-missao.tsx`.
- Animações e estilos: `src/styles-missoes.css`.
- Persistência local: `unidunedev:missoes:escolhas:v1`.
- **Não existe registro de inscrição, entrega automática nem reserva de vaga no servidor** nesta fase.
- O perfil da comunidade é utilizado apenas para uma saudação local quando já há um passaporte salvo no navegador.
- Não há integração com o WhatsApp nesta versão porque os links ainda serão fornecidos.

## Entrega no repositório de estudos

Estrutura em preparação na branch [`feat/desafio-2-missoes`](https://github.com/Unidunedev/estudos/tree/feat/desafio-2-missoes) do repositório **Unidunedev/estudos**.

- Cada uma das 12 missões tem uma pasta em `disciplinas/missoes/desafios/NN-identificador/`.
- Cada pasta possui `README.md`, três pares `testes/entradaN.txt` + `testes/saidaN.txt` e `solucoes/.gitkeep`.
- O aluno faz fork e clone do repositório de estudos, cria uma branch, coloca seu arquivo `seu-username.c`, `seu-username.py` ou `seu-username.java` em `solucoes/`, testa localmente e envia PR.
- O workflow de correção existente em `Unidunedev/estudos` já reconhece `.c`, `.py` e `.java` em disciplinas, valida o username do arquivo e compara as saídas.
- **O robô verifica o contrato mínimo de entrada/saída**, não a qualidade completa da modelagem, persistência de dados, organização em classes ou a criatividade do programa. Essa parte precisa de revisão humana.
- A página de detalhes no onboarding explica o fluxo, mas mostra um aviso de **não enviar PR antes do lançamento**.
- O código da solução é a evidência; selecionar uma missão no navegador **não prova a conclusão**.

### Recompensa futura: álbum de conquistas

Proposta: criar um álbum visual das missões, com uma imagem para cada história (cena em problema → cena resolvida) e um **selo associado a um PR aprovado e integrado**, linkável ao arquivo da solução.

Princípios:
1. Conquista de participação por missão concluída, **não ranking de velocidade**.
2. Selo entregue após uma contribuição aprovada no repositório de estudos, e não após clicar em um botão.
3. Mostrar linguagem e conceitos que a pessoa praticou e um link público para seu código.
4. Possibilidade de refazer a missão em outra linguagem e ganhar uma variação da conquista.
5. Para conectar as soluções aprovadas do outro repositório ao onboarding, planejar um manifesto público gerado a partir dos arquivos integrados ou uma sincronização segura. **Ainda não implementado**.
6. Só mostrar avatares e dados públicos de perfis com consentimento adequado. Nenhuma cobrança por estudar no próprio ritmo.

## Próximas fases — esquadrões

Os projetos iniciais podem ser feitos individualmente; não exigir equipe antes de a pessoa se sentir confortável.

Para missões futuras, a comunidade poderá formar grupos de **3 a 4 pessoas**, com nomes próprios, por exemplo **Fox**, **Zeus**, e outros criados pelos alunos.

Os cards dos esquadrões poderão mostrar:

- nome e identidade visual da equipe;
- missão/projeto e área de interesse;
- capacidade e vagas restantes reais;
- avatares de quem optou por tornar sua participação visível;
- botão **Quero participar** quando houver vaga;
- convite oficial de WhatsApp cadastrado pela liderança.

### Regras antes de implementar a parte em tempo real

1. Salvar equipes, membros e vagas no servidor, com autenticação e autorização adequadas.
2. Evitar dupla ocupação da última vaga com uma **operação transacional** no banco; o estado local do navegador não basta.
3. Exigir consentimento para participar e esclarecer que o WhatsApp pode revelar o número de telefone aos integrantes.
4. Distinguir **vaga reservada na plataforma** de **entrada confirmada no WhatsApp**: abrir o link não comprova adesão.
5. A liderança precisa poder revisar e aprovar equipes, configurar capacidade, abrir/fechar inscrições e gerenciar convites.
6. Não expor links privados de WhatsApp, dados pessoais ou contagens fictícias no cliente.
7. Considerar fila de espera, desistência, troca de equipe e formas de denunciar abuso.
8. Regras do desafio devem dizer se a tarefa é individual, em dupla ou equipe.

## Evolução pedagógica

- **Desafio 1:** participar da comunidade e fazer o primeiro PR.
- **Desafio 2:** escolher uma pequena missão de linguagem e publicá-la no GitHub.
- **Desafio 3:** melhorar um projeto, trabalhar com testes, novas regras ou colaboração.
- **Desafio 4+:** projetos por carreira, equipes, integração de funcionalidades e campanhas.

Novas missões devem contar com animações leves e acessíveis, humor visual e explicações claras. Futuramente podemos acrescentar checkpoints e perguntas interativas durante o roteiro, sem oferecer respostas prontas logo de início.

## Checklist para a liberação

- [ ] Conferir os 12 cenários em desktop e no celular.
- [ ] Testar a navegação: home → missões → detalhes → voltar.
- [ ] Validar seleção de área, linguagem e escolha persistida.
- [ ] Conferir acessibilidade por teclado e `prefers-reduced-motion`.
- [ ] Revisar o texto e a dificuldade de cada missão.
- [ ] Conferir testes, lint e build do onboarding.
- [ ] Confirmar com a liderança o anúncio e a data de liberação.
- [ ] Só então integrar a branch e publicar na Cloudflare.

**A branch, por si só, não altera o site público.**
