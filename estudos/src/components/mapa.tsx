import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buscarTrilha } from "../catalogo";
import { LINGUAGENS } from "../linguagens";

/* ---------- Chips de linguagens (viram link quando a trilha existe) ---------- */

export function Linguagens({ ids }: { ids: string[] }) {
  return (
    <span className="chips">
      {ids.map((id) => {
        const info = LINGUAGENS[id] ?? { nome: id, cor: "#7a6152" };
        const trilha = buscarTrilha(id);
        return trilha ? (
          <Link
            key={id}
            to="/$trilha"
            params={{ trilha: trilha.id }}
            className="chip chip-link"
            style={{ ["--chip" as string]: info.cor }}
          >
            {info.nome} <ArrowRight size={12} />
          </Link>
        ) : (
          <span
            key={id}
            className="chip"
            style={{ ["--chip" as string]: info.cor }}
            title="Trilha em breve aqui no site"
          >
            {info.nome} <small>em breve</small>
          </span>
        );
      })}
    </span>
  );
}

/* ---------- Mapa das camadas do produto ---------- */

type Area =
  | "usuario"
  | "front-end"
  | "mobile"
  | "internet"
  | "back-end"
  | "banco"
  | "ui-ux"
  | "devops"
  | "qa";

export function Camadas({ destaque = "todas" }: { destaque?: Area | "todas" }) {
  const c = (area: Area) =>
    destaque === "todas" || destaque === area ? "ativa" : destaque ? "apagada" : "";
  return (
    <figure className={`camadas ${destaque === "todas" ? "" : "com-destaque"}`}>
      <div className={`camadas-faixa faixa-uiux ${c("ui-ux")}`}>
        🎨 <b>UI/UX</b> desenha a experiência antes do código
      </div>
      <div className="camadas-fluxo">
        <div className={`camada ${c("usuario")}`}>
          <span>👤</span>
          <b>Usuário</b>
          <small>clica, digita, rola</small>
        </div>
        <div className="camadas-seta" aria-hidden="true">
          →
        </div>
        <div className="camada-dupla">
          <div className={`camada ${c("front-end")}`}>
            <span>🖥️</span>
            <b>Front-end</b>
            <small>site no navegador</small>
          </div>
          <div className={`camada ${c("mobile")}`}>
            <span>📱</span>
            <b>Mobile</b>
            <small>app no celular</small>
          </div>
        </div>
        <div className={`camadas-internet ${c("internet")}`}>
          <span className="camadas-pacote" aria-hidden="true" />
          <b>🌐 Internet</b>
          <small>pedido e resposta em HTTP + JSON</small>
        </div>
        <div className={`camada ${c("back-end")}`}>
          <span>⚙️</span>
          <b>Back-end</b>
          <small>API e regras de negócio</small>
        </div>
        <div className="camadas-seta" aria-hidden="true">
          ⇄
        </div>
        <div className={`camada ${c("banco")}`}>
          <span>🗄️</span>
          <b>Banco de dados</b>
          <small>guarda tudo</small>
        </div>
      </div>
      <div className={`camadas-faixa faixa-devops ${c("devops")}`}>
        🚀 <b>DevOps</b> coloca tudo no ar: servidores, nuvem e deploy automático
      </div>
      <div className={`camadas-faixa faixa-qa ${c("qa")}`}>
        🧪 <b>QA</b> testa cada pedaço e o caminho inteiro
      </div>
    </figure>
  );
}

/* ---------- Roadmap: etapas para chegar lá ---------- */

type Etapa = { titulo: string; tempo?: string; itens: string[]; linguagens?: string[] };

export function Roadmap({ etapas }: { etapas: Etapa[] }) {
  return (
    <ol className="roadmap">
      {etapas.map((e, i) => (
        <li key={e.titulo} style={{ ["--i" as string]: i }}>
          <span className="roadmap-num">{i + 1}</span>
          <div className="roadmap-cartao">
            <p className="roadmap-topo">
              <b>{e.titulo}</b>
              {e.tempo && <small>⏱️ {e.tempo}</small>}
            </p>
            <ul>
              {e.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {e.linguagens && <Linguagens ids={e.linguagens} />}
          </div>
        </li>
      ))}
    </ol>
  );
}
