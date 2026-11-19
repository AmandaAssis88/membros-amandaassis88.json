import { useId, useState, type ReactNode } from "react";

/*
 * Blocos de memorização usados nas aulas longas:
 * - Aquecimento: lembrar ANTES de reler (prática de recuperação).
 * - Chute: tentar responder antes de aprender (o erro prepara o cérebro para a resposta).
 * - Explique: colocar em palavras próprias (elaboração).
 * - Cartoes: frente e verso para revisar depois (revisão espaçada).
 */

type Pergunta = { p: string; r: string };

export function Aquecimento({ perguntas }: { perguntas: Pergunta[] }) {
  return (
    <section className="memo memo-aquecimento">
      <p className="memo-selo">🔥 Aquecendo a memória</p>
      <p className="memo-intro">
        Antes de começar, tente responder <b>de cabeça</b>, sem voltar na aula anterior. Puxar da
        memória fixa muito mais do que reler. Errar aqui faz parte.
      </p>
      <ol className="memo-perguntas">
        {perguntas.map((q) => (
          <li key={q.p}>
            <details>
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Chute({ pergunta, children }: { pergunta: string; children: ReactNode }) {
  return (
    <section className="memo memo-chute">
      <p className="memo-selo">🎯 Chute primeiro</p>
      <p className="memo-pergunta">{pergunta}</p>
      <p className="memo-intro">
        Ainda não sabe? Ótimo. Dê um palpite antes de abrir: tentar responder antes de aprender faz
        a explicação grudar melhor.
      </p>
      <details className="memo-revelar">
        <summary>Ver a resposta</summary>
        <div>{children}</div>
      </details>
    </section>
  );
}

export function Explique({ pergunta, children }: { pergunta: string; children: ReactNode }) {
  const id = useId();
  const [texto, setTexto] = useState("");
  return (
    <section className="memo memo-explique">
      <p className="memo-selo">🗣️ Explique com suas palavras</p>
      <label className="memo-pergunta" htmlFor={id}>
        {pergunta}
      </label>
      <textarea
        id={id}
        rows={3}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva como se explicasse para um colega. Não fica salvo, é só para você."
      />
      <details className="memo-revelar">
        <summary>{texto.trim() ? "Comparar com a nossa explicação" : "Ver uma explicação"}</summary>
        <div>{children}</div>
      </details>
    </section>
  );
}

export function Cartoes({ itens }: { itens: { frente: string; verso: string }[] }) {
  const [virados, setVirados] = useState<number[]>([]);
  const alternar = (i: number) =>
    setVirados((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  return (
    <section className="memo memo-cartoes">
      <p className="memo-selo">🃏 Cartões de revisão</p>
      <p className="memo-intro">
        Leia a frente, responda em voz alta e só então vire. Quando marcar a aula como concluída,
        ela entra na sua agenda de revisão: amanhã, em 3, 7 e 14 dias.
      </p>
      <div className="memo-grade">
        {itens.map((c, i) => {
          const virado = virados.includes(i);
          return (
            <button
              type="button"
              key={c.frente}
              className={`memo-cartao ${virado ? "virado" : ""}`}
              onClick={() => alternar(i)}
              aria-pressed={virado}
            >
              <span className="memo-cartao-lado">{virado ? "verso" : "frente"}</span>
              <span className="memo-cartao-texto">{virado ? c.verso : c.frente}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
