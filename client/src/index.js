import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./state/store.js";
import App from "./App";
import "./index.css";
import "./fonts/RobotoMono-Medium.ttf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
