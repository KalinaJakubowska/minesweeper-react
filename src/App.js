import React, { useEffect } from "react";
import Form from "./features/Form";
import Game from "./features/Game";
import Footer from "./common/Footer";
import Display from "./features/Display";
import { GlobalStyle } from "./GlobalStyle.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./common/theme/theme.js";
import { useDispatch } from "react-redux";
import { generateEmptyFields } from "./features/gameSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateEmptyFields());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Display />
      <Game />
      <Form />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
