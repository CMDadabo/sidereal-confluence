import React, { ReactElement, useState } from "react";
import { Client } from "boardgame.io/react";
import Game from "./Game";
import { Board } from "./Board";
import { Debug } from "boardgame.io/debug";
import { P2P } from "./p2p";

import titleSvg from "./assets/title.svg";
import bgHex from "./assets/bg-hex.svg";
import { BackgroundVideo } from "./BackgroundVideo";
import { Button } from "./components/ui/button";

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
    setGameClient(<ClientComponent matchID={matchID} playerID={"13"} />);
  };

  return (
    <div>
      <BackgroundVideo />
      <main className="absolute z-1 w-full h-screen flex items-center justify-center flex-col">
        <img src={titleSvg} className="max-w-3xl" alt="Stellar Convergence" />
        <h2 className="uppercase tracking-wider drop-shadow">
          A game of commerce and compromise in the empyrean sector
        </h2>
        <div className="flex mt-16 space-x-8">
          <Button size="lg" onClick={hostGame}>
            Host Game
          </Button>
          <Button size="lg" onClick={setupClient}>
            Join Game
          </Button>

          {/* <div>
            <input
              type="text"
              placeholder="Enter Host IP"
              value={matchID}
              onChange={(e) => setMatchID(e.target.value)}
            />
          </div> */}
        </div>
        {gameClient && gameClient}
      </main>
    </div>
  );
};

export default LaunchScreen;
