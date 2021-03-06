import React from "react";

function Grid(props) {
  const alive = "#ffe4e1";
  const dead = "#222";

  return (
    <div
      style={{
        width: "min-content",
        display: "grid",
        gridTemplate: `repeat(${props.rows}, 20px) / repeat(${props.cols}, 20px)`,
        gap: "1px",
      }}
    >
      {props.grid.map((row, x) => {
        return row.map((cell, y) => {
          return (
            <div
              onClick={() => {
                if (!props.isRunning) {
                  props.toggleCellState(x, y);
                }
              }}
              style={{
                backgroundColor: cell ? alive : dead,
              }}
            ></div>
          );
        });
      })}
    </div>
  );
}

export default Grid;
