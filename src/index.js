import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store.js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Mon Provider fournit le store de redux à toute l'application
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
