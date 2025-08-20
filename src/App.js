// App.jsx
import React from "react";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginForm from "./auth/LoginForm";
import { Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import UserTable from "./content/UserTable";
import Documents from "./content/Documents";

function App() {
  return (
        <Routes>
          {/* 1. Public login page */}
          <Route path="/login" element={<LoginForm />} />

          {/* 2. Protected “appshell” area */}
          <Route path="/" element={ <ProtectedRoute> <AppShell /> </ProtectedRoute> }
          >
            {/* a) When URL is exactly "/appshell", AppShell is rendered by ProtectedRoute. 
                  If you want an “index” inside AppShell, add a Route index element here. */}
            {/* <Route index element={<Dashboard />} /> */}

            {/* b) When URL is "/appshell/admin", React Router renders UserTable inside AppShell’s <Outlet/>. */}
            <Route path="/admin" element={<UserTable />} />
            <Route path="/documents" element={<Documents />} />
          </Route>

          {/* → Optionally, catch all unknown URLs and redirect to /login: */}
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
  );
}

export default App;
