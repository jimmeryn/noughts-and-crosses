import React from "react";

/**
 * Defining each square on Board
 *  @returns {button}
 */
const Square = props => (
  <button
    className="square"
    style={{ cursor: "pointer" }}
    onClick={() => {
      props.squareClick();
    }}
  >
    {props.value}
  </button>
);

export default Square;
