import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";

import Grid from "./components/Grid";

function App() {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [grid, setGrid] = useState(createGrid(rows, cols));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGeneration((generation) => generation + 1);

    gridRef.current = grid;
    const nextGrid = produce(gridRef.current, (g) => {
      return g;
    });

    setGrid((grid) => {
      return produce(grid, (gridCopy) => {
        createNextGeneration(gridCopy);
      });
    });

    console.log(grid);

    setTimeout(simulate, 1000);
  });

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

  function createNextGeneration(grid) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const sum = getNeighborCount(i, j);

        if (grid[i][j] && sum < 2) {
          grid = toggleCellState(grid, i, j);
        }

        if (!grid[i][j] && sum === 3) {
          grid = toggleCellState(grid, i, j);
        }
      }
    }

    return grid;
  }

  function toggleCellState(grid, x, y) {
    grid[x][y] = grid[x][y] ? 0 : 1;

    return grid;
  }

  function getNeighborCount(x, y) {
    const relativeNeighborPositions = [
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
      [x - 1, y - 1],
    ];

    return relativeNeighborPositions.reduce((acc, [x, y]) => {
      const cell = getCell(x, y);
      return (acc += cell);
    }, 0);
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
      <h2>Generation #{generation}</h2>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
          runningRef.current = !runningRef.current;
          simulate();
        }}
      >
        {isRunning ? "Pause" : "Play"}
      </button>
      <Grid
        isRunning={isRunning}
        grid={grid}
        rows={rows}
        cols={cols}
        toggleCellState={toggleCellState}
        setGrid={setGrid}
      />
    </>
  );
}

export default App;
