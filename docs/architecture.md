# Arquitetura — Próximo Ep.
 
Aplicação React (Vite) de acompanhamento de filmes e séries, integrada à
API do TMDB, com persistência local via `localStorage`.
 
---
 
## 1. Rotas (`App.jsx`)
 
Todas as rotas são envolvidas pelo componente `Layout` (Navbar + container).
 
| Path                     | Página          | Descrição                                                                 |
|---------------------------|-----------------|----------------------------------------------------------------------------|
| `/`                        | `Home`          | Descoberta de títulos em alta + busca por texto.                          |
| `/titulo/:tipo/:id`        | `Detalhes`      | Detalhes de um título. lê o título selecionado do `localStorage` (ver seção 5). |
| `/minha-lista`             | `MinhaLista`    | Lista pessoal, com filtro por status.                                     |
| `/estatisticas`            | `Estatisticas`  | Estatísticas calculadas a partir dos itens salvos.                        |
| `*` (qualquer outra URL)   | `NaoEncontrado` | Página 404.                                                               |
 
---
 
## 2. Páginas (`src/pages`)
 
### `Home.jsx`
- **Estados:**
  - `titulos: array` — títulos exibidos na grade (em alta ou resultado de busca).
  - `carregando: boolean` — exibe `<Loader />`.
  - `erro: string | null` — mensagem de erro da API.
  - `termoBusca: string` — valor controlado do `<SearchBar />`.
  - `buscando: boolean` — diferencia "sem resultado de busca" de "falha ao carregar em alta", para escolher a mensagem do `EmptyState`.
- **Efeitos:**
  - `useEffect([])` — ao montar, chama `buscarEmAlta()` e popula `titulos` combinados com status salvo localmente (`combinarComStatusSalvo`).
- **Funções locais:**
  - `combinarComStatusSalvo(resultadosApi)` — enriquece os resultados da API com o `status` já salvo pelo usuário (via `listarItens`).
  - `lidarComBusca()` — chamada pelo `SearchBar`; busca por texto (`buscarPorTexto`) e atualiza `titulos`.
- **Componentes usados:** `SearchBar`, `MovieCard` (em loop), `Loader`, `EmptyState`.
### `Detalhes.jsx`
- **Não recebe parâmetros de rota via `useParams`.** Lê `tipo`/`id` de `obterTituloSelecionado()` (localStorage), preenchido pelo `MovieCard` no momento do clique.
- **Estados:**
  - `titulo: object | null` — dados completos vindos da API (`buscarDetalhes`).
  - `carregando: boolean`.
  - `itemSalvo: object | null` — item salvo localmente para este título (status + reação).
- **Efeitos:**
  - `useEffect([tipo, id])` — busca os detalhes na API e carrega o item salvo (`obterItem`) sempre que `tipo`/`id` mudarem.
- **Funções locais:**
  - `alterarStatus(novoStatus)` — calcula duração (filme vs. série), monta o item e persiste via `salvarItem`; zera a reação se o novo status não for "Assistido".
  - `alterarReacao(novaReacao)` — só executa se o item já existir e estiver "Assistido"; persiste via `salvarItem`.
- **Componentes usados:** `StatusSelector`, `ReactionBar`, `Loader`.
### `MinhaLista.jsx`
- **Estados:**
  - `itens: array` — todos os itens salvos localmente.
  - `filtroStatus: string` — aba ativa (`"Todos"`, `"Quero assistir"`, `"Assistindo"`, `"Assistido"`).
- **Efeitos:**
  - `useEffect([])` — ao montar, carrega `itens` via `listarItens()`.
- **Funções locais:**
  - `lidarComRemocao(id, tipo)` — remove item via `removerItem` e atualiza o estado.
- **Derivados (calculados a cada render, não são estado):** `itensFiltrados` — filtra `itens` conforme `filtroStatus`.
- **Componentes usados:** `StatusSelector` (reaproveitado como filtro, com `opcoes={ABAS}`), `MovieCard` (em loop), `EmptyState`.
### `Estatisticas.jsx`
- **Estados:**
  - `itens: array` — todos os itens salvos localmente.
- **Efeitos:**
  - `useEffect([])` — ao montar, carrega `itens` via `listarItens()`.
- **Funções locais:**
  - `contarGeneros(itensAssistidos)` — conta ocorrências de cada gênero entre os itens "Assistido".
- **Derivados:** `assistidos`, `assistindo`, `queroAssistir` (filtros por status), `minutosTotais` (soma de duração dos assistidos), `generosOrdenados` (array `{ nome, quantidade }` ordenado, a partir de `contarGeneros`), `maiorContagemGenero` (usado como 100% de referência nas barras).
- **Componentes usados:** `GenreBar` (em loop), `EmptyState`.
### `NaoEncontrado.jsx`
- Sem estado, sem efeitos, sem props. Página estática de erro 404.
---
 
## 3. Componentes (`src/components`)
 
| Componente        | Props                                              | Estado próprio | Observações |
|--------------------|-----------------------------------------------------|----------------|-------------|
| `Layout`           | `children: ReactNode`                               | Nenhum         | Envolve toda página com `<Navbar />` + `<main className="container">`. |
| `Navbar`           | Nenhuma                                             | Nenhum         | Usa `NavLink` para destacar a rota ativa. |
| `MovieCard`        | `item: { id, tipo, titulo, poster, ano, status }`   | Nenhum         | Também exporta `classeDoStatus(status)`, reaproveitada por `StatusSelector`. Ao clicar, chama `salvarTituloSelecionado(tipo, id)` antes de navegar. |
| `StatusSelector`   | `statusAtual`, `aoAlterar(opcao)`, `opcoes` (opcional, default = status reais) | Nenhum | Reaproveitado tanto para definir status (Detalhes) quanto para filtrar (MinhaLista, com "Todos" incluído em `opcoes`). |
| `ReactionBar`      | `reacaoAtual`, `aoReagir(rotulo)`, `desabilitado`   | Nenhum         | Também exporta a constante `reacoes` (lista fixa de reações). Botões ficam desabilitados se `desabilitado === true`. |
| `SearchBar`        | `valor`, `aoDigitar(texto)`, `aoBuscar()`           | Nenhum         | Input controlado — o estado do texto vive no componente pai (`Home`). |
| `Loader`           | `mensagem` (opcional, default `"Carregando..."`)     | Nenhum         | Spinner + texto. |
| `EmptyState`       | `titulo`, `mensagem`, `icone` (opcional)            | Nenhum         | Estado vazio genérico, reaproveitado em várias páginas. |
| `GenreBar`         | `nome`, `quantidade`, `maximo`                      | Nenhum         | Calcula porcentagem de preenchimento (`quantidade / maximo`). |
 
---
 
## 4. Serviços e utilitários
 
### `src/services/tmdb.js`
Camada de acesso à API do TMDB.
- `buscarNaApi(caminho, parametros)` — helper interno de fetch + JSON.
- `buscarEmAlta()` — `GET /trending/all/week`, filtrado para `movie`/`tv`.
- `buscarPorTexto(texto)` — `GET /search/multi`, filtrado para `movie`/`tv`.
- `buscarDetalhes(tipo, id)` — `GET /movie/:id` ou `GET /tv/:id`.
- `URL_IMAGEM` — base para montar URLs de pôster.
### `src/utils/format.js`
Funções puras de formatação.
- `formatarDuracao(minutosTotais)` → `"2h 15min"` ou `"45min"`.
- `formatarAno(dataString)` → `"2024"` ou `"—"`.
### `src/utils/storage.js`
Camada de persistência local (`localStorage`), com duas chaves:
- `proximo-ep:itens` — lista de títulos acompanhados.
- `proximo-ep:titulo-selecionado` — último título clicado (usado por `Detalhes.jsx`).
Funções:
- `listarItens()` — lê a lista completa.
- `obterItem(id, tipo)` — busca um item específico.
- `salvarItem(itemNovo)` — insere ou atualiza um item.
- `removerItem(id, tipo)` — remove um item.
- `salvarTituloSelecionado(tipo, id)` — chamada pelo `MovieCard` no clique.
- `obterTituloSelecionado()` — lida pela página `Detalhes`.
---
 
## 5. Fluxo de dados entre Home/MinhaLista → Detalhes
 
Este app **não usa os parâmetros da URL** (`:tipo`, `:id`) para saber qual
título mostrar em `Detalhes.jsx`. O fluxo real é:
 
```
MovieCard (onClick)
   └─ salvarTituloSelecionado(tipo, id)   // grava no localStorage
   └─ navega para /titulo/:tipo/:id       // via <Link>
 
Detalhes.jsx (ao montar)
   └─ obterTituloSelecionado()            // lê do localStorage
   └─ buscarDetalhes(tipo, id)            // busca na API do TMDB
   └─ obterItem(id, tipo)                 // busca status/reação salvos
```
 
Isso significa que a página de Detalhes só funciona corretamente se o
usuário chegar até ela clicando em um `MovieCard` — acessar a URL
diretamente não preenche `tituloSelecionado`.
 
---
 
## 6. Resumo visual da árvore de componentes
 
```
main.jsx
└─ App.jsx (Routes)
   └─ Layout
      ├─ Navbar
      └─ <página da rota atual>
         ├─ Home
         │  ├─ SearchBar
         │  ├─ Loader
         │  ├─ EmptyState
         │  └─ MovieCard (× N)
         ├─ Detalhes
         │  ├─ Loader
         │  ├─ StatusSelector
         │  └─ ReactionBar
         ├─ MinhaLista
         │  ├─ StatusSelector (como filtro)
         │  ├─ EmptyState
         │  └─ MovieCard (× N)
         ├─ Estatisticas
         │  ├─ EmptyState
         │  └─ GenreBar (× N)
         └─ NaoEncontrado
```
