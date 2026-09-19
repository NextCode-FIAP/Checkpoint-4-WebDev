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

// Cartão clicável de um título (filme ou série), usado na Home e na Minha Lista.
const MovieCard = ({ item }) => {
  const { id, tipo, titulo, poster, ano, status } = item;

  // Guarda qual título foi clicado, para a página de Detalhes saber
  // qual título mostrar assim que o usuário chegar lá.
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
          {tipo === "tv" ? "Série" : "Filme"} {ano ? `· ${ano}` : ""}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;