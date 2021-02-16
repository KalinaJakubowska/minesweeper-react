import React from "react";
import Minesweeper from "./features/Minesweeper.js";
import { GlobalStyle } from "./GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { theme } from "./common/theme/theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />
      <Minesweeper />
    </ThemeProvider>
  );
}

export default App;
