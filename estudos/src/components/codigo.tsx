import { useState } from "react";
import { Check, Copy, Play } from "lucide-react";
import { destacar } from "../destaque";
import { NOME_DO_TESTADOR, TESTAR_URL, type LinguagemTestavel } from "../catalogo";

const ROTULOS: Record<string, string> = {
  c: "C",
  python: "Python",
  java: "Java",
  pseudo: "Pseudocódigo",
  saida: "Saída no terminal",
  terminal: "Terminal",
  texto: "Texto",
  javascript: "JavaScript",
  typescript: "TypeScript",
  dart: "Dart",
  kotlin: "Kotlin",
  swift: "Swift",
  sql: "SQL",
  json: "JSON",
  yaml: "YAML",
  http: "HTTP",
  html: "HTML",
  css: "CSS",
};

async function copiarTexto(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Navegadores antigos ou sem permissão: usa um campo escondido.
    const campo = document.createElement("textarea");
    campo.value = texto;
    campo.style.position = "fixed";
    campo.style.opacity = "0";
    document.body.appendChild(campo);
    campo.select();
    const ok = document.execCommand("copy");
    campo.remove();
    return ok;
  }
}

/** Bloco de código das aulas: realce, número das linhas, Copiar e Testar (OnlineGDB, Programiz, playgrounds). */
export function Codigo({
  codigo,
  linguagem: linguagemOriginal,
}: {
  codigo: string;
  linguagem: string;
}) {
  // ```python-exemplo: realça como Python, mas sem o botão Testar (precisa de algo que o OnlineGDB não tem)
  const soExemplo = linguagemOriginal.endsWith("-exemplo");
  const linguagem = linguagemOriginal.replace(/-exemplo$/, "");
  const [copiado, setCopiado] = useState(false);
  const [testando, setTestando] = useState(false);
  const texto = codigo.replace(/\n$/, "");
  const linhas = texto.split("\n");
  // Só mostra "Testar" quando o código é um programa completo (trechos soltos não rodam sozinhos).
  const testavel =
    !soExemplo &&
    (linguagem === "python" ||
      linguagem === "javascript" ||
      linguagem === "typescript" ||
      (linguagem === "c" && /\bmain\s*\(/.test(texto)) ||
      (linguagem === "java" && /static\s+void\s+main/.test(texto)) ||
      (linguagem === "dart" && /\bmain\s*\(/.test(texto)) ||
      (linguagem === "go" && /func\s+main\s*\(/.test(texto)));
  const saida = linguagem === "saida" || linguagem === "terminal";
  const comNumeros = !saida && linhas.length > 3;

  async function copiar() {
    if (await copiarTexto(texto)) {
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    }
  }

  async function testar() {
    await copiarTexto(texto);
    window.open(TESTAR_URL[linguagem as LinguagemTestavel], "_blank", "noopener");
    setTestando(true);
  }

  return (
    <figure className={`codigo ${saida ? "codigo-saida" : ""}`} data-linguagem={linguagem}>
      <figcaption className="codigo-topo">
        <span className="codigo-bolinhas" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="codigo-rotulo">{ROTULOS[linguagem] ?? linguagem}</span>
        {!saida && (
          <span className="codigo-acoes">
            <button type="button" onClick={copiar} aria-label="Copiar código">
              {copiado ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiado ? "Copiado!" : "Copiar"}</span>
            </button>
            {testavel && (
              <button type="button" className="codigo-testar" onClick={testar}>
                <Play size={13} /> <span>Testar</span>
              </button>
            )}
          </span>
        )}
      </figcaption>
      <pre className={comNumeros ? "com-numeros" : undefined}>
        <code>
          {linhas.map((linha, i) => (
            <span className="codigo-linha" key={i}>
              {destacar(linha, linguagem === "saida" ? "" : linguagem).map((t, j) =>
                t.tipo ? (
                  <span key={j} className={`tk-${t.tipo}`}>
                    {t.texto}
                  </span>
                ) : (
                  t.texto
                ),
              )}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      {testando && (
        <p className="codigo-dica" role="status">
          ✅ Código copiado! No {NOME_DO_TESTADOR[linguagem as LinguagemTestavel]}, apague o
          exemplo, cole com <kbd>Ctrl</kbd>+<kbd>V</kbd> e clique em <b>Run</b>.
          {linguagem === "java" && " A classe precisa se chamar Main."}
          <button type="button" onClick={() => setTestando(false)} aria-label="Fechar dica">
            ×
          </button>
        </p>
      )}
    </figure>
  );
}
