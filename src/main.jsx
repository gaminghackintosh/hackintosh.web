import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.scss";

document.addEventListener(
  "contextmenu",
  (e) => {
    if (e.shiftKey) return;
    e.preventDefault();
  },
  { capture: true }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
