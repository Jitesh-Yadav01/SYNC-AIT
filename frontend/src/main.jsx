import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import ReactDOM from "react-dom/client";
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


