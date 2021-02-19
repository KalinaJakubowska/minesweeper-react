import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}

*, ::before, ::after {
  box-sizing: inherit;
}

body {
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  position: relative;
  font-size: 16px;
  padding: 50px 0 70px;
  background-color: ${({ theme }) => theme.color.second}
}
`;
