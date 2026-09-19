const GenreBar = ({ nome, quantidade, maximo }) => {
  const porcentagem = maximo > 0 ? Math.round((quantidade / maximo) * 100) : 0;

  return (
    <div className="barra-genero">
      <div className="barra-genero__topo">
        <span>{nome}</span>
        <span>{quantidade}</span>
      </div>
      <div className="barra-genero__trilho">
        <div
          className="barra-genero__preenchimento"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
};

export default GenreBar;
