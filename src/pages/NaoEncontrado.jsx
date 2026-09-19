import { Link } from "react-router-dom";

const NaoEncontrado = () => {
  return (
    <div className="pagina-404">
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
};

export default NaoEncontrado;
