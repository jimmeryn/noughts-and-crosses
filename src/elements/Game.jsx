import React, { useState } from "react";
import Board from "./Board";

/**
 * Main Game.
 * Containing Board and all game functionality.
 */
const Game = () => {
  let [size, setSize] = useState(0);
  let [squares, setSquares] = useState(Array(size * size).fill(null));
  let [history, setHistory] = useState([{ squares }]);
  let [playerTurn, setPlayerTurn] = useState(true);
  let [stepNumber, setStepNumber] = useState(0);

  const getCurrent = () => {
    return history[stepNumber].squares;
  };

  /**
   * Changing state of given Square.
   * @param {Number} i Number of Square that was clicked.
   */
  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = getCurrent().slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = playerTurn ? "X" : "O";
    setHistory(newHistory.concat([{ squares }]));
    setSquares(squares);
    setStepNumber(newHistory.length);
    setPlayerTurn(!playerTurn);
  };

  /**
   * Changing size of the Board.
   * @param event
   */
  let handleChange = event => {
    if (setSize === null) {
      return;
    }
    if (
      event.currentTarget.value &&
      event.currentTarget.value <= 10 &&
      event.currentTarget.value >= 3
    ) {
      setSize(parseInt(event.currentTarget.value));
    } else {
      setSize(3);
    }
  };

  /**
   * Change current game state.
   *  @param {Number} step  Defining position in history.
   */
  const jumpTo = step => {
    setStepNumber(step);
    setPlayerTurn(step % 2 === 0);
  };

  /**
   *  Sets style to given selector.
   */
  const sheet = (() => {
    let style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();

  /**
   *  Using insertRule to change span (start game opctions) visibility.
   */
  const handleClickVisibility = () => {
    setSize = null;
    sheet.insertRule("span {visibility: hidden");
  };

  /**
   *  Calculating if winners occurs.
   *   @param {Array} squares
   */
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
    // let result = [];
    // for (let x = 0; x < size; x++) {
    //   for (let i = size * x; i < size * x + size - 2; ++i) {
    //     for (let j = 0; j < 3; j++) {
    //       result.push(squares[i + j]);
    //     }
    //     if (
    //       result[0] !== undefined &&
    //       result.every(e => e === result[0]) === true
    //     ) {
    //       return result[0];
    //     }
    //     result = [];
    //   }
    // }
    ///

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    // if (
    //   squares.filter(e => e === "X" || "O").length === squares.length &&
    //   squares.length >= 3
    // ) {
    //   return `draw`;
    // }
    return null;
  };

  /**
   * Using checkWinner function to create status message.
   *  @returns {String} Winner X
   *  @returns {String} Winner O
   *  @returns {String} Draw
   *  @returns {null}   Game keeps going
   */
  const checkStatus = () => {
    const winner = calculateWinner(squares);
    let status;
    if (winner === "X" || winner === "O") {
      status = `Winner ${winner}`;
    } else {
      if (winner === "draw") {
        status = `draw`;
      } else {
        status = "Next player: " + (playerTurn ? "X" : "O");
      }
    }
    return status;
  };

  /**
   * Rendering all past moves from history.
   *  @returns {li} list of past moves.
   */
  const renderMoves = () => {
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

  let content = (
    <div className="game">
      <div className="game-board">
        <span>
          {"Set board size (3-10): "}
          <input
            type="phone"
            style={{
              width: "30px"
            }}
            onChange={handleChange}
          />
          <button onClick={() => handleClickVisibility()}>Start game</button>
        </span>
        <Board
          size={size}
          squares={getCurrent()}
          setSquares={setSquares}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
          calculateWinner={calculateWinner}
          handleClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <br />
        <div>{checkStatus()}</div>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  );
  return content;
};

export default Game;
