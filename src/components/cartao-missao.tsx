import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

import { LINGUAGENS_MISSAO, type Missao } from "@/lib/missoes";
import { CenaMissao } from "./cena-missao";

export function CartaoMissao({
  missao,
  recomendada,
  escolhida,
}: {
  missao: Missao;
  recomendada: boolean;
  escolhida: boolean;
}) {
  const linguagem = LINGUAGENS_MISSAO.find((opcao) => opcao.id === missao.linguagem);
  return (
    <article
      className={`mis-card mis-tom-${missao.id}${escolhida ? " mis-card--escolhida" : ""}`}
    >
      <div className="mis-card-capa">
        <div className="mis-card-topicos">
          <span className="mis-capa-selo">{linguagem?.nome ?? "Código"}</span>
          <span className="mis-capa-selo">{missao.nivel}</span>
        </div>
        <CenaMissao id={missao.id} />
      </div>
      <div className="mis-card-corpo">
        <span className="mis-card-meta">DESAFIO 02 · MISSÃO</span>
        <h3>{missao.titulo}</h3>
        <p>{missao.chamada}</p>
        <div className="mis-tags" aria-label="Conceitos trabalhados">
          {missao.conceitos.slice(0, 3).map((conceito) => (
            <span key={conceito}>{conceito}</span>
          ))}
        </div>
        <div className="mis-card-rodape">
          <Link className="mis-card-link" to="/missoes/$slug" params={{ slug: missao.id }}>
            Ver a missão <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {escolhida ? (
            <span className="mis-card-recomendado">
              <CheckCircle2 size={12} style={{ display: "inline", verticalAlign: "middle" }} /> Minha escolha
            </span>
          ) : recomendada ? (
            <span className="mis-card-recomendado">
              <Sparkles size={12} style={{ display: "inline", verticalAlign: "middle" }} /> Combina com você
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
