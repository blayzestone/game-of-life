import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app's main heading", () => {
  const { getByText } = render(<App />);
  const mainHeading = getByText(/Conway's Game of Life/i);
  expect(mainHeading).toBeInTheDocument();
});
