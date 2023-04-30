/* 
Ce composant permet d'afficher le score de chaque joureur de manière individuel et de définir qui a l'avantage.

1 - Le composant 'PlayerScore' va attendre en params deux props : 
    - 'playerId' : pour indiquer quel 'player' on veut afficher.
    - et 'playerName' pour indiquer quel nom de joueur on doit afficher.
1.a - 'selectPlayerScore' est un selector qui me permet d'accéder au score de mon joueur 

1.b - Je veux rajouter le mot 'Avantage' au joueur qui l'a. 
  1.b.V1 -
    const advantage = useSelector((state) => state.advantage);
    const hasAdvantage = advantage === playerId;

  1.b.V2 - L'ancienne version ci-dessus en deux lignes est possible en une seul ligne ci-dessous :
    const hasAdvantage = useSelector((state) => state.advantage === playerId);

  1.b.V3 : Cette version nous permet d'extraire notre selector de notre composant react lorsque qu'il devient trop complexe et surtout de le rendre réutilisable dans nd'autres composants. Dans l'idéal il aurait fallu la mettre dans un fichier à part 'selector.js'.
*/

import { useSelector } from "react-redux";
// Ce selector me renvoie le joueur qui a l'avantage
import { selectPlayerHasAdvantage, selectPlayerScore } from "../../selectors/selectors";

// 1
export function PlayerScore({ playerId, playerName }) {
  // 1.a accède au score du joueur
  const score = useSelector(selectPlayerScore(playerId));
  // 1.b
  // 1.b.V3 version finale : accède à 'l'avantage ou non' du joueur
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));

  return (
    <div className="player-score">
      <p>{playerName}</p>
      <p>{(hasAdvantage ? "Avantage - " : "") + score}</p>
    </div>
  );
}
