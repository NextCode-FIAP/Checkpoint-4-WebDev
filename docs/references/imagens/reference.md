# Referências Visuais — Próximo Ep.

Este documento lista as referências de interface usadas para desenhar o **Próximo Ep.**, qual elemento específico foi observado em cada uma, onde foi aplicado no nosso produto e por que a escolha faz sentido para o nosso problema. As imagens de referência (prints/recortes) devem ser salvas em `docs/references/imagens/` com o mesmo nome de arquivo citado entre parênteses em cada item, para que o item do texto e a imagem correspondente sejam fáceis de cruzar.

## 1. Reddit — referência de Comunidade

**Imagem Usada como Referencia:** `docs/references/imagens/Reddit.png`
- **Elemento observado**: no Reddit, cada post recebe um conjunto pequeno e objetivo de reações (upvote/downvote + poucos emojis de destaque), em vez de comentários obrigatórios. A reação leva menos de um segundo para ser dada.
- **Onde usamos**: no componente `ReactionBar.jsx`, exibido na página `Detalhes.jsx` depois que o título é marcado como "Assistido".
- **Por que é adequado**: o TV Time tem uma camada social rica (memes, comentários, votação em personagem) que está fora do escopo do nosso MVP (sem backend/autenticação). Pegamos a essência do Reddit — reagir é rápido, visual e não exige escrever nada — para entregar uma versão pequena, mas genuína, da "expressão de sentimento pós-episódio" do TV Time, usando só 5 emojis fixos (Chocado, Triste, Enraivecido, Empolgado, Divertido).

## 2. Notion — referência de Organização

**Imagem Usada como Referencia:** `docs/references/imagens/Notion.png`

- **Elemento observado**: o Notion organiza itens em colunas/status (ex: "A fazer", "Fazendo", "Feito") com abas ou toggles simples para filtrar uma lista, e cada item é um cartão compacto com poucas informações (título, uma etiqueta de status colorida).
- **Onde usamos**: página `MinhaLista.jsx`, que usa abas de filtro (`Todos`, `Quero assistir`, `Assistindo`, `Assistido`) e o cartão `MovieCard.jsx` com uma etiqueta de status colorida no canto.
- **Por que é adequado**: nosso problema central é "organizar o que já assistiram". O padrão de status + filtro do Notion é exatamente o modelo mental de "gestão de tarefas" que queremos para gestão de consumo de mídia — e é simples de implementar só com `useState`/`.filter()`.

## 3. Google Calendário — referência de Calendário/Tempo

**Imagem Usada como Referencia:** `docs/references/imagens/Calendario.png`

- **Elemento observado**: o Google Calendário mostra, de forma bem escaneável, blocos de tempo e resumos numéricos (ex.: "3 eventos hoje") usando números grandes e rótulos curtos, sem gráficos complexos.
- **Onde usamos**: página `Estatisticas.jsx`, nos cartões de resumo (tempo total assistido, quantidade de títulos por status) — números grandes em destaque com um rótulo pequeno abaixo, igual ao resumo do topo do Google Calendário.
- **Por que é adequado**: o recurso original do TV Time é um "medidor de tempo de vida investido". Sem biblioteca de gráficos (fora do escopo ensinado), o formato "número grande + rótulo" do Google Calendário é a forma mais direta de comunicar esse dado com HTML/CSS puro.

## 4. Letterboxd — referência de identidade visual e cartões de título

**Imagem Usada como Referencia:** `docs/references/imagens/Letterboxd.png`

- **Elemento observado**: grade de pôsteres com proporção 2:3 fixa, fundo escuro que faz o pôster colorido se destacar, e uma paleta reduzida (fundo quase preto + um único tom de destaque).
- **Onde usamos**: fundo escuro global (`index.css`) e a grade de `MovieCard.jsx` na `Home.jsx` e em `MinhaLista.jsx`.
- **Por que é adequado**: como o Próximo Ep. lida com filmes **e** séries (assim como o TV Time, diferente do Letterboxd, que é só filmes), a grade de pôsteres em fundo escuro ajuda os cartazes — que têm estilos visuais muito diferentes entre si — a parecerem parte de uma coleção coesa.

## 5. Trakt.tv — referência de rótulos de status técnicos

**Imagem Usada como Referencia:** `docs/references/imagens/Trackt-tv.png`

- **Elemento observado**: o Trakt usa rótulos de status curtos e diretos ("watched", "watching", "plan to watch") com cores associadas fixas, sem ilustrações.
- **Onde usamos**: `StatusSelector.jsx` — cada um dos três status tem uma cor fixa (âmbar para "Quero assistir", azul para "Assistindo", verde para "Assistido") reaproveitada em toda a aplicação (etiqueta no `MovieCard`, abas da `MinhaLista`, cartões de `Estatisticas`).
- **Por que é adequado**: cor consistente por status funciona como uma legenda que o usuário aprende uma vez e reconhece em qualquer tela, reduzindo a necessidade de texto explicativo — importante num MVP sem onboarding.

## 6. Resumo das decisões de design herdadas das referências

| Referência | O que foi observado | Onde foi aplicado |
|---|---|---|
| Reddit | Reações rápidas com poucos emojis, sem texto obrigatório | `ReactionBar.jsx` |
| Notion | Status em abas + cartões compactos e filtráveis | `MinhaLista.jsx`, `MovieCard.jsx` |
| Google Calendário | Números grandes com rótulo curto para resumos | `Estatisticas.jsx` |
| Letterboxd | Grade de pôsteres sobre fundo escuro, paleta reduzida | `index.css`, grade da `Home.jsx` |
| Trakt.tv | Cor fixa por status, sem depender de ilustração | `StatusSelector.jsx` e reaproveitamento de cor |