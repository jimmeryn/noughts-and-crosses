import React from "react";

/**
 * Returning current game status
 *  @returns {div} Current game status
 */
const Status = props => {
  let changeBoardSize = event => {
    if (
      event.currentTarget.value &&
      event.currentTarget.value <= 10 &&
      event.currentTarget.value >= 3
    ) {
      props.setSize(parseInt(event.currentTarget.value));
    } else {
      props.setSize(3);
    }
  };

  return typeof props.playerTurn !== "boolean" ? (
    <div>
      {"Set board size (3-10): "}
      <input
        type="phone"
        style={{
          width: "30px"
        }}
        onChange={changeBoardSize}
      />
      <button onClick={() => props.handleClickVisibility()}>Start game</button>
    </div>
  ) : (
    <div>{props.status}</div>
  );
};

export default Status;
