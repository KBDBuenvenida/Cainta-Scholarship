import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './Userinfo.css';
import { useAuth } from '../context/AuthContext';

const UserInfo = () => {
  const [name, setName] = useState('Juan Dela Cruz');
  const [email, setEmail] = useState('juan@example.com');
  const [status, setStatus] = useState('Active');
  const [age, setAge] = useState(21);
  const [sex, setSex] = useState('Male');
  const [school, setSchool] = useState('Cainta Senior High School');
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState('123 Main St., Cainta, Rizal');
  const [contactNumber, setContactNumber] = useState('09123456789');
  const [yearLevel, setYearLevel] = useState('2nd Year College');
  const [course, setCourse] = useState('Computer Science');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSave = () => {
    alert('Changes saved! ✅');
    setEditing(false); // Automatically exit edit mode after saving
  };

  const handleCancel = () => {
    setEditing(false);
  };

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
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/home.png" alt="Home" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/user-info" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/user.png" alt="User" />
            <span>User</span>
          </NavLink>

          <NavLink to="/chat" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/chat.png" alt="Chat" />
            <span>Chat</span>
          </NavLink>

          <NavLink to="/documents" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/documents.png" alt="Documents" />
            <span>Documents</span>
          </NavLink>

          <div className="sidebar-item" onClick={handleLogout}>
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>

        <div className="content">
          <div className="profile-header">
            <h2>Student Profile</h2>
            <button 
              className="edit-profile-btn" 
              onClick={() => editing ? setEditing(false) : setEditing(true)}
            >
              {editing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
          
          <div className="user-profile-container">
            <div className="profile-sidebar">
              <div className="profile-image-container">
                <img src="/icons/user.png" alt="User Profile" className="user-profile-pic" />
                {editing && (
                  <div className="change-photo-btn">Change Photo</div>
                )}
              </div>
              
              <div className="profile-status">
                <h3>{name}</h3>
                <p>{school}</p>
                <p>{yearLevel} • {course}</p>
                <div className={`status-badge ${status.toLowerCase()}`}>
                  {status}
                </div>
              </div>
            </div>
            
            <div className="profile-details">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="fields-grid">
                  <div className="field">
                    <label>Full Name:</label>
                    {editing ? (
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                      <p>{name}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Email Address:</label>
                    {editing ? (
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                      <p>{email}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Age:</label>
                    {editing ? (
                      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    ) : (
                      <p>{age}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Sex:</label>
                    {editing ? (
                      <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <p>{sex}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Contact Number:</label>
                    {editing ? (
                      <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    ) : (
                      <p>{contactNumber}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Address:</label>
                    {editing ? (
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    ) : (
                      <p>{address}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>Academic Information</h3>
                <div className="fields-grid">
                  <div className="field">
                    <label>School:</label>
                    {editing ? (
                      <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
                    ) : (
                      <p>{school}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Year Level:</label>
                    {editing ? (
                      <input type="text" value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} />
                    ) : (
                      <p>{yearLevel}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Course/Program:</label>
                    {editing ? (
                      <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
                    ) : (
                      <p>{course}</p>
                    )}
                  </div>
                  
                  <div className="field">
                    <label>Scholarship Status:</label>
                    {editing ? (
                      <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    ) : (
                      <p>{status}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {editing && (
                <div className="action-buttons">
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  <button className="save-button" onClick={handleSave}>Save Changes</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;