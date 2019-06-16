import React, { useState } from "react";
import Square from "./Square";

const Board = props => {
  const size = props.size;
  let [squares, setSquares] = useState(Array(size * size).fill(null));
  let [playerTurn, setPlayerTurn] = useState(true);

  const calculateWinner = squares => {
    //change that to recursive check
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // console.log(squares);
    ///
    let result = [];
    for (let x = 0; x < size; x++) {
      for (let i = size * x; i < size * x + size - 2; ++i) {
        for (let j = 0; j < 3; j++) {
          result.push(squares[i + j]);
        }
        if (
          result[0] !== undefined &&
          result.every(e => e === result[0]) === true
        ) {
          return result[0];
        }
        result = [];
      }
    }
    ///

    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (
    //     squares[a] &&
    //     squares[a] === squares[b] &&
    //     squares[a] === squares[c]
    //   ) {
    //     return squares[a];
    //   }
    // }

    if (
      squares.filter(e => e === "X" || "O").length === squares.length &&
      squares.length >= 3
    ) {
      return `tie`;
    }
    return null;
  };

  const handleClick = i => {
    const square = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    square[i] = playerTurn ? "X" : "O";
    setSquares(square);
    setPlayerTurn(!playerTurn);
  };
  const renderSquare = i => (
    <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
  );

  let arr = Array.from(Array(size), (e, i) => i);
  let arr2 = Array.from(Array(size), (e, i) => i);
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

  const winner = calculateWinner(squares);
  let status;
  if (winner === "X" || winner === "O") {
    status = `Winner ${winner}`;
  } else {
    if (winner === "tie") {
      status = `Tie`;
    } else {
      status = "Next player: " + (playerTurn ? "X" : "O");
    }
  }

  return (
    <div>
      <div className="status">{status}</div>
      {arr}
    </div>
  );
};

export default Board;
