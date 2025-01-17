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
      <div
        className={`absolute z-10 w-full h-screen overflow-hidden p-10 flex flex-col gap-4 items-center`}
      >
        <div
          id="status-bar"
          className={`p-3 rounded-full w-full glass-surface max-w-5xl`}
        >
          Heading
        </div>

        <div
          className={`w-full h-full glass-surface bg-white bg-opacity-65 flex overflow-hidden`}
        >
          <div
            id="sidebar"
            className="h-full w-44 bg-black bg-opacity-65"
          ></div>
          <div id="player-area" className="p-5 flex-1">
            <h1>Player Area</h1>
            <h2>Resources</h2>
            <h2>Converters</h2>
            <h2>Colonies</h2>
            <h2>Technologies</h2>
            <h1>Game State</h1>
            <pre>{JSON.stringify(G, null, 2)}</pre>
            <button onClick={() => moves.makeMove("example-move")}>
              Make Move
            </button>
          </div>
          <div id="global-area" className="p-5 flex-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
};
