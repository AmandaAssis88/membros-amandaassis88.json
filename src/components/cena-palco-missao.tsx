import { CenaMissao } from "./cena-missao";

/**
 * Capa de cada história: pintura em WebP com uma camada atmosférica em CSS/SVG.
 * Os SVGs anteriores permanecem como fallback quando a arte não está disponível.
 */
export function CenaPalcoMissao({ id }: { id: string }) {
  return (
    <div className={`mis-palco-cenario mis-palco-cenario--${id}`} aria-hidden="true">
      <span className="mis-palco-luz mis-palco-luz--a" />
      <span className="mis-palco-luz mis-palco-luz--b" />
      <span className="mis-palco-luz mis-palco-luz--c" />
      <span className="mis-palco-lua" />
      <img
        className="mis-palco-pintura"
        src={`/missoes/capas/${id}.webp`}
        alt=""
        loading="eager"
        decoding="async"
        onError={(evento) => { evento.currentTarget.hidden = true; }}
      />
      <span className="mis-palco-pintura-veil" />
      <span className="mis-palco-particula mis-palco-particula--a" />
      <span className="mis-palco-particula mis-palco-particula--b" />
      <span className="mis-palco-particula mis-palco-particula--c" />
      {id === "gatinho" ? (
        <svg
          className="mis-palco-svg mis-palco-svg--gatinho"
          viewBox="0 0 460 330"
          focusable="false"
        >
          <ellipse cx="248" cy="302" rx="190" ry="14" fill="#1a2833" opacity=".32" />
          <path
            d="M250 305Q249 205 243 136"
            stroke="#75534c"
            strokeWidth="34"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M246 202Q196 181 166 125M245 170Q304 141 324 104"
            stroke="#75534c"
            strokeWidth="19"
            fill="none"
            strokeLinecap="round"
          />
          <g className="mis-palco-folhas" fill="#628a78" stroke="#416c62" strokeWidth="4">
            <circle cx="174" cy="111" r="54" />
            <circle cx="239" cy="73" r="74" />
            <circle cx="315" cy="118" r="63" />
            <circle cx="212" cy="145" r="57" />
            <circle cx="284" cy="157" r="57" />
          </g>
          <path
            d="M190 205Q243 194 293 194"
            stroke="#a37459"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <g className="mis-palco-gatinho" transform="translate(188 99)">
            <path
              d="M37 76Q-2 45 13 5L48 24 76 4 92 50Q98 77 65 87Z"
              fill="#e7c49f"
              stroke="#745164"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M20 20L25 41 43 32M76 20L65 39 83 37"
              stroke="#b98286"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M37 59q7-8 13 0m13 0q7-8 13 0"
              fill="none"
              stroke="#61485d"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M53 69q6 5 12 0" stroke="#a87171" strokeWidth="3" fill="none" />
            <path
              d="M28 81q15 6 28 7 21 1 31-8"
              stroke="#e7c49f"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M87 83Q124 86 110 52"
              fill="none"
              stroke="#d4a47e"
              strokeWidth="13"
              strokeLinecap="round"
            />
          </g>
          <g className="mis-palco-escada" strokeLinecap="round" stroke="#f4cd9b" strokeWidth="8">
            <path d="M102 306L184 203M160 306L216 203" />
            <path d="M116 289L170 289M127 266L183 266M144 239L199 239" strokeWidth="5" />
          </g>
          <path d="M55 307h341" stroke="#648b70" strokeWidth="8" strokeLinecap="round" />
          <g className="mis-palco-estrela" fill="#f8daa3">
            <path d="M93 66v18m-9-9h18" stroke="#f8daa3" strokeWidth="3" />
            <circle cx="367" cy="63" r="4" />
          </g>
        </svg>
      ) : (
        <CenaMissao id={id} className="mis-palco-svg" />
      )}
      <div className="mis-palco-rodape" />
      {id === "cafeteria" && <span className="mis-palco-vapor" />}
      {(id === "gatinho" || id === "castelo") && <span className="mis-palco-vagalume" />}
    </div>
  );
}
