# Requisitos do Produto — Próximo Ep.

## 1. Objetivo

O **Próximo Ep.** é um MVP inspirado no TV Time, focado em resolver um recorte específico do problema "acompanhar séries e episódios": muita gente perde o fio de quais séries/filmes já assistiu, o que está assistindo no momento e qual foi sua reação a cada título, porque essa informação fica espalhada na memória ou em anotações soltas.

O produto resolve isso oferecendo:

1. **Descoberta** de filmes e séries em alta (dados reais via API do TMDB);
2. **Rastreamento pessoal** do status de cada título (`Quero assistir`, `Assistindo`, `Assistido`);
3. **Reação por emoji** após o título ser marcado como assistido (camada social/gamificada leve, inspirada no sistema de reações do TV Time);
4. **Estatísticas pessoais** simples: tempo total assistido, quantidade por status e gêneros mais assistidos.

Escopo do MVP: **não** há backend, autenticação ou comunidade real (comentários, memes, votação em personagens). Toda a persistência é local (`localStorage`).

## 2. Público-alvo

- Pessoas que assistem regularmente séries e filmes e sentem dificuldade de lembrar o que já viram.
- Usuários que querem uma ferramenta simples e rápida, sem precisar criar conta, para organizar o que assistem.
- Perfil etário amplo (16–40 anos), familiarizado com apps de streaming e redes sociais.

## 3. Problema escolhido

Dentre as oportunidades listadas no enunciado, o grupo escolheu combinar:

- **Organizar o que já assistiram / acompanhar séries e episódios** (problema principal);
- **Registrar opiniões** (problema secundário, resolvido de forma leve com reações por emoji, sem texto livre);
- **Acompanhar estatísticas pessoais** (problema secundário, para dar um retorno gamificado ao usuário sobre o próprio hábito de consumo).

**Por que esse recorte?** Recursos como feed social, anti-spoiler, enquetes e scrobbling automático (TV Time e Trakt) dependem de backend, autenticação multiusuário e integrações externas que fogem do escopo de um projeto de front-end puro com React + API pública. O recorte escolhido é o núcleo de maior valor (organização + sentimento) que é **totalmente implementável só com front-end e storage.js**.

## 4. User Stories

| # | Como... | Eu quero... | Para que... |
|---|---------|--------------|-------------|
| US01 | usuário | ver uma lista de filmes e séries em alta na página inicial | descobrir o que assistir |
| US02 | usuário | pesquisar um filme ou série pelo nome | encontrar rapidamente um título específico |
| US03 | usuário | abrir a página de detalhes de um título | ver sinopse, gêneros, data de lançamento e duração |
| US04 | usuário | marcar um título como "Quero assistir", "Assistindo" ou "Assistido" | organizar meu progresso de consumo |
| US05 | usuário | reagir com um emoji a um título que já assisti | registrar minha opinião de forma rápida |
| US06 | usuário | acessar "Minha Lista" | ver tudo que já marquei, filtrando por status |
| US07 | usuário | remover um título da minha lista | manter minha lista organizada |
| US08 | usuário | acessar "Estatísticas" | ver quanto tempo já passei assistindo e quais gêneros mais consumo |
| US09 | usuário | ver uma mensagem clara quando minha lista estiver vazia | entender o que fazer em seguida |
| US10 | usuário | ver um indicador de carregamento enquanto os dados da API chegam | saber que o sistema está respondendo |

## 5. Critérios de aceitação

- **US01**: a Home deve buscar e exibir os títulos em alta (`/trending/all/week` do TMDB) assim que a página carrega, usando `useEffect`.
- **US02**: a busca deve consultar o endpoint `/search/multi` do TMDB e atualizar a lista exibida sem recarregar a página.
- **US03/US04/US05**: a página de detalhes é acessada por rota dinâmica (`/titulo/:tipo/:id`), busca os dados do título específico na API e permite alterar o status e a reação, persistindo no `localStorage`.
- A reação por emoji só fica habilitada quando o status do título é `"Assistido"` (regra de produto, ver seção 7).
- **US06/US07**: "Minha Lista" lê os dados do `storage.js`, permite filtrar por status através de abas e remover qualquer item.
- **US08**: "Estatísticas" calcula, a partir dos itens salvos, o tempo total assistido (em horas e minutos) e a contagem de gêneros, exibindo os resultados em cartões e barras simples.
- **US09**: toda lista vazia (resultado de busca vazio, "Minha Lista" vazia, filtro sem resultados) exibe um componente de estado vazio com uma mensagem orientando o próximo passo.
- **US10**: toda chamada assíncrona à API exibe um componente de carregamento (`Loader`) enquanto a requisição está pendente e trata erros de rede com `try...catch`.

## 6. Estados da aplicação

Cada requisição assíncrona (Home, Busca, Detalhes) passa pelos seguintes estados, controlados via `useState`:

- `carregando` (`boolean`): `true` enquanto o `fetch` está em andamento.
- `erro` (`string | null`): mensagem de erro amigável quando a API falha.
- `dados` (`array` | `object` | `null`): resultado da requisição.

Cada título salvo em "Minha Lista" (objeto no `localStorage`) tem o seguinte formato:

```json
{
  "id": 12345,
  "tipo": "movie",
  "titulo": "Nome do filme ou série",
  "poster": "/caminho-do-poster.jpg",
  "status": "Quero assistir",
  "reacao": null,
  "duracaoMinutos": 120,
  "generos": ["Ficção científica", "Aventura"]
}
```

## 7. Regras do produto

1. Um título só pode ter **um** status por vez, dentre: `"Quero assistir"`, `"Assistindo"`, `"Assistido"`.
2. A reação por emoji **só pode ser escolhida quando o status é `"Assistido"`** — reforça a ideia de que a opinião vem depois do consumo, como no TV Time.
3. Ao trocar o status de `"Assistido"` para outro valor, a reação salva é **apagada**, pois deixa de fazer sentido.
4. O tempo assistido só entra no cálculo de estatísticas quando o status é `"Assistido"`.
5. Não é possível adicionar o mesmo título duas vezes à lista: se o usuário já rastreia aquele título, alterar o status/reação apenas atualiza o item existente.
6. Toda a persistência é local ao navegador (sem login), então a lista de um usuário não é compartilhada entre dispositivos — limitação assumida e documentada para o MVP.