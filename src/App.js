import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Chat from './pages/Chat';
import UserInfo from './pages/Userinfo.js';
import Documents from './pages/Documents.js';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminUsers from './pages/admin/AdminUsers';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Admin route component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* User routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute>
          <Applications />
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      } />
      <Route path="/user-info" element={
        <ProtectedRoute>
          <UserInfo />
        </ProtectedRoute>
      } />
      <Route path="/documents" element={
        <ProtectedRoute>
          <Documents />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="/admin/submissions" element={
        <AdminRoute>
          <AdminSubmissions />
        </AdminRoute>
      } />
      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;