import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./context/RequestContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <RequestProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </RequestProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);