import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Coffee, Pause, Play, Repeat2, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

type Faixa = { nome: string; arquivo: string };
type Preferencias = { faixa: number; volume: number };
type ControleAudio = Preferencias & {
  tocando: boolean;
  faixas: Faixa[];
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
      // O índice inicial é substituído pelo sorteio após carregar a playlist.
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
  const [faixas, setFaixas] = useState<Faixa[]>([]);
  const [tocando, setTocando] = useState(false);
  const [repetirFaixa, setRepetirFaixa] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tocarDepoisDaTroca = useRef(false);
  const volumeAnterior = useRef(preferencias.volume > 0 ? preferencias.volume : 100);
  const cancelarAutoplayRef = useRef<() => void>(() => {});
  const { faixa, volume } = preferencias;

  useEffect(() => {
    const abort = new AbortController();

    async function carregarCatalogo() {
      try {
        const resposta = await fetch("/audio/playlist.json", {
          signal: abort.signal,
          cache: "no-store",
        });
        if (!resposta.ok) throw new Error("Catálogo indisponível");
        const dados: unknown = await resposta.json();
        if (!dados || typeof dados !== "object" || !("faixas" in dados)) {
          throw new Error("Catálogo inválido");
        }
        const lista = (dados as { faixas: unknown }).faixas;
        if (!Array.isArray(lista)) throw new Error("Catálogo inválido");

        const validas = lista.filter((item): item is Faixa => (
          item !== null &&
          typeof item === "object" &&
          "nome" in item &&
          "arquivo" in item &&
          typeof item.nome === "string" &&
          typeof item.arquivo === "string" &&
          item.arquivo.startsWith("/audio/musics/")
        ));
        if (abort.signal.aborted) return;
        if (validas.length === 0) {
          setErro("Nenhuma música encontrada no R2.");
          return;
        }

        // Uma faixa aleatória a cada visita, sem baixar todas as músicas.
        setPreferencias((atual) => ({
          ...atual,
          faixa: Math.floor(Math.random() * validas.length),
        }));
        setFaixas(validas);
        setErro(null);
      } catch {
        if (!abort.signal.aborted) {
          setErro("Não foi possível carregar a playlist.");
        }
      }
    }

    void carregarCatalogo();
    return () => abort.abort();
  }, []);

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
    if (!audio || faixas.length === 0) return;

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
  }, [faixas.length]);

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
    if (!audio || faixas.length === 0) return;
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
    if (faixas.length === 0) return;
    tocarDepoisDaTroca.current = continuar || Boolean(audio && !audio.paused);
    setErro(null);
    setPreferencias((atual) => ({
      ...atual,
      faixa: (atual.faixa + direcao + faixas.length) % faixas.length,
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
        faixas,
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
        src={faixas[faixa]?.arquivo}
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
    faixa, faixas, volume, tocando, repetirFaixa, erro,
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
        <div className="cafe-player-nome" title={faixas[faixa]?.nome ?? "Carregando"}>
          <strong>{faixas[faixa]?.nome ?? "Carregando músicas..."}</strong>
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
