import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Grid from "./components/Grid";

function App() {
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(25);
  const [grid, setGrid] = useState(createGrid(rows, cols));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGeneration((generation) => generation + 1);

    setGrid((grid) =>
      produce(grid, (gridCopy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const sum = getNeighborCount(i, j, grid);

            if (gridCopy[i][j] && sum < 2) {
              gridCopy[i][j] = 0;
            } else if (gridCopy[i][j] && sum > 3) {
              gridCopy[i][j] = 0;
            }

            if (!gridCopy[i][j] && sum === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      })
    );

    setTimeout(runSimulation, 1000);
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

  function getCell(x, y, grid) {
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

  function toggleCellState(x, y) {
    setGrid(
      produce(grid, (gridCopy) => {
        gridCopy[x][y] = gridCopy[x][y] ? 0 : 1;
      })
    );
  }

  function getNeighborCount(x, y, grid) {
    const relativeNeighborPositions = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];

    return relativeNeighborPositions.reduce((acc, [neighborX, neighborY]) => {
      const cell = getCell(x + neighborX, y + neighborY, grid);
      return (acc += cell);
    }, 0);
  }

  return (
    <>
      <h2>Generation #{generation}</h2>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
          runningRef.current = !isRunning;
          runSimulation();
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
