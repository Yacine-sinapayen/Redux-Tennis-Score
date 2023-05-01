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

// Les "actions creator" (ou créateurs d'actions) dans Redux sont des fonctions qui retournent des objets d'action. Les objets d'action contiennent une propriété type qui décrit le type d'action à effectuer et d'autres propriétés qui contiennent des données supplémentaires nécessaires pour effectuer l'action.

// Les actions sont utilisées pour décrire les événements qui se produisent dans une application. Elles sont déclenchées par l'utilisateur ou par des événements système tels que des requêtes réseau ou des événements du navigateur. Les actions sont ensuite transmises à un "reducer" qui met à jour l'état global de l'application en fonction de l'action.

// Les "actions creator" sont utiles car elles simplifient la création d'actions en fournissant une interface claire et cohérente pour générer des objets d'action. Elles encapsulent la logique de création d'actions et permettent de centraliser cette logique en un seul endroit. Cela facilite la maintenance et l'évolutivité de l'application.

// De plus, les "actions creator" peuvent également encapsuler la logique asynchrone liée à la création d'actions. Par exemple, si une action nécessite de récupérer des données à partir d'une API, un "action creator" peut encapsuler cette logique d'appel API, de traitement des résultats et de création de l'action à renvoyer.

// En somme, les "actions creator" sont un outil clé pour gérer les actions dans Redux, car elles facilitent la création et la gestion des actions, améliorent la maintenabilité et l'évolutivité de l'application, et permettent d'encapsuler la logique asynchrone liée à la création d'actions.

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

// Le reducer est un élément clé dans la mise en œuvre de Redux dans une application React.
// En Redux, le reducer est une fonction qui prend en entrée l'état actuel de l'application (ou une partie de cet état) et une action, et retourne un nouvel état. Les reducers sont utilisés pour décrire comment l'état de l'application change en réponse à des actions spécifiques émises par l'utilisateur ou le système.
// Dans une application React-Redux, le reducer est utilisé pour mettre à jour l'état du magasin Redux. Lorsqu'une action est déclenchée, le reducer correspondant est appelé, ce qui permet de mettre à jour l'état du magasin Redux. Le nouveau state retourné par le reducer est ensuite stocké dans le magasin Redux, et la vue est mise à jour en conséquence.
// En résumé, le reducer est utilisé pour décrire comment l'état de l'application doit être mis à jour en réponse à des actions spécifiques, permettant ainsi de maintenir un état global cohérent de l'application.

// 1 - Dans le cas ou je 'restart le jeu'.

// 2 - Je vais utiliser la librairie 'immer' afin de gérer le state plus facilemment sans avoir à utiliser le spreadOperator avec la fonction 'produce' qui prends en params le state de mon app et un 'draft' <=> brouillon qui permet de faire une copie du state initial.

// 3 - Donc dans le cas d'un restart, si le jeu est terminé et qu'il y a un gaganant, je vais allimenter l(historique des joueurs  grâce à 'history' de redux.

// 4 Puis je reset les propriétés du state.

function reducer(state = initialState, action) {
  // 1 ---------- reducer RESTART ----------
  if (action.type === "restart") {
    // 2
    return produce(state, (draft) => {
      // 3 si le match est terminé on ajoute un élément à l'historique
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        });
      }
      // 4 puis on reset les autre propriétés pour start une new partie
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = true;
    });
  }

  // 5 ---------- reducer PLAY/PAUSE ----------
  // 5.a - je retourne le state winner si c'est le cas
  // 5.b - sinon je met le jeu en pause en modifiant le state grâce à 'draft'.
  // 5
  if (action.type === "playPause") {
    // 5.a
    if (state.winner) {
      return state;
    }
    // 5.b
    return produce(state, (draft) => {
      draft.playing = !draft.playing;
    });
  }

  // 6 ---------- reducer GESTION DU SCORE ----------
  // 6.a - S'il y a déjà un gagnant ou que le set est en pause je ne peux pas marquer de point

  // 6.b J'initie ma fonction produce de ma librairie 'immer' pour permettre les modifications du state, je n'oublie pas 'draft' qui permet de faire une copie du state.
  // 6.b.1 - je récupère le joureur en cours qui vient de marquer
  // 6.b.2 - Si le joueur en cours à un score inferieur ou égale à 15 alors je lui rajoute 15 points.
  // 6.b.3 - Si le joueur a un score strictement égal à 30 alors je lui attribut le score de 40 points.

  // 6
  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";

    // 6.a
    if (state.winner) {
      return state;
    }
    // 6.a
    if (state.playing === false) {
      return state;
    }

    // 6.b
    return produce(state, (draft) => {
      // 6.b.1
      const currentPlayerScore = draft[player];

      // 6.b.2
      if (currentPlayerScore <= 15) {
        draft[player] += 15;
        return;
      }

      // 6.b.3
      if (currentPlayerScore === 30) {
        draft[player] = 40;
        return;
      }

      /* 
      6.c - Dans le cas ou le joueur est déjà à 40 points
        6.c.1 - Si l'autre joueur n'avait pas l'avantage, donc un 
        score différent de 40 pointScored, alors le joueur qui vient 
        de marquer gagne.
        6.c.2 - Si le joueur qui marque avait l'avantage, alors il à gagné.
        6.c.3 - (toujours dans la même condition du joueur qui à un score
          = à 40 points). Si le joueur avait un 'advantage = null' et qu'il marque 
          alors je lui attribut l'avantage.
      
      */

      // 6.c
      if (currentPlayerScore === 40) {
        // 6.c.1
        if (draft[otherPlayer] !== 40) {
          draft.winner = player;
          return;
        }

        // 6.c.2
        if (draft.advantage === player) {
          draft.winner = player;
          return;
        }

        // 6.c.3
        if (draft.advantage === null) {
          draft.advantage = player;
          return;
        }
        // 6.c.4 l'autre joueur perd l'avantage peu importe la condition
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
