import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
  }

  body {
    background-color: #000000;
    color: #97adad;
    font-size: 15px;
    user-select: none;
  }
`;
