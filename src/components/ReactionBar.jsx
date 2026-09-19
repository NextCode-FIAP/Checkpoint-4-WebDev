import { FaFaceSurprise } from "react-icons/fa6";
import { FaFaceSadTear } from "react-icons/fa6";
import { FaFaceAngry } from "react-icons/fa6";
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaFaceLaughBeam } from "react-icons/fa6";

export const reacoes = [
  { id: "chocado", icon: FaFaceSurprise, rotulo: "Chocado", cor: "#eab308" },
  { id: "triste", icon: FaFaceSadTear, rotulo: "Triste", cor: "#3b82f6" },
  { id: "enraivecido", icon: FaFaceAngry, rotulo: "Enraivecido", cor: "#ef4444" },
  { id: "empolgado", icon: FaFaceGrinStars, rotulo: "Empolgado", cor: "#f59e0b" },
  { id: "divertido", icon: FaFaceLaughBeam, rotulo: "Divertido", cor: "#10b981" },
];

// Regra de produto: só é possível reagir quando o título já está "Assistido"
// (ver docs/requirements.md, seção 7).
const ReactionBar = ({ reacaoAtual, aoReagir, desabilitado }) => {
  return (
    <div>
      <h3>Sua reação</h3>

      {desabilitado && (
        <p className="reacoes__aviso">
          Marque o título como "Assistido" para poder reagir.
        </p>
      )}

      <div className="reacoes">
        {reacoes.map((reacao) => {
          const IconComponent = reacao.icon;
          const estaAtiva = reacaoAtual === reacao.rotulo;

          return (
            <button
              type="button"
              disabled={desabilitado}
              onClick={() => aoReagir(reacao.rotulo)}
              className={`reacoes__opcao ${
                estaAtiva ? "reacoes__opcao--ativa" : ""
              }`}
            >
              <IconComponent size={24} color={reacao.cor} />
              <span>{reacao.rotulo}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReactionBar;