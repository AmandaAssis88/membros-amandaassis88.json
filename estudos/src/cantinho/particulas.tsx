import {
  BookOpen,
  Code2,
  Coffee,
  Flame,
  FlaskConical,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { TemaId } from "./temas";

/**
 * A arte WebP permanece estática. Cada ambiente ganha sua própria camada
 * atmosférica por cima, desenhada com CSS e pequenos ícones vetoriais.
 * Mantemos poucas partículas e nenhuma dependência de canvas ou timers.
 */
const ICONES: Record<TemaId, readonly [LucideIcon, LucideIcon]> = {
  lofi: [Coffee, Sparkles],
  cabana: [Flame, Sparkles],
  biblioteca: [Sparkles, BookOpen],
  neon: [Code2, Sparkles],
  laboratorio: [FlaskConical, Sparkles],
  solar: [Sun, Sparkles],
};

const GOTAS_E_LUZES = Array.from({ length: 9 }, (_, indice) => indice);
const PARTICULAS_SUBINDO = Array.from({ length: 8 }, (_, indice) => indice);

export function ParticulasDoAmbiente({ tema }: { tema: TemaId }) {
  const [IconePrincipal, IconeSecundario] = ICONES[tema];

  return (
    <div className="home-capa-efeitos" aria-hidden="true">
      {/* Chuva, vaga-lumes e poeira luminosa que já existiam nas capas. */}
      {GOTAS_E_LUZES.map((indice) => (
        <span key={`atmosfera-${indice}`} />
      ))}
      {/* Vapor de café, brilho da lareira e folhas ao vento. */}
      <i />
      <b />
      {/* Uma pequena assinatura visual que sobe em cada ambiente. */}
      {PARTICULAS_SUBINDO.map((indice) => (
        <span
          key={`subindo-${indice}`}
          className={`ambiente-subindo ambiente-subindo--${indice + 1}`}
        >
          {indice === 1 ? (
            <IconePrincipal size={15} strokeWidth={1.7} />
          ) : indice === 5 ? (
            <IconeSecundario size={13} strokeWidth={1.7} />
          ) : (
            <span className="ambiente-subindo-ponto" />
          )}
        </span>
      ))}
    </div>
  );
}
