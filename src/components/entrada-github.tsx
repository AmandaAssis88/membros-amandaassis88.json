import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Coffee,
  ExternalLink,
  GitPullRequest,
  Github,
  Search,
  UserPlus,
} from "lucide-react";

import { readSavedPassport } from "@/lib/draft";
import {
  buscarMembro,
  entrarComo,
  linkDosMeusPRs,
  normalizarGitHub,
  PADRAO_GITHUB,
  sair,
  useMembroAtual,
} from "@/lib/identidade";

type Estado =
  | { tipo: "inicio" }
  | { tipo: "nao-encontrado"; github: string }
  | { tipo: "ajuda-pr"; github: string };

/**
 * Primeira coisa da comunidade: "Já faz parte? Qual é o seu GitHub?".
 * Quem está no mural vai direto para a jornada; quem não está segue para a inscrição.
 */
export function EntradaGitHub({ onInscrever }: { onInscrever: (github?: string) => void }) {
  const navigate = useNavigate();
  const membro = useMembroAtual();
  const [entrada, setEntrada] = useState("");
  const [erro, setErro] = useState("");
  const [estado, setEstado] = useState<Estado>({ tipo: "inicio" });
  const passaporteNesteNavegador = readSavedPassport();

  function procurar(evento: FormEvent) {
    evento.preventDefault();
    const github = normalizarGitHub(entrada);
    if (!PADRAO_GITHUB.test(github)) {
      setErro("Digite só o seu usuário do GitHub, por exemplo: clehdev");
      return;
    }
    setErro("");
    if (buscarMembro(github)) {
      entrarComo(github);
      void navigate({ to: "/jornada" });
    } else {
      setEstado({ tipo: "nao-encontrado", github });
    }
  }

  if (membro) {
    return (
      <div className="entrada-github entrada-github--membro">
        <img className="entrada-avatar" src={membro.avatar} alt="" width={56} height={56} />
        <div className="entrada-membro-texto">
          <p className="entrada-kicker">
            <Coffee size={14} aria-hidden="true" /> QUE BOM TE VER DE NOVO
          </p>
          <strong>{membro.nome}</strong>
          <span>@{membro.github}</span>
        </div>
        <div className="entrada-membro-acoes">
          <Link to="/jornada" className="entrada-botao">
            Minha jornada <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button type="button" className="entrada-link" onClick={sair}>
            Não é você?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="entrada-github">
      <p className="entrada-kicker">
        <Github size={14} aria-hidden="true" /> JÁ FAZ PARTE DA COMUNIDADE?
      </p>
      <h2 className="entrada-titulo">Qual é o seu GitHub?</h2>
      <form className="entrada-busca" onSubmit={procurar} noValidate>
        <label className="sr-only" htmlFor="entrada-github-campo">
          Seu usuário do GitHub
        </label>
        <span aria-hidden="true">@</span>
        <input
          id="entrada-github-campo"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={60}
          placeholder="seu-usuario"
          value={entrada}
          onChange={(e) => {
            setEntrada(e.target.value);
            if (estado.tipo !== "inicio") setEstado({ tipo: "inicio" });
          }}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? "entrada-erro" : undefined}
        />
        <button type="submit">
          <Search size={16} aria-hidden="true" /> Entrar
        </button>
      </form>
      {erro && (
        <p id="entrada-erro" className="entrada-erro" role="alert">
          {erro}
        </p>
      )}

      {estado.tipo === "nao-encontrado" && (
        <div className="entrada-resultado" role="status">
          <p>
            Ainda não encontramos <strong>@{estado.github}</strong> no mural da comunidade.
          </p>
          <div className="entrada-opcoes">
            <button
              type="button"
              className="entrada-botao"
              onClick={() => onInscrever(estado.github)}
            >
              <UserPlus size={16} aria-hidden="true" /> Quero entrar na comunidade
            </button>
            <button
              type="button"
              className="entrada-botao entrada-botao--leve"
              onClick={() => setEstado({ tipo: "ajuda-pr", github: estado.github })}
            >
              Já me inscrevi, mas não apareço
            </button>
          </div>
        </div>
      )}

      {estado.tipo === "ajuda-pr" && (
        <div className="entrada-resultado" role="status">
          <p>
            O seu card só aparece no mural{" "}
            <strong>depois que o seu Pull Request for aprovado</strong>. Veja em que pé ele está:
          </p>
          <div className="entrada-opcoes">
            <a
              className="entrada-botao"
              href={linkDosMeusPRs(estado.github)}
              target="_blank"
              rel="noreferrer"
            >
              <GitPullRequest size={16} aria-hidden="true" /> Ver meus PRs{" "}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <Link
              to="/desafio-pr"
              search={{ nivel: "1" }}
              className="entrada-botao entrada-botao--leve"
            >
              Como fazer o PR
            </Link>
          </div>
          <p className="entrada-dica">
            {passaporteNesteNavegador
              ? "Você se inscreveu neste navegador: o seu JSON continua guardado. Recarregue a página para vê-lo."
              : "Não achou nenhum PR? Então falta só esse passo: faça a inscrição de novo e copie o JSON no final."}
          </p>
        </div>
      )}

      {estado.tipo === "inicio" && (
        <p className="entrada-rodape">
          Ainda não faz parte?{" "}
          <button type="button" className="entrada-link" onClick={() => onInscrever()}>
            Entre para a comunidade <ArrowRight size={13} aria-hidden="true" />
          </button>
        </p>
      )}
    </div>
  );
}
