// Áudios do Café de Estudos: arquivos no bucket R2 privado unidunedev-musicas/musics/.
// O Worker expõe apenas GET/HEAD e serve os MP3s por streaming (sem carregar em memória).
const PREFIXO = "musics/";
const CAMINHO_AUDIO = "/audio/musics/";
const NOME_VALIDO = /^[a-zA-Z0-9_-]+\.mp3$/i;

const NOMES = {
  "trilha-1.mp3": "Ocarina",
  "trilha-2.mp3": "Loost wood",
  "cyberpunk.mp3": "Cyberpunk",
  "ninja_focado.mp3": "Ninja focado",
  "noite_solitaria.mp3": "Noite solitária",
};

function nomeDaMusica(arquivo) {
  if (Object.prototype.hasOwnProperty.call(NOMES, arquivo)) return NOMES[arquivo];
  const base = arquivo.replace(/\.mp3$/i, "").replace(/[_-]+/g, " ").trim();
  return base.charAt(0).toLocaleUpperCase("pt-BR") + base.slice(1);
}

function erroMetodo() {
  return new Response("Método não permitido", {
    status: 405,
    headers: { Allow: "GET, HEAD" },
  });
}

async function playlist(request, bucket) {
  if (request.method !== "GET" && request.method !== "HEAD") return erroMetodo();

  const faixas = [];
  let cursor;
  // Lista somente a pasta musics; novas músicas aparecem automaticamente.
  do {
    const pagina = await bucket.list({
      prefix: PREFIXO,
      limit: 1000,
      ...(cursor ? { cursor } : {}),
    });

    for (const objeto of pagina.objects) {
      const arquivo = objeto.key.slice(PREFIXO.length);
      if (!NOME_VALIDO.test(arquivo) || objeto.size === 0) continue;
      faixas.push({
        nome: nomeDaMusica(arquivo),
        arquivo: CAMINHO_AUDIO + encodeURIComponent(arquivo),
      });
    }
    cursor = pagina.truncated ? pagina.cursor : undefined;
  } while (cursor && faixas.length < 500);

  faixas.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=60",
  };
  return new Response(
    request.method === "HEAD" ? null : JSON.stringify({ faixas }),
    { status: 200, headers },
  );
}

function intervalo(range, tamanho) {
  if (!range) return null;
  const partes = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!partes || (!partes[1] && !partes[2]) || tamanho <= 0) return false;

  let inicio;
  let fim;
  if (!partes[1]) {
    const ultimos = Number(partes[2]);
    if (!Number.isSafeInteger(ultimos) || ultimos <= 0) return false;
    inicio = Math.max(0, tamanho - ultimos);
    fim = tamanho - 1;
  } else {
    inicio = Number(partes[1]);
    fim = partes[2] ? Number(partes[2]) : tamanho - 1;
    if (!Number.isSafeInteger(inicio) || !Number.isSafeInteger(fim)) return false;
    fim = Math.min(fim, tamanho - 1);
  }

  if (inicio >= tamanho || fim < inicio) return false;
  return { inicio, fim };
}

async function musica(request, bucket, caminho) {
  if (request.method !== "GET" && request.method !== "HEAD") return erroMetodo();
  let arquivo;
  try {
    arquivo = decodeURIComponent(caminho.slice(CAMINHO_AUDIO.length));
  } catch {
    return new Response("Nome inválido", { status: 400 });
  }

  // Não permitir leitura arbitrária de objetos no bucket.
  if (!NOME_VALIDO.test(arquivo)) return new Response("Não encontrado", { status: 404 });
  const chave = PREFIXO + arquivo;
  const objeto = await bucket.head(chave);
  if (!objeto) return new Response("Música não encontrada", { status: 404 });

  const range = intervalo(request.headers.get("range"), objeto.size);
  if (range === false) {
    return new Response(null, {
      status: 416,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes */${objeto.size}`,
      },
    });
  }

  const parcial = range !== null;
  const tamanho = parcial ? range.fim - range.inicio + 1 : objeto.size;
  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Accept-Ranges": "bytes",
    "Content-Length": String(tamanho),
    "Cache-Control": "public, max-age=86400",
    "ETag": objeto.httpEtag,
    "X-Content-Type-Options": "nosniff",
  });
  if (parcial) {
    headers.set("Content-Range", `bytes ${range.inicio}-${range.fim}/${objeto.size}`);
  }

  if (!parcial && request.headers.get("if-none-match") === objeto.httpEtag) {
    return new Response(null, { status: 304, headers: { ETag: objeto.httpEtag } });
  }
  if (request.method === "HEAD") {
    return new Response(null, { status: parcial ? 206 : 200, headers });
  }

  const dados = await bucket.get(
    chave,
    parcial ? { range: { offset: range.inicio, length: tamanho } } : undefined,
  );
  if (!dados) return new Response("Música não encontrada", { status: 404 });
  return new Response(dados.body, { status: parcial ? 206 : 200, headers });
}

export default {
  async fetch(request, env) {
    const caminho = new URL(request.url).pathname;
    if (!caminho.startsWith("/audio/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      if (caminho === "/audio/playlist.json") {
        return await playlist(request, env.MUSICAS);
      }
      if (caminho.startsWith(CAMINHO_AUDIO)) {
        return await musica(request, env.MUSICAS, caminho);
      }
      return new Response("Não encontrado", { status: 404 });
    } catch (error) {
      console.error("Falha ao acessar o bucket de músicas", error);
      return new Response("Não foi possível carregar as músicas", { status: 503 });
    }
  },
};
