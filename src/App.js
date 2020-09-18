import React from 'react';
import Form from "./features/Form";
import Game from "./features/Game";
import Footer from "./common/Footer";
import Display from "./features/Display";
import { GlobalStyle } from "./GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./common/Footer/theme.js";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Display />
      <Game />
      <Form />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
