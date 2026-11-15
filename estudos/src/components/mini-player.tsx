import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Coffee, Pause, Play, Repeat2, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

const FAIXAS = [
  { nome: "Chuva no café", arquivo: "/sounds/trilha-1.mp3" },
  { nome: "Noite de código", arquivo: "/sounds/trilha-2.mp3" },
] as const;

type IndiceFaixa = 0 | 1;
type Preferencias = { faixa: IndiceFaixa; volume: number };
type ControleAudio = Preferencias & {
  tocando: boolean;
  repetirFaixa: boolean;
  erro: string | null;
  alternar: () => void;
  pular: (direcao: -1 | 1, continuar?: boolean) => void;
  alternarMudo: () => void;
  alternarRepeticao: () => void;
  ajustarVolume: (volume: number) => void;
};

const CHAVE = "unidunedev:estudos:musica:v2";
const PADRAO: Preferencias = { faixa: 0, volume: 100 };
const ContextoAudio = createContext<ControleAudio | null>(null);

function carregarPreferencias(): Preferencias {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(CHAVE) ?? "null") as Partial<Preferencias> | null;
    if (!salvo) return PADRAO;

    return {
      // Cada nova visita começa pela primeira música.
      faixa: 0,
      volume:
        typeof salvo.volume === "number" && Number.isFinite(salvo.volume)
          ? Math.max(0, Math.min(100, salvo.volume))
          : PADRAO.volume,
    };
  } catch {
    return PADRAO;
  }
}

/** Fica montado entre as rotas para a música não reiniciar ao trocar de aula. */
export function ProvedorAudio({ children }: { children: ReactNode }) {
  const [preferencias, setPreferencias] = useState<Preferencias>(carregarPreferencias);
  const [tocando, setTocando] = useState(false);
  const [repetirFaixa, setRepetirFaixa] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tocarDepoisDaTroca = useRef(false);
  const volumeAnterior = useRef(preferencias.volume > 0 ? preferencias.volume : 100);
  const cancelarAutoplayRef = useRef<() => void>(() => {});
  const { faixa, volume } = preferencias;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(preferencias));
    } catch {
      // Armazenamento opcional: o áudio também funciona em modo privado.
    }
  }, [preferencias, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let ativo = true;

    function retomarNaInteracao(event: Event) {
      // Os controles do player já gerenciam a reprodução manualmente.
      if (event.target instanceof Element && event.target.closest(".cafe-player")) return;
      tentarTocar();
    }

    function retomarNoTeclado(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
      retomarNaInteracao(event);
    }

    function cancelarAutoplay() {
      ativo = false;
      document.removeEventListener("pointerdown", retomarNaInteracao);
      document.removeEventListener("keydown", retomarNoTeclado);
      cancelarAutoplayRef.current = () => {};
    }

    function tentarTocar() {
      if (!ativo || !audio || !audio.paused) return;

      void audio.play().then(() => {
        cancelarAutoplay();
      }).catch((erro: unknown) => {
        if (!ativo) return;
        // A maioria dos navegadores exige uma interação antes de liberar áudio.
        if (erro instanceof DOMException && erro.name === "NotAllowedError") return;
        if (erro instanceof DOMException && erro.name === "AbortError") return;
        cancelarAutoplay();
        setErro("Faixa indisponível. Confira os MP3.");
      });
    }

    cancelarAutoplayRef.current = cancelarAutoplay;
    document.addEventListener("pointerdown", retomarNaInteracao);
    document.addEventListener("keydown", retomarNoTeclado);
    tentarTocar();

    return cancelarAutoplay;
  }, []);

  useEffect(() => {
    if (!tocarDepoisDaTroca.current) return;
    tocarDepoisDaTroca.current = false;
    void audioRef.current?.play().catch(() => {
      setTocando(false);
      setErro("Faixa indisponível. Confira os MP3.");
    });
  }, [faixa]);

  function alternar() {
    cancelarAutoplayRef.current();
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setErro(null);
    // Só toca após interação: navegadores bloqueiam áudio com autoplay.
    void audio.play().catch(() => {
      setTocando(false);
      setErro("Faixa indisponível. Confira os MP3.");
    });
  }

  function pular(direcao: -1 | 1, continuar = false) {
    cancelarAutoplayRef.current();
    const audio = audioRef.current;
    tocarDepoisDaTroca.current = continuar || Boolean(audio && !audio.paused);
    setErro(null);
    setPreferencias((atual) => ({
      ...atual,
      faixa: ((atual.faixa + direcao + FAIXAS.length) % FAIXAS.length) as IndiceFaixa,
    }));
  }

  function ajustarVolume(novo: number) {
    const valor = Math.max(0, Math.min(100, novo));
    if (valor > 0) volumeAnterior.current = valor;
    setPreferencias((atual) => ({ ...atual, volume: valor }));
  }

  function alternarMudo() {
    ajustarVolume(volume === 0 ? volumeAnterior.current : 0);
  }

  return (
    <ContextoAudio.Provider
      value={{
        faixa,
        volume,
        tocando,
        repetirFaixa,
        erro,
        alternar,
        pular,
        alternarMudo,
        alternarRepeticao: () => setRepetirFaixa((atual) => !atual),
        ajustarVolume,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={FAIXAS[faixa].arquivo}
        preload="none"
        loop={repetirFaixa}
        onPlay={() => {
          cancelarAutoplayRef.current();
          setTocando(true);
        }}
        onPause={() => setTocando(false)}
        onEnded={() => pular(1, true)}
        onError={() => {
          setTocando(false);
          setErro("Faixa indisponível. Confira os MP3.");
        }}
      />
    </ContextoAudio.Provider>
  );
}

export function MiniPlayer({ compacto = false }: { compacto?: boolean }) {
  const controle = useContext(ContextoAudio);
  if (!controle) throw new Error("MiniPlayer precisa estar dentro de ProvedorAudio.");
  const {
    faixa, volume, tocando, repetirFaixa, erro,
    alternar, pular, alternarMudo, alternarRepeticao, ajustarVolume,
  } = controle;

  return (
    <section className={compacto ? "cafe-player cafe-player--header" : "cafe-player"} aria-label="Player de música do café de estudos">
      {tocando && (
        <div className="cafe-player-particulas" aria-hidden="true">
          <span>♪</span><span>•</span><span>♫</span><span>•</span><span>♪</span>
        </div>
      )}
      <div className="cafe-player-topo">
        <span><Coffee size={13} aria-hidden="true" /> SOM ACOMPANHANTE</span>
        <span className={tocando ? "cafe-player-status ativo" : "cafe-player-status"}>
          <i aria-hidden="true" /> {tocando ? "tocando" : "pausado"}
        </span>
      </div>

      <div className="cafe-player-navegacao">
        <button type="button" className="cafe-player-salto" onClick={() => pular(-1)}
          title="Música anterior" aria-label="Música anterior">
          <SkipBack size={16} fill="currentColor" />
        </button>
        <div className="cafe-player-nome" title={FAIXAS[faixa].nome}>
          <strong>{FAIXAS[faixa].nome}</strong>
          <small>playlist de estudos</small>
        </div>
        <button type="button" className="cafe-player-salto" onClick={() => pular(1)}
          title="Próxima música" aria-label="Próxima música">
          <SkipForward size={16} fill="currentColor" />
        </button>
      </div>

      <div className="cafe-player-acoes" aria-label="Controles de reprodução">
        <div className="cafe-player-volume">
          <button type="button" className="cafe-player-icone"
            onClick={alternarMudo}
            title={volume === 0 ? "Restaurar volume" : "Silenciar (passe o mouse para ajustar)"}
            aria-label={volume === 0 ? "Restaurar volume" : "Silenciar áudio"}>
            {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <div className="cafe-player-ajuste">
            <input type="range" min={0} max={100} value={volume}
              onChange={(event) => ajustarVolume(Number(event.target.value))}
              aria-label="Ajustar volume" />
            <span>{volume}%</span>
          </div>
        </div>
        <button type="button" className="cafe-player-tocar" onClick={alternar}
          title={tocando ? "Pausar música" : "Reproduzir música"}
          aria-label={tocando ? "Pausar música" : "Reproduzir música"}>
          {tocando ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
        </button>
        <button type="button"
          className={repetirFaixa ? "cafe-player-icone selecionado" : "cafe-player-icone"}
          onClick={alternarRepeticao}
          title={repetirFaixa ? "Repetição ativada" : "Repetir esta música"}
          aria-label={repetirFaixa ? "Desativar repetição" : "Repetir música"}
          aria-pressed={repetirFaixa}>
          <Repeat2 size={17} />
        </button>
      </div>
      {erro && <p className="cafe-player-erro" role="status" title="Coloque os áudios em estudos/public/sounds/">{erro}</p>}
    </section>
  );
}
