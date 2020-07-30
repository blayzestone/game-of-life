import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Grid from "./components/Grid";

function App() {
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(25);
  const [grid, setGrid] = useState(createGrid(rows, cols, 0));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runningSpeed, setRunningSpeed] = useState(1);

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

    setTimeout(runSimulation, 200 * runningSpeed);
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

  function randomizeGrid() {
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row[j] = Math.floor(Math.random() * 2);
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
      <h1>The Game of Life</h1>
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
      <button
        onClick={() => {
          if (!isRunning) {
            setGrid(createGrid(rows, cols));
          }
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          if (!isRunning) {
            setGrid(randomizeGrid());
          }
        }}
      >
        Randomize
      </button>
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setRunningSpeed(e.target.value);
        }}
      >
        <option value={2}>0.5x</option>
        <option value={1} selected>
          1x
        </option>
        <option value={0.5}>2x</option>
        <option value={0.25}>4x</option>
      </select>
      <Grid
        isRunning={isRunning}
        grid={grid}
        rows={rows}
        cols={cols}
        toggleCellState={toggleCellState}
        setGrid={setGrid}
      />
      <ul>
        <li>
          Any live cell with two or three live neighbors survives into the next
          generation.
        </li>
        <li>Any dead cell with three neighbors becomes a live cell.</li>
        <li>All other cells die in the next generation.</li>
      </ul>
    </>
  );
}

export default App;
