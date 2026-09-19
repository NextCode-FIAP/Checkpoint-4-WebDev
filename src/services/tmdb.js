const URL_BASE = "https://api.themoviedb.org/3";
const CHAVE_API = import.meta.env.VITE_TMDB_API_KEY;

export const URL_IMAGEM = "https://image.tmdb.org/t/p/w342";

// Função para fazer as requisições na API
const buscarNaApi = async (caminho, parametros = "") => {
  const url = `${URL_BASE}${caminho}?api_key=${CHAVE_API}&language=pt-BR${parametros}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  return dados;
};

// Busca filmes e séries em alta
export const buscarEmAlta = async () => {
  const dados = await buscarNaApi("/trending/all/week");
  return dados.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};

// Busca filmes e séries por texto
export const buscarPorTexto = async (texto) => {
  const dados = await buscarNaApi("/search/multi", `&query=${texto}`);
  return dados.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};

// Busca os detalhes de um filme ou série específico
export const buscarDetalhes = async (tipo, id) => {
  let caminho = `/movie/${id}`;

  if (tipo === "tv") {
    caminho = `/tv/${id}`;
  }

  const dados = await buscarNaApi(caminho);
  return dados;
};