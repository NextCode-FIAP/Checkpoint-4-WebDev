import { Link } from "react-router-dom";
import { URL_IMAGEM } from "../services/tmdb.js";
import { salvarTituloSelecionado } from "../utils/storage.js";

// Converte o texto do status em uma classe CSS (usada na etiqueta e no seletor).
export const classeDoStatus = (status) => {
  if (status === "Quero assistir") return "status--quero";
  if (status === "Assistindo") return "status--assistindo";
  if (status === "Assistido") return "status--assistido";
  return "";
};

// MovieCard.jsx
// Cartão clicável que representa um filme ou série. É reutilizado tanto na
// Home (resultados da API) quanto na Minha Lista (itens já salvos).
//
// Prop recebida:
// - item: objeto com { id, tipo, titulo, poster, ano, status }

const MovieCard = ({ item }) => {
  const { id, tipo, titulo, poster, ano, status } = item;

// Executado quando o usuário clica no cartão, antes de navegar para
// a página de Detalhes. Guarda no localStorage qual título (tipo + id)
// foi selecionado, pois a página Detalhes.jsx não lê isso da URL —
// ela pergunta essa informação ao localStorage /storage.js.
  const lidarComClique = () => {
    salvarTituloSelecionado(tipo, id);
  };

  return (
    <Link
      to={`/titulo/${tipo}/${id}`}
      className="cartao-titulo"
      onClick={lidarComClique}
    >
      <div className="cartao-titulo__poster-wrap">
        {status && (
          <span className={`cartao-titulo__etiqueta ${classeDoStatus(status)}`}>
            {status}
          </span>
        )}
        
        {/* Só tenta renderizar a imagem se existir um caminho de pôster;
            caso contrário, evita mostrar uma imagem quebrada. */}

        {poster ? (
          <img
            className="cartao-titulo__poster"
            src={`${URL_IMAGEM}${poster}`}
            alt={`Pôster de ${titulo}`}
          />
        ) : null}
      </div>

      <div className="cartao-titulo__corpo">
        <p className="cartao-titulo__titulo">{titulo}</p>
        <p className="cartao-titulo__meta">
          {/* Mostra "Série" ou "Filme" dependendo do tipo, e o ano (se houver). */}
          {tipo === "tv" ? "Série" : "Filme"} {ano ? `· ${ano}` : ""}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;