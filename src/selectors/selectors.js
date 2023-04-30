// Infos
// : Il ne faut jamais créer des objets ou des tableaux dans les selectors car sinon à chaque rendu ça créer une nouvelle référence, et il ne faut pas créer de référence dans un reducer !*/

/* 1 -Ce selector me renvoie le joueur qui a l'avantage*/
export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

// 2 - points gagnés par joueurs
// Ce selector me permet d'accéder au score de mon joueur.
export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId];
};

// 3 - Logique des point dans le composant central 'le score est : '
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

// 4 - Jeux gagnés par joueur
// Ce selector me permet de récupérer uniquement le nombre de jeux/parties gagnés par joueur grâce à la propriété history  du state.
// 2.a - Dans l'historique de mon state je vais récupérer la valeur de la taille du tableau correspondant à tous mes items de victoire lié à un joueur.
// 2
export const selectPlayerPoints = (playerId) => {
  // 4.a
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length;
};
