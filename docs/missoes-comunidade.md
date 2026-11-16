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

| Missão | Projeto | Linguagem | Conceitos |
| --- | --- | --- | --- |
| 🚒 Apague o incêndio | Calculadora de consumo de água | C | variáveis, operações, saída |
| ☕ Salve a cafeteria | Menu de pedidos | Python | listas, condicionais, laços |
| 🐾 Ajude o abrigo | Cadastro de animais | Java | classes, objetos, listas |
| 🚀 Lance a nave | Cálculo de combustível | C | float, if, cálculos |
| 🧪 Organize o laboratório | Cadastro de experimentos em JSON | Python | funções, listas, persistência |
| 🏰 Proteja o castelo | Inventário de suprimentos | Java | classes, métodos, validação |
| 🌊 Acenda o farol | Autonomia de bateria | JavaScript | DOM, eventos, operações |
| 📚 Biblioteca encantada | Catálogo e empréstimo de livros | Python | listas, dicionários, arquivos |
| 🤖 Conserte o robô | Gerenciador de entregas | Java | classes, listas, estado |
| 🌙 Jardim da Lua | Controle de irrigação | JavaScript | arrays, objetos, DOM |
| ✨ Feira das estrelas | Caixa e troco | C | scanf, operadores, condicionais |
| 🐧 Encontre o pinguim | Quiz de perguntas | JavaScript | arrays, estado, eventos |

## Jornada proposta

1. O visitante vê **Desafio 1** (primeiro PR, perfil no mural) e **Desafio 2** (projetos de programação) no mesmo lugar.
2. A participação no Desafio 2 não exige concluir o Desafio 1: o primeiro continua disponível para quem quiser entrar no mural.
3. O visitante escolhe uma área de interesse (Front-end, Back-end, Mobile etc.). Isso **não restringe** os projetos; apenas prioriza recomendações.
4. Pode filtrar por linguagem: C, Python, Java, JavaScript.
5. O aluno abre uma missão, entende a história, as etapas e os critérios.
6. Ele pode marcar **Quero ajudar nesta missão**, salvando somente sua escolha no `localStorage`.
7. Constrói por conta própria um projeto pequeno, publica em seu GitHub e escreve um README do código.

### Estado atual da implementação

- Hub de missões: `/missoes`.
- Página compartilhável de cada projeto: `/missoes/<id>`.
- Catálogo: `src/lib/missoes.ts`.
- Arte SVG: `src/components/cena-missao.tsx`.
- Animações e estilos: `src/styles-missoes.css`.
- Persistência local: `unidunedev:missoes:escolhas:v1`.
- **Não existe registro de inscrição, entrega automática nem reserva de vaga no servidor** nesta fase.
- O perfil da comunidade é utilizado apenas para uma saudação local quando já há um passaporte salvo no navegador.
- Não há integração com o WhatsApp nesta versão porque os links ainda serão fornecidos.

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
