import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { AugustoProvider } from "./Augusto";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <AugustoProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AugustoProvider>
  </NextUIProvider>
);
