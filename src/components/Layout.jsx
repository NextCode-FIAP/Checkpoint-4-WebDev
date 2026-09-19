import Navbar from "./Navbar.jsx";

// Layout.jsx
// Componente "casca" (wrapper) compartilhado por todas as rotas da aplicação.
// Em vez de repetir a <Navbar /> em cada página, cada rota em App.jsx é
// envolvida por <Layout>...</Layout>, garantindo a mesma barra de navegação
// e o mesmo container de conteúdo em todas as telas.
// "children" é a prop especial do React que representa tudo que foi colocado
// ENTRE as tags de abertura e fechamento de <Layout> — no caso, a página atual
// (Home, Detalhes, MinhaLista, etc.).

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* Área de conteúdo: aqui entra a página específica de cada rota. */}
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;
