import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  
  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/applications">Applications</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/user-info">User Info</Link>
          </li>
        </ul>
      </nav>
      
      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;