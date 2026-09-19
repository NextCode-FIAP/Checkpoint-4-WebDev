import { useEffect, useState } from "react";
import { listarItens } from "../utils/storage.js";
import { formatarDuracao } from "../utils/format.js";
import GenreBar from "../components/GenreBar.jsx";
import EmptyState from "../components/EmptyState.jsx";

// Recebe a lista completa de itens e devolve um objeto { nomeDoGenero: quantidade },
// considerando apenas os títulos já "Assistido".
const contarGeneros = (itensAssistidos) => {
  const contagem = {};

  itensAssistidos.forEach((item) => {
    (item.generos || []).forEach((genero) => {
      contagem[genero] = (contagem[genero] || 0) + 1;
    });
  });

  return contagem;
};

const Estatisticas = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    setItens(listarItens());
  }, []);

  if (itens.length === 0) {
    return (
      <>
        <div className="pagina__cabecalho">
          <h1>Estatísticas</h1>
        </div>
        <EmptyState
          titulo="Ainda não há dados suficientes"
          mensagem="Marque alguns títulos como assistidos para ver suas estatísticas aqui."
        />
      </>
    );
  }

  const assistidos = itens.filter((item) => item.status === "Assistido");
  const assistindo = itens.filter((item) => item.status === "Assistindo");
  const queroAssistir = itens.filter(
    (item) => item.status === "Quero assistir"
  );

  // Soma dos minutos feita com forEach em vez de .reduce
  let minutosTotais = 0;
  assistidos.forEach((item) => {
    minutosTotais += item.duracaoMinutos || 0;
  });

  // Conversão do objeto em array feita com loop for...in em vez de Object.entries
  const contagemGeneros = contarGeneros(assistidos);
  const generosOrdenados = [];

  for (let nome in contagemGeneros) {
    generosOrdenados.push({
      nome: nome,
      quantidade: contagemGeneros[nome],
    });
  }

  generosOrdenados.sort((a, b) => b.quantidade - a.quantidade);
  const maiorContagemGenero = generosOrdenados[0]?.quantidade || 1;

  return (
    <>
      <div className="pagina__cabecalho">
        <h1>Suas estatísticas</h1>
        <p className="pagina__subtitulo">
          Números calculados a partir dos títulos salvos na sua lista.
        </p>
      </div>

      <div className="cartoes-resumo">
        <div className="cartao-resumo">
          <span className="cartao-resumo__numero">
            {formatarDuracao(minutosTotais)}
          </span>
          <span className="cartao-resumo__rotulo">Tempo total assistido</span>
        </div>

        <div className="cartao-resumo">
          <span className="cartao-resumo__numero">{assistidos.length}</span>
          <span className="cartao-resumo__rotulo">Títulos assistidos</span>
        </div>

        <div className="cartao-resumo">
          <span className="cartao-resumo__numero">{assistindo.length}</span>
          <span className="cartao-resumo__rotulo">Assistindo agora</span>
        </div>

        <div className="cartao-resumo">
          <span className="cartao-resumo__numero">
            {queroAssistir.length}
          </span>
          <span className="cartao-resumo__rotulo">Na fila</span>
        </div>
      </div>

      <h2>Gêneros mais assistidos</h2>

      {generosOrdenados.length === 0 ? (
        <p>Marque títulos como "Assistido" para ver seus gêneros favoritos.</p>
      ) : (
        <div>
          {generosOrdenados.map((item) => (
            <GenreBar
              nome={item.nome}
              quantidade={item.quantidade}
              maximo={maiorContagemGenero}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Estatisticas;