import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  let [size, setSize] = useState(0);

  const handleChange = event => {
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

  let content = (
    <div className="game">
      <div className="game-board">
        <span>
          {"Set board size: "}
          <input
            type="number"
            min="3"
            max="10"
            style={{
              width: "50px"
            }}
            onChange={handleChange}
          />
        </span>
        <Board size={size} />
      </div>
      {/* <div className="game-info"> */}
      {/* <div>status</div> */}
      {/* <ol>TODO</ol> */}
      {/* </div> */}
    </div>
  );
  return content;
};

export default Game;
