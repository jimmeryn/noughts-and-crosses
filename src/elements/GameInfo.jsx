import React from "react";

/**
 * Rendering all past moves from history.
 *  @returns {li} list of past moves.
 */
const renderMoves = (history, jumpTo) => {
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  return moves;
};

const GameInfo = props =>
  props.playerTurn != null ? (
    <div className="game-info">
      <br />
      <ol>{renderMoves(props.history, props.jumpTo)}</ol>
    </div>
  ) : null;

export default GameInfo;
