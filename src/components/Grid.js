import React from "react";

function Grid({ grid, rows, cols }) {
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
      {grid.map((row) => {
        return row.map((cell) => {
          return (
            <div
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
