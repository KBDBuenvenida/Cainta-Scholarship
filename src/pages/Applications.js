import React from 'react';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';

const Applications = () => {
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
          <div className="sidebar-item">
            <img src="/icons/mail.png" alt="Mail" />
            <span>Mail</span>
          </div>
          <div className="sidebar-item">
            <img src="/icons/settings.png" alt="Settings" />
            <span>Settings</span>
          </div>
          <div className="sidebar-item">
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>

        <div className="content">
          <h1>Applications</h1>
          <div className="card">
            <h2>Scholarship Applications</h2>
            <p>This section will display a list of scholarship applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;