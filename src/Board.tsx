import { BoardProps } from "boardgame.io/react";
import React from "react";

export const Board: React.FC<BoardProps> = ({ G, ctx, moves, ...rest }) => {
  return (
    <div>
      <h2>Game State</h2>
      <pre>{JSON.stringify(G, null, 2)}</pre>
      <button onClick={() => moves.makeMove("example-move")}>Make Move</button>
    </div>
  );
};
