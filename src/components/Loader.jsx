// Indicador simples de carregamento, usado enquanto uma requisição à API está pendente.
const Loader = ({ mensagem = "Carregando..." }) => {
  return (
    <div className="carregando">
      <span className="spinner" />
      <span>{mensagem}</span>
    </div>
  );
};

export default Loader;
