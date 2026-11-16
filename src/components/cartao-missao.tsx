import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { LINGUAGENS_MISSAO, type LinguagemMissao, type Missao } from "@/lib/missoes";
import { CenaDeFundoMissao } from "./cena-de-fundo-missao";

const SELOS_MISSAO: Record<string, string> = {
  incendio: "🔥",
  cafeteria: "☕",
  abrigo: "🐾",
  nave: "🚀",
  laboratorio: "🧪",
  castelo: "🏰",
  farol: "🌊",
  biblioteca: "📚",
  robo: "🤖",
  jardim: "🌙",
  feira: "✨",
  pinguim: "🐧",
};

const DIFICULDADE: Record<Missao["nivel"], string> = {
  "Primeiros passos": "Iniciante",
  Desenvolvendo: "Intermediário",
  "Modelando dados": "Modelagem",
};

export function CartaoMissao({
  missao,
  recomendada,
  escolhida,
  linguagem,
}: {
  missao: Missao;
  recomendada: boolean;
  escolhida: boolean;
  linguagem: LinguagemMissao | "";
}) {
  return (
    <article className={`mis-card mis-tom-${missao.id}${escolhida ? " mis-card--escolhida" : ""}`}>
      <div className="mis-card-capa">
        <CenaDeFundoMissao id={missao.id} />
        <div className="mis-card-topicos">
          <span className="mis-capa-selo mis-capa-selo-missao">
            <span aria-hidden="true">{SELOS_MISSAO[missao.id] ?? "✨"}</span>
            Missão
          </span>
          <span className="mis-capa-selo mis-capa-selo-nivel">{DIFICULDADE[missao.nivel]}</span>
        </div>
      </div>
      <div className="mis-card-corpo">
        <h3>{missao.titulo}</h3>
        <p>{missao.chamada}</p>
        <div className="mis-card-linguagens" aria-label="Linguagens disponíveis">
          {LINGUAGENS_MISSAO.map((opcao) => (
            <span
              key={opcao.id}
              className={`mis-chip-linguagem mis-chip-${opcao.id}${linguagem === opcao.id ? " mis-chip-ativa" : ""}`}
              aria-label={`${opcao.nome}${linguagem === opcao.id ? " - minha escolha" : ""}`}
            >
              {opcao.id === "python" ? "🐍" : opcao.id === "java" ? "☕" : "●"} {opcao.nome}
            </span>
          ))}
        </div>
        <div className="mis-card-rodape">
          <Link className="mis-card-link" to="/missoes/$slug" params={{ slug: missao.id }}>
            Ver missão <ArrowRight size={18} aria-hidden="true" />
          </Link>
          {escolhida ? (
            <span className="mis-card-marcador" title="Você escolheu esta missão">
              <CheckCircle2 size={17} aria-hidden="true" />
              <span className="sr-only">Minha missão escolhida</span>
            </span>
          ) : recomendada ? (
            <span className="mis-card-marcador" title="Combina com seus interesses">
              <Sparkles size={17} aria-hidden="true" />
              <span className="sr-only">Combina com seus interesses</span>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
