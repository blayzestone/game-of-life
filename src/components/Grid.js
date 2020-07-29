import React from "react";

function Grid({ grid, rows, cols, updateCellState, isRunning }) {
  const alive = "#ffe4e1";
  const dead = "#222";

  return (
    <div
      style={{
        width: "min-content",
        display: "grid",
        gridTemplate: `repeat(${rows}, 20px) / repeat(${cols}, 20px)`,
        gap: "1px",
      }}
    >
      {grid.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <div
              onClick={() => updateCellState(x, y)}
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
