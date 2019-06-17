import React from "react";

/**
 * Defining each square on Board
 *  @returns {button}
 */
const Square = props => {
  let squareContent = (
    <button
      className="square"
      style={{ cursor: "pointer" }}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
  return squareContent;
};

export default Square;
