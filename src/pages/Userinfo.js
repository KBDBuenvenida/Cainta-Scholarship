import React, { useState } from 'react';
import './Dashboard.css'; // Reuse same styling for layout
import './Userinfo.css';  // Optional: add extra styling here
import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const [name, setName] = useState('Juan Dela Cruz');
  const [email, setEmail] = useState('juan@example.com');
  const [status, setStatus] = useState('Active');
  const [age, setAge] = useState(21);
  const [sex, setSex] = useState('Male');
  const [school, setSchool] = useState('Cainta Senior High School');

  const handleSave = () => {
    alert('Changes saved! ✅');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src="/cydo.png" alt="CYDO Logo" />
        Cainta Youth Development Office Scholarship Management System
      </div>

      <div className="container">
        <div className="sidebar">
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/home.png" alt="Home" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/user-info" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/user.png" alt="User" />
            <span>User</span>
          </NavLink>

          <div className="sidebar-item">
            <img src="/icons/chat.png" alt="Chat" />
            <span>Chat</span>
          </div>
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
          <h2>User Profile</h2>
          <div className="user-info-card">
            <img src="/icons/user.png" alt="User Profile" className="user-profile-pic" />
            <div className="user-fields">
              <div className="field">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="field">
                <label>Sex:</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="field">
                <label>School:</label>
                <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
              </div>
              <div className="field">
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button className="save-button" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;