import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeContract } from "./utils/near";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// @ts-ignore
window.nearInitPromise = initializeContract().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

reportWebVitals();
