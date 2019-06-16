import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  let [size, setSize] = useState(0);

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

  var sheet = (() => {
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();

  const handleClick = () => {
    setSize = null;
    sheet.insertRule("span {visibility: hidden");
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
          <button onClick={() => handleClick()}>Start game</button>
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
