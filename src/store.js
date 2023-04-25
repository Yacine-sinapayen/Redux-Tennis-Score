import { configureStore } from "@reduxjs/toolkit";
// immer est une librairie qui le permet de gérer le destructuring plus facilement lors de mes changements.
import { produce } from "immer";

const initialState = {
  // Le score de chacun des joueurs
  player1: 0,
  player2: 0,
  // Si il y a 40-40 quel joueur a l'avantage
  // On utilise null si pas d'avantage
  advantage: null,
  // Qui a gagné ?
  // Si la partie est en cours on utilise null
  winner: null,
  // La partie est-elle en cours ?
  playing: true,
  // historique des jeu joués
  history: [
    // { player1: 15, player2: 40, winner: "player2" }
  ],
};

// ---------- ACTIONS CREATORS ----------

// mettre en pause / reprendre le jeu
export const playPause = () => ({ type: "playPause" });

// redémarrer le jeu
export const restartGame = () => ({ type: "restart" });

// un joueur a marqué un point on passe en paramètre le joueur qui a marqué
export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player },
});

// ---------- REDUCER ----------
/* 1 - La fonction 'produce' de la librairie 'immer' me permet
de récupérer le state en params et de créer un 'draft = un brouillon' 
pour génrer un nouveau 'state' et le modifier sur le même principe 
que le 'spreadOperator'
*/
function reducer(state = initialState, action) {
  if (action.type === "restart") {
    // 1
    return produce(state, (draft) => {
      // si le match est terminé on ajoute un élément à l'historique
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        });
      }
      // puis on reset les autre propriétés pour start une new partie
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = true;
    });
  }

  /* 2 - Si le jeu est en pause 
    2.a - je retourne le state winner si c'est le cas
    2.b - sinon je met le jeu en pause en modifiant le state grâce à 'draft'
  */

  // 2
  if (action.type === "playPause") {
    // 2.a
    if (state.winner) {
      return state;
    }
    // 2.b
    return produce(state, (draft) => {
      draft.playing = !draft.playing;
    });
  }

  /* 3
  3.a - s'il y a déjà un gagnant ou que le set est en pause 
  je ne peux pas marquer de point*/
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";

    // 3.a
    if (state.winner) {
      return state;
    }
    // 3.a
    if (state.playing === false) {
      return state;
    }

    /* 4 - J'initie ma fonction produce de ma librairie 'immer' pour permettre
  les modifications du state, je n'oubli pas draft qui permet de faire une copie du state.
    4.a - je récupère le joureur en cours qui vient de marquer
    4.b - Si le joueur en cours à un score inferieur ou 
    égale à 15 alors je lui rajoute 15 points.
    4.c - Si le joueur a un score strictement égal 
    à 30 alors je lui attribut le score de 40 points.
    */

    // 4
    return produce(state, (draft) => {
      // 4.a
      const currentPlayerScore = draft[player];

      // 4.b
      if (currentPlayerScore <= 15) {
        draft[player] += 15;
        return;
      }

      // 4.c
      if (currentPlayerScore === 30) {
        draft[player] = 40;
        return;
      }

      /* 
      4.d - Dans le cas ou le joueur est déjà à 40 points
        4.d.1 - Si l'autre joueur n'avait pas l'avantage, donc un 
        score différent de 40 pointScored, alors le joueur qui vient 
        de marquer gagne
        4.d.2 - Si le joueur qui marque avait l'avantage, alors il à gagné
        4.d.3 - (toujours dans la même condition du joueur qui à un score
          = à 40 points). Si le joueur avait un 'advantage = null' et qu'il marque 
          alors je lui attribut l'avantage.
      
      */

      // 4.d
      if (currentPlayerScore === 40) {
        // 4.d.1
        if (draft[otherPlayer] !== 40) {
          draft.winner = player;
          return;
        }

        // 4.d.2
        if (draft.advantage === player) {
          draft.winner = player;
          return;
        }

        // 4.d.3
        if (draft.advantage === null) {
          draft.advantage = player;
          return;
        }
        // 4.d.4 l'autre joueur perd l'avantage peu importe la condition
        draft.advantage = null;
        return;
      }
    });
  }
  return state;
}

// on crée le store
export const store = configureStore({ reducer: reducer, initialState });

// Pour faciliter le suivit du state de redux j'utilise le code suivant :
store.subscribe(() => {
  console.log("Nouveau state : ");
  console.log(store.getState());
});
