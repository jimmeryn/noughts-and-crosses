import React, { useState } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import Status from "./Status";

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
 * Main Game
 * Containing Board and all game functionality.
 */
const Game = () => {
  let [size, setSize] = useState(3);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [history, setHistory] = useState([{ squares }]);
  const [playerTurn, setPlayerTurn] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);
  const [status, setStatus] = useState("");

  const getCurrent = () => {
    return history[stepNumber].squares;
  };

  /**
   * Changing state of given Square.
   * @param {Number} i Number of Square that was clicked.
   */
  const squareClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = getCurrent().slice();
    if (calculateWinner(squares) || squares[i]) {
    } else {
      squares[i] = playerTurn ? "X" : "O";
      setHistory(newHistory.concat([{ squares }]));
      setSquares(squares);
      setStepNumber(newHistory.length);
      setPlayerTurn(!playerTurn);
      checkStatus(squares);
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
   *  Using insertRule to change span (start game opctions) visibility.
   */
  const handleClickVisibility = () => {
    setSize = null;
    sheet.insertRule("span {visibility: hidden");
    setPlayerTurn(true);
    setStatus("Next player: " + (!playerTurn ? "X" : "O"));
  };

  /**
   *  Calculating if winners occurs.
   *   @param {Array} squares - current board
   */
  const calculateWinner = squares => {
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

    if (squares && squares.filter(e => e == null).length === 0) {
      return "Draw";
    }
  };

  /**
   * Using checkWinner function to create status message.
   */
  const checkStatus = squares => {
    const winner = calculateWinner(squares);
    if (winner === "X" || winner === "O") {
      setStatus(`Winner ${winner}`);
      return;
    } else {
      if (winner === "Draw") {
        setStatus(`Draw`);
      } else {
        setStatus("Next player: " + (!playerTurn ? "X" : "O"));
      }
    }
  };

  return (
    <div className="game">
      <div className="game-board">
        <Status
          playerTurn={playerTurn}
          setSize={setSize}
          handleClickVisibility={handleClickVisibility}
          status={status}
        />
        <Board
          size={size}
          squares={getCurrent()}
          playerTurn={playerTurn}
          squareClick={i => squareClick(i)}
        />
        <GameInfo playerTurn={playerTurn} history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
};

export default Game;
