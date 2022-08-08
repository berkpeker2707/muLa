import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state/store.js";
import App from "./App";
import "./index.css";
import "./fonts/RobotoMono-Medium.ttf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
