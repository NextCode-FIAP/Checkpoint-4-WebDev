import { FaInbox } from "react-icons/fa6";

// Estado vazio reutilizável (busca sem resultado, lista vazia, filtro sem itens...).
const EmptyState = ({ titulo, mensagem, icone }) => {
  return (
    <div className="estado-vazio">
      {icone ?? <FaInbox size={28} />}
      <h3>{titulo}</h3>
      <p>{mensagem}</p>
    </div>
  );
};

export default EmptyState;