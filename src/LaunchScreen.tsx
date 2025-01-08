import React, { ReactElement, useState } from "react";
import { Client } from "boardgame.io/react";
import Game from "./Game";
import { Board } from "./Board";
import { Debug } from "boardgame.io/debug";
import { P2P } from "./p2p";

import bgHex from "./assets/bg-hex.svg";

const LaunchScreen: React.FC = () => {
  const [matchID, setMatchID] = useState("matchID");

  const [gameClient, setGameClient] = useState<ReactElement | null>(null);

  const hostGame = () => {
    const ClientComponent = Client({
      game: Game,
      board: Board,
      debug: { impl: Debug },
      multiplayer: P2P({ isHost: true }),
    }) as any;
    setGameClient(<ClientComponent matchID={matchID} playerID={"0"} />);
  };

  const setupClient = () => {
    const ClientComponent = Client({
      game: Game,
      board: Board,
      debug: { impl: Debug },
      multiplayer: P2P(),
    }) as any;
    setGameClient(<ClientComponent matchID={matchID} playerID={"1"} />);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: `url(${bgHex}), black`,
        backgroundSize: "100px",
        padding: "2rem",
      }}
    >
      <h1>Launch Screen</h1>
      <p>Welcome to the launch screen!</p>
      <button onClick={hostGame}>Host Game</button>
      <button onClick={setupClient}>Join Game</button>
      <input
        type="text"
        placeholder="Enter Host IP"
        value={matchID}
        onChange={(e) => setMatchID(e.target.value)}
      />
      {gameClient && gameClient}
    </div>
  );
};

export default LaunchScreen;
