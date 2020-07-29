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
        row[j] = 1;
      }
      grid[i] = row;
    }

    return grid;
  }

  return (
    <>
      <Grid grid={grid} rows={rows} cols={cols} />
    </>
  );
}

export default App;
