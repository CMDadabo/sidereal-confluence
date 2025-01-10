import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ConnectionStateProvider from "./providers/ConnectionStateProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConnectionStateProvider>
      <App />
    </ConnectionStateProvider>
  </StrictMode>
);
