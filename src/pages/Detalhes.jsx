import { useEffect, useState } from "react";
import { buscarDetalhes, URL_IMAGEM } from "../services/tmdb.js";
import {
  obterItem,
  salvarItem,
  obterTituloSelecionado,
} from "../utils/storage.js";
import { formatarDuracao, formatarAno } from "../utils/format.js";
import StatusSelector from "../components/StatusSelector.jsx";
import ReactionBar from "../components/ReactionBar.jsx";
import Loader from "../components/Loader.jsx";

const Detalhes = () => {
  // Em vez de ler o tipo e o id da URL, pegamos do localStorage o título
  // que o usuário clicou no MovieCard para chegar até aqui.
  const tituloSelecionado = obterTituloSelecionado();
  const tipo = tituloSelecionado ? tituloSelecionado.tipo : null;
  const id = tituloSelecionado ? tituloSelecionado.id : null;

  const [titulo, setTitulo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [itemSalvo, setItemSalvo] = useState(null);

  useEffect(() => {
    const carregarDetalhes = async () => {
      setCarregando(true);

      try {
        const dados = await buscarDetalhes(tipo, id);
        setTitulo(dados);

        const salvo = obterItem(Number(id), tipo);
        setItemSalvo(salvo);
        setCarregando(false);
      } catch (erroCapturado) {
        setCarregando(false);
      }
    };

    carregarDetalhes();
  }, [tipo, id]);

  const alterarStatus = (novoStatus) => {
    let duracao = 0;
    if (tipo === "tv") {
      duracao = (titulo.episode_run_time?.[0] || 0) * (titulo.number_of_episodes || 0);
    } else {
      duracao = titulo.runtime || 0;
    }

    const itemBase = {
      id: Number(id),
      tipo: tipo,
      titulo: titulo.title || titulo.name,
      poster: titulo.poster_path,
      duracaoMinutos: duracao,
      generos: (titulo.genres || []).map((genero) => genero.name),
    };

    let reacaoAtualizada = null;
    if (novoStatus === "Assistido" && itemSalvo) {
      reacaoAtualizada = itemSalvo.reacao;
    }

    const itemAtualizado = {
      ...itemBase,
      status: novoStatus,
      reacao: reacaoAtualizada,
    };

    salvarItem(itemAtualizado);
    setItemSalvo(itemAtualizado);
  };

  const alterarReacao = (novaReacao) => {
    if (!itemSalvo || itemSalvo.status !== "Assistido") {
      return;
    }

    const itemAtualizado = { ...itemSalvo, reacao: novaReacao };
    salvarItem(itemAtualizado);
    setItemSalvo(itemAtualizado);
  };

  if (carregando) {
    return <Loader mensagem="Carregando detalhes..." />;
  }

  if (!titulo) {
    return null;
  }

  const nomeExibicao = titulo.title || titulo.name;
  const dataExibicao = titulo.release_date || titulo.first_air_date;

  return (
    <div className="detalhes">
      {titulo.poster_path && (
        <img
          className="detalhes__poster"
          src={`${URL_IMAGEM}${titulo.poster_path}`}
          alt={`Pôster de ${nomeExibicao}`}
        />
      )}

      <div>
        <h1>{nomeExibicao}</h1>

        <div className="detalhes__info-linha">
          <span>{tipo === "tv" ? "Série" : "Filme"}</span>
          <span>{formatarAno(dataExibicao)}</span>
          <span>
            {tipo === "tv"
              ? `${titulo.number_of_episodes || 0} episódios`
              : formatarDuracao(titulo.runtime || 0)}
          </span>
        </div>

        <div className="detalhes__generos">
          {(titulo.genres || []).map((genero) => (
            <span className="pilula">
              {genero.name}
            </span>
          ))}
        </div>

        <p>{titulo.overview || "Sem sinopse disponível."}</p>

        <h3>Meu status</h3>
        <StatusSelector
          statusAtual={itemSalvo ? itemSalvo.status : null}
          aoAlterar={alterarStatus}
        />

        <ReactionBar
          reacaoAtual={itemSalvo ? itemSalvo.reacao : null}
          aoReagir={alterarReacao}
          desabilitado={!itemSalvo || itemSalvo.status !== "Assistido"}
        />
      </div>
    </div>
  );
};

export default Detalhes;