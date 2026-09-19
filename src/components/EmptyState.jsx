import { FaInbox } from "react-icons/fa6";

// EmptyState.jsx
// Estado vazio reutilizável, usado sempre que não há nada para mostrar:
// busca sem resultado (Home.jsx), lista vazia ou filtro sem itens
// (MinhaLista.jsx), estatísticas sem dados suficientes (Estatisticas.jsx).
//
// Props:
// - titulo: texto em destaque (ex.: "Nenhum título encontrado")
// - mensagem: texto explicativo, menor, abaixo do título
// - icone: ícone opcional para substituir o ícone padrão (FaInbox)

const EmptyState = ({ titulo, mensagem, icone }) => {
  return (
    <div className="estado-vazio">
      {/* Operador "??" (nullish coalescing): usa "icone" se ele foi passado,
          senão cai no ícone padrão de caixa de entrada vazia. */}
      {icone ?? <FaInbox size={28} />}
      <h3>{titulo}</h3>
      <p>{mensagem}</p>
    </div>
  );
};

export default EmptyState;