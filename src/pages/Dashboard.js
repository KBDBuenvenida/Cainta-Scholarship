import React from 'react';
import './Dashboard.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src="/cydo.png" alt="CYDO Logo" />
        Cainta Youth Development Office Scholarship Management System
      </div>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-item">
            <img src="/icons/home.png" alt="Home" />
            <span>Home</span>
          </div>
          <NavLink
            to="/user-info"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/user.png" alt="User" />
            <span>User</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/chat.png" alt="Chat" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/documents.png" alt="Documents" />
            <span>Documents</span>
          </NavLink>
          <div className="sidebar-item" onClick={handleLogout}>
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>

        <div className="content">
          <div className="date-section">
            <div className="date-label">March 24, 2024</div>
            <div className="card"></div>
          </div>
          <div className="date-section">
            <div className="date-label">Today</div>
            <div className="card"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
