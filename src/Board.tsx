import { BoardProps } from "boardgame.io/react";
import React, { useContext, useEffect } from "react";
import { ConnectionStateContext } from "./providers/ConnectionStateProvider";
import { BackgroundVideo } from "./BackgroundVideo";
import boardBgVideo from "./assets/boardBgVideo.mp4";

export const Board: React.FC<BoardProps> = ({ G, moves, ...rest }) => {
  const { setIsConnected } = useContext(ConnectionStateContext);
  useEffect(() => {
    if (setIsConnected) setIsConnected(true);
  }, []);

  console.log(rest);

  return (
    <div>
      <BackgroundVideo videos={[boardBgVideo]} />
      <div
        className={`absolute z-0 w-full h-screen overflow-hidden bg-[url('/src/assets/bg-hex.svg')] bg-repeat`}
        style={{ backgroundSize: "100px" }}
      ></div>
      <div className={`absolute z-10 w-full h-screen overflow-hidden`}>
        <h1>Game State</h1>
        <pre>{JSON.stringify(G, null, 2)}</pre>
        <button onClick={() => moves.makeMove("example-move")}>
          Make Move
        </button>
      </div>
    </div>
  );
};
