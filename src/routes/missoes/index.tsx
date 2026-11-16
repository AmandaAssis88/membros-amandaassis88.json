import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Coffee, GitPullRequest, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { CenaPalcoMissao } from "@/components/cena-palco-missao";
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
      "Missões da Comunidade · Desafio 2",
      "Cinco histórias para escolher com calma. Ajude os personagens a resolver problemas reais com C, Python ou Java.",
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
  const [etapa, setEtapa] = useState(0);
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

  const transicao = reduced
    ? { duration: 0 }
    : { duration: 0.26, ease: "easeOut" as const };

  if (!missao) {
    return <main className="mis-cinema"><p>As novas missões estão sendo preparadas.</p></main>;
  }

  return (
    <main className="mis-cinema" aria-label="Escolha sua missão">
      <div className="mis-cinema-topo">
        <div className="mis-cinema-marca">
          <Coffee size={18} aria-hidden="true" />
          <span>UNIDUNEDEV <span aria-hidden="true">·</span> DESAFIO 02</span>
        </div>
        <Link to="/desafio-pr" search={{ nivel: "1" }} className="mis-cinema-link-pr">
          <GitPullRequest size={16} aria-hidden="true" /> Quer entrar no mural? Desafio 1
        </Link>
      </div>

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
            <span className="mis-cinema-etapa-num">{etapa > i ? <Check size={13} /> : i + 1}</span>
            <span>{nome}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {etapa === 0 ? (
          <motion.div
            key={`historia-${missao.id}`}
            initial={reduced ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -7 }}
            transition={transicao}
            className="mis-cinema-conjunto"
          >
            <section className={`mis-cinema-palco mis-cinema-palco--${missao.id}`}>
              <div className="mis-cinema-texto">
                <p className="mis-cinema-sobretitulo">
                  <Sparkles size={15} aria-hidden="true" />
                  HISTÓRIA {String(indice + 1).padStart(2, "0")} DE {String(EM_CARTAZ.length).padStart(2, "0")}
                </p>
                <h1>{missao.titulo}<span className="mis-cinema-ponto">.</span></h1>
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
                  <Link to="/missoes/$slug" params={{ slug: missao.id }} className="mis-cinema-link-leve">
                    Conhecer o problema
                  </Link>
                </div>
              </div>
              <CenaPalcoMissao id={missao.id} />
              <span className="mis-cinema-numeracao" aria-hidden="true">0{indice + 1}</span>
            </section>

            <div className="mis-cinema-direcao">
              <p>Escolha pela história que dá vontade de resolver. <strong>Não precisa fazer todas.</strong></p>
              <div className="mis-cinema-setas">
                <button type="button" onClick={() => proximaCena(-1)} aria-label="História anterior">
                  <ChevronLeft size={23} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => proximaCena(1)} aria-label="Próxima história">
                  <ChevronRight size={23} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mis-cinema-fita" role="group" aria-label="Escolha uma das cinco histórias">
              {EM_CARTAZ.map((item, i) => (
                <button
                  type="button"
                  className={`mis-cinema-mini ${indice === i ? "ativo" : ""}`}
                  key={item.id}
                  onClick={() => setIndice(i)}
                  aria-pressed={indice === i}
                  aria-label={`Ver história ${i + 1}: ${item.titulo}`}
                >
                  <span className="mis-cinema-mini-indice">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mis-cinema-mini-nome">{item.titulo}</span>
                  {indice === i && <span className="mis-cinema-mini-ponto" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </motion.div>
        ) : etapa === 1 ? (
          <motion.section
            key="linguagem"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={transicao}
            className="mis-cinema-config"
          >
            <div className="mis-cinema-config-texto">
              <p className="mis-cinema-sobretitulo">SEGUNDO PASSO · SEM PRESSA</p>
              <h1>Como você quer <em>ajudar?</em></h1>
              <p>Você escolheu <strong>{missao.titulo}</strong>. O desafio é o mesmo; a linguagem só muda o caminho para resolver.</p>
              <div className="mis-cinema-escolha-area">
                <label htmlFor="mis-area-cinema">Qual área desperta sua curiosidade? <span>Opcional</span></label>
                <select
                  id="mis-area-cinema"
                  value={escolhas.area}
                  onChange={(evento) => {
                    const valor = evento.target.value;
                    guardar({ area: eAreaMissao(valor) ? valor : "" });
                  }}
                >
                  <option value="">Ainda estou descobrindo</option>
                  {AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
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
              <button type="button" className="mis-cinema-botao" onClick={confirmar} disabled={!escolhas.linguagem}>
                Continuar com {escolhas.linguagem ? NOMES_LINGUAGENS[escolhas.linguagem] : "a linguagem"}
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
            className="mis-cinema-conclusao"
          >
            <div className="mis-cinema-conclusao-texto">
              <span className="mis-cinema-cupom"><Heart size={18} aria-hidden="true" /> UMA MISSÃO PARA CHAMAR DE SUA</span>
              <h1>Uma pequena ajuda. <em>Um grande começo.</em></h1>
              <p>Você escolheu <strong>{missao.titulo}</strong> em <strong>{escolhas.linguagem ? NOMES_LINGUAGENS[escolhas.linguagem] : "sua linguagem"}</strong>.</p>
              <p>Agora é hora de conhecer o problema, fazer tentativas e aprender com calma. Sua escolha ficou guardada neste navegador.</p>
              <div className="mis-cinema-acoes">
                <Link to="/missoes/$slug" params={{ slug: missao.id }} className="mis-cinema-botao">
                  Começar a missão <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a className="mis-cinema-link-leve" href="https://estudos.unidunedev.workers.dev" target="_blank" rel="noreferrer">
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
