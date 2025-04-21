import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminStyles.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
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
            <Link to="/admin/dashboard" className="active">
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
            <Link to="/admin/users">
              <i className="fa fa-users"></i>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-controls">
            <div className="admin-user-info">
              <p>Welcome,</p>
              <strong>{currentUser?.firstName} {currentUser?.lastName}</strong>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="admin-dashboard-cards">
          <div className="admin-card">
            <h2>Total Applications</h2>
            <div className="stat">24</div>
            <p>Manage scholarship applications</p>
            <Link to="/admin/submissions" className="admin-button">View Applications</Link>
          </div>
          
          <div className="admin-card">
            <h2>Pending Review</h2>
            <div className="stat">10</div>
            <p>Applications awaiting your review</p>
            <Link to="/admin/submissions" className="admin-button">Review Now</Link>
          </div>
          
          <div className="admin-card">
            <h2>Registered Users</h2>
            <div className="stat">42</div>
            <p>Manage user accounts</p>
            <Link to="/admin/users" className="admin-button">Manage Users</Link>
          </div>
        </div>

        <div className="admin-table-container">
          <h2 style={{ padding: "15px" }}>Recent Applications</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#APP-001</td>
                <td>John Doe</td>
                <td>2023-06-15</td>
                <td><span className="status-pending">Pending</span></td>
                <td><Link to="/admin/submissions" className="admin-button">Review</Link></td>
              </tr>
              <tr>
                <td>#APP-002</td>
                <td>Jane Smith</td>
                <td>2023-06-14</td>
                <td><span className="status-approved">Approved</span></td>
                <td><Link to="/admin/submissions" className="admin-button">View</Link></td>
              </tr>
              <tr>
                <td>#APP-003</td>
                <td>Mike Johnson</td>
                <td>2023-06-13</td>
                <td><span className="status-rejected">Rejected</span></td>
                <td><Link to="/admin/submissions" className="admin-button">View</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
