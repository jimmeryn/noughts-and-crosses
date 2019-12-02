import React from "react";
import Square from "./Square";

const renderSquare = (i, squares, squareClick) => (
  <Square key={i} value={squares[i]} squareClick={() => squareClick(i)} />
);

/**
 * Containing and rendering Squares as a Board
 *  @returns {div}
 */
const Board = props => {
  let index = -1;
  return (
    <div>
      {props.playerTurn != null
        ? Array.from(Array(props.size), (e, i) => i).map((e, i) => (
            <div key={-1 - i} className="board-row">
              {Array.from(Array(props.size), (e, i) => i).map((x, y) => {
                index++;
                return renderSquare(index, props.squares, props.squareClick);
              })}
            </div>
          ))
        : null}
    </div>
  );
};

export default Board;
