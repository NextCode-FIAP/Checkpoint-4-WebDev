const SearchBar = ({ valor, aoDigitar, aoBuscar }) => {
  const lidarComEnvio = (evento) => {
    evento.preventDefault();
    aoBuscar();
  };

  return (
    <form className="busca" onSubmit={lidarComEnvio}>
      <input
        className="busca__campo"
        type="text"
        placeholder="Buscar um filme ou série..."
        value={valor}
        onChange={({ target: { value } }) => aoDigitar(value)}
      />
      <button className="busca__botao" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
