// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate, 
  useLocation,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ComplaintsPage from "./components/ComplaintsPage";
import ComplaintStatusPage from "./components/ComplaintStatusPage";
import AdminDashboard from "./components/AdminDashboard";
import RegisterPage from "./components/RegisterPage";
import RegisterAdminPage from "./components/RegisterAdminPage";
import LoginPage from "./components/LoginPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminChangePasswordPage from "./components/AdminChangePasswordPage";
import AuthNavbar from "./components/AuthNavbar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <AppContent
        token={token}
        handleLogout={handleLogout}
        handleSetToken={handleSetToken}
      />
    </Router>
  );
};

const AppContent = ({ token, handleLogout, handleSetToken }) => {
  const location = useLocation();

  // Paths where the Navbar should not be displayed
  const noNavbarPaths = [
    "/",
    "/register",
    "/register-admin",
    "/forgot-password",
    "/reset-password/:userId",
  ];

  const adminNavbarPaths = ["/admin", "/change-admin-password"];

  const nav = () => {
    if (adminNavbarPaths.includes(location.pathname)) {
      return <AdminNavbar token={token} handleLogout={handleLogout} />;
    } else if (!noNavbarPaths.includes(location.pathname)) {
      return <Navbar token={token} handleLogout={handleLogout} />;
    }
    return <AuthNavbar token={token} />;
  };

  return (
    <>
      {nav()}
      <Routes>
        {/* Information routes */}
        <Route path="/home" element={
          token ? <HomePage token={token} /> : <Navigate to="/" replace />
        } />

        {/* Authentication routes */}
        <Route path="/register" element={
            token ? <Navigate to="/" replace /> : <RegisterPage token={token} />
          } />
        <Route path="/register-admin" element={
            token ? <Navigate to="/" replace /> : <RegisterAdminPage token={token} />
          } />
        <Route path="/" element={
            token ? <Navigate to="/" replace /> : <LoginPage setToken={handleSetToken} />
          } />
        <Route path="/forgot-password" element={
            token ? <Navigate to="/" replace /> : <ForgotPasswordPage token={token} />
          } />
        <Route path="/reset-password/:userId" element={
            token ? <Navigate to="/" replace /> : <ResetPasswordPage token={token} />
          } />

        {/* Protected routes - require authentication */}
        <Route
          path="/change-password"
          element={
            token ? <ChangePasswordPage token={token} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/complaints"
          element={
            token ? <ComplaintsPage token={token} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/status"
          element={
            token ? <ComplaintStatusPage token={token} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin"
          element={
            token ? <AdminDashboard token={token} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/change-admin-password"
          element={
            token ? <AdminChangePasswordPage token={token} /> : <Navigate to="/" replace />
          }
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
