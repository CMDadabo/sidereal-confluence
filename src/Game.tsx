import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Client } from "boardgame.io/react";
import { Debug } from "boardgame.io/debug";
import { Board } from "./Board";
import { default as React, FunctionComponent, JSX, ReactNode } from "react";

const Game: Game<GameState> = {
  name: "game",
  setup: () => ({ players: [], winner: null }),

  moves: {
    makeMove: ({ G, ctx, move, ...rest }, winner) => {
      console.log(rest);
      G.winner = winner;
    },
  },
};

function isValidMove(move: string): boolean {
  // Add move validation logic
  return true;
}

export default Game;

export const GameComponent = Client({
  game: Game,
  board: Board,
  debug: { impl: Debug },
}) as unknown as FunctionComponent;

export const WrappedGame = () => {
  return <GameComponent />;
};
