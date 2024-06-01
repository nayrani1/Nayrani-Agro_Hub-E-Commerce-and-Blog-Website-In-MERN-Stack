import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
if ('Notification' in window) {
  Notification.requestPermission();
}


root.render(
    <Provider store={store}>
      <App />
  </Provider>
);
