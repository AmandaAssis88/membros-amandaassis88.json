import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Compass, GitPullRequest, Sparkles, Users } from "lucide-react";

import { CartaoMissao } from "@/components/cartao-missao";
import { CenaMissao } from "@/components/cena-missao";
import { AREAS, pageHead } from "@/lib/community";
import { readSavedPassport } from "@/lib/draft";
import {
  eAreaMissao,
  eLinguagemMissao,
  lerEscolhasMissoes,
  LINGUAGENS_MISSAO,
  listarMissoes,
  salvarEscolhasMissoes,
  type EscolhasMissoes,
} from "@/lib/missoes";

export const Route = createFileRoute("/missoes/")({
  head: () =>
    pageHead(
      "Missões da Comunidade",
      "Escolha uma linguagem, descubra uma missão divertida e construa seu primeiro projeto no Desafio 2 da Unidunedev.",
    ),
  component: MissoesDaComunidade,
});

function MissoesDaComunidade() {
  const [escolhas, setEscolhas] = useState(lerEscolhasMissoes);
  const [passaporte] = useState(readSavedPassport);

  const encontradas = listarMissoes(escolhas.area);
  const selecionada = encontradas.find((missao) => missao.id === escolhas.missaoId);
  const total = encontradas.length;

  function atualizarEscolhas(atualizacao: Partial<EscolhasMissoes>) {
    const novas = { ...escolhas, ...atualizacao };
    setEscolhas(novas);
    salvarEscolhasMissoes(novas);
  }

  return (
    <main className="mis-pagina">
      <section className="mis-hero">
        <div className="mis-hero-conteudo">
          <p className="mis-eyebrow">☕ UNIDUNEDEV · MISSÕES DA COMUNIDADE</p>
          <h1>
            Um problema apareceu.
            <br />
            <em>Seu código pode ajudar.</em>
          </h1>
          <p>
            Tem um castelo sem suprimentos, uma cafeteria com pedidos bagunçados e até bombeirinhos
            precisando de uma calculadora. Escolha o que chama sua atenção, aprenda no seu ritmo e
            construa algo para resolver a situação.
          </p>
          <div className="mis-hero-acoes">
            <a className="mis-botao-primario" href="#catalogo-missoes">
              Explorar missões <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mis-hero-deco" aria-hidden="true">
          <CenaMissao id="incendio" />
        </div>
      </section>

      <section className="mis-jornada" aria-labelledby="mis-desafios-titulo">
        <div className="mis-titulo-secao">
          <p className="mis-eyebrow">POR ONDE COMEÇAR?</p>
          <h2 id="mis-desafios-titulo">Dois desafios. Você escolhe seu caminho.</h2>
          <p>
            Chegou agora? O primeiro desafio continua disponível para colocar seu perfil no mural.
            Quer começar a programar? Explore as missões do segundo desafio. Você pode conhecer os
            dois sem precisar seguir uma ordem rígida.
          </p>
        </div>
        <div className="mis-jornada-grid">
          <article className="mis-etapa">
            <span className="mis-etapa-icone">
              <GitPullRequest size={22} />
            </span>
            <p className="mis-eyebrow">DESAFIO 01 · SEU PRIMEIRO PR</p>
            <h3>Seu lugar no mural</h3>
            <p>
              Crie seu perfil, aprenda a abrir um Pull Request e apareça com a galera. É um ótimo
              primeiro contato com o GitHub.
            </p>
            <Link to="/desafio-pr" search={{ nivel: "1" }} className="mis-botao-secundario">
              Conhecer o Desafio 1 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article className="mis-etapa mis-etapa-principal">
            <span className="mis-etapa-icone">
              <Sparkles size={22} />
            </span>
            <p className="mis-eyebrow">DESAFIO 02 · MEU PRIMEIRO PROJETO</p>
            <h3>Uma missão para chamar de sua</h3>
            <p>
              Escolha uma linguagem, encontre um problema divertido e publique um pequeno projeto no
              GitHub. Pode começar individualmente, sem precisar formar equipe.
            </p>
            <a href="#catalogo-missoes" className="mis-botao-primario">
              Escolher uma missão <ArrowRight size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="mis-escolha" aria-labelledby="mis-escolha-titulo">
        <div className="mis-escolha-topo">
          <div>
            <p className="mis-eyebrow">MONTE SEU CAMINHO</p>
            <h2 id="mis-escolha-titulo">
              {passaporte?.nome
                ? `O que vamos explorar, ${passaporte.nome.split(" ")[0]}?`
                : "O que você quer explorar?"}
            </h2>
            <p>
              A carreira é só um interesse por enquanto. Todas as 12 missões podem ser feitas em
              C, Python ou Java: a linguagem muda as dicas e a forma de organizar seu programa,
              mas você continua livre para escolher qualquer projeto.
            </p>
          </div>
          <span className="mis-escolha-detalhe">
            <Compass size={15} aria-hidden="true" /> Suas escolhas ficam neste navegador
          </span>
        </div>
        <div className="mis-filtros">
          <div className="mis-filtro">
            <label htmlFor="mis-area">Qual área desperta sua curiosidade?</label>
            <select
              id="mis-area"
              className="mis-select"
              value={escolhas.area}
              onChange={(evento) => {
                const valor = evento.target.value;
                atualizarEscolhas({ area: eAreaMissao(valor) ? valor : "" });
              }}
            >
              <option value="">Quero conhecer todas</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="mis-filtro">
            <label htmlFor="mis-linguagem">Em qual linguagem você quer resolver?</label>
            <select
              id="mis-linguagem"
              className="mis-select"
              value={escolhas.linguagem}
              onChange={(evento) => {
                const valor = evento.target.value;
                atualizarEscolhas({ linguagem: eLinguagemMissao(valor) ? valor : "" });
              }}
            >
              <option value="">Vou escolher dentro da missão</option>
              {LINGUAGENS_MISSAO.map((linguagem) => (
                <option key={linguagem.id} value={linguagem.id}>
                  {linguagem.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selecionada && (
          <div className="mis-selecao-atual" role="status">
            <span>
              ☕ Sua missão escolhida: <strong>{selecionada.titulo}</strong>
            </span>
            <Link to="/missoes/$slug" params={{ slug: selecionada.id }}>
              Continuar lendo a missão
            </Link>
          </div>
        )}
      </section>

      <section className="mis-catalogo" id="catalogo-missoes" aria-labelledby="mis-catalogo-titulo">
        <div className="mis-catalogo-topo">
          <div className="mis-titulo-secao">
            <p className="mis-eyebrow">CARDÁPIO DE MISSÕES</p>
            <h2 id="mis-catalogo-titulo">Qual história você vai resolver?</h2>
            <p>
              Escolha pela história que despertou sua curiosidade. Depois você decide se vai usar
              C, Python ou Java e recebe pistas específicas, sem código pronto.
            </p>
          </div>
          <strong>
            {total} {total === 1 ? "missão disponível" : "missões disponíveis"}
          </strong>
        </div>
        <div className="mis-grid">
          {encontradas.map((missao) => (
            <CartaoMissao
              key={missao.id}
              missao={missao}
              recomendada={Boolean(
                escolhas.area &&
                escolhas.area !== "Ainda não sei" &&
                missao.areas.includes(escolhas.area),
              )}
              escolhida={missao.id === escolhas.missaoId}
              linguagem={escolhas.linguagem}
            />
          ))}
        </div>
      </section>

      <aside className="mis-proxima-fase" aria-labelledby="mis-esquadroes-titulo">
        <span className="mis-proxima-icone">
          <Users size={30} aria-hidden="true" />
        </span>
        <div>
          <p className="mis-eyebrow">PRÓXIMAS MISSÕES</p>
          <h2 id="mis-esquadroes-titulo">E se a próxima aventura for em equipe?</h2>
          <p>
            Estamos planejando esquadrões pequenos, com nomes como Fox e Zeus, para projetos
            futuros. As vagas, os colegas e os convites de WhatsApp só aparecerão quando houver
            inscrições reais e grupos organizados pela comunidade.
          </p>
        </div>
      </aside>

      <div className="mis-home-atalho" style={{ marginTop: 28 }}>
        <div>
          <h3>Quer revisar antes de começar?</h3>
          <p>O Café de Estudos está aberto para você voltar aos fundamentos quando quiser.</p>
        </div>
        <a
          className="mis-botao-secundario"
          href="https://estudos.unidunedev.workers.dev"
          target="_blank"
          rel="noreferrer"
        >
          <BookOpen size={16} aria-hidden="true" /> Abrir Café de Estudos
        </a>
      </div>
    </main>
  );
}
