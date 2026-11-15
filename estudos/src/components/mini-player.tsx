import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Coffee, Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";

const FAIXAS = [
  { nome: "Chuva no café", arquivo: "/sounds/trilha-1.mp3" },
  { nome: "Noite de código", arquivo: "/sounds/trilha-2.mp3" },
] as const;

type IndiceFaixa = 0 | 1;
type Preferencias = { faixa: IndiceFaixa; volume: number };

type ControleAudio = Preferencias & {
  tocando: boolean;
  erro: string | null;
  alternar: () => void;
  escolherFaixa: (faixa: IndiceFaixa) => void;
  ajustarVolume: (volume: number) => void;
};

const CHAVE = "unidunedev:estudos:musica";
const PADRAO: Preferencias = { faixa: 0, volume: 15 };
const ContextoAudio = createContext<ControleAudio | null>(null);
const MENSAGEM_ERRO = "Não foi possível tocar esta faixa. Confira os arquivos em estudos/public/sounds.";

function carregarPreferencias(): Preferencias {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(CHAVE) ?? "null") as Partial<Preferencias> | null;
    if (!salvo) return PADRAO;

    return {
      faixa: salvo.faixa === 1 ? 1 : 0,
      volume:
        typeof salvo.volume === "number" && Number.isFinite(salvo.volume)
          ? Math.max(0, Math.min(100, salvo.volume))
          : PADRAO.volume,
    };
  } catch {
    return PADRAO;
  }
}

/** Mantém o áudio vivo enquanto o aluno navega entre as páginas das trilhas. */
export function ProvedorAudio({ children }: { children: ReactNode }) {
  const [preferencias, setPreferencias] = useState<Preferencias>(carregarPreferencias);
  const [tocando, setTocando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const retomarAoTrocar = useRef(false);

  const { faixa, volume } = preferencias;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;

    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch {
      // A música continua funcionando mesmo se o navegador bloquear o armazenamento.
    }
  }, [preferencias, volume]);

  useEffect(() => {
    if (!retomarAoTrocar.current) return;
    retomarAoTrocar.current = false;

    void audioRef.current?.play().catch(() => {
      setTocando(false);
      setErro(MENSAGEM_ERRO);
    });
  }, [faixa]);

  function alternar() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setErro(null);
    // O play acontece somente após o clique: navegadores bloqueiam autoplay com som.
    void audio.play().catch(() => {
      setTocando(false);
      setErro(MENSAGEM_ERRO);
    });
  }

  function escolherFaixa(novaFaixa: IndiceFaixa) {
    if (novaFaixa === faixa) return;
    retomarAoTrocar.current = !audioRef.current?.paused;
    setErro(null);
    setPreferencias((atual) => ({ ...atual, faixa: novaFaixa }));
  }

  function ajustarVolume(novoVolume: number) {
    setPreferencias((atual) => ({
      ...atual,
      volume: Math.max(0, Math.min(100, novoVolume)),
    }));
  }

  return (
    <ContextoAudio.Provider
      value={{ faixa, volume, tocando, erro, alternar, escolherFaixa, ajustarVolume }}
    >
      {children}
      <audio
        ref={audioRef}
        src={FAIXAS[faixa].arquivo}
        preload="none"
        loop
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        onError={() => {
          setTocando(false);
          setErro(MENSAGEM_ERRO);
        }}
      />
    </ContextoAudio.Provider>
  );
}

export function MiniPlayer() {
  const audio = useContext(ContextoAudio);
  if (!audio) throw new Error("MiniPlayer deve estar dentro de ProvedorAudio.");

  const { faixa, volume, tocando, erro, alternar, escolherFaixa, ajustarVolume } = audio;

  return (
    <section className="mini-player" aria-label="Música ambiente do café de estudos">
      <div className="mini-player-cabecalho">
        <span className="mini-player-kicker">
          <Coffee size={14} aria-hidden="true" /> SOM DO CAFÉ
        </span>
        <span className="mini-player-estado">
          <span className={tocando ? "mini-player-luz ativa" : "mini-player-luz"} aria-hidden="true" />
          {tocando ? "tocando" : "no seu ritmo"}
        </span>
      </div>

      <div className="mini-player-principal">
        <button
          className="mini-player-play"
          type="button"
          onClick={alternar}
          aria-label={tocando ? "Pausar música" : "Reproduzir música"}
          title={tocando ? "Pausar" : "Reproduzir"}
        >
          {tocando ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <div className="mini-player-faixa-atual">
          <strong>{FAIXAS[faixa].nome}</strong>
          <span>
            <Music2 size={12} aria-hidden="true" /> Música para estudar
          </span>
        </div>
      </div>

      <div className="mini-player-controles">
        <div className="mini-player-faixas" role="group" aria-label="Selecionar música">
          <button
            type="button"
            className={faixa === 0 ? "selecionada" : ""}
            onClick={() => escolherFaixa(0)}
            aria-pressed={faixa === 0}
          >
            Faixa 1
          </button>
          <button
            type="button"
            className={faixa === 1 ? "selecionada" : ""}
            onClick={() => escolherFaixa(1)}
            aria-pressed={faixa === 1}
          >
            Faixa 2
          </button>
        </div>
        <label className="mini-player-volume">
          {volume === 0 ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
          <span className="mini-player-sr-only">Volume da música</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(event) => ajustarVolume(Number(event.target.value))}
            aria-label="Volume da música"
          />
          <span className="mini-player-numero">{volume}%</span>
        </label>
      </div>
      {erro && (
        <p className="mini-player-erro" role="status">
          {erro}
        </p>
      )}
    </section>
  );
}
