import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";

import { NextUIProvider } from "@nextui-org/react";
import { ReadingProvider } from "./Reading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <ReadingProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReadingProvider>
  </NextUIProvider>
);
