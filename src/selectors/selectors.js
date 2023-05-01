// Définition selectors : 
//Les selectors sont des fonctions qui permettent d'extraire des données spécifiques à partir du store Redux.
// Les selectors ont plusieurs avantages dans une application React-Redux :
  // - Ils permettent de séparer la logique de présentation de la logique de récupération de données. Les composants peuvent ainsi se concentrer sur l'affichage des données et ne pas se soucier de la façon dont les données sont récupérées.
  // - Ils améliorent les performances de l'application en permettant d'optimiser le rendu des composants. En effet, les selectors permettent de ne récupérer que les données nécessaires à un composant spécifique, ce qui évite de re-rendre le composant lorsque les autres données du store Redux changent.
  // - Ils simplifient la gestion des données en permettant de centraliser la logique de récupération des données dans un endroit unique de l'application.

// En résumé, les selectors sont utilisés pour récupérer des données spécifiques à partir du store Redux, en fournissant une interface de récupération de données simple et optimisée pour les composants React.

// : Il ne faut jamais créer des objets ou des tableaux dans les selectors car sinon à chaque rendu ça créer une nouvelle référence, et il ne faut pas créer de référence dans un reducer !*/

// ---------- selectPointBeforeWin ----------
// Nombre de points que le joueur doit marquer avant de pouvoir gagner le jeu.

// 1 - si un des joueur a gagné on sort direct de la logique car ça veut dire que la partie est terminée.

// 2 - Si le joueur actuel a l'avantage, alors il doit marquer qu'un 1 point pour gagner.

// 3 - Si c'est l'autre joueur qui a l'avantage alors il doit marquer 3 points pour gaganer.

// 4 - Je récupère le score de mes deux joueurs si aucuns des deux n'a l'avantage.

// 5 - Dans le cas ou aucun de mes joueurs n'a l'avantage je dois créer la logique qui me permet de savoir le nombre de point dont ils ont besoin pour atteindre le score de 40.

// 6 - Si le joueur adverse est aussi à 40 alors il faudra marquer 2 points

// 7 - sinon juste 1 point car une fois que l'on est arrivé à 40 et que l'autre joueur n'y est pas pas besoin d'vantage pour gagner il suffit juste de marquer un point.

export const selectPointBeforeWin = (playerId) => {
  const otherPlayerId = playerId === "player1" ? "player2" : "player1";

  return (state) => {
    // 1
    if (state.winner) {
      return null;
    }

    // 2
    if (state.advantage === playerId) {
      return 1;
    }

    // 3
    if (state.advantage === otherPlayerId) {
      return 3;
    }

    // 4
    const playerScore = state[playerId];
    const otherPlayerScore = state[otherPlayerId];

    // 5
    const pointsTo40 =
      playerScore === 0
        ? 3
        : playerScore === 15
        ? 2
        : playerScore === 30
        ? 1
        : 0;

    // 6
    if (otherPlayerScore === 40) {
      return pointsTo40 + 2;
    }
    // 7
    return pointsTo40 + 1;
  };
};

// ---------- selectPlayerHasAdvantage ----------
/* Ce selector me renvoie le joueur qui a l'avantage*/
export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

// ---------- selectPlayerScore ----------
// Points gagnés par joueurs
// Ce selector me permet d'accéder au score de mon joueur.
export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId];
};

// ---------- selectDisplayText ----------
// Logique des point dans le composant central 'le score est : '
export const selectDisplayText = (state) => {
  if (state.winner) {
    if (state.winner === "player1") {
      return "Joueur 1 gagne";
    } else {
      return "Joueur 2 gagne";
    }
  } else if (state.playing === false) {
    return "C'est la pause";
  } else {
    let text = "Le score est: " + state.player1 + " - " + state.player2;
    if (state.advantage) {
      if (state.advantage === "player1") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    return text;
  }
};

// ---------- selectPlayerPoints ----------
// Jeux gagnés par joueur
// Ce selector me permet de récupérer uniquement le nombre de jeux/parties gagnés par joueur grâce à la propriété history  du state.
// a - Dans l'historique de mon state je vais récupérer la valeur de la taille du tableau correspondant à tous mes items de victoire lié à un joueur.
export const selectPlayerPoints = (playerId) => {
  // a
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length;
};
