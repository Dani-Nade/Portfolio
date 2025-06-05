// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";          // make sure App.jsx or App.js exists

// Mount <App /> into <div id="root">
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
