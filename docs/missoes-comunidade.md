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

**Identidade atual:** voltou ao jeito da votação do onboarding e ao Café de Estudos. A escolha acontece num **palco de história por vez**, com SVG próprio, vapor, pequenas luzes e movimento delicado. As antigas capas WebP foram removidas do pacote da branch para manter o site leve; o protótipo anterior permanece no histórico do Git. O visual respeita `prefers-reduced-motion`.

## Temporada de estreia

A vitrine inicial mostra **cinco histórias**, com mais cuidado visual e pedagógico. O restante do catálogo está preservado para temporadas futuras; não é exibido na seleção principal. Todas aceitam C, Python e Java, e as pistas mudam conforme a linguagem.

**Em cartaz:** Salve o gatinho, Salve a cafeteria, Apague o incêndio, Lance a nave e Proteja o castelo.

**Nova missão — Salve o gatinho:** Mingau está numa árvore; o aluno ajuda a equipe de resgate a comparar a altura do galho com o alcance da escada, praticando variáveis, condições e operações.

| Missão                    | Projeto central          | Progressão sugerida         |
| ------------------------- | ------------------------ | --------------------------- |
| 🚒 Apague o incêndio      | Calculadora de água      | Variáveis e operações       |
| ☕ Salve a cafeteria      | Conta dos pedidos        | Laços e funções             |
| 🐾 Ajude o abrigo         | Cadastro de animais      | Classes ou structs          |
| 🚀 Lance a nave           | Combustível              | Condições e decimais        |
| 🧪 Organize o laboratório | Registro e arquivo local | Coleções e arquivos         |
| 🏰 Proteja o castelo      | Inventário               | Classes, métodos ou structs |
| 🌊 Acenda o farol         | Autonomia de bateria     | Divisão e validação         |
| 📚 Biblioteca encantada   | Empréstimos e devoluções | Dados e estado              |
| 🤖 Conserte o robô        | Entregas                 | Modelagem de dados          |
| 🌙 Jardim da Lua          | Controle de irrigação    | Coleções e somas            |
| ✨ Feira das estrelas     | Caixa e troco            | Descontos e condições       |
| 🐧 Encontre o pinguim     | Quiz no terminal         | Loops e pontuação           |

Não exigir orientação a objetos para um aluno que ainda não conhece variáveis. Aulas de **POO** poderão entrar no Café de Estudos futuramente; por enquanto, os alunos podem avançar das trilhas existentes para as missões adequadas ao nível.

C não possui classes/herança nativas. Para modelagem com C, ensinaremos `struct`, funções e composição de dados. Em Python e Java, podemos propor uma hierarquia simples de classes como desafio **extra** em algumas missões avançadas.

## Jornada proposta

1. Ao entrar em `/missoes`, o visitante encontra uma **tela inicial cinematográfica com dois caminhos**: **Desafio 1** (primeiro PR, perfil no mural) e **Desafio 2** (primeiro projeto).
2. A participação no Desafio 2 não exige concluir o Desafio 1; cada card leva ao seu fluxo. O visitante pode voltar e trocar de desafio.
3. Ao escolher Desafio 2, vê **uma história de cada vez**, com palco SVG, setas e uma pequena faixa com cinco opções.
4. Escolhe C, Python ou Java em outra etapa, podendo indicar uma área de interesse opcional. A área **não restringe** os projetos.
5. Confirma a missão; somente nesse momento a escolha é gravada em `localStorage`. Ela ainda não conta como conclusão.
6. Abre a página individual, com história, passos, três pistas e um **código inicial copiável** para a linguagem escolhida.
7. O código inicial lê alguns dados do enunciado e contém comentários `TODO`, mas **não calcula ou imprime a resposta**. Para outras missões fora da estreia, há um esqueleto genérico.
8. Quando a temporada for oficialmente aberta para entregas, o aluno cria seu arquivo em `Unidunedev/estudos` e envia PR. A liderança revisa o código.

### Estado atual da implementação

- Hub de missões: `/missoes`.
- Página compartilhável de cada projeto: `/missoes/<id>`.
- Catálogo: `src/lib/missoes.ts`.
- Orientações por linguagem: `src/lib/orientacoes-missoes.ts` (39 combinações de 13 histórias com três pistas graduais).
- Hub permite somente C, Python e Java; outras linguagens aparecerão depois de terem trilhas disponíveis.
- Palco SVG: `src/components/cena-palco-missao.tsx` com cena inédita do gatinho; outras quatro reutilizam os SVGs do projeto.
- Etapas de seleção: `src/routes/missoes/index.tsx`.
- Modelos de código inicial: `src/lib/codigos-iniciais.ts` e testes em `src/lib/codigos-iniciais.test.ts`.
- Botão de copiar código: `src/routes/missoes/$slug.tsx`, com formatação responsiva em `src/styles-missoes.css`.
- Estilos do palco, microanimações e responsividade: `src/styles-missoes-cinema.css`.
- `src/styles-missoes.css` mantém os blocos didáticos das páginas de detalhe.
- Capas WebP e componentes anteriores foram retirados da versão atual; a seleção agora depende apenas de SVG/CSS.
- Persistência local: `unidunedev:missoes:escolhas:v1`.
- **Não existe registro de inscrição, entrega automática nem reserva de vaga no servidor** nesta fase.
- A seleção não depende de perfil cadastrado; o Desafio 1 tem seu próprio card na primeira tela e leva à rota `/desafio-pr`.
- Não há integração com o WhatsApp nesta versão porque os links ainda serão fornecidos.

## Entrega no repositório de estudos

As 12 missões originais já estão na `main` do repositório **Unidunedev/estudos**. A missão nova do gatinho foi preparada **separadamente**, em [`feat/missao-gatinho-desafio-2`](https://github.com/Unidunedev/estudos/tree/feat/missao-gatinho-desafio-2), sem PR ou merge.

- As 12 missões anteriores mantêm seus caminhos originais em `disciplinas/missoes/desafios/NN-identificador/`; o gatinho entra como `13-gatinho`, sem renumerar ou quebrar as anteriores.
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
