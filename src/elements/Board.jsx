import React from "react";
import Square from "./Square";

/**
 * Containing and rendering Squares as a Board
 *  @returns {div}
 */
const Board = props => {
  const renderSquare = i => (
    <Square
      key={i}
      value={props.squares[i]}
      squareClick={() => props.squareClick(i)}
    />
  );

  let arr = Array.from(Array(props.size), (e, i) => i);
  let arr2 = Array.from(Array(props.size), (e, i) => i);
  let index = -1;
  arr = arr.map((e, i) => {
    return (
      <div key={-1 - i} className="board-row">
        {arr2.map((x, y) => {
          index++;
          return renderSquare(index);
        })}
      </div>
    );
  });

  return <div>{props.playerTurn != null ? arr : null}</div>;
};

export default Board;
