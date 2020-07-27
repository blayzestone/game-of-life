import React, { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runSpeed, setRunSpeed] = useState(1);

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const start = useCallback(
    (nextGeneration) => {
      if (!runningRef.current) {
        return;
      }

      setGeneration(nextGeneration);

      setTimeout(() => {
        start(nextGeneration + 1);
      }, 1000 / runSpeed);
    },
    [runSpeed]
  );

  useEffect(() => {
    start(generation);
  }, [isRunning, generation, start]);

  return (
    <>
      <h1>Conway's Game of Life</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {!isRunning ? "Play" : "Pause"}
      </button>
      <h2>Generation #{generation}</h2>
    </>
  );
}

export default App;
