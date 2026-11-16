# Capas Lo-fi / Cozy Study Art — Desafio 2

As capas das 12 missões são imagens **WebP 16:9**, geradas para esta versão do site, sem texto nem botões gravados na arte.

O componente `src/components/cena-de-fundo-missao.tsx` procura uma imagem nesta pasta usando o identificador da missão, por exemplo `/missoes/capas/incendio.webp`. Se a capa não estiver instalada, o componente mostra a ilustração SVG original como fallback.

## Arquivos esperados

- `incendio.webp`
- `cafeteria.webp`
- `abrigo.webp`
- `nave.webp`
- `laboratorio.webp`
- `castelo.webp`
- `farol.webp`
- `biblioteca.webp`
- `robo.webp`
- `jardim.webp`
- `feira.webp`
- `pinguim.webp`

A arte não inclui conteúdo instrutivo. O título, as tags e o botão permanecem componentes React, para garantir acessibilidade, flexibilidade e adaptação ao mobile.

Os efeitos leves de partículas, vapor e luz são implementados em CSS/SVG em `src/styles-missoes-cozy.css`. A preferência `prefers-reduced-motion` desliga as animações.

**Importante:** as imagens WebP são entregues num pacote de assets separado da branch, para cópia nesta pasta antes da publicação final. Não faça merge/liberação sem confirmar que todas as imagens estão presentes e que a visualização no celular está correta.
