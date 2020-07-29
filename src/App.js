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

    updatedGrid[y][x] = updatedGrid[y][x] ? 0 : 1;

    setGrid(updatedGrid);
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
