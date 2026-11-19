import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Bebida } from "../components/bebida";
import { CantinhoEstudos } from "../cantinho/cantinho";
import { ParticulasDoAmbiente } from "../cantinho/particulas";
import { CHAVE_TEMA, TEMA_PADRAO, normalizarTema, type TemaId } from "../cantinho/temas";
import { MiniPlayer } from "../components/mini-player";
import { HoraDeRevisar } from "../components/hora-de-revisar";
import { CRIADOR } from "@/config";
import {
  GRUPOS,
  ONBOARDING_URL,
  PESOS,
  TRILHAS,
  duracao,
  minutosDaTrilha,
  type Trilha,
} from "../catalogo";
import { idDaAula, useConcluidas } from "../progresso";

function CartaoTrilha({ trilha, concluidas }: { trilha: Trilha; concluidas: string[] }) {
  const feitas = trilha.aulas.filter((a) => concluidas.includes(idDaAula(trilha.id, a.slug)));
  const pct = Math.round((feitas.length / trilha.aulas.length) * 100);
  return (
    <Link
      to="/$trilha"
      params={{ trilha: trilha.id }}
      className="cartao-trilha"
      data-trilha={trilha.id}
    >
      <span className="cartao-bebida">
        <Bebida trilha={trilha.id} tamanho={92} />
      </span>
      <span className="cartao-texto">
        <span className="cartao-kicker">{trilha.bebida}</span>
        <span className="cartao-nome">{trilha.nome}</span>
        <span className="cartao-frase">{trilha.frase}</span>
        <span className="cartao-meta">
          {trilha.peso && (
            <span className="cartao-peso">
              {PESOS[trilha.peso].icone} {PESOS[trilha.peso].rotulo} ·{" "}
            </span>
          )}
          {trilha.aulas.length} aulas · {duracao(minutosDaTrilha(trilha))}
          {feitas.length > 0 && ` · ${feitas.length} feita${feitas.length > 1 ? "s" : ""}`}
        </span>
        <span className="cartao-progresso" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </span>
      </span>
      <ArrowRight className="cartao-seta" size={18} />
    </Link>
  );
}

const MAPA = [
  { id: "cardapio", icone: "☕", nome: "Balcão" },
  { id: "acucareiro", icone: "🧊", nome: "Açucareiro" },
  { id: "mesa", icone: "🍽️", nome: "Mesa posta" },
  { id: "profissoes", icone: "🥐", nome: "Padaria" },
  { id: "cozinha", icone: "👨‍🍳", nome: "Cozinha" },
  { id: "para-viagem", icone: "🛍️", nome: "Para viagem" },
  { id: "salao", icone: "🪑", nome: "Salão" },
];

const SALAO = [
  {
    icone: "🧑‍🤝‍🧑",
    nome: "Mural da galera",
    texto: "Quem já entrou na comunidade.",
    url: `${ONBOARDING_URL}/mural`,
  },
  {
    icone: "🚀",
    nome: "Missões",
    texto: "Histórias pequenas para programar de verdade.",
    url: `${ONBOARDING_URL}/missoes`,
  },
  {
    icone: "🧭",
    nome: "Minha jornada",
    texto: "Onde você está e o próximo passo.",
    url: `${ONBOARDING_URL}/jornada`,
  },
];

function EmBreve({
  itens,
  centralizado = false,
  largo = false,
}: {
  itens: { icone: string; nome: string; item: string }[];
  centralizado?: boolean;
  /** Duas colunas largas, alinhadas com uma grade larga logo acima */
  largo?: boolean;
}) {
  return (
    <ul
      className={`em-breve ${centralizado ? "em-breve--centralizado" : ""} ${largo ? "em-breve--largo" : ""}`}
      aria-label="Trilhas que estão chegando"
    >
      {itens.map((i) => (
        <li key={i.nome}>
          <span aria-hidden="true">{i.icone}</span>
          <span>
            <b>{i.nome}</b>
            <small>{i.item}</small>
          </span>
          <em>em breve</em>
        </li>
      ))}
    </ul>
  );
}

const grupoDe = (id: Trilha["grupo"]) => GRUPOS.find((g) => g.id === id)!;

// Algoritmos fica fora da grade, centralizado logo abaixo, como o próximo passo depois da base.
const TRILHA_EM_DESTAQUE = "algoritmos";

function GrupoDoCardapio({
  grupo,
  concluidas,
  centralizado = false,
  largo = false,
}: {
  grupo: (typeof GRUPOS)[number];
  concluidas: string[];
  /** Cartões largos, um embaixo do outro, como passos de um roteiro */
  centralizado?: boolean;
  /** Duas colunas largas, para o texto caber sem quebrar */
  largo?: boolean;
}) {
  const trilhas = TRILHAS.filter((t) => t.grupo === grupo.id && t.id !== TRILHA_EM_DESTAQUE);
  if (trilhas.length === 0) return null;
  return (
    <div className="cardapio-grupo">
      <p className="cardapio-pasta">
        <span aria-hidden="true">📁</span> {grupo.pasta}
        <small>{grupo.texto}</small>
      </p>
      <div
        className={
          centralizado
            ? "cardapio-roteiro"
            : `cardapio-grade ${largo ? "cardapio-grade--larga" : ""}`
        }
      >
        {trilhas.map((t) => (
          <CartaoTrilha key={t.id} trilha={t} concluidas={concluidas} />
        ))}
      </div>
    </div>
  );
}

export function Inicio() {
  const concluidas = useConcluidas();
  const destaque = TRILHAS.find((t) => t.id === TRILHA_EM_DESTAQUE);
  const [tema, setTema] = useState<TemaId>(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_TEMA);
      return normalizarTema(salvo);
    } catch {
      return TEMA_PADRAO;
    }
  });

  function escolherTema(novo: TemaId) {
    setTema(novo);
    try {
      localStorage.setItem(CHAVE_TEMA, novo);
    } catch {
      // A personalização funciona mesmo sem armazenamento persistente.
    }
  }
  useEffect(() => {
    document.title = "Estudos · Unidunedev";
  }, []);

  return (
    <main className="home-personalizada" data-tema={tema}>
      <section className="home-hero">
        <div className="home-capa-imagem" aria-hidden="true" />
        <ParticulasDoAmbiente tema={tema} />
        <MiniPlayer />
        <div className="home-hero-texto">
          <p className="kicker">☕ CAFÉ DE ESTUDOS DA UNIDUNEDEV</p>
          <h1>
            Aprenda do zero, com calma e <em>sem cobranças</em>.
          </h1>
          <p>
            Escolha uma bebida do cardápio. Cada trilha é uma introdução com exemplos para copiar e
            testar. Quando quiser praticar de verdade, os desafios esperam por você no GitHub.
          </p>
          <div className="home-hero-botoes">
            <Link to="/$trilha" params={{ trilha: "fundamentos" }} className="botao botao-claro">
              Começar pelos fundamentos <ArrowRight size={16} />
            </Link>
            <a href="#cardapio" className="botao botao-fantasma">
              Ver o cardápio <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>

      <CantinhoEstudos tema={tema} onTemaChange={escolherTema} />

      <HoraDeRevisar />

      <section className="cardapio secao-cafe" id="cardapio">
        <div className="secao-topo">
          <p className="kicker">☕ BALCÃO DE BEBIDAS</p>
          <h2>O que vai ser hoje?</h2>
          <p>A base, para tomar todo dia. Quem está começando pede o café coado.</p>
        </div>
        <ul className="mapa-cafe" aria-label="Partes da cafeteria">
          {MAPA.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`}>
                <span aria-hidden="true">{m.icone}</span> {m.nome}
              </a>
            </li>
          ))}
        </ul>
        <div className="cardapio-base">
          {GRUPOS.filter((g) => g.id === "fundamentos" || g.id === "disciplinas").map((g) => (
            <GrupoDoCardapio key={g.id} grupo={g} concluidas={concluidas} />
          ))}
        </div>
        {destaque && (
          <div className="cardapio-proximo-passo">
            <span className="cardapio-conector" aria-hidden="true" />
            <CartaoTrilha trilha={destaque} concluidas={concluidas} />
          </div>
        )}
        <GrupoDoCardapio grupo={grupoDe("linguagens")} concluidas={concluidas} />
      </section>

      <section className="cardapio secao-cafe" id="acucareiro">
        <div className="secao-topo">
          <p className="kicker">🧊 AÇUCAREIRO</p>
          <h2>Para adoçar qualquer bebida</h2>
          <p>Jeitos de organizar o código que valem em qualquer linguagem.</p>
        </div>
        <GrupoDoCardapio grupo={grupoDe("paradigmas")} concluidas={concluidas} centralizado />
        <span className="cardapio-conector cardapio-conector--centro" aria-hidden="true" />
        <EmBreve
          centralizado
          itens={[{ icone: "🍯", nome: "Programação funcional", item: "Mel: puro, não muda" }]}
        />
      </section>

      <section className="cardapio mesa secao-cafe" id="mesa">
        <div className="secao-topo">
          <p className="kicker">🍽️ A MESA POSTA</p>
          <h2>Antes de servir, os talheres</h2>
          <p>
            As ferramentas de todo dia. Toda profissão da padaria usa essas, então vale aprender
            antes de entrar numa equipe.
          </p>
        </div>
        <GrupoDoCardapio grupo={grupoDe("ferramentas")} concluidas={concluidas} largo />
        <EmBreve
          largo
          itens={[
            { icone: "🔪", nome: "Terminal e Linux", item: "A faca do chef" },
            { icone: "🥄", nome: "Testes e depuração", item: "A colher de prova" },
          ]}
        />
      </section>

      <section className="cardapio padaria secao-cafe" id="profissoes">
        <div className="secao-topo">
          <p className="kicker">🥐 PADARIA DAS PROFISSÕES</p>
          <h2>E pra acompanhar?</h2>
          <p>
            Sobremesas e pães: cada área da tecnologia, o que ela faz e onde fica no produto. Quanto
            mais pesado o prato, mais desafiadora a trilha. Comece pelo pão francês: ele mostra o
            mapa inteiro.
          </p>
        </div>
        <GrupoDoCardapio grupo={grupoDe("profissoes")} concluidas={concluidas} />
      </section>

      <section className="cardapio secao-cafe" id="cozinha">
        <div className="secao-topo">
          <p className="kicker">👨‍🍳 A COZINHA</p>
          <h2>Os bastidores</h2>
          <p>Como o sistema funciona por dentro. Ninguém vê, mas sem isso o restaurante fecha.</p>
        </div>
        <GrupoDoCardapio grupo={grupoDe("cozinha")} concluidas={concluidas} largo />
        <EmBreve
          largo
          itens={[
            { icone: "🧑‍🍳", nome: "Arquitetura de software", item: "A brigada de cozinha" },
            { icone: "🍽️", nome: "Design System", item: "A louça e o uniforme" },
          ]}
        />
      </section>

      <section className="cardapio secao-cafe" id="para-viagem">
        <div className="secao-topo">
          <p className="kicker">🛍️ PARA VIAGEM</p>
          <h2>O que você leva daqui</h2>
          <p>
            Antes de sair da cafeteria para o mercado de trabalho, retire o seu pedido no balcão.
          </p>
        </div>
        <EmBreve
          itens={[
            { icone: "🇺🇸", nome: "Inglês para devs", item: "O cardápio bilíngue" },
            { icone: "🪟", nome: "LinkedIn e portfólio", item: "A vitrine da fachada" },
            { icone: "🧾", nome: "Entrevistas", item: "O teste do cozinheiro novo" },
          ]}
        />
      </section>

      <section className="cardapio secao-cafe" id="salao">
        <div className="secao-topo">
          <p className="kicker">🪑 O SALÃO</p>
          <h2>A mesa compartilhada</h2>
          <p>
            Onde a comunidade se encontra: estudar junto, mostrar o que fez e construir em equipe.
          </p>
        </div>
        <div className="salao-links">
          {SALAO.map((l) => (
            <a key={l.url} href={l.url}>
              <span aria-hidden="true">{l.icone}</span>
              <b>{l.nome}</b>
              <small>{l.texto}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="como-estudar">
        <div className="secao-topo">
          <p className="kicker">COMO ESTUDAR AQUI</p>
          <h2>Três passos, sem pressa</h2>
        </div>
        <ol className="como-passos">
          <li>
            <span>📖</span>
            <b>Leia com calma</b>
            <p>Aulas curtas, uma ideia por vez. Pode voltar quantas vezes quiser.</p>
          </li>
          <li>
            <span>▶️</span>
            <b>Copie e teste</b>
            <p>
              O botão <em>Testar</em> copia o código e abre o OnlineGDB. É só colar e rodar. Mude o
              código, quebre, conserte: é assim que se aprende.
            </p>
          </li>
          <li>
            <span>🎯</span>
            <b>Pratique no GitHub</b>
            <p>
              No fim de cada trilha tem desafios com correção automática no Pull Request. Git e
              código ao mesmo tempo!
            </p>
          </li>
        </ol>
        <div className="onde-testar">
          <p className="onde-testar-titulo">Onde rodar o código</p>
          <ul>
            <li>
              <a href="https://www.onlinegdb.com" target="_blank" rel="noreferrer">
                OnlineGDB
              </a>{" "}
              é o padrão do site: roda C, Python e Java, aceita entrada do teclado e não pede conta.
            </li>
            <li>
              <a
                href="https://www.programiz.com/c-programming/online-compiler/"
                target="_blank"
                rel="noreferrer"
              >
                Programiz
              </a>{" "}
              é mais simples e vai bem no celular.
            </li>
            <li>
              <b>No seu PC:</b> VS Code com a linguagem instalada. Cada trilha tem o passo a passo
              para Windows e Mac.
            </li>
          </ul>
        </div>

        <figure className="criador">
          <img
            src={`${CRIADOR.url}.png?size=200`}
            alt={`Foto de ${CRIADOR.nome}`}
            width={96}
            height={96}
            loading="lazy"
          />
          <div>
            <p className="kicker">QUEM PREPAROU</p>
            <blockquote>A ideia é pegar na sua mão e te ensinar.</blockquote>
            <figcaption>
              <b>{CRIADOR.nome}</b> ·{" "}
              <a href={CRIADOR.url} target="_blank" rel="noreferrer">
                @{CRIADOR.github}
              </a>
              <span>Dev há 6 anos e um dos líderes da Unidunedev</span>
            </figcaption>
          </div>
        </figure>
      </section>
    </main>
  );
}
