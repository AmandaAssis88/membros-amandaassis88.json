import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { TRILHAS } from "../catalogo";
import { INTERVALOS, hoje, marcarRevisada, useAgenda, vencidas } from "../revisoes";
import { Bebida } from "./bebida";

/** Na home: as aulas que pedem revisão hoje. Some quando não há nada para revisar. */
export function HoraDeRevisar() {
  const agenda = useAgenda();
  const ids = vencidas(agenda, hoje());
  const itens = ids.flatMap((id) => {
    const [trilhaId, slug] = id.split("/");
    const trilha = TRILHAS.find((t) => t.id === trilhaId);
    const aula = trilha?.aulas.find((a) => a.slug === slug);
    return trilha && aula ? [{ id, trilha, aula, etapa: agenda[id]!.etapa }] : [];
  });
  if (itens.length === 0) return null;

  return (
    <section className="revisar" aria-labelledby="revisar-titulo">
      <div className="revisar-topo">
        <p className="kicker">🧠 REVISÃO ESPAÇADA</p>
        <h2 id="revisar-titulo">Hora de revisar</h2>
        <p>
          Revisar um pouquinho, bem na hora em que a memória começa a falhar, é o que faz o conteúdo
          ficar. Abra a aula, refaça os cartões e o teste rápido, e marque como revisada.
        </p>
      </div>
      <ul className="revisar-lista">
        {itens.map(({ id, trilha, aula, etapa }) => (
          <li key={id} data-trilha={trilha.id}>
            <Bebida trilha={trilha.id} tamanho={40} />
            <Link to="/$trilha/$aula" params={{ trilha: trilha.id, aula: aula.slug }}>
              <small>
                {trilha.nome} · revisão {etapa + 1} de {INTERVALOS.length}
              </small>
              <b>{aula.titulo}</b>
            </Link>
            <button type="button" onClick={() => marcarRevisada(id)}>
              <Check size={14} /> Revisei
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
