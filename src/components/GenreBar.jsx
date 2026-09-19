// GenreBar.jsx
// Barra horizontal usada na página de Estatísticas para representar
// visualmente quantos títulos assistidos pertencem a um determinado gênero,
// em relação ao gênero mais assistido.
// Props:
// - nome: nome do gênero (ex.: "Ação")
// - quantidade: quantos títulos assistidos têm esse gênero
// - maximo: a maior quantidade entre todos os gêneros (usada para calcular
//   a porcentagem de preenchimento da barra, deixando o gênero mais
//   assistido com a barra 100% cheia)

const GenreBar = ({ nome, quantidade, maximo }) => {
  // Regra de segurança: evita divisão por zero caso "maximo" seja 0
  const porcentagem = maximo > 0 ? Math.round((quantidade / maximo) * 100) : 0;

  return (
    <div className="barra-genero">
      <div className="barra-genero__topo">
        <span>{nome}</span>
        <span>{quantidade}</span>
      </div>
      <div className="barra-genero__trilho">
        {/* A largura da barra preenchida é definida via style inline, */}
        <div
          className="barra-genero__preenchimento"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
};

export default GenreBar;
