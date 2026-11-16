# Arquitetura do projeto

Este documento é para quem vai manter ou desenvolver os sites da Unidunedev. Para conhecer a comunidade ou participar do primeiro desafio, comece pelo [README principal](../README.md). Para abrir um PR, consulte o [guia de contribuição](../CONTRIBUTING.md).

## Visão geral

O repositório `Unidunedev/onboarding` contém **duas aplicações web independentes**, com o mesmo repositório, mas configurações e builds separados:

| Aplicação | Código principal | Build | Endereço |
| --- | --- | --- | --- |
| Comunidade / onboarding | `src/` | `dist/` | [onboarding.unidunedev.workers.dev](https://onboarding.unidunedev.workers.dev) |
| Café de Estudos | `estudos/` | `dist-estudos/` | [estudos.unidunedev.workers.dev](https://estudos.unidunedev.workers.dev) |

Os dois projetos usam React, TypeScript, Vite e TanStack Router. A comunidade também usa Tailwind CSS, Framer Motion e Zod. O Café de Estudos utiliza CSS próprio e conteúdos em MDX.

```text
onboarding/
├── membros/                    Perfis publicados no mural
├── public/                     Assets do onboarding
├── scripts/validar-membros.mjs Validação dos perfis JSON
├── src/
│   ├── routes/                 Páginas da comunidade
│   ├── components/             Componentes da interface
│   ├── lib/                    Dados, regras e Supabase
│   └── config.ts               Links entre os projetos
├── supabase/migrations/        Migrações versionadas do banco
├── estudos/
│   ├── conteudo/               Aulas em MDX
│   ├── public/                 Assets do Café de Estudos
│   ├── src/
│   │   ├── pages/              Home, trilha e aula
│   │   ├── components/         Componentes de estudo
│   │   ├── cantinho/           Temas e perfil do estudante
│   │   ├── catalogo.ts         Catálogo e ordem das aulas
│   │   └── progresso.ts        Aulas concluídas no navegador
│   └── worker/index.js         Streaming de música via Cloudflare
├── vite.config.ts              Build do onboarding
├── vite.estudos.config.ts      Build do Café de Estudos
└── wrangler.estudos.jsonc      Deploy do Worker de estudos
```

## Comunidade: do formulário ao mural

O fluxo do onboarding envolve duas fontes diferentes:

1. A inscrição feita no formulário é enviada para o **Supabase**, na tabela `inscricoes`.
2. Ao terminar o formulário, o visitante recebe seu perfil em JSON e pode abrir um PR adicionando o arquivo em `membros/<github>.json`.
3. O script `scripts/validar-membros.mjs` confere o formato e o nome dos arquivos. O workflow `.github/workflows/validar-membros.yml` executa essa verificação.
4. Depois do merge, o próximo build inclui os perfis aprovados na pasta `membros/` e os exibe em `/mural`.

**O mural não consulta diretamente as inscrições no Supabase.** A função `loadMembers()` em `src/lib/community.ts` usa `import.meta.glob` para carregar os arquivos JSON publicados.

### Supabase e proteção dos dados

O cliente do Supabase está em `src/lib/supabase.ts`, configurado com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.

A configuração de RLS da tabela de inscrições permite **INSERT** ao papel público, mas não libera leitura, alteração ou exclusão de cadastros pela interface. Uma chamada de resumo (`supabase.rpc("resumo_inscricoes")`, em `src/lib/resumo.ts`) fornece números agregados quando a função estiver disponível no banco.

As informações aprovadas em `membros/*.json` são públicas, já que fazem parte do repositório e do mural. Não confunda esses perfis publicados com os registros privados da tabela `inscricoes`.

**Atenção ao preparar um novo ambiente:** a migração inicial `supabase/migrations/0001_inscricoes.sql` é um registro histórico e não contém necessariamente todas as opções do formulário atual. Confira a compatibilidade entre o esquema implantado, os valores aceitos no formulário e as demais funções SQL antes de reutilizar a migração isoladamente.

## Café de Estudos

As trilhas e suas aulas estão descritas em `estudos/src/catalogo.ts`. O conteúdo didático mora em `estudos/conteudo/`, em arquivos `.mdx`. O site utiliza componentes próprios para blocos de código, exercícios, exemplos, quizzes e outros elementos de aula.

Para criar ou corrigir uma aula, consulte `estudos/README.md`. Ele descreve os componentes disponíveis, a organização das pastas e o cadastro de novas aulas no catálogo.

### Personalização do estudante

O cantinho de estudos fica em `estudos/src/cantinho/`.

- `temas.ts` define os seis estilos, as imagens e as mensagens diárias.
- `cantinho.tsx` mostra o perfil, a frase e o seletor lateral de temas.
- `perfil.ts` procura o username informado entre os JSONs públicos aprovados.
- `cantinho.css` aplica a paleta e a capa à home e à nova faixa.

A busca por username **não é autenticação** e não confirma que o visitante é dono daquela conta. O aluno apenas escolhe qual perfil público quer visualizar.

O usuário não é identificado automaticamente a partir do armazenamento local do onboarding. Os dois sites têm origens diferentes e, portanto, não compartilham diretamente o mesmo `localStorage`.

As preferências do Café de Estudos ficam no navegador de quem está estudando:

| Informação | Chave do `localStorage` |
| --- | --- |
| GitHub escolhido para o card | `unidunedev:estudos:github:v1` |
| Tema do ambiente | `unidunedev:estudos:tema:v1` |
| Aulas marcadas como concluídas | `unidunedev:estudos:concluidas` |

Esses dados não são sincronizados entre dispositivos. O progresso das aulas é gerenciado por `estudos/src/progresso.ts`.

O cabeçalho, o player, o Pomodoro e as animações dos cards das trilhas têm estilos próprios. O sistema de temas altera a ambientação da home e da faixa personalizada, sem reestilizar o cardápio das aulas.

### Música: Worker e R2

O Worker definido em `wrangler.estudos.jsonc` serve o site gerado em `dist-estudos/` e encaminha as rotas de áudio para `estudos/worker/index.js`.

- `/audio/playlist.json` lista os arquivos de música disponíveis.
- `/audio/musics/<arquivo>.mp3` serve os arquivos armazenados no bucket R2 `unidunedev-musicas`, na pasta `musics/`.
- O streaming aceita requisições parciais (`Range`), necessárias para o navegador reproduzir e avançar o áudio sem baixar o arquivo inteiro.

O player React está em `estudos/src/components/mini-player.tsx`. O estado de reprodução fica em um provedor acima das páginas, para a música não parar durante a navegação interna.

## Como rodar localmente

Pré-requisitos: Node.js 22 ou superior e Git.

```bash
git clone https://github.com/Unidunedev/onboarding.git
cd onboarding
npm install
```

Para o site da comunidade:

```bash
npm run dev
```

Para o Café de Estudos:

```bash
npm run dev:estudos
```

O formulário do onboarding precisa de variáveis do Supabase para salvar inscrições. Use `.env.example` como referência e mantenha o arquivo `.env` fora do versionamento.

### Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento do onboarding |
| `npm run dev:estudos` | Desenvolvimento do Café de Estudos |
| `npm run build` | Verificação TypeScript e build do onboarding |
| `npm run build:estudos` | Verificação TypeScript e build do Café de Estudos |
| `npm test` | Testes automatizados |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run validar-membros` | Validação dos perfis do mural |

## CI e publicação

O workflow `.github/workflows/ci.yml` executa lint, testes e builds nos PRs de código. Alterações limitadas a Markdown e arquivos de membros são excluídas desse workflow; os arquivos em `membros/` passam por validação separada.

O site da comunidade é publicado na Cloudflare. O Café de Estudos é um Worker separado, configurado em `wrangler.estudos.jsonc`, com build `npm run build:estudos` e deploy:

```bash
npx wrangler deploy -c wrangler.estudos.jsonc
```

O deploy requer as permissões e os recursos da conta Cloudflare responsável pelo projeto. Não inclua credenciais, tokens de acesso ou dados privados no repositório.

## Onde registrar decisões futuras

Esta documentação guarda o funcionamento do código que está versionado. Planejamento interno, credenciais e anotações pessoais devem ficar em um local privado, fora do repositório público. Quando uma decisão afetar quem contribui ou mantém o projeto, registre aqui apenas a parte necessária para compreender ou operar o sistema.
