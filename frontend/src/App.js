// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ComplaintsPage from './components/ComplaintsPage';
import ComplaintStatusPage from './components/ComplaintStatusPage';
import AdminDashboard from './components/AdminDashboard';
import RegisterPage from './components/RegisterPage';
import RegisterAdminPage from './components/RegisterAdminPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleSetToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <AppContent token={token} handleLogout={handleLogout} handleSetToken={handleSetToken} />
    </Router>
  );
};

const AppContent = ({ token, handleLogout, handleSetToken }) => {
  const location = useLocation();

  // Paths where the Navbar should not be displayed
  const noNavbarPaths = ['/login', '/register','/register-admin', '/forgot-password', '/reset-password'];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar token={token} handleLogout={handleLogout} />}
      <Routes>
        {/* Information routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Authentication routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-admin" element={<RegisterAdminPage />} />
        <Route path="/login" element={<LoginPage setToken={handleSetToken} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:userId" element={<ResetPasswordPage />} />

        {/* Protected routes - require authentication */}
        <Route
          path="/change-password"
          element={token ? <ChangePasswordPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/complaints"
          element={token ? <ComplaintsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/complaint-status"
          element={token ? <ComplaintStatusPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={token ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
