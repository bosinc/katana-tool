import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import "./index.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Login />
    </SnackbarProvider>
  </React.StrictMode>,
);
