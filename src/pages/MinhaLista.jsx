import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarItens, removerItem } from "../utils/storage.js";
import MovieCard from "../components/MovieCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import StatusSelector from "../components/StatusSelector.jsx";

const ABAS = ["Todos", "Quero assistir", "Assistindo", "Assistido"];

const MinhaLista = () => {
  const [itens, setItens] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");

  useEffect(() => {
    setItens(listarItens());
  }, []);

  const lidarComRemocao = (id, tipo) => {
    const novaLista = removerItem(id, tipo);
    setItens(novaLista);
  };

  const itensFiltrados =
    filtroStatus === "Todos"
      ? itens
      : itens.filter((item) => item.status === filtroStatus);

  return (
    <>
      <div className="pagina__cabecalho">
        <h1>Minha lista</h1>
        <p className="pagina__subtitulo">
          Tudo o que você já marcou como "Quero assistir", "Assistindo" ou
          "Assistido".
        </p>
      </div>

      <StatusSelector
        statusAtual={filtroStatus}
        aoAlterar={setFiltroStatus}
        opcoes={ABAS}
      />

      {itensFiltrados.length === 0 ? (
        <EmptyState
          titulo="Sua lista está vazia por aqui"
          mensagem="Volte para a página inicial e marque um título para começar a acompanhar."
        />
      ) : (
        <div className="grade-titulos">
          {itensFiltrados.map((item) => (
            <div>
              <MovieCard item={item} />
              <button
                type="button"
                className="acao-remover"
                onClick={() => lidarComRemocao(item.id, item.tipo)}
              >
                Remover da lista
              </button>
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: 32 }}>
        Quer descobrir mais títulos? <Link to="/">Voltar para Descobrir</Link>
      </p>
    </>
  );
};

export default MinhaLista;