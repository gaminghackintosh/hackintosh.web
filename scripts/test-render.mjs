import { Window } from "happy-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import App from "../src/App.jsx";

const window = new Window({ url: "http://localhost:5173/" });
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Node = window.Node;

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById("root"));

try {
  await act(async () => {
    root.render(React.createElement(App));
  });
  const el = document.getElementById("root");
  console.log("children:", el.childElementCount);
  console.log("text length:", el.textContent?.length ?? 0);
} catch (e) {
  console.error("RENDER_ERROR:", e.message);
  process.exit(1);
}
