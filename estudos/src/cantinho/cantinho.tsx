import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Coffee, Github, Palette, Search, Sparkles, X } from "lucide-react";
import { ONBOARDING_URL } from "../catalogo";
import {
  avatarDoPerfil,
  buscarPerfil,
  CHAVE_PERFIL,
  normalizarGitHub,
  PADRAO_GITHUB,
} from "./perfil";
import { dataLocalHoje, fraseDoDia, TEMAS, type TemaId } from "./temas";

function EscolherTema({
  tema,
  onEscolher,
  onFechar,
}: {
  tema: TemaId;
  onEscolher: (novo: TemaId) => void;
  onFechar: () => void;
}) {
  const [selecionado, setSelecionado] = useState<TemaId>(tema);
  const painelRef = useRef<HTMLElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const temaAtual = TEMAS.find((t) => t.id === selecionado) ?? TEMAS[0];

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    const anterior = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();

    function aoPressionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        evento.preventDefault();
        onFechar();
      }
      if (evento.key === "Tab" && painelRef.current) {
        const focaveis = Array.from(
          painelRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
          ),
        );
        if (focaveis.length === 0) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
          evento.preventDefault();
          ultimo?.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primeiro?.focus();
        }
      }
    }
    document.addEventListener("keydown", aoPressionar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoPressionar);
      anterior?.focus();
    };
  }, [onFechar]);

  return (
    <div
      className="temas-fundo"
      onPointerDown={(evento) => {
        if (evento.target === evento.currentTarget) onFechar();
      }}
    >
      <aside
        ref={painelRef}
        className="temas-painel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="temas-titulo"
        aria-describedby="temas-descricao"
      >
        <header className="temas-cabecalho">
          <div>
            <span className="cantinho-kicker">
              <Palette size={15} /> SEU AMBIENTE
            </span>
            <h2 id="temas-titulo">Escolha seu ambiente de estudos</h2>
            <p id="temas-descricao">
              Escolha o clima que te acolhe hoje. As trilhas e ferramentas continuam iguais.
            </p>
          </div>
          <button
            ref={fecharRef}
            type="button"
            className="temas-fechar"
            aria-label="Fechar seleção de temas"
            onClick={onFechar}
          >
            <X size={20} />
          </button>
        </header>

        <div className="temas-lista" role="group" aria-label="Ambientes disponíveis">
          {TEMAS.map((opcao) => (
            <button
              key={opcao.id}
              type="button"
              className={"temas-opcao" + (selecionado === opcao.id ? " selecionado" : "")}
              aria-pressed={selecionado === opcao.id}
              onClick={() => setSelecionado(opcao.id)}
            >
              <img src={opcao.miniatura} alt="" loading="lazy" decoding="async" width={148} height={90} />
              <span className="temas-opcao-texto">
                <strong>
                  {opcao.emoji} {opcao.nome}
                </strong>
                <small>{opcao.descricao}</small>
              </span>
              {selecionado === opcao.id && (
                <Check className="temas-check" size={19} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>

        <div className="temas-rodape">
          <div className="temas-selecionado">
            <img src={temaAtual.miniatura} alt="" decoding="async" width={58} height={45} />
            <span>
              <small>Seu próximo ambiente</small>
              <strong>{temaAtual.nome}</strong>
            </span>
          </div>
          <div className="temas-botoes">
            <button type="button" className="temas-cancelar" onClick={onFechar}>
              Cancelar
            </button>
            <button
              type="button"
              className="temas-aplicar"
              onClick={() => {
                onEscolher(selecionado);
                onFechar();
              }}
            >
              <Check size={16} /> Aplicar tema
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function CantinhoEstudos({
  tema,
  onTemaChange,
}: {
  tema: TemaId;
  onTemaChange: (novo: TemaId) => void;
}) {
  const [github, setGithub] = useState(() => {
    try {
      return normalizarGitHub(localStorage.getItem(CHAVE_PERFIL) ?? "");
    } catch {
      return "";
    }
  });
  const [entrada, setEntrada] = useState(github);
  const [erro, setErro] = useState("");
  const [seletorAberto, setSeletorAberto] = useState(false);
  const perfil = github ? buscarPerfil(github) : null;
  const temaAtual = TEMAS.find((t) => t.id === tema) ?? TEMAS[0];
  const frase = fraseDoDia(github || "estudante", dataLocalHoje());

  function procurarPerfil(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const valor = normalizarGitHub(entrada);
    if (!PADRAO_GITHUB.test(valor)) {
      setErro("Digite um username válido do GitHub, sem espaços.");
      return;
    }
    setErro("");
    setGithub(valor);
    setEntrada(valor);
    try {
      localStorage.setItem(CHAVE_PERFIL, valor);
    } catch {
      // Sem armazenamento disponível: a seleção segue válida nesta visita.
    }
  }

  function trocarUsuario() {
    setGithub("");
    setEntrada("");
    setErro("");
    try {
      localStorage.removeItem(CHAVE_PERFIL);
    } catch {
      // Ignora bloqueio de armazenamento.
    }
  }

  return (
    <section className="cantinho-area" id="meu-cantinho" aria-label="Seu cantinho de estudos">
      <div className="cantinho-faixa">
        {perfil ? (
          <div className="cantinho-perfil">
            <div className="cantinho-avatar">
              <img
                src={avatarDoPerfil(perfil)}
                alt={"Avatar de " + perfil.nome}
                width={92}
                height={92}
                loading="lazy"
                onError={(evento) => {
                  evento.currentTarget.onerror = null;
                  evento.currentTarget.src =
                    "https://github.com/" + perfil.github + ".png?size=160";
                }}
              />
              <span aria-hidden="true">✦</span>
            </div>
            <div className="cantinho-perfil-dados">
              <span className="cantinho-kicker">☕ SEU CANTINHO</span>
              <h2 id="cantinho-titulo">Olá, {perfil.nome}!</h2>
              <a
                className="cantinho-usuario"
                href={"https://github.com/" + perfil.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} /> @{perfil.github} <ArrowRight size={12} />
              </a>
              <div className="cantinho-areas" aria-label="Áreas de interesse">
                {perfil.areas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
              <button type="button" className="cantinho-trocar" onClick={trocarUsuario}>
                Não é você? Trocar perfil
              </button>
            </div>
          </div>
        ) : (
          <div className="cantinho-convite">
            <span className="cantinho-kicker">
              <Coffee size={15} /> FAÇA PARTE DA MESA
            </span>
            <h2 id="cantinho-titulo">
              {github ? "Seu cantinho está quase pronto!" : "Oi Esforçado, Qual é seu GitHub?"}
            </h2>
            <p>
              {github
                ? "Ainda não encontramos esse usuário entre os perfis publicados no mural. Você já concluiu o primeiro desafio?"
                : "Encontre seu perfil da comunidade e deixe seu espaço de estudos com a sua cara."}
            </p>
            <form className="cantinho-busca" onSubmit={procurarPerfil}>
              <label className="cantinho-label" htmlFor="cantinho-github">
                Seu username do GitHub
              </label>
              <div className="cantinho-busca-linha">
                <span aria-hidden="true">@</span>
                <input
                  id="cantinho-github"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={40}
                  value={entrada}
                  onChange={(evento) => setEntrada(evento.target.value)}
                  placeholder="seu-usuario"
                  aria-invalid={Boolean(erro)}
                  aria-describedby={erro ? "cantinho-erro" : undefined}
                />
                <button type="submit">
                  <Search size={16} /> Encontrar
                </button>
              </div>
              {erro && (
                <p id="cantinho-erro" className="cantinho-erro" role="alert">
                  {erro}
                </p>
              )}
            </form>
            {github && (
              <p className="cantinho-ajuda">
                Se ainda não criou seu perfil,{" "}
                <a href={ONBOARDING_URL} target="_blank" rel="noreferrer">
                  venha para a comunidade <ArrowRight size={13} />
                </a>{" "}
                e faça seu primeiro desafio. Depois de aprovado, seu card aparecerá aqui.
              </p>
            )}
            {!github && (
              <p className="cantinho-ajuda">
                Ainda não tem perfil?{"  "}
                <a href={ONBOARDING_URL} target="_blank" rel="noreferrer">
                  Conheça a comunidade <ArrowRight size={13} />
                </a>
              </p>
            )}
          </div>
        )}

        <div className="cantinho-frase" aria-label="Mensagem de incentivo do dia">
          <span className="cantinho-aspas" aria-hidden="true">
            “
          </span>
          <div>
            <span className="cantinho-kicker">
              <Sparkles size={14} /> UMA MENSAGEM PARA HOJE
            </span>
            <blockquote>{frase}</blockquote>
          </div>
          <span className="cantinho-frase-dia">Uma coisa de cada vez. ♡</span>
        </div>

        <div className="cantinho-tema">
          <span className="cantinho-kicker">
            <Palette size={15} /> SEU AMBIENTE DE ESTUDO
          </span>
          <div className="cantinho-tema-atual">
            <img src={temaAtual.miniatura} alt="" width={80} height={58} loading="lazy" decoding="async" />
            <div>
              <small>Tema atual</small>
              <strong>{temaAtual.nome}</strong>
            </div>
          </div>
          <button
            type="button"
            className="cantinho-abrir-temas"
            onClick={() => setSeletorAberto(true)}
          >
            <Palette size={16} /> Trocar ambiente <ArrowRight size={15} />
          </button>
          <small className="cantinho-tema-ajuda">Seu ambiente fica salvo neste navegador.</small>
        </div>
      </div>

      {seletorAberto && (
        <EscolherTema
          tema={tema}
          onEscolher={onTemaChange}
          onFechar={() => setSeletorAberto(false)}
        />
      )}
    </section>
  );
}
