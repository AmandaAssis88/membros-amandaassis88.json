import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Coffee, Moon, Pause, Play, RotateCcw, Settings2, X } from "lucide-react";
import {
  avancarSessao,
  CONFIG_PADRAO,
  formatarTempo,
  minutosValidos,
  MS_MINUTO,
  novaSessao,
  tempoRestante,
  type ConfigPomodoro,
  type SessaoPomodoro,
} from "./pomodoro-logica";

const CHAVE = "unidunedev:estudos:pomodoro:v1";

type Estado = { config: ConfigPomodoro; sessao: SessaoPomodoro };

function carregarEstado(): Estado {
  const inicial = { config: CONFIG_PADRAO, sessao: novaSessao(CONFIG_PADRAO) };
  try {
    const bruto: unknown = JSON.parse(localStorage.getItem(CHAVE) ?? "null");
    if (!bruto || typeof bruto !== "object" || !("config" in bruto)) return inicial;

    const salvo = bruto as { config?: Partial<ConfigPomodoro>; sessao?: Partial<SessaoPomodoro> };
    const config: ConfigPomodoro = {
      foco: minutosValidos(salvo.config?.foco, 180, CONFIG_PADRAO.foco),
      descanso: minutosValidos(salvo.config?.descanso, 60, CONFIG_PADRAO.descanso),
      usarDescanso: salvo.config?.usarDescanso !== false,
    };
    const etapa = salvo.sessao?.fase;
    const restante = salvo.sessao?.restanteMs;
    const fim = salvo.sessao?.fimEm;
    if (
      (etapa !== "foco" && etapa !== "pausa" && etapa !== "pronto") ||
      typeof restante !== "number" ||
      !Number.isFinite(restante) ||
      restante < 0 || restante > 180 * MS_MINUTO ||
      (fim !== null && (typeof fim !== "number" || !Number.isFinite(fim) || fim <= 0))
    ) {
      return { config, sessao: novaSessao(config) };
    }

    const sessao: SessaoPomodoro = { fase: etapa, restanteMs: restante, fimEm: fim };
    return { config, sessao: avancarSessao(sessao, config, Date.now()) };
  } catch {
    return inicial;
  }
}

function avisoDaEtapa(fase: "pausa" | "pronto") {
  return fase === "pausa"
    ? { titulo: "Hora de descansar ☕", mensagem: "Seu tempo de foco terminou. Aproveite a pausa!" }
    : { titulo: "Pronto para estudar novamente?", mensagem: "Não se cobre! Comece quando se sentir pronto." };
}

export function Pomodoro() {
  const [estado, setEstado] = useState<Estado>(carregarEstado);
  const [agora, setAgora] = useState(Date.now);
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const caixaRef = useRef<HTMLDivElement>(null);
  const contextoAudioRef = useRef<AudioContext | null>(null);
  const faseAnteriorRef = useRef(estado.sessao.fase);
  const tituloOriginalRef = useRef<string | null>(null);

  const { config, sessao } = estado;
  const rodando = sessao.fimEm !== null;
  const restante = tempoRestante(sessao, agora);

  // O sino é sintetizado pelo navegador: não baixa MP3 e não interfere no player de música.
  const tocarSino = useCallback(() => {
    const contexto = contextoAudioRef.current;
    if (!contexto) return;
    const executar = () => {
      if (contexto.state !== "running") return;
      const inicio = contexto.currentTime;
      for (const [indice, frequencia] of [784, 1046, 880].entries()) {
        const oscilador = contexto.createOscillator();
        const ganho = contexto.createGain();
        const tempo = inicio + indice * 0.2;
        oscilador.type = "sine";
        oscilador.frequency.setValueAtTime(frequencia, tempo);
        ganho.gain.setValueAtTime(0.0001, tempo);
        ganho.gain.exponentialRampToValueAtTime(0.12, tempo + 0.025);
        ganho.gain.exponentialRampToValueAtTime(0.0001, tempo + 0.65);
        oscilador.connect(ganho);
        ganho.connect(contexto.destination);
        oscilador.start(tempo);
        oscilador.stop(tempo + 0.67);
      }
    };
    if (contexto.state === "suspended") {
      void contexto.resume().then(executar).catch(() => {});
    } else {
      executar();
    }
  }, []);

  // Desbloqueia o AudioContext no clique do usuário, respeitando as regras de autoplay.
  function prepararSino() {
    try {
      contextoAudioRef.current ??= new AudioContext();
      if (contextoAudioRef.current.state === "suspended") {
        void contextoAudioRef.current.resume().catch(() => {});
      }
    } catch {
      // Se áudio não estiver disponível, as mensagens e a notificação da aba continuam.
    }
  }

  useEffect(() => {
    const conferir = () => {
      const atual = Date.now();
      setAgora(atual);
      setEstado((antes) => {
        const proxima = avancarSessao(antes.sessao, antes.config, atual);
        return proxima === antes.sessao ? antes : { ...antes, sessao: proxima };
      });
    };
    conferir();
    const intervalo = window.setInterval(conferir, 500);
    document.addEventListener("visibilitychange", conferir);
    return () => {
      window.clearInterval(intervalo);
      document.removeEventListener("visibilitychange", conferir);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch {
      // Funciona também quando o navegador bloqueia o armazenamento.
    }
  }, [estado]);

  useEffect(() => {
    if (faseAnteriorRef.current === sessao.fase) return;
    faseAnteriorRef.current = sessao.fase;

    if (sessao.fase === "pausa" || sessao.fase === "pronto") {
      const aviso = avisoDaEtapa(sessao.fase);
      setMensagem(aviso.titulo + ". " + aviso.mensagem);
      tocarSino();
      if (tituloOriginalRef.current === null) tituloOriginalRef.current = document.title;
      document.title = "🔔 " + aviso.titulo + " · Estudos";
      if (sessao.fase === "pronto") setAberto(true);

      // Notificação do sistema é opcional e só aparece se já houver permissão.
      if (typeof Notification !== "undefined" && Notification.permission === "granted" && document.hidden) {
        try {
          new Notification(aviso.titulo, { body: aviso.mensagem });
        } catch {
          // O aviso no título da aba permanece.
        }
      }
    }
  }, [sessao.fase, tocarSino]);

  useEffect(() => {
    if (!aberto) return;
    const aoClicarFora = (evento: PointerEvent) => {
      if (evento.target instanceof Node && !caixaRef.current?.contains(evento.target)) {
        setAberto(false);
      }
    };
    const aoPressionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    document.addEventListener("pointerdown", aoClicarFora);
    document.addEventListener("keydown", aoPressionar);
    return () => {
      document.removeEventListener("pointerdown", aoClicarFora);
      document.removeEventListener("keydown", aoPressionar);
    };
  }, [aberto]);

  useEffect(() => {
    return () => {
      if (tituloOriginalRef.current !== null && document.title.startsWith("🔔 ")) {
        document.title = tituloOriginalRef.current;
      }
      void contextoAudioRef.current?.close().catch(() => {});
    };
  }, []);

  function limparAviso() {
    setMensagem("");
    if (tituloOriginalRef.current !== null) {
      if (document.title.startsWith("🔔 ")) document.title = tituloOriginalRef.current;
      tituloOriginalRef.current = null;
    }
  }

  function alternarContagem() {
    prepararSino();
    limparAviso();
    const instante = Date.now();
    setAgora(instante);
    setEstado((antes) => {
      const etapa = antes.sessao;
      if (etapa.fase === "pronto") {
        const novo = novaSessao(antes.config);
        return { ...antes, sessao: { ...novo, fimEm: instante + novo.restanteMs } };
      }
      if (etapa.fimEm !== null) {
        return {
          ...antes,
          sessao: { ...etapa, restanteMs: tempoRestante(etapa, instante), fimEm: null },
        };
      }
      return {
        ...antes,
        sessao: { ...etapa, fimEm: instante + etapa.restanteMs },
      };
    });
    setAberto(false);
  }

  function reiniciar() {
    limparAviso();
    setEstado((antes) => ({ ...antes, sessao: novaSessao(antes.config) }));
    setAberto(false);
  }

  function atualizarConfig(chave: "foco" | "descanso" | "usarDescanso", valor: number | boolean) {
    setEstado((antes) => {
      const novo: ConfigPomodoro = { ...antes.config };
      if (chave === "usarDescanso") {
        novo.usarDescanso = Boolean(valor);
      } else if (chave === "foco") {
        novo.foco = minutosValidos(valor, 180, antes.config.foco);
      } else {
        novo.descanso = minutosValidos(valor, 60, antes.config.descanso);
      }
      // O ciclo em andamento não é interrompido por alterações na configuração.
      // Quando está parado, permite começar com a nova duração.
      const sessaoNova = antes.sessao.fimEm === null && antes.sessao.fase === "foco"
        ? novaSessao(novo)
        : antes.sessao;
      return { config: novo, sessao: sessaoNova };
    });
  }

  const foco = sessao.fase === "foco";
  const pronto = sessao.fase === "pronto";
  const legenda = pronto ? "Prontinho" : foco ? "Foco" : "Descanso";
  const botaoRotulo = pronto
    ? "Começar outro ciclo de estudos"
    : rodando ? "Pausar Pomodoro" : "Iniciar ou retomar Pomodoro";

  return (
    <div className="pomo-ancora" ref={caixaRef}>
      <section className={`pomo-bolha pomo-${sessao.fase}${rodando ? " pomo-ativo" : ""}`}
        aria-label={`Pomodoro, ${legenda}: ${formatarTempo(restante)}`}>
        <span className="pomo-simbolo" aria-hidden="true">
          {sessao.fase === "pausa" ? <Moon size={19} /> : <Coffee size={19} />}
          {rodando && foco && <span className="pomo-vapor"><i /><i /><i /></span>}
          {rodando && sessao.fase === "pausa" && <span className="pomo-estrela">✦</span>}
        </span>
        <span className="pomo-display">
          <small>{legenda}</small>
          <strong role="timer">{formatarTempo(restante)}</strong>
        </span>
        <button type="button" className="pomo-botao pomo-play"
          aria-label={botaoRotulo} title={botaoRotulo} onClick={alternarContagem}>
          {rodando ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
        </button>
        <button type="button" className="pomo-botao pomo-config"
          aria-label="Configurar Pomodoro" title="Configurar Pomodoro"
          aria-expanded={aberto} onClick={() => setAberto((valor) => !valor)}>
          <Settings2 size={15} />
        </button>
      </section>

      {aberto && (
        <section className="pomo-painel" aria-label="Configurações do Pomodoro">
          <div className="pomo-painel-topo">
            <span className="pomo-painel-titulo"><Coffee size={16} /> Seu tempo, no seu ritmo</span>
            <button type="button" className="pomo-fechar" aria-label="Fechar Pomodoro"
              onClick={() => setAberto(false)}><X size={16} /></button>
          </div>

          {pronto && (
            <div className="pomo-final" role="status">
              <span className="pomo-final-icone" aria-hidden="true">☕</span>
              <strong>Pronto para estudar novamente?</strong>
              <p>Não se cobre! Comece quando se sentir pronto.</p>
              <button type="button" className="pomo-comecar" onClick={alternarContagem}>
                <Play size={16} fill="currentColor" /> Recomeçar com calma
              </button>
            </div>
          )}

          {!pronto && (
            <p className="pomo-painel-descricao">
              {sessao.fase === "pausa"
                ? "Respire um pouco. O próximo ciclo começa quando você decidir."
                : "Escolha quanto tempo quer estudar. Uma coisa de cada vez."}
            </p>
          )}

          <div className="pomo-campos">
            <label>
              <span>☕ Estudo (min)</span>
              <input type="number" min={1} max={180} step={1}
                value={config.foco}
                onChange={(evento) => atualizarConfig("foco", Number(evento.target.value))} />
            </label>
            <label>
              <span>🌙 Descanso (min)</span>
              <input type="number" min={1} max={60} step={1}
                value={config.descanso}
                disabled={!config.usarDescanso}
                onChange={(evento) => atualizarConfig("descanso", Number(evento.target.value))} />
            </label>
          </div>
          <label className="pomo-descanso-opt">
            <input type="checkbox" checked={config.usarDescanso}
              onChange={(evento) => atualizarConfig("usarDescanso", evento.target.checked)} />
            Descanso automático
          </label>
          <p className="pomo-ajuda">As durações são salvas neste navegador. Durante a contagem, as alterações valem para o próximo ciclo.</p>
          <div className="pomo-painel-acoes">
            <button type="button" className="pomo-reset" onClick={reiniciar}>
              <RotateCcw size={14} /> Reiniciar
            </button>
            {!rodando && !pronto && (
              <button type="button" className="pomo-comecar" onClick={alternarContagem}>
                <Play size={14} fill="currentColor" /> {sessao.fase === "pausa" ? "Retomar pausa" : "Começar foco"}
              </button>
            )}
          </div>
        </section>
      )}
      <span className="pomo-leitor" role="status" aria-live="polite">{mensagem}</span>
    </div>
  );
}
