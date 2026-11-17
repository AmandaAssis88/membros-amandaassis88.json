# Ambientes do Café de Estudos

Os seis ambientes de estudo são independentes da votação de estilos do Desafio 1. A seleção no Café de Estudos muda **somente a home e a faixa do cantinho**.

| Ambiente             | Capa               | Miniatura                 | Efeito discreto               |
| -------------------- | ------------------ | ------------------------- | ----------------------------- |
| Lo-fi Café           | `lofi.webp`        | `thumbs/lofi.webp`        | chuva e vapor                 |
| Cabana na Chuva      | `cabana.webp`      | `thumbs/cabana.webp`      | chuva, vapor e luz de lareira |
| Biblioteca Encantada | `biblioteca.webp`  | `thumbs/biblioteca.webp`  | poeira dourada e brilho       |
| Estação Neon         | `neon.webp`        | `thumbs/neon.webp`        | luzes suaves                  |
| Laboratório Criativo | `laboratorio.webp` | `thumbs/laboratorio.webp` | pequenos pontos de luz        |
| Ateliê Solar         | `solar.webp`       | `thumbs/solar.webp`       | feixes de luz e brisa         |

As imagens são WebP e não contêm controles, texto da interface ou animações. A montagem de referência aprovada foi usada para a composição das miniaturas; as imagens panorâmicas usam as artes individuais previamente aprovadas, com o Laboratório adaptado da montagem. Os efeitos são desenhados em CSS em `estudos/src/cantinho/ambientes.css` e respeitam `prefers-reduced-motion`.

**Arquivos de implementação**

- `estudos/src/cantinho/temas.ts`: identidade dos seis ambientes, URLs de capa e miniatura e migração dos antigos IDs do Café.
- `estudos/src/cantinho/cantinho.tsx`: seleção acessível em gaveta lateral.
- `estudos/src/pages/inicio.tsx`: estado persistido no navegador e partículas decorativas.
- `estudos/src/cantinho/ambientes.css`: paletas, overlays e microanimações.
- `estudos/src/cantinho/temas.test.ts`: testes das opções e migração.

Manter `src/components/style-picker.tsx` (votação original do onboarding) intacto. As trilhas e o player também não dependem do tema escolhido.
