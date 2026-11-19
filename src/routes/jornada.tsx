import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Coffee,
  Compass,
  ExternalLink,
  GitPullRequest,
  Rocket,
  ListChecks,
  Target,
  Vote,
} from "lucide-react";

import { EntradaGitHub } from "@/components/entrada-github";
import { MemberCard } from "@/components/community-ui";
import { CenaDoEstilo, ChatPreview, STYLES } from "@/components/style-picker";
import { ESTUDOS_URL } from "@/config";
import { aulasDaMissao } from "@/lib/aulas-missoes";
import { NOME_DO_ESTILO, pageHead } from "@/lib/community";
import { readSavedPassport } from "@/lib/draft";
import { linkDosMeusPRs, sair, useMembroAtual } from "@/lib/identidade";
import { LINGUAGENS_MISSAO, lerEscolhasMissoes, procurarMissao } from "@/lib/missoes";

export const Route = createFileRoute("/jornada")({
  head: () =>
    pageHead(
      "Minha jornada",
      "Seu painel na comunidade Unidunedev: o seu card no mural, a sua missão e o que estudar a seguir.",
    ),
  component: Jornada,
});

function Jornada() {
  const membro = useMembroAtual();
  const [escolhas] = useState(lerEscolhasMissoes);

  if (!membro) {
    return (
      <main className="content-page jornada">
        <p className="section-kicker">MINHA JORNADA</p>
        <h1 className="page-title">Primeiro, quem é você?</h1>
        <p className="section-subtitle">
          Digite o seu GitHub. Se você já está no mural, a sua jornada aparece aqui.
        </p>
        <div className="jornada-entrada">
          <EntradaGitHub onInscrever={() => (window.location.href = "/")} />
        </div>
      </main>
    );
  }

  const missao = escolhas.missaoId ? procurarMissao(escolhas.missaoId) : undefined;
  const linguagem = LINGUAGENS_MISSAO.find((l) => l.id === escolhas.linguagem);
  const aulas = missao ? aulasDaMissao(missao, escolhas.linguagem) : [];
  const primeiroNome = membro.nome.split(" ")[0];
  // O voto fica no card do mural; quem se inscreveu neste navegador também tem o passaporte guardado.
  const passaporte = readSavedPassport();
  const voto =
    membro.estilo ?? (passaporte?.github === membro.github ? passaporte.estilo : undefined);
  const estilo = voto ? STYLES.find((s) => s.id === voto) : undefined;

  return (
    <main className="content-page jornada">
      <header className="jornada-topo">
        <img className="jornada-avatar" src={membro.avatar} alt="" width={72} height={72} />
        <div>
          <p className="section-kicker">MINHA JORNADA</p>
          <h1 className="page-title">Oi, {primeiroNome} ☕</h1>
          <p className="jornada-usuario">
            @{membro.github}
            <button type="button" className="entrada-link" onClick={sair}>
              Não é você?
            </button>
          </p>
        </div>
      </header>

      <ol className="jornada-trilha" aria-label="Etapas da sua jornada">
        <li className="jornada-etapa jornada-etapa--feita">
          <span className="jornada-numero" aria-hidden="true">
            <Check size={16} />
          </span>
          <div className="jornada-etapa-corpo">
            <p className="jornada-etapa-rotulo">Desafio 1 · Entrar na comunidade</p>
            <h2>Você está no mural!</h2>
            <p>O seu primeiro Pull Request foi aprovado. Esse é o seu card:</p>
            <div className="jornada-card">
              <MemberCard member={membro} />
            </div>
            <div className="jornada-acoes">
              <Link to="/mural" className="entrada-botao entrada-botao--leve">
                Ver o mural
              </Link>
              <a
                className="entrada-botao entrada-botao--leve"
                href={linkDosMeusPRs(membro.github)}
                target="_blank"
                rel="noreferrer"
              >
                <GitPullRequest size={15} aria-hidden="true" /> Meus PRs{" "}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </li>

        <li className={`jornada-etapa ${missao ? "jornada-etapa--atual" : ""}`}>
          <span className="jornada-numero" aria-hidden="true">
            2
          </span>
          <div className="jornada-etapa-corpo">
            <p className="jornada-etapa-rotulo">Desafio 2 · Sua primeira missão</p>
            {missao ? (
              <>
                <div className="jornada-missao">
                  <img
                    src={`/missoes/capas/thumbs/${missao.id}.webp`}
                    alt=""
                    width={120}
                    height={120}
                  />
                  <div>
                    <h2>{missao.titulo}</h2>
                    <p>{missao.chamada}</p>
                    <p className="jornada-meta">
                      <span>{missao.nivel}</span>
                      {linguagem && <span>{linguagem.nome}</span>}
                    </p>
                  </div>
                </div>

                <div className="jornada-tarefa">
                  <h3>
                    <Target size={15} aria-hidden="true" /> Sua tarefa
                  </h3>
                  <p>
                    {missao.objetivo}
                    {linguagem ? ` Você vai escrever em ${linguagem.nome}.` : ""}
                  </p>

                  <h3>
                    <ListChecks size={15} aria-hidden="true" /> O que fazer, passo a passo
                  </h3>
                  <ol className="jornada-passos">
                    {missao.passos.map((passo) => (
                      <li key={passo}>{passo}</li>
                    ))}
                  </ol>

                  <details className="jornada-pronto">
                    <summary>Como sei que terminei?</summary>
                    <ul>
                      {missao.criterios.map((criterio) => (
                        <li key={criterio}>
                          <Check size={14} aria-hidden="true" /> {criterio}
                        </li>
                      ))}
                    </ul>
                    <p>
                      <strong>Quer ir além?</strong> {missao.extra}
                    </p>
                  </details>
                </div>

                <div className="jornada-acoes">
                  <Link to="/missoes/$slug" params={{ slug: missao.id }} className="entrada-botao">
                    Continuar a missão <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link
                    to="/missoes"
                    search={{ etapa: "historias" }}
                    className="entrada-botao entrada-botao--leve"
                  >
                    Trocar de missão
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2>Escolha a sua primeira missão</h2>
                <p>
                  Cinco histórias pequenas (um gatinho, uma cafeteria, uma nave...). Você escolhe
                  uma, a linguagem, e constrói no seu ritmo.
                </p>
                <div className="jornada-acoes">
                  <Link to="/missoes" search={{ etapa: "historias" }} className="entrada-botao">
                    <Rocket size={15} aria-hidden="true" /> Ver as missões
                  </Link>
                </div>
              </>
            )}
          </div>
        </li>

        <li className="jornada-etapa">
          <span className="jornada-numero" aria-hidden="true">
            3
          </span>
          <div className="jornada-etapa-corpo">
            <p className="jornada-etapa-rotulo">Café de Estudos · O que estudar</p>
            {aulas.length > 0 ? (
              <>
                <h2>Aulas para a sua missão</h2>
                <p>
                  {linguagem
                    ? `Na trilha de ${linguagem.nome}, na ordem em que você vai precisar:`
                    : "Escolha a linguagem na missão para ver a trilha certa. Por enquanto, a base de lógica:"}
                </p>
                <ul className="jornada-aulas">
                  {aulas.map((aula) => (
                    <li key={aula.url}>
                      <a href={aula.url} target="_blank" rel="noreferrer">
                        <BookOpen size={15} aria-hidden="true" />
                        <span>
                          <strong>{aula.titulo}</strong>
                          <small>para: {aula.conceito}</small>
                        </span>
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>Um cantinho para estudar</h2>
                <p>Aulas curtas de lógica e linguagens, com música lofi e pomodoro. Sem pressa.</p>
              </>
            )}
            <div className="jornada-acoes">
              <a
                className="entrada-botao entrada-botao--leve"
                href={ESTUDOS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <Coffee size={15} aria-hidden="true" /> Abrir o Café de Estudos
              </a>
            </div>
          </div>
        </li>
      </ol>

      <section className="jornada-voto" aria-labelledby="jornada-voto-titulo">
        <p className="section-kicker">O PROJETO QUE VAMOS CONSTRUIR JUNTOS</p>
        {estilo ? (
          <>
            <h2 id="jornada-voto-titulo">
              Você votou no estilo <em>{NOME_DO_ESTILO[estilo.id]}</em>
            </h2>
            <p>
              Lá na inscrição, você ajudou a escolher a cara do app que a comunidade vai criar. Esse
              é o chat do jeitinho que você votou. Quando o projeto começar, a galera toda vai
              colocar a mão no código, inclusive você. O estilo final sai da soma dos votos.
            </p>
            <div className={`voto-vitrine ${estilo.className}`}>
              <CenaDoEstilo id={estilo.id} />
              <span className="voto-selo">
                <Vote size={14} aria-hidden="true" /> Seu voto
              </span>
              <div className="voto-chat">
                <ChatPreview style={estilo.id} projectName="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 id="jornada-voto-titulo">O seu voto no estilo do projeto</h2>
            <p>
              Na inscrição, você votou na cara do app que a comunidade vai criar junta. O seu card é
              de antes de o voto aparecer no mural, então ele ainda não aparece aqui. Assim que o
              seu card for atualizado, o chat no estilo que você escolheu aparece neste espaço.
            </p>
          </>
        )}
      </section>

      <p className="jornada-nota">
        <Compass size={14} aria-hidden="true" /> A sua missão e a linguagem ficam guardadas neste
        navegador.
      </p>
    </main>
  );
}
