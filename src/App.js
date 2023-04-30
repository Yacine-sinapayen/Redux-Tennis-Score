import { PlayPauseButton } from "./components/PlayPauseButton/PlayPauseButton";
import { Display } from "./components/Display/Display";
import { PointScoredButton } from "./components/PointScoredButton/PointScoredButton";
import { ResetButton } from "./components/ResetButton/ResetButton";
import { PlayerScore } from "./components/PlayerScore/PlayerScore";
import { PlayersPoints } from "./components/PlayerPoints/PlayerPoints";

function App() {
  return (
    <div>
      <PlayersPoints playerId="player1" playerName="Player 1" />
      <PlayersPoints playerId="player2" playerName="Player 2" />
      <Display />
      <PlayerScore playerId="player1" playerName="Player 1" />
      <PlayerScore playerId="player2" playerName="Player 2" />
      <div className="buttons-row">
        <PointScoredButton playerId="player1">Point Joueur 1</PointScoredButton>
        <PointScoredButton playerId="player2">Point Joueur 2</PointScoredButton>
      </div>
      <div className="buttons-row">
        <ResetButton />
        <PlayPauseButton />
      </div>
    </div>
  );
}

export default App;
