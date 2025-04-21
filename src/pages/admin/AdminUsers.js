import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminStyles.css';

// Mock data for users
const MOCK_USERS = [
  {
    id: 'user-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    role: 'user',
    createdAt: new Date('2023-05-10')
  },
  {
    id: 'user-002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    role: 'user',
    createdAt: new Date('2023-05-15')
  },
  {
    id: 'user-003',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date('2023-04-01')
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, role: newRole} : user
    ));
    
    alert(`User role updated to ${newRole}`);
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/cydo.png" alt="Cainta Logo" />
          <h2>Admin Portal</h2>
        </div>
        <ul className="admin-nav">
          <li>
            <Link to="/admin/dashboard">
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/submissions">
              <i className="fa fa-file-text"></i>
              <span>Submissions</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="active">
              <i className="fa fa-users"></i>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>User Management</h1>
          <div className="admin-user-controls">
            <div className="admin-user-info">
              <p>Welcome,</p>
              <strong>{currentUser?.firstName} {currentUser?.lastName}</strong>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="users-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <h3>{user.firstName} {user.lastName}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role || 'user'}</p>
                <p><strong>Joined:</strong> {user.createdAt.toLocaleDateString()}</p>
                
                <div className="action-buttons">
                  {user.role !== 'admin' ? (
                    <button 
                      onClick={() => updateUserRole(user.id, 'admin')}
                      className="role-btn">
                      Make Admin
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateUserRole(user.id, 'user')}
                      className="role-btn">
                      Remove Admin
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
