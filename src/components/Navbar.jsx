import { useState } from "react";
import { Link } from "react-router-dom";
import { FaClapperboard, FaListCheck, FaChartColumn } from "react-icons/fa6";

// Barra de navegação fixa no topo, presente em todas as páginas via Layout.jsx.
const Navbar = () => {
  const [abaAtiva, setAbaAtiva] = useState("/");

  return (
    <header className="navbar">
      <div className="navbar__conteudo">
        <Link to="/" className="navbar__marca" onClick={() => setAbaAtiva("/")}>
          Próximo Ep.
        </Link>

        <nav className="navbar__links">
          <Link
            to="/"
            onClick={() => setAbaAtiva("/")}
            className={`navbar__link ${abaAtiva === "/" ? "navbar__link--ativo" : ""}`}
          >
            <FaClapperboard size={16} />
            Descobrir
          </Link>

          <Link
            to="/minha-lista"
            onClick={() => setAbaAtiva("/minha-lista")}
            className={`navbar__link ${abaAtiva === "/minha-lista" ? "navbar__link--ativo" : ""}`}
          >
            <FaListCheck size={16} />
            Minha lista
          </Link>

          <Link
            to="/estatisticas"
            onClick={() => setAbaAtiva("/estatisticas")}
            className={`navbar__link ${abaAtiva === "/estatisticas" ? "navbar__link--ativo" : ""}`}
          >
            <FaChartColumn size={16} />
            Estatísticas
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;