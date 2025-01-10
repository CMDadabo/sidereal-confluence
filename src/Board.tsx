import { BoardProps } from "boardgame.io/react";
import React, { useContext, useEffect } from "react";
import { ConnectionStateContext } from "./providers/ConnectionStateProvider";

export const Board: React.FC<BoardProps> = ({ G, moves, ...rest }) => {
  const { setIsConnected } = useContext(ConnectionStateContext);
  useEffect(() => {
    if (setIsConnected) setIsConnected(true);
  }, []);

  console.log(rest);

  return (
    <div>
      <h2>Game State</h2>
      <pre>{JSON.stringify(G, null, 2)}</pre>
      <button onClick={() => moves.makeMove("example-move")}>Make Move</button>
    </div>
  );
};
