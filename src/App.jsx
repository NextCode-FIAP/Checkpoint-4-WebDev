import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Detalhes from "./pages/Detalhes.jsx";
import MinhaLista from "./pages/MinhaLista.jsx";
import Estatisticas from "./pages/Estatisticas.jsx";
import NaoEncontrado from "./pages/NaoEncontrado.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="titulo/:tipo/:id" element={<Layout><Detalhes /></Layout>} />
      <Route path="minha-lista" element={<Layout><MinhaLista /></Layout>} />
      <Route path="estatisticas" element={<Layout><Estatisticas /></Layout>} />
      <Route path="*" element={<Layout><NaoEncontrado /></Layout>} />
    </Routes>
  );
};

export default App;