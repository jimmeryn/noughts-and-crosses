import React, { useState } from "react";
import Board from "./Board";

/**
 * Main Game.
 * Containing Board and all game functionality.
 */
const Game = () => {
  let [size, setSize] = useState(0);
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
    console.log(checkStatus());
    checkStatus() === null
      ? setStatus("Next player: " + (!playerTurn ? "X" : "O"))
      : checkStatus();
    console.log(status);
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
      // return squares.findIndex(e => e === undefined) !== -1
      //   ? "draw"
      //   : undefined;
    }
  };

  /**
   * Using checkWinner function to create status message.
   *  @return {String} string - Winner X
   *  @return {String} string - Winner O
   *  @return {String} string - Draw
   *  @return {null}   null - Game keeps going
   */
  const checkStatus = () => {
    const winner = calculateWinner(squares);
    if (winner === "X" || winner === "O") {
      setStatus(`Winner ${winner}`);
    } else {
      if (winner === "draw") {
        setStatus(`Draw`);
      } else {
        setStatus("Next player: " + (!playerTurn ? "X" : "O"));
      }
    }
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
        {typeof playerTurn !== "boolean" ? (
          <span>
            {"Set board size (3-10): "}
            <input
              type="phone"
              style={{
                width: "30px"
              }}
              onChange={handleChange}
            />
            {size ? (
              <button onClick={() => handleClickVisibility()}>
                Start game
              </button>
            ) : (
              <button disabled>Start game</button>
            )}
          </span>
        ) : (
          <div>{status}</div>
        )}
        {playerTurn != null ? (
          <Board
            size={size}
            squares={getCurrent()}
            setSquares={setSquares}
            playerTurn={playerTurn}
            setPlayerTurn={setPlayerTurn}
            calculateWinner={calculateWinner}
            handleClick={i => handleClick(i)}
          />
        ) : null}
        {playerTurn != null ? (
          <div className="game-info">
            <br />
            <ol>{renderMoves()}</ol>
          </div>
        ) : null}
      </div>
    </div>
  );
  return content;
};

export default Game;
