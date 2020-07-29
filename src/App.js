import React, { useState } from "react";

import Grid from "./components/Grid";

function App() {
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(25);
  const [grid, setGrid] = useState(createGrid(rows, cols));

  function createGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row[j] = 0;
      }
      grid[i] = row;
    }

    return grid;
  }

  function updateCellState(x, y) {
    const updatedGrid = [...grid];

    updatedGrid[x][y] = updatedGrid[x][y] ? 0 : 1;

    setGrid(updatedGrid);
  }

  function getCell(x, y) {
    const wrapIndex = (i) => {
      if (i < 0) {
        return grid.length - 1;
      } else if (i >= grid.length) {
        return 0;
      } else {
        return i;
      }
    };

    return grid[wrapIndex(x)][wrapIndex(y)];
  }

  return (
    <>
      <Grid
        grid={grid}
        rows={rows}
        cols={cols}
        updateCellState={updateCellState}
      />
    </>
  );
}

export default App;
