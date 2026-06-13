import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/features/main.scss";

document.addEventListener(
  "contextmenu",
  (e) => {
    if (e.shiftKey) return;
    e.preventDefault();
  },
  { capture: true }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Production: без StrictMode для производительности
// ✅ Development: с StrictMode для отладки
root.render(
  process.env.NODE_ENV === 'production' 
    ? <App />
    : <React.StrictMode><App /></React.StrictMode>
);
