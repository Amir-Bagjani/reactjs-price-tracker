import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
