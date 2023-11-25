import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import TagManager from "react-gtm-module";

import "./index.css";

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_MEASUREMENT_ID,
};

TagManager.initialize(tagManagerArgs);

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
