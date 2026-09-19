import Navbar from "./Navbar.jsx";

// Layout compartilhado por todas as rotas: Navbar fixa + conteúdo da página atual.
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;
