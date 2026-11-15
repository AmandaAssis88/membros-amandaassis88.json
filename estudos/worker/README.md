# Playlist de música via Cloudflare R2

O site de estudos usa o bucket **`unidunedev-musicas`**, com os MP3s dentro de **`musics/`** (atenção à grafia).

## Arquivos existentes

| Objeto R2 | Nome exibido |
| --- | --- |
| `musics/trilha-1.mp3` | Trilha 1 |
| `musics/trilha-2.mp3` | Trilha 2 |
| `musics/cyberpunk.mp3` | Cyberpunk |
| `musics/ninja_focado.mp3` | Ninja focado |
| `musics/noite_solitaria.mp3` | Noite solitária |

O Worker **lista automaticamente** os arquivos `.mp3` dentro dessa pasta. Um arquivo novo (por exemplo `musics/cafe_ao_amanhecer.mp3`) será listado como *Cafe ao amanhecer* sem redeploy, após o cache de catálogo (60 segundos). Não é necessário editar um JSON manualmente.

Somente arquivos com nomes de letras ASCII, números, `_` e `-` são expostos pela rota de áudio.

## Configuração

O arquivo `wrangler.estudos.jsonc` associa `MUSICAS` ao R2. O bucket não precisa ser público:

- `GET /audio/playlist.json` retorna `{"faixas":[{"nome":"...","arquivo":"/audio/musics/..."}]}`.
- `GET /audio/musics/<arquivo>.mp3` entrega streaming do objeto correspondente.
- O endpoint aceita `Range: bytes=...` e devolve `206 Partial Content` para navegar pelo áudio sem baixar o arquivo inteiro.
- Solicitações para outras pastas ou extensões são recusadas.

O mini player obtém a playlist pelo mesmo domínio; ao abrir o site, sorteia uma faixa e tenta tocá-la. A tentativa pode ser bloqueada pelo navegador até uma interação. O áudio continua entre as rotas, e o volume salvo permanece. Evite arquivos sem autorização de distribuição.

## Testar localmente com as músicas reais

Na raiz do repositório:

```powershell
npm install
npm run build:estudos
npx wrangler login
npx wrangler dev -c wrangler.estudos.jsonc
```

O servidor Wrangler normalmente abre em `http://localhost:8787`, mas use a URL mostrada no terminal.

**Importante:** `npm run dev:estudos` inicia somente o Vite. Ele não executa o Worker e não terá a rota `/audio/`; para testar o R2, use o Wrangler como acima.

O binding usa `remote: true` durante desenvolvimento: as leituras acessam o R2 real da conta Cloudflare. Não foi implementada nenhuma operação de exclusão ou escrita no bucket.

## Publicação

O projeto já utiliza:

- Build: `npm run build:estudos`
- Deploy: `npx wrangler deploy -c wrangler.estudos.jsonc`

O Worker continua servindo os arquivos estáticos da SPA normalmente e executa o código personalizado somente para `/audio/*`.

Para acrescentar uma música depois: faça upload de outro MP3 para `musics/` no mesmo bucket. Não é necessário alterar o repositório nem fazer novo build.
