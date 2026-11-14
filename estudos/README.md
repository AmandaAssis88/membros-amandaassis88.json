# Site de estudos ☕

O site [estudos.unidunedev.workers.dev](https://estudos.unidunedev.workers.dev): introduções "pegando na mão" de fundamentos, lógica, C, Python e Java. Os desafios com correção automática ficam no repositório [estudos](https://github.com/unidunedev/estudos).

Ele mora aqui no repositório do onboarding para reaproveitar a logo e o visual, mas é um app separado.

## Rodando

```bash
npm install
npm run dev:estudos     # abre o site em modo de desenvolvimento
npm run build:estudos   # gera a pasta dist-estudos/
```

## Organização

```
estudos/
├── conteudo/               # as aulas (.mdx), nas mesmas pastas do repositório estudos
│   ├── fundamentos/
│   ├── disciplinas/logica/
│   ├── linguagens/{c,python,java}/
│   └── profissoes/{produto,front-end,back-end,mobile,devops,ui-ux,qa}/
└── src/
    ├── catalogo.ts         # trilhas, ordem das aulas, títulos e tempos
    ├── components/         # código com Copiar/Testar, Faça você mesmo, Quiz, Memória...
    └── pages/              # início (cardápio), trilha e aula
```

## Escrevendo ou corrigindo uma aula

1. Edite (ou crie) o `.mdx` em `estudos/conteudo/<pasta>/`. É Markdown normal, com alguns componentes:
   - blocos de código com a linguagem: ` ```c `, ` ```python `, ` ```java `, ` ```pseudo `, ` ```saida ` (saída do terminal) e ` ```terminal `. Programas completos ganham o botão **Testar** (abre o OnlineGDB). Em Java, use `public class Main`.
   - `<Nota tipo="dica|cuidado|curiosidade|analogia|ia">...</Nota>`
   - `<Tarefa titulo="...">` com `<Dica>` e `<Resposta>` dentro
   - `<Quiz pergunta="..." opcoes={["a", "b"]} correta={0} explicacao="..." />`
   - `<Memoria celulas={[{ nome: "x", tipo: "int", valor: "5", endereco: "0x10" }]} />`
   - `<Passos itens={[{ icone: "📝", titulo: "Código", texto: "..." }]} />`
   - `<Abas>` com `<Aba rotulo="C">...</Aba>` para o mesmo exemplo em várias linguagens
   - `<Camadas destaque="back-end" />`: o mapa do produto com uma camada acesa (`usuario`, `front-end`, `mobile`, `internet`, `back-end`, `banco`, `ui-ux`, `devops`, `qa` ou sem destaque)
   - `<Linguagens ids={["java", "dart"]} />`: chips de linguagens. Se existir uma trilha com o mesmo id, o chip vira link sozinho (a lista fica em `src/linguagens.ts`)
   - `<Roadmap etapas={[{ titulo: "...", tempo: "1 mês", itens: ["..."], linguagens: ["python"] }]} />`
   - ` ```python-exemplo `: realça como Python, mas sem o botão Testar (para código que precisa de bibliotecas que o OnlineGDB não tem)
2. Aula nova? Adicione uma linha em `src/catalogo.ts`. O teste `catalogo.test.ts` avisa se faltar algo.
   Trilhas de profissões também aceitam `cursos: [{ titulo, url, texto }]`, que aparecem no fim da última aula.
3. Cuidado no texto fora de código: `{`, `}` e `<` têm significado especial no MDX. Coloque entre crases.
4. Abra o PR. A Cloudflare gera uma prévia do site para revisar antes do merge.

## Deploy (Cloudflare)

É um segundo Worker ligado a este mesmo repositório:

- **Build command:** `npm run build:estudos`
- **Deploy command:** `npx wrangler deploy -c wrangler.estudos.jsonc`
- Nome do Worker: `estudos` → endereço `estudos.unidunedev.workers.dev`
