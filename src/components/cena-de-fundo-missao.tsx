import { useState } from "react";

import { CenaMissao } from "./cena-missao";

/**
 * Imagem estática + efeitos CSS/SVG em camada independente.
 * Se um arquivo de imagem não estiver disponível, a ilustração SVG anterior
 * continua visível. Isso também permite revisar os cards sem publicar assets.
 */
export function CenaDeFundoMissao({ id }: { id: string }) {
  const [imagemIndisponivel, setImagemIndisponivel] = useState(false);

  return (
    <div className="mis-cena-fundo" data-cena={id} aria-hidden="true">
      {imagemIndisponivel ? (
        <CenaMissao id={id} className="mis-cena-reserva" />
      ) : (
        <img
          className="mis-cena-imagem"
          src={`/missoes/capas/${id}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImagemIndisponivel(true)}
        />
      )}
      <div className="mis-cena-ambiente">
        <span className="mis-luz mis-luz-1" />
        <span className="mis-luz mis-luz-2" />
        <span className="mis-luz mis-luz-3" />
        <span className="mis-luz mis-luz-4" />
        <span className="mis-luz mis-luz-5" />
        <span className="mis-luz mis-luz-6" />
        <svg className="mis-efeito-svg" viewBox="0 0 300 190" preserveAspectRatio="none" focusable="false">
          <path className="mis-efeito-curva" d="M202 130Q184 106 205 80T206 38" />
          <path className="mis-efeito-curva mis-efeito-curva-2" d="M234 161Q259 128 231 97T253 47" />
          <path className="mis-efeito-ondinha" d="M52 138Q94 126 132 139T210 133" />
        </svg>
      </div>
    </div>
  );
}
