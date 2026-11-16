import type { ReactNode } from "react";

type CenaProps = {
  id: string;
  className?: string;
};

function Estrela({ x, y, cor = "#f7e5ad" }: { x: number; y: number; cor?: string }) {
  return (
    <path
      className="missao-anim-brilho"
      d={`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`}
      fill={cor}
    />
  );
}

function Olhinhos({ x, y }: { x: number; y: number }) {
  return (
    <g fill="#2f2338" className="missao-anim-piscar">
      <circle cx={x} cy={y} r="3.5" />
      <circle cx={x + 18} cy={y} r="3.5" />
    </g>
  );
}

function Base({ children, cor = "#e8caad" }: { children: ReactNode; cor?: string }) {
  return (
    <>
      <ellipse cx="180" cy="186" rx="119" ry="12" fill={cor} opacity=".22" />
      {children}
    </>
  );
}

function Ilustracao({ id }: { id: string }) {
  switch (id) {
    case "incendio":
      return (
        <Base cor="#8c4a38">
          <g className="missao-anim-fumaca" fill="#c9b1b9" opacity=".75">
            <circle cx="217" cy="43" r="15" />
            <circle cx="230" cy="32" r="18" />
            <circle cx="252" cy="43" r="12" />
          </g>
          <path d="M177 92h98v93h-98z" fill="#f7cca0" stroke="#674451" strokeWidth="6" />
          <path
            d="M165 91l62-35 61 35"
            fill="#df7776"
            stroke="#674451"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          {[188, 218, 248].map((x) => (
            <rect key={x} x={x} y="110" width="17" height="27" rx="3" fill="#8caab7" />
          ))}
          <path d="M218 185v-38h26v38" fill="#805c72" />
          <g className="missao-anim-fogo" fill="#f58952">
            <path d="M207 105c-15-20 9-31 5-48 24 22 34 37 22 48z" />
            <path d="M241 105c-11-15 6-22 3-38 21 18 25 31 19 38z" fill="#ffca6a" />
          </g>
          <g transform="translate(43 127)">
            <rect
              x="0"
              y="12"
              width="124"
              height="43"
              rx="10"
              fill="#e66c6a"
              stroke="#633e4d"
              strokeWidth="5"
            />
            <path d="M85 12h26l14 17v24H85z" fill="#f4b6a1" />
            <rect x="92" y="25" width="16" height="15" rx="3" fill="#b7e2e9" />
            <rect x="12" y="22" width="17" height="18" rx="4" fill="#ffdb9d" />
            <circle cx="29" cy="57" r="13" fill="#3b3447" />
            <circle cx="99" cy="57" r="13" fill="#3b3447" />
            <circle cx="29" cy="57" r="5" fill="#d5d1d7" />
            <circle cx="99" cy="57" r="5" fill="#d5d1d7" />
          </g>
          <path
            className="missao-anim-jato"
            d="M140 138Q175 85 216 100"
            stroke="#80d6ef"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="6 13"
          />
          <Estrela x={290} y={69} cor="#f6d58e" />
        </Base>
      );
    case "cafeteria":
      return (
        <Base>
          <path d="M72 85h209v98H72z" fill="#f6cba5" stroke="#805a68" strokeWidth="5" />
          <path d="M66 85l18-35h190l16 35" fill="#ba779b" stroke="#805a68" strokeWidth="5" />
          <path d="M66 85h224" stroke="#fff0db" strokeWidth="8" strokeDasharray="27 14" />
          <rect x="92" y="96" width="95" height="57" rx="6" fill="#8eadd2" />
          <path d="M107 153v-45m26 45v-45m27 45v-45" stroke="#f3e4d5" strokeWidth="4" />
          <path d="M188 152h93v31h-93z" fill="#a36779" />
          <g className="missao-anim-flutuar">
            <path d="M207 111h42v39q-22 14-42 0z" fill="#fbefd3" />
            <path d="M247 119q20-8 17 11-2 10-17 10" stroke="#fbefd3" strokeWidth="8" fill="none" />
            <path
              className="missao-anim-fumaca"
              d="M215 100q-9-12 5-19m10 20q-9-12 5-19"
              stroke="#e7ede0"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <g transform="translate(105 121)">
            <ellipse cx="26" cy="23" rx="21" ry="19" fill="#393446" />
            <path d="M8 13L7-6 25 7 46-6 43 13" fill="#393446" />
            <Olhinhos x={18} y={21} />
            <path d="M22 30q6 6 12 0" stroke="#e6b7ad" strokeWidth="2" fill="none" />
          </g>
          <g className="missao-anim-flutuar" fill="#fff0ce">
            <rect x="275" y="30" width="27" height="43" rx="4" transform="rotate(13 275 30)" />
            <path d="M284 40l11 3m-11 8 10 3" stroke="#af7b8e" strokeWidth="3" />
          </g>
        </Base>
      );
    case "abrigo":
      return (
        <Base cor="#c4a2b0">
          <path
            d="M95 102l86-69 89 69v84H95z"
            fill="#ffe6c6"
            stroke="#8e6b8a"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M81 105l100-82 103 82"
            fill="none"
            stroke="#ca91a0"
            strokeWidth="15"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M153 184v-58q0-26 28-26t28 26v58" fill="#ddaf9c" />
          <g className="missao-anim-flutuar">
            <ellipse cx="181" cy="147" rx="30" ry="27" fill="#e5bb82" />
            <path d="M157 130l-16-23q-13 20 8 34m56-11 17-23q13 20-7 34" fill="#ca966c" />
            <Olhinhos x={173} y={143} />
            <ellipse cx="185" cy="157" rx="6" ry="4" fill="#60475b" />
          </g>
          <g className="missao-anim-cauda" transform="translate(249 125)">
            <path
              d="M0 28q48-51 50 0"
              fill="none"
              stroke="#dca7b5"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <ellipse cx="12" cy="37" rx="22" ry="20" fill="#f3d7b3" />
            <Olhinhos x={4} y={35} />
          </g>
          <path d="M57 80q17-24 35 0-17 25-35 0" fill="#ea8e9d" className="missao-anim-flutuar" />
          <Estrela x={292} y={52} cor="#f2b1bd" />
        </Base>
      );
    case "nave":
      return (
        <Base cor="#76669b">
          <circle cx="247" cy="64" r="39" fill="#ded5f7" opacity=".8" />
          <circle cx="259" cy="51" r="12" fill="#c3b9dd" opacity=".7" />
          {[
            { x: 63, y: 49 },
            { x: 97, y: 110 },
            { x: 294, y: 112 },
          ].map((p) => (
            <Estrela key={p.x} x={p.x} y={p.y} cor="#fbeaa0" />
          ))}
          <g className="missao-anim-nave" transform="translate(154 16)">
            <path
              d="M24 116Q-3 78 32 14q29 15 32 64L46 116z"
              fill="#f7eadd"
              stroke="#66607e"
              strokeWidth="6"
            />
            <circle cx="35" cy="58" r="13" fill="#a4cbde" stroke="#66607e" strokeWidth="4" />
            <path
              d="M11 96-12 130l34-10m35-24 23 34-34-10"
              fill="#d994ad"
              stroke="#66607e"
              strokeWidth="5"
            />
            <path
              className="missao-anim-fogo"
              d="M26 120q7 34 15 0"
              fill="#ffc173"
              stroke="#ff8e6c"
              strokeWidth="4"
            />
          </g>
          <path
            d="M68 185q44-40 94-13t104-4"
            stroke="#b3a2d8"
            strokeWidth="7"
            fill="none"
            opacity=".75"
          />
          <circle cx="85" cy="160" r="19" fill="#a48bc0" opacity=".6" />
        </Base>
      );
    case "laboratorio":
      return (
        <Base cor="#95b9bf">
          <path d="M89 157h202" stroke="#826782" strokeWidth="9" strokeLinecap="round" />
          <path d="M91 77h195" stroke="#ad92aa" strokeWidth="6" strokeLinecap="round" />
          <g className="missao-anim-flutuar">
            <path
              d="M135 59v40l-25 53q-4 9 9 9h76q12 0 8-9l-25-53V59"
              fill="#cce9e0"
              stroke="#645c88"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M119 131h74l10 22q2 8-10 8h-74q-10 0-9-8z" fill="#8bceb8" />
            <circle className="missao-anim-bolha" cx="151" cy="119" r="6" fill="#f6e6b6" />
            <circle className="missao-anim-bolha" cx="170" cy="141" r="4" fill="#f6e6b6" />
          </g>
          <g>
            <rect
              x="234"
              y="63"
              width="40"
              height="94"
              rx="9"
              fill="#b7d2f0"
              stroke="#645c88"
              strokeWidth="5"
            />
            <path d="M237 114h34v39h-34z" fill="#dd9fd0" />
            <path
              className="missao-anim-bolha"
              d="M252 102v-9"
              stroke="#f3e5b6"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="253" cy="84" r="6" fill="#f3e5b6" />
          </g>
          <g fill="#f9dfa1">
            <Estrela x={85} y={52} />
            <Estrela x={292} y={93} />
          </g>
        </Base>
      );
    case "castelo":
      return (
        <Base cor="#b7a7cc">
          <path d="M105 78h141v107H105z" fill="#e2c7d9" stroke="#685e85" strokeWidth="6" />
          <rect
            x="81"
            y="55"
            width="45"
            height="130"
            fill="#c0aed3"
            stroke="#685e85"
            strokeWidth="5"
          />
          <rect
            x="224"
            y="55"
            width="45"
            height="130"
            fill="#c0aed3"
            stroke="#685e85"
            strokeWidth="5"
          />
          {[78, 96, 114, 222, 242, 260].map((x) => (
            <rect key={x} x={x} y="42" width="12" height="23" rx="2" fill="#776c9c" />
          ))}
          <path d="M162 185v-47q0-20 18-20t18 20v47" fill="#806b91" />
          <rect x="147" y="88" width="20" height="24" rx="6" fill="#a8c8de" />
          <rect x="195" y="88" width="20" height="24" rx="6" fill="#a8c8de" />
          <path
            className="missao-anim-bandeira"
            d="M105 16v41m0-41 43 13-43 11"
            stroke="#6d628e"
            strokeWidth="5"
            fill="#f5a0a0"
            strokeLinejoin="round"
          />
          <g className="missao-anim-flutuar">
            <circle cx="284" cy="133" r="16" fill="#e7c57c" stroke="#9678a9" strokeWidth="4" />
            <circle cx="284" cy="133" r="6" fill="#fff5ca" />
          </g>
          <Estrela x={65} y={112} cor="#e9c69f" />
        </Base>
      );
    case "farol":
      return (
        <Base cor="#7bb9cd">
          <path d="M52 165q45-26 91 0t96 0 62 0" stroke="#77bbd3" strokeWidth="10" fill="none" />
          <path d="M140 176l23-99h35l24 99z" fill="#fbf0db" stroke="#5d7088" strokeWidth="6" />
          <path d="M153 118h54m-49 30h42" stroke="#d9959c" strokeWidth="12" />
          <path d="M150 77l30-23 31 23" fill="#e4a1ab" stroke="#5d7088" strokeWidth="5" />
          <rect
            x="164"
            y="77"
            width="33"
            height="26"
            fill="#ffe6a1"
            stroke="#5d7088"
            strokeWidth="4"
          />
          <path
            className="missao-anim-farol"
            d="M197 90L314 39l-21 101z"
            fill="#ffecad"
            opacity=".6"
          />
          <path d="M116 185h147" stroke="#7286a0" strokeWidth="8" strokeLinecap="round" />
          <g className="missao-anim-barco" transform="translate(60 140)">
            <path d="M0 26h74l-11 23H15z" fill="#bd7b9a" stroke="#5d7088" strokeWidth="5" />
            <path d="M37 25V-13l24 17-24 7" fill="#fff0d4" stroke="#5d7088" strokeWidth="4" />
          </g>
          <Estrela x={259} y={43} />
        </Base>
      );
    case "biblioteca":
      return (
        <Base cor="#caa06e">
          <path d="M72 61h234v124H72z" fill="#a47173" stroke="#694f69" strokeWidth="7" />
          <path d="M78 120h224" stroke="#eed6aa" strokeWidth="7" />
          {Array.from({ length: 15 }, (_, i) => {
            const x = 86 + (i % 8) * 25;
            const y = i < 8 ? 75 : 135;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={15}
                height={i % 3 === 0 ? 43 : 36}
                rx="3"
                fill={["#eab4b4", "#e4c784", "#a5c5b2", "#b5b0d9"][i % 4]}
              />
            );
          })}
          <g className="missao-anim-coruja" transform="translate(181 16)">
            <ellipse
              cx="0"
              cy="53"
              rx="37"
              ry="39"
              fill="#c59b78"
              stroke="#71516c"
              strokeWidth="5"
            />
            <path
              d="M-27 28l-15-17 22 7m46 10 15-17-22 7"
              fill="#c59b78"
              stroke="#71516c"
              strokeWidth="5"
            />
            <circle cx="-13" cy="46" r="13" fill="#fff1cf" />
            <circle cx="13" cy="46" r="13" fill="#fff1cf" />
            <Olhinhos x={-17} y={46} />
            <path d="M-5 61l5 8 5-8" fill="#ebaf77" />
          </g>
          <Estrela x={58} y={43} />
        </Base>
      );
    case "robo":
      return (
        <Base cor="#8aa9c8">
          <g className="missao-anim-robo">
            <rect
              x="122"
              y="71"
              width="92"
              height="81"
              rx="24"
              fill="#b5d9da"
              stroke="#596b8a"
              strokeWidth="6"
            />
            <rect x="139" y="88" width="60" height="42" rx="11" fill="#4c6983" />
            <circle cx="154" cy="105" r="6" fill="#f5d79b" />
            <circle cx="184" cy="105" r="6" fill="#f5d79b" />
            <path d="M157 117q12 9 24 0" stroke="#e7c7a7" strokeWidth="4" fill="none" />
            <path d="M168 71V50" stroke="#596b8a" strokeWidth="6" />
            <circle className="missao-anim-brilho" cx="168" cy="42" r="9" fill="#eaa0ab" />
            <path
              d="M122 107h-27l-12 21m131-21h26l11-21m-100 66-12 30m64-30 13 30"
              stroke="#596b8a"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <rect
            x="222"
            y="116"
            width="53"
            height="47"
            rx="5"
            fill="#ddb48b"
            stroke="#977b82"
            strokeWidth="5"
          />
          <path d="M222 134h53m-26-18v47" stroke="#fbe8bd" strokeWidth="5" />
          <path d="M62 170h44m126 0h72" stroke="#a3afc3" strokeWidth="7" strokeLinecap="round" />
          <Estrela x={278} y={56} />
        </Base>
      );
    case "jardim":
      return (
        <Base cor="#a3c7a2">
          <path d="M69 168q82-29 177-10t59 28H67z" fill="#9dc89b" />
          {[102, 167, 239].map((x, i) => (
            <g key={x} className="missao-anim-flor" style={{ animationDelay: `${i * 0.45}s` }}>
              <path d={`M${x} 168v-70`} stroke="#628f72" strokeWidth="7" strokeLinecap="round" />
              <path
                d={`M${x} 132q-34-28-36 0 19 13 36 0m0 17q25-30 38-9-11 24-38 9`}
                fill="#91b58b"
              />
              {[0, 72, 144, 216, 288].map((angle) => {
                const cx = x + Math.cos((angle * Math.PI) / 180) * 14;
                const cy = 90 + Math.sin((angle * Math.PI) / 180) * 14;
                return (
                  <circle
                    key={angle}
                    cx={cx}
                    cy={cy}
                    r={14}
                    fill={["#eb9fbd", "#e9c279", "#bca6dc"][i]}
                  />
                );
              })}
              <circle cx={x} cy="90" r="10" fill="#f7e9ae" />
            </g>
          ))}
          <g className="missao-anim-regador" transform="translate(262 99)">
            <path d="M0 25l22-18 12 11-18 24" fill="#8eb9c3" stroke="#617a8f" strokeWidth="5" />
            <path
              d="M22 9q21-7 32 9"
              stroke="#77c8e4"
              strokeWidth="6"
              strokeDasharray="4 8"
              fill="none"
            />
          </g>
          <Estrela x={85} y={54} cor="#e8d4a1" />
        </Base>
      );
    case "feira":
      return (
        <Base cor="#c7a4ae">
          <path d="M82 94h210v92H82z" fill="#f2d9b8" stroke="#825b70" strokeWidth="6" />
          <path d="M76 94l20-45h179l23 45z" fill="#e7a5af" stroke="#825b70" strokeWidth="5" />
          <path d="M83 94h207" stroke="#fff3ce" strokeWidth="14" strokeDasharray="26 16" />
          <rect x="108" y="122" width="53" height="64" rx="5" fill="#b1a9d6" />
          <rect x="184" y="127" width="77" height="26" rx="5" fill="#b7d1bc" />
          <g className="missao-anim-moedas">
            <circle cx="244" cy="50" r="18" fill="#f3d47b" stroke="#ad8e6b" strokeWidth="4" />
            <path d="M241 41q17 4 4 13-17-3-4-13" stroke="#ad8e6b" strokeWidth="3" fill="none" />
          </g>
          <path d="M183 186v-29h78v29" fill="#c69c87" />
          <Estrela x={69} y={46} cor="#f1d78a" />
          <Estrela x={297} y={35} cor="#f1d78a" />
        </Base>
      );
    case "pinguim":
      return (
        <Base cor="#a4d5e9">
          <path
            d="M55 178l38-55 45 13 44-46 61 35 48 53z"
            fill="#c4e4ef"
            stroke="#86b5ca"
            strokeWidth="5"
          />
          <path d="M182 90l62 34-23 4-38-22-22 23-21 6z" fill="#f2f7f2" />
          <g className="missao-anim-pinguim">
            <ellipse cx="180" cy="121" rx="36" ry="54" fill="#49576d" />
            <ellipse cx="182" cy="133" rx="24" ry="34" fill="#f9efdc" />
            <path d="M150 128l-27 19 13-37m76 18 25 19-12-37" fill="#49576d" />
            <circle cx="168" cy="100" r="5" fill="#fff" />
            <circle cx="194" cy="100" r="5" fill="#fff" />
            <circle cx="169" cy="101" r="2" fill="#303240" />
            <circle cx="193" cy="101" r="2" fill="#303240" />
            <path d="M176 112l11 0-6 9z" fill="#e5a575" />
            <path
              d="M164 171l-12 11m39-11 12 11"
              stroke="#d3a06e"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
          {[
            { x: 84, y: 61 },
            { x: 273, y: 78 },
            { x: 290, y: 136 },
          ].map((p) => (
            <g key={p.x} className="missao-anim-neve">
              <circle cx={p.x} cy={p.y} r="5" fill="#fffdf4" />
            </g>
          ))}
          <Estrela x={121} y={34} cor="#e8f2ff" />
        </Base>
      );
    default:
      return (
        <Base>
          <Estrela x={120} y={77} />
          <Estrela x={228} y={110} />
        </Base>
      );
  }
}

/** Ilustração SVG original em cada card; movimento isolado no CSS e sem dependência externa. */
export function CenaMissao({ id, className = "" }: CenaProps) {
  return (
    <svg
      viewBox="0 0 340 205"
      role="presentation"
      focusable="false"
      aria-hidden="true"
      className={`missao-cena ${className}`}
    >
      <Ilustracao id={id} />
    </svg>
  );
}
