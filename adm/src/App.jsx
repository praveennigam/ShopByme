import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebaar from "./components/Sidebar/Sidebaar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import CardDetails from "./pages/Card/CardDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import PasswordPrompt from "./PasswordPrompt"; // Import the PasswordPrompt component

const App = () => {
  const [authenticated, setAuthenticated] = useState(false); // Manage authentication state
  const url = "https://e-combypraveen.onrender.com";

  if (!authenticated) {
    return <PasswordPrompt onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="bg-neutral-900 min-h-screen">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebaar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/card-details" element={<CardDetails url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
