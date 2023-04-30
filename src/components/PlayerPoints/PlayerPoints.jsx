import { useSelector } from "react-redux";
// ce selector me permet de récupérer le nombre de jeux gagnés par joueur.
import { selectPlayerPoints } from "../../selectors/selectors";

export function PlayersPoints({ playerId, playerName }) {
  // ce selector me permet de récupérer le nombre de jeux gagnés par joueur.
  const playerPoints = useSelector(selectPlayerPoints(playerId));

  return (
    <div className="player-games">
      <p>{playerName}</p>
      <p>
        {playerPoints === 0
          ? "Aucun jeu gagné"
          : playerPoints === 1
          ? "1 jeu gagné"
          : `${playerPoints} jeux gagnés`}
      </p>
    </div>
  );
}
