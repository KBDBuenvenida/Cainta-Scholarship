import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Chat from './pages/Chat';
import Login from './pages/Login.js';
import UserInfo from './pages/Userinfo.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/user-info" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
