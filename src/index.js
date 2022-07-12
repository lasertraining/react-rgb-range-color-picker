import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { GlobalStyle } from "./globalStyle";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
