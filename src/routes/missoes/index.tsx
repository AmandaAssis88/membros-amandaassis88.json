import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  GitPullRequest,
  Github,
  Heart,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { CenaPalcoMissao } from "@/components/cena-palco-missao";
import { CenaMissao } from "@/components/cena-missao";
import { AREAS, pageHead } from "@/lib/community";
import {
  eAreaMissao,
  lerEscolhasMissoes,
  LINGUAGENS_MISSAO,
  missoesEmCartaz,
  salvarEscolhasMissoes,
  type EscolhasMissoes,
  type LinguagemMissao,
} from "@/lib/missoes";

export const Route = createFileRoute("/missoes/")({
  head: () =>
    pageHead(
      "Escolha seu desafio · Unidunedev",
      "Do primeiro Pull Request ao primeiro projeto: escolha o desafio e aprenda programação no seu ritmo.",
    ),
  component: MissoesDaComunidade,
});

const EM_CARTAZ = missoesEmCartaz();
const ETAPAS = ["A história", "Sua linguagem", "Sua missão"] as const;
const NOMES_LINGUAGENS: Record<LinguagemMissao, string> = {
  c: "C",
  python: "Python",
  java: "Java",
};
const DICAS_LINGUAGEM: Record<LinguagemMissao, string> = {
  c: "Para praticar lógica, variáveis, condições e, aos poucos, funções e structs.",
  python: "Para experimentar ideias com uma sintaxe acolhedora, listas e funções.",
  java: "Para desenvolver sua lógica e começar a organizar programas em classes.",
};

function MissoesDaComunidade() {
  const reduced = useReducedMotion();
  const [escolhas, setEscolhas] = useState(lerEscolhasMissoes);
  const [indice, setIndice] = useState(() => {
    const antigas = lerEscolhasMissoes();
    const i = EM_CARTAZ.findIndex((m) => m.id === antigas.missaoId);
    return Math.max(i, 0);
  });
  const [etapa, setEtapa] = useState(-1);
  const missao = EM_CARTAZ[indice] ?? EM_CARTAZ[0];

  function proximaCena(diferenca: number) {
    setIndice((atual) => (atual + diferenca + EM_CARTAZ.length) % EM_CARTAZ.length);
  }

  function guardar(atualizacao: Partial<EscolhasMissoes>) {
    const novas = { ...escolhas, ...atualizacao };
    setEscolhas(novas);
    // Na primeira etapa não marcamos a missão como concluída ou aceita.
    // As preferências são salvas apenas quando a pessoa confirma a escolha.
  }

  function confirmar() {
    if (!escolhas.linguagem || !missao) return;
    const confirmadas = { ...escolhas, missaoId: missao.id };
    setEscolhas(confirmadas);
    salvarEscolhasMissoes(confirmadas);
    setEtapa(2);
  }

  const transicao = reduced ? { duration: 0 } : { duration: 0.26, ease: "easeOut" as const };

  if (!missao) {
    return (
      <main className="mis-cinema">
        <p>As novas missões estão sendo preparadas.</p>
      </main>
    );
  }

  return (
    <main className="mis-cinema" aria-label="Escolha sua missão">
      <div className="mis-cinema-topo">
        <div className="mis-cinema-marca">
          <Coffee size={18} aria-hidden="true" />
          <span>
            UNIDUNEDEV <span aria-hidden="true">·</span> MISSÕES DA COMUNIDADE
          </span>
        </div>
        {etapa < 0 ? (
          <span className="mis-cinema-topo-lema">Um café e uma descoberta de cada vez.</span>
        ) : (
          <button
            type="button"
            className="mis-cinema-link-pr mis-cinema-link-voltar"
            onClick={() => setEtapa(-1)}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Escolher outro desafio
          </button>
        )}
      </div>

      {etapa >= 0 && (
        <nav className="mis-cinema-etapas" aria-label="Etapas para escolher a missão">
          {ETAPAS.map((nome, i) => (
            <button
              type="button"
              key={nome}
              className={`mis-cinema-etapa ${etapa === i ? "ativa" : ""} ${etapa > i ? "feita" : ""}`}
              aria-current={etapa === i ? "step" : undefined}
              disabled={i >= etapa}
              onClick={() => setEtapa(i)}
            >
              <span className="mis-cinema-etapa-num">
                {etapa > i ? <Check size={13} /> : i + 1}
              </span>
              <span>{nome}</span>
            </button>
          ))}
        </nav>
      )}

      <AnimatePresence mode="wait">
        {etapa === -1 ? (
          <motion.section
            key="desafios"
            className="mis-portal"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={transicao}
            aria-labelledby="mis-portal-titulo"
          >
            <div className="mis-portal-cabecalho">
              <p className="mis-cinema-sobretitulo">
                <Coffee size={15} aria-hidden="true" /> SEU PRÓXIMO PASSO COMEÇA AQUI
              </p>
              <h1 id="mis-portal-titulo">
                Qual aventura você quer <em>começar?</em>
              </h1>
              <p>
                Não existe caminho certo ou ordem obrigatória. Escolha o que faz sentido para você
                agora.
              </p>
            </div>
            <div className="mis-portal-opcoes">
              <article className="mis-portal-card mis-portal-card--pr">
                <div className="mis-portal-card-texto">
                  <span className="mis-portal-numero">DESAFIO 01 · PRIMEIRO CONTATO</span>
                  <h2>
                    Seu primeiro <em>Pull Request.</em>
                  </h2>
                  <p>
                    Prepare seu perfil, conheça o GitHub e deixe seu lugar no mural da comunidade.
                  </p>
                  <div className="mis-portal-detalhes">
                    <span>Sem precisar programar</span>
                    <span>Um primeiro commit</span>
                  </div>
                  <Link to="/desafio-pr" search={{ nivel: "1" }} className="mis-cinema-botao">
                    Começar o Desafio 1 <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <div className="mis-portal-deco mis-portal-deco--git" aria-hidden="true">
                  <div className="mis-portal-janela">
                    <span className="mis-portal-janela-topo">
                      <i />
                      <i />
                      <i />
                    </span>
                    <Github size={42} strokeWidth={1.4} />
                    <div className="mis-portal-linha">
                      <GitPullRequest size={20} />
                      <span>meu-primeiro-pr</span>
                      <Check size={18} />
                    </div>
                    <div className="mis-portal-linha-curta" />
                    <div className="mis-portal-linha-curta mis-portal-linha-curta--segunda" />
                  </div>
                  <span className="mis-portal-brilho mis-portal-brilho--um" />
                  <span className="mis-portal-brilho mis-portal-brilho--dois" />
                </div>
              </article>
              <article className="mis-portal-card mis-portal-card--projeto">
                <div className="mis-portal-card-texto">
                  <span className="mis-portal-numero">DESAFIO 02 · PRIMEIRO PROJETO</span>
                  <h2>
                    Um pequeno código. <em>Uma grande ajuda.</em>
                  </h2>
                  <p>
                    Encontre uma história, conheça quem precisa da sua ajuda e resolva um problema
                    com C, Python ou Java.
                  </p>
                  <div className="mis-portal-detalhes">
                    <span>5 histórias para descobrir</span>
                    <span>No seu ritmo</span>
                  </div>
                  <button type="button" className="mis-cinema-botao" onClick={() => setEtapa(0)}>
                    Conhecer o Desafio 2 <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
                <div className="mis-portal-deco mis-portal-deco--gatinho" aria-hidden="true">
                  <CenaPalcoMissao id="gatinho" />
                </div>
              </article>
            </div>
            <p className="mis-portal-rodape">
              <Heart size={15} aria-hidden="true" /> O Desafio 1 te coloca no mural. O Desafio 2 te
              convida a criar. Você pode fazer os dois quando quiser.
            </p>
          </motion.section>
        ) : etapa === 0 ? (
          <motion.div
            key={`historia-${missao.id}`}
            initial={reduced ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -7 }}
            transition={transicao}
            className="mis-cinema-conjunto"
          >
            <section className={`mis-cinema-palco mis-cinema-palco--${missao.id}`}>
              <div className="mis-cinema-texto">
                <p className="mis-cinema-sobretitulo">
                  <Sparkles size={15} aria-hidden="true" />
                  HISTÓRIA {String(indice + 1).padStart(2, "0")} DE{" "}
                  {String(EM_CARTAZ.length).padStart(2, "0")}
                </p>
                <h1>
                  {missao.titulo}
                  <span className="mis-cinema-ponto">.</span>
                </h1>
                <p className="mis-cinema-chamada">{missao.chamada}</p>
                <p className="mis-cinema-historia">{missao.historia}</p>
                <p className="mis-cinema-conceitos">
                  {missao.conceitos.slice(0, 3).map((conceito) => (
                    <span key={conceito}>{conceito}</span>
                  ))}
                </p>
                <div className="mis-cinema-acoes">
                  <button type="button" className="mis-cinema-botao" onClick={() => setEtapa(1)}>
                    Quero ajudar nessa história <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  <Link
                    to="/missoes/$slug"
                    params={{ slug: missao.id }}
                    className="mis-cinema-link-leve"
                  >
                    Conhecer o problema
                  </Link>
                </div>
              </div>
              <div className="mis-cinema-pinturas">
                <CenaPalcoMissao id={missao.id} />
                <div className="mis-cinema-pinturas-topo" aria-hidden="true">
                  <span>SELECIONE A PRÓXIMA HISTÓRIA</span>
                  <span>
                    {String(indice + 1).padStart(2, "0")} /{" "}
                    {String(EM_CARTAZ.length).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="mis-cinema-posteres"
                  role="group"
                  aria-label="Cinco histórias ilustradas"
                >
                  {EM_CARTAZ.map((item, i) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`mis-cinema-poster ${indice === i ? "ativo" : ""}`}
                      aria-label={`Escolher história ${i + 1}: ${item.titulo}`}
                      aria-pressed={indice === i}
                      title={item.titulo}
                      onClick={() => setIndice(i)}
                    >
                      <CenaMissao id={item.id} className="mis-cinema-poster-svg" />
                      <img
                        src={`/missoes/capas/thumbs/${item.id}.webp`}
                        alt=""
                        loading={Math.abs(i - indice) > 1 ? "lazy" : "eager"}
                        decoding="async"
                        onError={(evento) => {
                          evento.currentTarget.hidden = true;
                        }}
                      />
                      <span className="mis-cinema-poster-nome">{item.titulo}</span>
                      <span className="mis-cinema-poster-numero">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <span className="mis-cinema-numeracao" aria-hidden="true">
                0{indice + 1}
              </span>
            </section>

            <div className="mis-cinema-direcao">
              <p>
                Escolha pela história que dá vontade de resolver.{" "}
                <strong>Não precisa fazer todas.</strong>
              </p>
              <div className="mis-cinema-setas">
                <button
                  type="button"
                  onClick={() => proximaCena(-1)}
                  aria-label="História anterior"
                >
                  <ChevronLeft size={23} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => proximaCena(1)} aria-label="Próxima história">
                  <ChevronRight size={23} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : etapa === 1 ? (
          <motion.section
            key="linguagem"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={transicao}
            className="mis-cinema-config"
          >
            <div className="mis-cinema-config-texto">
              <p className="mis-cinema-sobretitulo">SEGUNDO PASSO · SEM PRESSA</p>
              <h1>
                Como você quer <em>ajudar?</em>
              </h1>
              <p>
                Você escolheu <strong>{missao.titulo}</strong>. O desafio é o mesmo; a linguagem só
                muda o caminho para resolver.
              </p>
              <div className="mis-cinema-escolha-area">
                <label htmlFor="mis-area-cinema">
                  Qual área desperta sua curiosidade? <span>Opcional</span>
                </label>
                <select
                  id="mis-area-cinema"
                  value={escolhas.area}
                  onChange={(evento) => {
                    const valor = evento.target.value;
                    guardar({ area: eAreaMissao(valor) ? valor : "" });
                  }}
                >
                  <option value="">Ainda estou descobrindo</option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mis-cinema-linguagens" role="group" aria-label="Escolha uma linguagem">
              {LINGUAGENS_MISSAO.map((opcao) => (
                <button
                  type="button"
                  key={opcao.id}
                  className={`mis-cinema-linguagem ${escolhas.linguagem === opcao.id ? "ativa" : ""}`}
                  aria-pressed={escolhas.linguagem === opcao.id}
                  onClick={() => guardar({ linguagem: opcao.id })}
                >
                  <span className="mis-cinema-linguagem-simbolo">
                    {opcao.id === "c" ? "{ }" : opcao.id === "python" ? "py" : "J"}
                  </span>
                  <span>
                    <strong>{opcao.nome}</strong>
                    <small>{DICAS_LINGUAGEM[opcao.id]}</small>
                  </span>
                  {escolhas.linguagem === opcao.id && <Check size={21} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <div className="mis-cinema-config-rodape">
              <button type="button" className="mis-cinema-voltar" onClick={() => setEtapa(0)}>
                <ArrowLeft size={17} aria-hidden="true" /> Voltar às histórias
              </button>
              <button
                type="button"
                className="mis-cinema-botao"
                onClick={confirmar}
                disabled={!escolhas.linguagem}
              >
                Continuar com{" "}
                {escolhas.linguagem ? NOMES_LINGUAGENS[escolhas.linguagem] : "a linguagem"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="confirmacao"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transicao}
            className={`mis-cinema-conclusao mis-cinema-conclusao--${missao.id}`}
          >
            <div className="mis-cinema-conclusao-texto">
              <span className="mis-cinema-cupom">
                <Heart size={18} aria-hidden="true" /> UMA MISSÃO PARA CHAMAR DE SUA
              </span>
              <h1>
                Uma pequena ajuda. <em>Um grande começo.</em>
              </h1>
              <p>
                Você escolheu <strong>{missao.titulo}</strong> em{" "}
                <strong>
                  {escolhas.linguagem ? NOMES_LINGUAGENS[escolhas.linguagem] : "sua linguagem"}
                </strong>
                .
              </p>
              <p>
                Agora é hora de conhecer o problema, fazer tentativas e aprender com calma. Sua
                escolha ficou guardada neste navegador.
              </p>
              <div className="mis-cinema-acoes">
                <Link to="/missoes/$slug" params={{ slug: missao.id }} className="mis-cinema-botao">
                  Começar a missão <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  className="mis-cinema-link-leve"
                  href="https://estudos.unidunedev.workers.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BookOpen size={17} aria-hidden="true" /> Revisar no Café de Estudos
                </a>
              </div>
              <button type="button" className="mis-cinema-voltar" onClick={() => setEtapa(0)}>
                <ArrowLeft size={16} aria-hidden="true" /> Quero escolher outra história
              </button>
            </div>
            <CenaPalcoMissao id={missao.id} />
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mis-cinema-base">
        <span>Um problema de cada vez. Um commit de cada vez. ☕</span>
        <span>Desafio 2 em preparação · entregas por PR ainda não abertas</span>
      </div>
    </main>
  );
}
