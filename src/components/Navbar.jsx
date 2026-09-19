import { Link, NavLink } from "react-router-dom";
import { FaClapperboard, FaListCheck, FaChartColumn } from "react-icons/fa6";

// Barra de navegação fixa no topo, presente em todas as páginas via Layout.jsx.
const Navbar = () => {
  const obterClasseLink = ({ isActive }) =>
    `navbar__link ${isActive ? "navbar__link--ativo" : ""}`;

  return (
    <header className="navbar">
      <div className="navbar__conteudo">
        <Link to="/" className="navbar__marca">
          Próximo Ep.
        </Link>

        <nav className="navbar__links">
          <NavLink to="/" end className={obterClasseLink}>
            <FaClapperboard size={16} />
            Descobrir
          </NavLink>

          <NavLink to="/minha-lista" className={obterClasseLink}>
            <FaListCheck size={16} />
            Minha lista
          </NavLink>

          <NavLink to="/estatisticas" className={obterClasseLink}>
            <FaChartColumn size={16} />
            Estatísticas
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;