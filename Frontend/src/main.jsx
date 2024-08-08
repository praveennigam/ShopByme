import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <StoreContextProvider>
      <App />
      <ToastContainer />
    </StoreContextProvider>
  </Router>
);
