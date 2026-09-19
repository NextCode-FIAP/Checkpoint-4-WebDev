import { useEffect, useState } from "react";
import { buscarEmAlta, buscarPorTexto } from "../services/tmdb.js";
import { listarItens } from "../utils/storage.js";
import { formatarAno } from "../utils/format.js";
import SearchBar from "../components/SearchBar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

// Junta os dados que vêm da API com o status que o usuário já salvou localmente
// (se o título já estiver na lista dele).
const combinarComStatusSalvo = (resultadosApi) => {
  const itensSalvos = listarItens();

  return resultadosApi.map((resultado) => {
    const tipo = resultado.media_type;
    const salvo = itensSalvos.find(
      (item) => item.id === resultado.id && item.tipo === tipo
    );

    return {
      id: resultado.id,
      tipo,
      titulo: resultado.title || resultado.name,
      poster: resultado.poster_path,
      ano: formatarAno(resultado.release_date || resultado.first_air_date),
      status: salvo ? salvo.status : null,
    };
  });
};

const Home = () => {
  const [titulos, setTitulos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [buscando, setBuscando] = useState(false);

  // Carrega os títulos em alta assim que a página é montada.
  useEffect(() => {
    const carregarEmAlta = async () => {
      setCarregando(true);
      setErro(null);

      try {
        const resultados = await buscarEmAlta();
        setTitulos(combinarComStatusSalvo(resultados));
        setCarregando(false);
      } catch (erroCapturado) {
        setErro("Não foi possível carregar os títulos em alta agora.");
        setTitulos([]);
        setCarregando(false);
      }
    };

    carregarEmAlta();
  }, []);

  const lidarComBusca = async () => {
    if (!termoBusca.trim()) {
      return;
    }

    setCarregando(true);
    setErro(null);
    setBuscando(true);

    try {
      const resultados = await buscarPorTexto(termoBusca);
      setTitulos(combinarComStatusSalvo(resultados));
      setCarregando(false);
    } catch (erroCapturado) {
      setErro("Não foi possível concluir a busca agora.");
      setTitulos([]);
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="pagina__cabecalho">
        <h1>O que você vai assistir hoje?</h1>
        <p className="pagina__subtitulo">
          Descubra filmes e séries em alta, acompanhe seu progresso e registre
          sua reação depois de assistir.
        </p>
      </div>

      <SearchBar
        valor={termoBusca}
        aoDigitar={setTermoBusca}
        aoBuscar={lidarComBusca}
      />

      {carregando && <Loader mensagem="Buscando títulos..." />}

      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && titulos.length === 0 && (
        <EmptyState
          titulo="Nenhum título encontrado"
          mensagem={
            buscando
              ? "Tente buscar por outro nome."
              : "Não foi possível carregar os títulos em alta agora."
          }
        />
      )}

      {!carregando && !erro && titulos.length > 0 && (
        <div className="grade-titulos">
          {titulos.map((titulo) => (
            <MovieCard item={titulo} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;