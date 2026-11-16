# Como contribuir

Que bom que você quer participar! Não precisa chegar sabendo usar todas as ferramentas. Se esta for sua primeira contribuição no GitHub, comece pelo seu perfil no mural e siga o passo a passo.

## Primeira contribuição: seu perfil

1. Acesse o [site da comunidade](https://onboarding.unidunedev.workers.dev) e preencha sua inscrição.
2. Ao finalizar, copie o JSON do seu perfil.
3. Faça um **fork** do [repositório onboarding](https://github.com/Unidunedev/onboarding).
4. No seu fork, crie um arquivo diretamente na pasta `membros/`. O nome deve ser **seu username do GitHub em minúsculas**, por exemplo `membros/ana-dev.json`.
5. Cole o JSON que o site gerou, faça o commit e abra um Pull Request para a branch `main` do repositório original.
6. Acompanhe os checks e os comentários do PR. Se alguém pedir algum ajuste, você pode corrigir no mesmo PR.

Depois da aprovação e do merge, seu perfil entra no [Mural da galera](https://onboarding.unidunedev.workers.dev/mural) na próxima publicação do site.

Você também pode fazer tudo pelo navegador, sem instalar Git no computador. O [tutorial do primeiro PR](https://onboarding.unidunedev.workers.dev/desafio-pr) mostra o processo; o [ComecePorAqui](https://github.com/Unidunedev/comece-por-aqui) ajuda com os conceitos e comandos.

### Antes de enviar o JSON

- O arquivo fica em `membros/`, **sem criar outra pasta dentro dela**.
- Use o username real do GitHub, em minúsculas e sem `@`, tanto no nome do arquivo quanto no campo `github`.
- Mantenha as informações no formato gerado pelo formulário. Não acrescente campos por conta própria.
- O arquivo `membros/_exemplo.json` serve de referência. Arquivos começando com `_` não aparecem no mural.
- Não edite o perfil de outra pessoa no seu primeiro PR.

Se você estiver rodando o projeto localmente, confira os arquivos com:

```bash
npm run validar-membros
```

Se o check ficar vermelho no GitHub, clique em **Details** e leia a mensagem. Ela costuma indicar o arquivo e o campo que precisam ser corrigidos.

## Também dá para ajudar nas aulas

Encontrou um exemplo confuso, um erro de digitação ou uma explicação que pode ficar mais clara? Pode abrir um PR.

As aulas do Café de Estudos ficam em `estudos/conteudo/`, em arquivos `.mdx`. O guia em [`estudos/README.md`](estudos/README.md) explica como editar uma aula, usar os componentes interativos e adicionar conteúdos ao catálogo.

Os desafios práticos com correção automática ficam no repositório [Unidunedev/estudos](https://github.com/Unidunedev/estudos).

## Para contribuir com código

Se você quiser mexer no site da comunidade ou no Café de Estudos, primeiro rode o projeto na sua máquina.

Você precisa de [Git](https://git-scm.com) e [Node.js 22 ou superior](https://nodejs.org).

```bash
git clone https://github.com/SEU-USUARIO/onboarding.git
cd onboarding
npm install
npm run dev
```

O comando `npm run dev` abre o site da comunidade. Para abrir o Café de Estudos, use `npm run dev:estudos`.

O cadastro do onboarding depende das variáveis indicadas em `.env.example`; o restante da interface pode ser desenvolvido sem credenciais reais do banco. Nunca envie seu `.env`, senhas ou chaves privadas em um PR.

### Antes de abrir um PR de código

- Crie uma branch para a sua mudança e tente manter o PR focado em um único assunto.
- Explique, com suas palavras, o que mudou e como você testou.
- Confira o comportamento no celular quando alterar a interface.
- Execute os checks que fazem sentido para sua mudança:

```bash
npm run lint
npm test
npm run build
npm run build:estudos
```

O CI também executa lint, testes e builds para alterações de código. Se algo falhar, consulte o log antes de pedir revisão.

## Revisões são parte do processo

É normal receber sugestões. Um PR é uma conversa sobre código, não uma prova de que você já sabe tudo.

Se não entendeu um comentário, pergunte. Se descobriu uma solução melhor, explique. Estamos aqui para aprender uns com os outros.

Para entender o papel de cada pasta ou como os serviços se conectam, consulte a [documentação de arquitetura](docs/ARQUITETURA.md).
