import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Github,
  HeartHandshake,
  Lightbulb,
  ListChecks,
} from "lucide-react";

import { CenaMissao } from "@/components/cena-missao";
import { ESTUDOS_URL, REPO_URL } from "@/config";
import { pageHead } from "@/lib/community";
import {
  lerEscolhasMissoes,
  LINGUAGENS_MISSAO,
  procurarMissao,
  salvarEscolhasMissoes,
} from "@/lib/missoes";

export const Route = createFileRoute("/missoes/$slug")({
  head: () =>
    pageHead(
      "Uma missão para resolver",
      "Conheça o problema, pratique uma linguagem de programação e construa seu projeto no Desafio 2 da Unidunedev.",
    ),
  component: DetalhesDaMissao,
});

function DetalhesDaMissao() {
  const { slug } = Route.useParams();
  const missao = procurarMissao(slug);
  const [escolhas, setEscolhas] = useState(lerEscolhasMissoes);

  if (!missao) {
    return (
      <main className="mis-pagina">
        <p className="mis-eyebrow">MISSÃO NÃO ENCONTRADA</p>
        <h1 className="page-title">Essa história ainda não existe por aqui.</h1>
        <p className="section-subtitle">Que tal escolher outra missão no nosso cardápio?</p>
        <Link to="/missoes" className="mis-botao-secundario" style={{ marginTop: 24 }}>
          <ArrowLeft size={16} aria-hidden="true" /> Voltar às missões
        </Link>
      </main>
    );
  }

  const linguagem = LINGUAGENS_MISSAO.find((opcao) => opcao.id === missao.linguagem);
  const escolhida = escolhas.missaoId === missao.id;
  const linkEstudos = linguagem?.trilha ? `${ESTUDOS_URL}/${linguagem.trilha}` : ESTUDOS_URL;

  function aceitar() {
    const novas = { ...escolhas, missaoId: missao!.id };
    setEscolhas(novas);
    salvarEscolhasMissoes(novas);
  }

  return (
    <main className="mis-pagina">
      <Link to="/missoes" className="mis-voltar">
        <ArrowLeft size={15} aria-hidden="true" /> Voltar ao cardápio de missões
      </Link>

      <header className={`mis-detalhe-hero mis-tom-${missao.id}`}>
        <div>
          <p className="mis-eyebrow">
            DESAFIO 02 · {linguagem?.nome ?? "PROGRAMAÇÃO"} · {missao.nivel}
          </p>
          <h1>{missao.titulo}</h1>
          <p>{missao.chamada}</p>
        </div>
        <CenaMissao id={missao.id} />
      </header>

      <div className="mis-detalhe-grid">
        <div className="mis-detalhe-main">
          <section className="mis-bloco">
            <p className="mis-eyebrow">A HISTÓRIA</p>
            <h2>O que está acontecendo?</h2>
            <p>{missao.historia}</p>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">SUA MISSÃO</p>
            <h2>O que você vai construir?</h2>
            <p>{missao.objetivo}</p>
            <div className="mis-tags">
              {missao.conceitos.map((conceito) => (
                <span key={conceito}>{conceito}</span>
              ))}
            </div>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">UM PASSO DE CADA VEZ</p>
            <h2>Seu roteiro de desenvolvimento</h2>
            <ol>
              {missao.passos.map((passo) => (
                <li key={passo}>{passo}</li>
              ))}
            </ol>
            <p className="mis-alerta">
              Não existe código pronto aqui: a ideia é tentar, consultar suas anotações, testar e
              descobrir como resolver. Você pode dividir o projeto em pequenas partes.
            </p>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">COMO SABER SE FUNCIONOU?</p>
            <h2>Checklist da missão</h2>
            <ul>
              {missao.criterios.map((criterio) => (
                <li key={criterio}>{criterio}</li>
              ))}
            </ul>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">SE QUISER IR UM POUCO ALÉM</p>
            <h2>Uma missão extra, sem pressa</h2>
            <p>{missao.extra}</p>
          </section>
        </div>

        <aside className="mis-detalhe-lado">
          <section className="mis-bloco mis-bloco-escuro">
            <p className="mis-eyebrow" style={{ color: "#f1c59e" }}>
              SEU PRÓXIMO PASSO
            </p>
            <h2>Quer ajudar nessa missão?</h2>
            <p>
              Escolher não exige cadastro nem entrar em grupo. A missão ficará marcada neste
              navegador, e você poderá voltar a ela quando quiser.
            </p>
            <button type="button" className="mis-botao-primario" onClick={aceitar}>
              {escolhida ? <CheckCircle2 size={17} /> : <HeartHandshake size={17} />}
              {escolhida ? "Missão escolhida!" : "Quero ajudar nesta missão"}
            </button>
            {escolhida && (
              <p className="mis-aceita" role="status">
                ✨ Sua escolha foi guardada neste navegador. Agora é hora de construir!
              </p>
            )}
            <a className="mis-botao-secundario" href={linkEstudos} target="_blank" rel="noreferrer">
              <BookOpen size={17} aria-hidden="true" />
              {linguagem?.trilha
                ? `Revisar ${linguagem.nome} no Café`
                : "Revisar fundamentos no Café"}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </section>

          <section className="mis-bloco">
            <p className="mis-eyebrow">
              <ListChecks size={14} style={{ display: "inline" }} /> ENTREGA DO DESAFIO 02
            </p>
            <h2>Compartilhe seu projeto</h2>
            <p>
              Quando terminar, crie um repositório no seu GitHub, envie o código e escreva um README
              com o que a missão faz, como executar e o que você aprendeu.
            </p>
            <ol>
              <li>Crie um repositório público para o projeto.</li>
              <li>Envie o código e pelo menos um exemplo de uso.</li>
              <li>Explique como executar no README.</li>
              <li>Guarde o link para compartilhar com a comunidade.</li>
            </ol>
            <div className="mis-entrega-acoes">
              <a
                className="mis-botao-secundario"
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} aria-hidden="true" /> Criar repositório{" "}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a className="mis-botao-sutil" href={REPO_URL} target="_blank" rel="noreferrer">
                Conhecer a Unidunedev <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
            <p style={{ marginTop: 14 }}>
              Por enquanto, a escolha é local e não envia a atividade automaticamente. A entrega e a
              formação de equipes serão organizadas pela comunidade.
            </p>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">
              <Lightbulb size={14} style={{ display: "inline" }} /> LEMBRETE
            </p>
            <h2>Não precisa resolver tudo hoje</h2>
            <p>
              Você pode começar pelo programa mais simples possível e melhorar um pouco depois.
              Aprender é testar, errar, ajustar e tentar de novo.
            </p>
            <Link to="/missoes" className="mis-botao-sutil" style={{ marginTop: 19 }}>
              Ver outras missões <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
