import React, { ReactElement, useRef } from "react";
import { Client } from "boardgame.io/react";
import { v4 as uuidv4 } from "uuid";

import Game from "../../Game";
import { Board } from "../../Board";
import { Debug } from "boardgame.io/debug";
import { P2P } from "../../p2p";

import titleSvg from "../../assets/title.svg";
import { BackgroundVideo } from "../../BackgroundVideo";
import { Button } from "../../components/ui/button";
import HostGameDialog from "./HostGameDialog";

interface LaunchScreenProps {
  setBoardgameIoClient: React.Dispatch<
    React.SetStateAction<ReactElement | undefined>
  >;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({
  setBoardgameIoClient,
}) => {
  const { current: matchId } = useRef(uuidv4());

  const hostGame = () => {
    const ClientComponent = Client({
      game: Game,
      board: Board,
      debug: { impl: Debug },
      multiplayer: P2P({ isHost: true }),
    });
    setBoardgameIoClient(<ClientComponent matchID={matchId} playerID={"0"} />);
  };

  const setupClient = () => {
    const ClientComponent = Client({
      game: Game,
      board: Board,
      debug: { impl: Debug },
      multiplayer: P2P(),
    });
    setBoardgameIoClient(<ClientComponent matchID={matchId} playerID={"13"} />);
  };

  return (
    <div className="z-2">
      <BackgroundVideo />
      <main className="absolute z-1 w-full h-screen flex items-center justify-center flex-col">
        <img src={titleSvg} className="max-w-3xl" alt="Stellar Convergence" />
        <h2 className="uppercase tracking-wider drop-shadow">
          A game of commerce and compromise in the empyrean sector
        </h2>
        <div className="flex mt-16 space-x-8">
          <HostGameDialog onSubmit={hostGame} matchId={matchId} />
          <Button size="lg" onClick={setupClient}>
            Join Game
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LaunchScreen;
