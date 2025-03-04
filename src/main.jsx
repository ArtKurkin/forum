import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./store/store.js";

const store = new Store();

export const Context = createContext({ store });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
