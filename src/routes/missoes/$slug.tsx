import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCopy,
  ExternalLink,
  Github,
  HeartHandshake,
  Lightbulb,
  Medal,
  GitPullRequest,
} from "lucide-react";
import { CenaPalcoMissao } from "@/components/cena-palco-missao";
import { ESTUDOS_URL } from "@/config";
import { pageHead } from "@/lib/community";
import { orientacaoDaMissao } from "@/lib/orientacoes-missoes";
import { codigoInicialDaMissao } from "@/lib/codigos-iniciais";
import {
  lerEscolhasMissoes,
  LINGUAGENS_MISSAO,
  MISSOES,
  procurarMissao,
  salvarEscolhasMissoes,
  type EscolhasMissoes,
  type LinguagemMissao,
} from "@/lib/missoes";

const REPO_ESTUDOS = "https://github.com/Unidunedev/estudos";
const EXTENSOES: Record<LinguagemMissao, string> = { c: ".c", python: ".py", java: ".java" };

export const Route = createFileRoute("/missoes/$slug")({
  head: () =>
    pageHead(
      "Uma missão para resolver",
      "Escolha uma missão e aprenda a planejar sua solução em C, Python ou Java no Desafio 2.",
    ),
  component: DetalhesDaMissao,
});

function DetalhesDaMissao() {
  const { slug } = Route.useParams();
  const missao = procurarMissao(slug);
  const [escolhas, setEscolhas] = useState(lerEscolhasMissoes);
  const [copiaCodigo, setCopiaCodigo] = useState<"ociosa" | "copiada" | "erro">("ociosa");

  function atualizarEscolhas(atualizacao: Partial<EscolhasMissoes>) {
    const novas = { ...escolhas, ...atualizacao };
    setEscolhas(novas);
    setCopiaCodigo("ociosa");
    salvarEscolhasMissoes(novas);
  }

  if (!missao) {
    return (
      <main className="mis-pagina">
        <p className="mis-eyebrow">MISSÃO NÃO ENCONTRADA</p>
        <h1 className="page-title">Essa história ainda não existe por aqui.</h1>
        <p className="section-subtitle">Que tal escolher outra missão no nosso cardápio?</p>
        <Link to="/missoes" className="mis-botao-secundario" style={{ marginTop: 24 }}>
          <ArrowLeft size={16} aria-hidden="true" /> Voltar às missões
        </Link>
      </main>
    );
  }

  const linguagem = LINGUAGENS_MISSAO.find((opcao) => opcao.id === escolhas.linguagem);
  const orientacao = escolhas.linguagem ? orientacaoDaMissao(missao.id, escolhas.linguagem) : null;
  const codigoInicial = escolhas.linguagem
    ? codigoInicialDaMissao(missao.id, escolhas.linguagem)
    : null;
  const escolhida = escolhas.missaoId === missao.id && Boolean(escolhas.linguagem);
  const linkEstudos = linguagem ? ESTUDOS_URL + "/" + linguagem.trilha : ESTUDOS_URL;
  const numero = String(MISSOES.findIndex((item) => item.id === missao.id) + 1).padStart(2, "0");
  const pasta = "disciplinas/missoes/desafios/" + numero + "-" + missao.id;
  const arquivo =
    pasta +
    "/solucoes/seu-username" +
    (escolhas.linguagem ? EXTENSOES[escolhas.linguagem] : ".ext");

  const nomeBranch = "solucao/missao-" + missao.id + "-seu-username";
  const comandos = [
    "git clone https://github.com/SEU-USERNAME/estudos.git",
    "cd estudos",
    "git switch -c " + nomeBranch,
    "# Crie seu arquivo: " + arquivo,
    "python scripts/testar.py " + arquivo,
    "git add " + arquivo,
    "git commit -m " + JSON.stringify("feat: resolve missao " + missao.id),
    "git push -u origin " + nomeBranch,
  ].join("\n");

  async function copiarCodigo() {
    if (!codigoInicial) return;
    try {
      await navigator.clipboard.writeText(codigoInicial);
      setCopiaCodigo("copiada");
    } catch {
      setCopiaCodigo("erro");
    }
  }

  function aceitar() {
    if (!escolhas.linguagem || !missao) return;
    atualizarEscolhas({ missaoId: missao.id });
  }

  return (
    <main className="mis-pagina">
      <Link to="/missoes" className="mis-voltar">
        <ArrowLeft size={15} aria-hidden="true" /> Voltar ao cardápio de missões
      </Link>

      <header className={"mis-detalhe-hero mis-tom-" + missao.id}>
        <div>
          <p className="mis-eyebrow">DESAFIO 02 · {missao.nivel}</p>
          <h1>{missao.titulo}</h1>
          <p>{missao.chamada}</p>
        </div>
        <CenaPalcoMissao id={missao.id} />
      </header>

      <div className="mis-detalhe-grid">
        <div className="mis-detalhe-main">
          <section className="mis-bloco">
            <p className="mis-eyebrow">A HISTÓRIA</p>
            <h2>O que está acontecendo?</h2>
            <p>{missao.historia}</p>
          </section>

          <section className="mis-bloco">
            <p className="mis-eyebrow">SUA MISSÃO</p>
            <h2>O que você vai construir?</h2>
            <p>{missao.objetivo}</p>
            <div className="mis-tags" aria-label="Conceitos trabalhados">
              {missao.conceitos.map((conceito) => (
                <span key={conceito}>{conceito}</span>
              ))}
            </div>
          </section>

          <section className="mis-bloco mis-bloco-escolha" aria-labelledby="mis-linguagem-titulo">
            <p className="mis-eyebrow">SUA FERRAMENTA DE TRABALHO</p>
            <h2 id="mis-linguagem-titulo">Com qual linguagem você quer resolver?</h2>
            <p>
              O problema é o mesmo. O jeito de organizar o programa muda conforme a linguagem. Você
              pode trocar sua escolha quando quiser.
            </p>
            <div className="mis-linguagens" role="group" aria-label="Linguagem para esta missão">
              {LINGUAGENS_MISSAO.map((opcao) => (
                <button
                  type="button"
                  key={opcao.id}
                  className={
                    "mis-linguagem-opcao " +
                    (escolhas.linguagem === opcao.id ? "mis-linguagem-ativa" : "")
                  }
                  aria-pressed={escolhas.linguagem === opcao.id}
                  onClick={() => atualizarEscolhas({ linguagem: opcao.id })}
                >
                  {escolhas.linguagem === opcao.id && <CheckCircle2 size={15} aria-hidden="true" />}
                  {opcao.nome}
                </button>
              ))}
            </div>
            {orientacao ? (
              <div className="mis-orientacao" key={escolhas.linguagem}>
                <h3>Um jeito de começar em {linguagem?.nome}</h3>
                <p>{orientacao.descricao}</p>
                <p className="mis-primeiro-passo">
                  <Lightbulb size={17} aria-hidden="true" /> {orientacao.pontoDePartida}
                </p>
                <h4>Três pistas para esta missão</h4>
                <ol className="mis-pistas">
                  {orientacao.pistas.map((pista, i) => (
                    <li key={missao.id + "-" + escolhas.linguagem + "-" + i}>
                      <details>
                        <summary>Revelar pista {i + 1}</summary>
                        <p>{pista}</p>
                      </details>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="mis-linguagem-placeholder">
                ☕ Escolha C, Python ou Java para descobrir como começar sem receber a solução
                pronta.
              </p>
            )}
          </section>

          {codigoInicial && (
            <section
              className="mis-bloco mis-bloco-codigo-inicial"
              aria-labelledby="mis-codigo-inicial-titulo"
            >
              <p className="mis-eyebrow">UM EMPURRÃOZINHO PARA COMEÇAR</p>
              <div className="mis-codigo-inicial-topo">
                <div>
                  <h2 id="mis-codigo-inicial-titulo">Seu primeiro arquivo em {linguagem?.nome}</h2>
                  <p>
                    Pode copiar e colar no editor! Deixamos a estrutura e parte da leitura dos
                    dados. A lógica principal é sua: complete os comentários TODO para resolver a
                    história.
                  </p>
                </div>
                <button type="button" className="mis-codigo-copiar" onClick={copiarCodigo}>
                  {copiaCodigo === "copiada" ? (
                    <CheckCircle2 size={16} aria-hidden="true" />
                  ) : (
                    <ClipboardCopy size={16} aria-hidden="true" />
                  )}
                  {copiaCodigo === "copiada" ? "Copiado!" : "Copiar código"}
                </button>
              </div>
              <pre
                className="mis-codigo-inicial-pre"
                aria-label={`Código inicial em ${linguagem?.nome}`}
              >
                <code>{codigoInicial}</code>
              </pre>
              {copiaCodigo === "erro" && (
                <p className="mis-codigo-estado" role="status">
                  Não consegui acessar a área de transferência. Você pode selecionar o código acima
                  e copiar normalmente.
                </p>
              )}
              {copiaCodigo === "copiada" && (
                <p className="mis-codigo-estado" role="status">
                  Prontinho! Cole no editor, substitua os TODOs e teste suas ideias.
                </p>
              )}
              <p className="mis-codigo-aviso">
                Este arquivo <strong>ainda não resolve a missão</strong> — é só o começo. O código
                precisa imprimir exatamente o resultado pedido nos testes, sem mensagens extras.
              </p>
            </section>
          )}

          <section className="mis-bloco">
            <p className="mis-eyebrow">UM PASSO DE CADA VEZ</p>
            <h2>Seu roteiro de desenvolvimento</h2>
            <ol className="mis-roteiro">
              {missao.passos.map((passo) => (
                <li key={passo}>{passo}</li>
              ))}
            </ol>
            <p className="mis-alerta">
              Você não precisa acertar tudo na primeira tentativa. Comece pela menor parte do
              problema, experimente entradas diferentes e melhore aos poucos.
            </p>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">COMO SABER SE FUNCIONOU?</p>
            <h2>Checklist da missão</h2>
            <ul>
              {missao.criterios.map((criterio) => (
                <li key={criterio}>{criterio}</li>
              ))}
            </ul>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">SE QUISER IR ALÉM</p>
            <h2>Uma missão extra, sem pressa</h2>
            <p>{missao.extra}</p>
          </section>

          <section className="mis-bloco" aria-labelledby="mis-como-entregar">
            <p className="mis-eyebrow">O CÓDIGO TAMBÉM É UMA CONQUISTA</p>
            <h2 id="mis-como-entregar">Como será a entrega pelo GitHub?</h2>
            <p>
              Vamos usar o repositório <strong>Unidunedev/estudos</strong> e seu fluxo de Pull
              Requests. Quando as pastas oficiais estiverem liberadas, siga os passos:
            </p>
            <ol className="mis-roteiro">
              <li>Faça um fork do repositório de estudos e clone o seu fork.</li>
              <li>Crie uma branch com o nome da missão e o seu username.</li>
              <li>Resolva o enunciado e coloque seu arquivo na pasta de soluções.</li>
              <li>Teste o código, faça commit e push da sua branch.</li>
              <li>Abra um PR para o repositório original e acompanhe a revisão.</li>
            </ol>
            <div className="mis-exemplo-arquivo">
              <span>Exemplo do caminho da solução</span>
              <code>{arquivo}</code>
            </div>
            <div className="mis-comandos">
              <p className="mis-eyebrow">EXEMPLO DE COMANDOS · APÓS A LIBERAÇÃO</p>
              <p>
                Troque SEU-USERNAME pelo seu usuário do GitHub e crie o arquivo no editor antes de
                testar.
              </p>
              <pre aria-label="Comandos para preparar, testar e enviar a missão">
                <code>{comandos}</code>
              </pre>
              <p>
                Depois do push, abra o Pull Request pelo GitHub do seu fork. No Windows, se python
                não funcionar, tente py.
              </p>
            </div>
            <p className="mis-alerta">
              O Desafio 2 ainda não está aberto para entregas. Não envie soluções para esse caminho
              até anunciarmos oficialmente no grupo.
            </p>
            <a
              className="mis-botao-secundario mis-link-repo"
              href={REPO_ESTUDOS}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} aria-hidden="true" /> Conhecer o repositório de estudos
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </section>
        </div>

        <aside className="mis-detalhe-lado">
          <section className="mis-bloco mis-bloco-escuro">
            <p className="mis-eyebrow">SEU PRÓXIMO PASSO</p>
            <h2>Quer ajudar nessa missão?</h2>
            <p>Escolha sua linguagem e guarde esta missão para continuar depois.</p>
            <button
              type="button"
              className="mis-botao-primario"
              disabled={!escolhas.linguagem}
              onClick={aceitar}
            >
              {escolhida ? <CheckCircle2 size={17} /> : <HeartHandshake size={17} />}
              {escolhida ? "Missão escolhida!" : "Quero ajudar nesta missão"}
            </button>
            {!escolhas.linguagem && (
              <p className="mis-passo-aguardando">
                Escolha C, Python ou Java nesta página para continuar.
              </p>
            )}
            {escolhida && (
              <p className="mis-aceita" role="status">
                ✨ Sua escolha ficou salva neste navegador. Agora é hora de aprender e construir!
              </p>
            )}
            <a className="mis-botao-secundario" href={linkEstudos} target="_blank" rel="noreferrer">
              <BookOpen size={17} aria-hidden="true" />
              {linguagem ? "Revisar " + linguagem.nome + " no Café" : "Abrir o Café de Estudos"}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </section>
          <section className="mis-bloco mis-bloco-recompensa">
            <span className="mis-recompensa-icone">
              <Medal size={25} aria-hidden="true" />
            </span>
            <p className="mis-eyebrow">RECOMPENSA · EM PLANEJAMENTO</p>
            <h2>Um selo para lembrar dessa aventura</h2>
            <p>
              A ideia é que um PR aprovado desbloqueie um selo ligado à história que você resolveu.
              Por enquanto, não há certificação nem comprovação automática de conclusão.
            </p>
          </section>
          <section className="mis-bloco">
            <p className="mis-eyebrow">
              <GitPullRequest size={14} aria-hidden="true" /> PR COM CARINHO
            </p>
            <h2>Seu código conta uma história</h2>
            <p>
              Ao publicar sua solução, explique no PR como pensou no problema, quais partes foram
              difíceis e o que aprendeu. Não precisa comparar seu progresso com o de ninguém.
            </p>
            <Link to="/missoes" className="mis-botao-sutil mis-ver-outras">
              Ver outras missões <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
