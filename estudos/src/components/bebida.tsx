import type { TrilhaId } from "../catalogo";
import { Comida, type ComidaId } from "./comida";

const COMIDAS: string[] = ["produto", "front-end", "back-end", "mobile", "devops", "ui-ux", "qa"];

/** Vapor subindo: três (ou dois) fiozinhos animados. */
function Vapor({ xs, y, cor }: { xs: number[]; y: number; cor: string }) {
  return (
    <>
      {xs.map((x, i) => (
        <path
          key={x}
          className={`beb-vapor beb-v${i + 1}`}
          d={`M${x} ${y}c-6-5 6-9 0-15`}
          fill="none"
          stroke={cor}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function Rotulo({ x, y, texto, cor }: { x: number; y: number; texto: string; cor: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontWeight="700"
      fontSize="15"
      fill={cor}
    >
      {texto}
    </text>
  );
}

/** Uma bebida para cada trilha: o "cardápio" do site. */
export function Bebida({ trilha, tamanho = 120 }: { trilha: TrilhaId; tamanho?: number }) {
  if (COMIDAS.includes(trilha)) return <Comida trilha={trilha as ComidaId} tamanho={tamanho} />;
  return (
    <svg
      className={`bebida bebida-${trilha}`}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {trilha === "fundamentos" && (
        <g className="beb-xicara">
          <Vapor xs={[44, 57, 70]} y={42} cor="#e8b47a" />
          <path d="M88 60h5a12 12 0 0 1 0 24h-5" fill="none" stroke="#c8803e" strokeWidth="7" />
          <path d="M22 52h66v30a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22z" fill="#c8803e" />
          <path d="M22 52h66v6H22z" fill="#a9622a" />
          <Rotulo x={55} y={84} texto="01" cor="#fff4e4" />
        </g>
      )}

      {trilha === "logica" && (
        <g className="beb-xicara">
          <Vapor xs={[46, 60, 74]} y={40} cor="#f2c1cb" />
          <path d="M88 60h5a12 12 0 0 1 0 24h-5" fill="none" stroke="#f3e6d3" strokeWidth="7" />
          <path d="M22 52h66v30a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22z" fill="#f3e6d3" />
          <ellipse cx="55" cy="53" rx="33" ry="5" fill="#6b3a2a" />
          <rect className="beb-marsh" x="36" y="44" width="11" height="9" rx="3" fill="#fff" />
          <rect
            className="beb-marsh beb-m2"
            x="52"
            y="42"
            width="11"
            height="9"
            rx="3"
            fill="#f6b8c6"
          />
          <rect
            className="beb-marsh beb-m3"
            x="66"
            y="45"
            width="10"
            height="8"
            rx="3"
            fill="#fff"
          />
          <Rotulo x={55} y={85} texto="if" cor="#6b3a2a" />
        </g>
      )}

      {trilha === "c" && (
        <g className="beb-xicara">
          <Vapor xs={[52, 66]} y={54} cor="#9cc3ea" />
          <ellipse cx="60" cy="100" rx="38" ry="6" fill="#3d2a20" />
          <path d="M80 70h4a9 9 0 0 1 0 18h-4" fill="none" stroke="#f3e6d3" strokeWidth="6" />
          <path d="M34 64h50v14a19 19 0 0 1-19 19H53a19 19 0 0 1-19-19z" fill="#f3e6d3" />
          <ellipse cx="59" cy="65" rx="25" ry="4" fill="#4a2a18" />
          <ellipse cx="59" cy="65" rx="17" ry="2.4" fill="#b8763f" opacity=".8" />
          <Rotulo x={59} y={88} texto="C" cor="#2e5f9a" />
        </g>
      )}

      {trilha === "python" && (
        <g>
          <line
            x1="70"
            y1="16"
            x2="62"
            y2="80"
            stroke="#3776ab"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M36 34h48l-5 66a6 6 0 0 1-6 6H47a6 6 0 0 1-6-6z" fill="#ffffff22" />
          <path d="M38 50h44l-3.8 50a6 6 0 0 1-6 6H47.8a6 6 0 0 1-6-6z" fill="#f7cf45" />
          <circle className="beb-bolha" cx="50" cy="96" r="2.2" fill="#fff8" />
          <circle className="beb-bolha beb-b2" cx="66" cy="98" r="1.8" fill="#fff8" />
          <circle className="beb-bolha beb-b3" cx="58" cy="94" r="1.5" fill="#fff8" />
          <rect className="beb-gelo" x="44" y="54" width="14" height="13" rx="3" fill="#e9f4ff" />
          <rect
            className="beb-gelo beb-g2"
            x="60"
            y="58"
            width="13"
            height="12"
            rx="3"
            fill="#d7ebff"
          />
          <circle cx="82" cy="36" r="11" fill="#ffe066" stroke="#f0b72f" strokeWidth="3" />
          <path d="M82 27v18M73 36h18" stroke="#f0b72f" strokeWidth="1.5" />
          <path
            d="M36 34h48l-5 66a6 6 0 0 1-6 6H47a6 6 0 0 1-6-6z"
            fill="none"
            stroke="#cfe3f5"
            strokeWidth="3"
          />
          <Rotulo x={60} y={92} texto="py" cor="#2b5b84" />
        </g>
      )}

      {trilha === "java" && (
        <g className="beb-xicara">
          <Vapor xs={[46, 60, 74]} y={46} cor="#f0a35e" />
          <ellipse cx="60" cy="100" rx="44" ry="6" fill="#5382a1" />
          <path d="M94 64h4a11 11 0 0 1 0 22h-4" fill="none" stroke="#e76f00" strokeWidth="7" />
          <path d="M24 58h72v12a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26z" fill="#e76f00" />
          <ellipse cx="60" cy="59" rx="36" ry="6" fill="#f7e7d2" />
          <path
            d="M60 63c-5-3-8-5-8-7.5a3.2 3.2 0 0 1 8-1.5 3.2 3.2 0 0 1 8 1.5c0 2.5-3 4.5-8 7.5z"
            fill="#b3713a"
          />
          <Rotulo x={60} y={86} texto="J" cor="#fff4e4" />
        </g>
      )}

      {trilha === "poo" && (
        <g>
          <ellipse cx="60" cy="100" rx="44" ry="7" fill="#e9dcef" />
          <ellipse cx="60" cy="98" rx="36" ry="5" fill="#f7f0fa" />
          <g className="poo-cubo">
            <path d="M24 78 l16 -8.0 l16 8.0 l-16 8.0z" fill="#ffffff" />
            <path d="M24 78 l16 8.0 v16 l-16 -8.0z" fill="#efe4f4" />
            <path d="M40 86.0 l16 -8.0 v16 l-16 8.0z" fill="#d9c6e6" />
          </g>
          <g className="poo-cubo poo-c2">
            <path d="M60 78 l16 -8.0 l16 8.0 l-16 8.0z" fill="#ffffff" />
            <path d="M60 78 l16 8.0 v16 l-16 -8.0z" fill="#efe4f4" />
            <path d="M76 86.0 l16 -8.0 v16 l-16 8.0z" fill="#d9c6e6" />
          </g>
          <g className="poo-cubo poo-c3">
            <path d="M42 52 l16 -8.0 l16 8.0 l-16 8.0z" fill="#ffffff" />
            <path d="M42 52 l16 8.0 v16 l-16 -8.0z" fill="#efe4f4" />
            <path d="M58 60.0 l16 -8.0 v16 l-16 8.0z" fill="#d9c6e6" />
          </g>
          <text
            x="60"
            y="36"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="14"
            fill="#8a5aa8"
          >
            {"{ }"}
          </text>
        </g>
      )}

      {trilha === "git" && (
        <g>
          <path
            d="M14 30v22a5 5 0 0 0 10 0V30M19 30v24M19 54v50"
            fill="none"
            stroke="#b9a48c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M101 30c-7 6-7 24 0 30v44"
            fill="none"
            stroke="#b9a48c"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="66" r="33" fill="#fffaf3" stroke="#e3d3bf" strokeWidth="3" />
          <circle cx="60" cy="66" r="24" fill="none" stroke="#efe3d2" strokeWidth="2" />
          <g className="git-grafo">
            <path
              d="M44 78V54M44 70c0-8 16-6 16-14v-2M60 54c0 8 16 8 16 16v8"
              fill="none"
              stroke="#2f7a4f"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="44" cy="78" r="5" fill="#2f7a4f" />
            <circle cx="44" cy="54" r="5" fill="#2f7a4f" />
            <circle cx="60" cy="54" r="5" fill="#f05033" />
            <circle className="git-ultimo" cx="76" cy="78" r="5" fill="#f05033" />
          </g>
        </g>
      )}

      {trilha === "algoritmos" && (
        <g>
          <rect x="34" y="58" width="52" height="46" rx="6" fill="#8a5a3c" />
          <rect x="34" y="58" width="52" height="10" fill="#6f4630" />
          <rect x="52" y="82" width="16" height="14" rx="3" fill="#5a3826" />
          <path d="M40 58l6-18h28l6 18z" fill="#c9a27a" />
          <ellipse cx="60" cy="40" rx="14" ry="4" fill="#3b2418" />
          <g className="alg-manivela">
            <path
              d="M60 36V22h22"
              fill="none"
              stroke="#5a5a5a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="84" cy="22" r="6" fill="#3b2418" />
          </g>
          <ellipse cx="22" cy="98" rx="5" ry="7" fill="#5a3826" transform="rotate(-25 22 98)" />
          <ellipse cx="98" cy="100" rx="5" ry="7" fill="#5a3826" transform="rotate(20 98 100)" />
        </g>
      )}

      {trilha === "ia" && (
        <g>
          <rect x="26" y="22" width="68" height="20" rx="6" fill="#4a4a52" />
          <rect x="30" y="42" width="60" height="58" rx="4" fill="#6b6b75" />
          <rect x="36" y="27" width="22" height="10" rx="3" fill="#1c1c22" />
          <circle className="ia-olho" cx="42" cy="32" r="2.4" fill="#7dd3fc" />
          <circle className="ia-olho" cx="52" cy="32" r="2.4" fill="#7dd3fc" />
          <circle cx="78" cy="32" r="4" fill="#f4b860" />
          <rect x="50" y="46" width="20" height="8" rx="2" fill="#2e2e36" />
          <path
            d="M56 54v8M64 54v8"
            stroke="#3b2418"
            strokeWidth="3"
            strokeLinecap="round"
            className="ia-pingo"
          />
          <path d="M46 76h28l-3 18H49z" fill="#fff8ef" />
          <path d="M74 80h5a5 5 0 0 1 0 10h-5" fill="none" stroke="#fff8ef" strokeWidth="3" />
          <rect x="24" y="100" width="72" height="6" rx="3" fill="#3a3a42" />
        </g>
      )}

      {trilha === "sql" && (
        <g>
          <rect x="16" y="20" width="88" height="84" rx="4" fill="#8a5a3c" />
          <rect x="20" y="24" width="80" height="76" fill="#f3e3cf" />
          <rect x="16" y="58" width="88" height="5" fill="#8a5a3c" />
          {[0, 1, 2].map((i) => (
            <g key={`a${i}`}>
              <rect
                x={26 + i * 26}
                y={34}
                width="18"
                height="22"
                rx="4"
                fill={["#e8b04a", "#c96a3a", "#7aa35a"][i]}
              />
              <rect x={26 + i * 26} y={31} width="18" height="5" rx="2" fill="#5a3826" />
              <rect x={29 + i * 26} y={42} width="12" height="6" rx="1" fill="#fff8ef" />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={`b${i}`}>
              <rect
                x={26 + i * 26}
                y={70}
                width="18"
                height="24"
                rx="4"
                fill={["#b98ad6", "#e8b04a", "#c96a3a"][i]}
              />
              <rect x={26 + i * 26} y={67} width="18" height="5" rx="2" fill="#5a3826" />
              <rect x={29 + i * 26} y={78} width="12" height="6" rx="1" fill="#fff8ef" />
            </g>
          ))}
        </g>
      )}

      {trilha === "seguranca" && (
        <g>
          <rect x="28" y="20" width="58" height="80" rx="6" fill="#c9a27a" />
          <rect x="34" y="28" width="46" height="66" rx="2" fill="#fffaf3" />
          <rect x="46" y="14" width="22" height="12" rx="3" fill="#6b6b75" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path
                d={`M40 ${42 + i * 16}l4 4 7-8`}
                fill="none"
                stroke="#3f7a59"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="56" y={41 + i * 16} width="18" height="4" rx="2" fill="#d9c8b4" />
            </g>
          ))}
          <g className="seg-cadeado">
            <path d="M84 78v-8a8 8 0 0 1 16 0v8" fill="none" stroke="#5a5a5a" strokeWidth="4" />
            <rect x="80" y="78" width="24" height="20" rx="4" fill="#e8b04a" />
            <circle cx="92" cy="88" r="3" fill="#5a3826" />
          </g>
        </g>
      )}

      {trilha === "ciberseguranca" && (
        <g>
          <ellipse cx="60" cy="98" rx="44" ry="7" fill="#e9dcef" />
          <circle cx="60" cy="62" r="36" fill="#f0d9a8" stroke="#c98a4a" strokeWidth="4" />
          <path
            className="ciber-espiral"
            d="M60 62m0 0a4 4 0 0 1 8 0a8 8 0 0 1-16 0a12 12 0 0 1 24 0a16 16 0 0 1-32 0a20 20 0 0 1 40 0a24 24 0 0 1-48 0a28 28 0 0 1 56 0"
            fill="none"
            stroke="#a8432e"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

const ITENS: Record<TrilhaId, string[]> = {
  fundamentos: ["0", "1", "1", "0", "01", "10", "0", "1", "110", "0"],
  logica: ["◇", "▭", "→", "?", "◇", "▭", "↺", "→", "?", "◇"],
  c: ["0x7f", "&x", "*p", "{ }", "\\0", "0x1a", "int", "&", "*", ";"],
  python: ["", "", "", "", "", "", "", "", "", ""],
  java: ["", "", "", "", "", "", "", "", "", ""],
  algoritmos: ["O(n)", "[ ]", "→", "log n", "{ }", "sort", "n²", "↺", "push", "pop"],
  ia: ["prompt", "✦", "spec", "token", "✓?", "✦", "review", "PRD", "✦", "task"],
  sql: ["SELECT", "*", "WHERE", "JOIN", "id", "ORDER BY", "COUNT", "▤", "INSERT", ";"],
  seguranca: ["🔒", "hash", "2FA", "✓", ".env", "OWASP", "🔑", "sal", "✓", "https"],
  ciberseguranca: ["🛡", "CTF", "flag{ }", "🔍", "SOC", "log", "🛡", "nmap", "blue", "red"],
  poo: ["class", "{ }", "self", "this", "new", "▣", "extends", "▣", "obj.", "{ }"],
  git: ["commit", "●", "main", "merge", "●─●", "push", "PR #1", "●", "branch", "pull"],
  produto: ["GET", "200", "→", "JSON", "←", "/api", "POST", "201", "→", "{ }"],
  qa: ["✓", "✗", "bug", "✓", "assert", "✓", "✗", "test", "✓", "🐞"],
  "ui-ux": ["◯", "△", "▢", "Aa", "◯", "▢", "△", "#ff8fb1", "Aa", "◯"],
  "front-end": ["<div>", "{ }", "px", "</>", "css", "<p>", "#fff", "flex", "<a>", "js"],
  mobile: ["tap", "iOS", "APK", "▢", "swipe", "🔔", "tap", "▢", "Android", "▢"],
  "back-end": ["GET", "POST", "200", "/api", "{json}", "SQL", "404", "JWT", "PUT", "201"],
  devops: ["$", "git push", "✓", "deploy", "☁", "docker", "$", "ci", "✓", "☁"],
};

/** Detalhes que flutuam no fundo do topo de cada trilha. */
export function Ambiente({ trilha }: { trilha: TrilhaId }) {
  return (
    <div className={`ambiente ambiente-${trilha}`} aria-hidden="true">
      {ITENS[trilha].map((texto, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 23 + 5) % 95}%`,
            animationDelay: `${(i * 1.7) % 9}s`,
            animationDuration: `${11 + ((i * 3) % 7)}s`,
            fontSize: `${12 + ((i * 5) % 10)}px`,
          }}
        >
          {texto}
        </span>
      ))}
    </div>
  );
}
