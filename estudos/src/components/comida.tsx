// Sobremesas e pães das trilhas de profissões (mesmo esquema das bebidas: SVG + animação em CSS).

export type ComidaId = "produto" | "front-end" | "back-end" | "mobile" | "devops" | "ui-ux" | "qa";

function Vapor({ xs, y, cor }: { xs: number[]; y: number; cor: string }) {
  return (
    <>
      {xs.map((x, i) => (
        <path
          key={x}
          className={`beb-vapor beb-v${i + 1}`}
          d={`M${x} ${y}c-5-4 5-8 0-13`}
          fill="none"
          stroke={cor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

const PRATO = <ellipse cx="60" cy="102" rx="46" ry="8" fill="#f3e6d3" opacity=".9" />;

export function Comida({ trilha, tamanho = 120 }: { trilha: ComidaId; tamanho?: number }) {
  return (
    <svg
      className={`bebida comida comida-${trilha}`}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {trilha === "produto" && (
        <g>
          <rect x="12" y="92" width="96" height="14" rx="5" fill="#8a5a3b" />
          <Vapor xs={[44, 60, 76]} y={50} cor="#f6d59a" />
          <g className="com-respira">
            <path
              d="M16 84 C14 64 40 54 62 54 C88 54 108 64 104 82 C100 96 26 98 16 84 Z"
              fill="#c9823e"
            />
            <path
              d="M22 76 C24 62 46 58 62 58 C84 58 100 66 98 76 C80 70 42 70 22 76 Z"
              fill="#e3a35a"
            />
            <path
              d="M34 66 q8 -6 16 0 M54 64 q8 -6 16 0 M74 66 q8 -6 16 0"
              fill="none"
              stroke="#f6d59a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {trilha === "qa" && (
        <g>
          {PRATO}
          <circle cx="40" cy="86" r="15" fill="#e8b23a" />
          <circle cx="80" cy="86" r="15" fill="#e8b23a" />
          <g className="com-pula">
            <circle cx="60" cy="70" r="16" fill="#f2c14e" />
            <circle cx="54" cy="64" r="3" fill="#ffe08a" />
            <circle cx="65" cy="72" r="2.5" fill="#ffe08a" />
          </g>
          <circle cx="36" cy="82" r="2.5" fill="#ffe08a" />
          <circle cx="84" cy="81" r="2.5" fill="#ffe08a" />
          <g className="com-lupa">
            <circle
              cx="88"
              cy="40"
              r="14"
              fill="#cfe8ff"
              fillOpacity=".35"
              stroke="#f3e6d3"
              strokeWidth="5"
            />
            <path d="M78 50 L64 64" stroke="#f3e6d3" strokeWidth="6" strokeLinecap="round" />
            <path
              d="M84 34 a7 7 0 0 1 8 2"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {trilha === "ui-ux" && (
        <g>
          {PRATO}
          <g>
            <ellipse cx="60" cy="94" rx="26" ry="7" fill="#9be0c4" />
            <rect x="35" y="86" width="50" height="6" rx="3" fill="#fff4e4" />
            <ellipse cx="60" cy="84" rx="26" ry="7" fill="#9be0c4" />
          </g>
          <g>
            <ellipse cx="60" cy="74" rx="24" ry="7" fill="#f6a5c0" />
            <rect x="37" y="66" width="46" height="6" rx="3" fill="#fff4e4" />
            <ellipse cx="60" cy="64" rx="24" ry="7" fill="#f6a5c0" />
          </g>
          <g className="com-flutua">
            <ellipse cx="60" cy="50" rx="22" ry="6.5" fill="#c4b5fd" />
            <rect x="39" y="43" width="42" height="5" rx="2.5" fill="#fff4e4" />
            <ellipse cx="60" cy="41" rx="22" ry="6.5" fill="#c4b5fd" />
          </g>
          <path
            className="com-brilho"
            d="M96 30 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z"
            fill="#ffe08a"
          />
          <path
            className="com-brilho com-b2"
            d="M24 40 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z"
            fill="#fff"
          />
        </g>
      )}

      {trilha === "front-end" && (
        <g>
          {PRATO}
          <path d="M36 70 H84 L78 102 H42 Z" fill="#ff8fb1" />
          <path d="M46 70 L48 102 M58 70 L58 102 M70 70 L68 102" stroke="#e0628c" strokeWidth="3" />
          <ellipse cx="60" cy="68" rx="30" ry="10" fill="#fff4e4" />
          <ellipse cx="60" cy="58" rx="24" ry="9" fill="#ffd1df" />
          <ellipse cx="60" cy="49" rx="16" ry="7" fill="#fff4e4" />
          <rect
            x="44"
            y="60"
            width="6"
            height="2.6"
            rx="1.3"
            fill="#8fbfec"
            transform="rotate(-25 47 61)"
          />
          <rect
            x="66"
            y="56"
            width="6"
            height="2.6"
            rx="1.3"
            fill="#ffd95a"
            transform="rotate(30 69 57)"
          />
          <rect
            x="56"
            y="66"
            width="6"
            height="2.6"
            rx="1.3"
            fill="#9be0c4"
            transform="rotate(10 59 67)"
          />
          <g className="com-pula">
            <circle cx="60" cy="38" r="7" fill="#e5383b" />
            <path
              d="M60 31 q4 -8 10 -9"
              fill="none"
              stroke="#5aa874"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {trilha === "mobile" && (
        <g>
          {PRATO}
          <Vapor xs={[50, 66]} y={44} cor="#f6d59a" />
          <g className="com-respira">
            <path d="M18 88 C18 76 26 70 34 72 L40 92 C30 96 18 96 18 88 Z" fill="#d9903f" />
            <path d="M102 88 C102 76 94 70 86 72 L80 92 C90 96 102 96 102 88 Z" fill="#d9903f" />
            <path d="M32 74 C36 62 46 58 52 60 L54 94 C46 96 38 94 34 92 Z" fill="#e8a64e" />
            <path d="M88 74 C84 62 74 58 68 60 L66 94 C74 96 82 94 86 92 Z" fill="#e8a64e" />
            <path d="M50 60 C54 52 66 52 70 60 L68 94 C62 96 58 96 52 94 Z" fill="#f2bb62" />
            <path
              d="M56 62 q4 -3 8 0 M38 70 q5 -2 8 2 M74 72 q3 -4 8 -2"
              fill="none"
              stroke="#fbe0a0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {trilha === "back-end" && (
        <g>
          {PRATO}
          <path d="M22 98 V58 L94 46 V86 Z" fill="#4a2618" />
          <path d="M22 70 L94 58 M22 84 L94 72" stroke="#f3e6d3" strokeWidth="5" />
          <path d="M94 46 L106 52 V92 L94 86 Z" fill="#3a1d12" />
          <path d="M22 58 L94 46 L106 52 L34 64 Z" fill="#6b3a2a" />
          <path
            className="com-calda"
            d="M40 61 q2 8 4 0 M62 57 q2 10 4 0 M84 53 q2 7 4 0"
            fill="none"
            stroke="#6b3a2a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <g className="com-pula">
            <circle cx="72" cy="44" r="7" fill="#e5383b" />
            <path
              d="M72 37 q2 -8 9 -10"
              fill="none"
              stroke="#5aa874"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {trilha === "devops" && (
        <g>
          <rect x="10" y="94" width="76" height="12" rx="5" fill="#8a5a3b" />
          <g className="com-respira">
            <path d="M14 94 C10 64 30 50 48 50 C68 50 86 64 82 94 Z" fill="#b97a3d" />
            <path
              d="M22 88 C20 68 34 58 48 58 C62 58 76 68 74 88"
              fill="none"
              stroke="#f3e6d3"
              strokeOpacity=".35"
              strokeWidth="3"
            />
            <path
              d="M48 56 V92 M48 64 l-8 -6 M48 72 l-9 -6 M48 80 l-9 -6 M48 64 l8 -6 M48 72 l9 -6 M48 80 l9 -6"
              stroke="#e8c18f"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <rect
            x="88"
            y="62"
            width="22"
            height="42"
            rx="5"
            fill="#cfe8ff"
            fillOpacity=".3"
            stroke="#f3e6d3"
            strokeWidth="3"
          />
          <rect x="91" y="76" width="16" height="26" rx="3" fill="#f3e6d3" />
          <rect x="86" y="58" width="26" height="6" rx="3" fill="#a3d977" />
          <circle className="beb-bolha" cx="96" cy="96" r="2" fill="#c9b08a" />
          <circle className="beb-bolha beb-b2" cx="102" cy="98" r="1.6" fill="#c9b08a" />
          <circle className="beb-bolha beb-b3" cx="99" cy="92" r="1.4" fill="#c9b08a" />
        </g>
      )}
    </svg>
  );
}
