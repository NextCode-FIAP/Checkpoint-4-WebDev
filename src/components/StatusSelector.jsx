import { classeDoStatus } from "./MovieCard.jsx";

const OPCOES_STATUS = ["Quero assistir", "Assistindo", "Assistido"];

// Botões para escolher o status de acompanhamento de um título.
// Também é reaproveitado na Minha Lista para filtrar por status
// (nesse caso, "opcoes" chega com "Todos" incluído).
const StatusSelector = ({ statusAtual, aoAlterar, opcoes = OPCOES_STATUS }) => {
  return (
    <div className="seletor-status">
      {opcoes.map((opcao) => {
        const estaAtiva = statusAtual === opcao;

        return (
          <button
            type="button"
            onClick={() => aoAlterar(opcao)}
            className={`seletor-status__opcao ${classeDoStatus(opcao)} ${
              estaAtiva ? "seletor-status__opcao--ativa" : ""
            }`}
          >
            {opcao}
          </button>
        );
      })}
    </div>
  );
};

export default StatusSelector;