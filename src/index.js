// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 1) BrowserRouter at the very top */}
    <BrowserRouter>
      {/* 2) AuthProvider next, so useAuth() works everywhere */}
      <AuthProvider>
        {/* 3) Then your App with all its Routes */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
