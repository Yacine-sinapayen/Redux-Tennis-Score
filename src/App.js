import React from "react";
import { PlayPauseButton } from "./PlayPauseButton";
import { Display } from "./Display";
import { PointScoredButton } from "./PointScoredButton";
import { ResetButton } from "./ResetButton";
import { PlayerScore } from "./PlayerScore";
import { PlayerPoints } from "./PlayerPoints";

// Navigation

function HomePage() {
  return (
    <>
      <div>
        <PlayerPoints playerId="player1" playerName="Player 1" />
        <PlayerPoints playerId="player2" playerName="Player 2" />
        <Display />
        <PlayerScore playerId="player1" playerName="Player 1" />
        <PlayerScore playerId="player2" playerName="Player 2" />
        <div className="buttons-row">
          <PointScoredButton playerId="player1">
            Point Joueur 1
          </PointScoredButton>
          <PointScoredButton playerId="player2">
            Point Joueur 2
          </PointScoredButton>
        </div>
        <div className="buttons-row">
          <ResetButton />
          <PlayPauseButton />
        </div>
      </div>
    </>
  );
}

export default HomePage;
