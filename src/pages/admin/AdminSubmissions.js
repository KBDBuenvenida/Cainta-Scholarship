import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminStyles.css';

// Mock data for submissions
const MOCK_SUBMISSIONS = [
  {
    id: 'sub-001',
    applicantName: 'John Doe',
    email: 'johndoe@example.com',
    createdAt: new Date('2023-06-15'),
    status: 'pending',
    documents: [
      { name: 'School ID', url: '#' },
      { name: 'Grades', url: '#' }
    ]
  },
  {
    id: 'sub-002',
    applicantName: 'Jane Smith',
    email: 'janesmith@example.com',
    createdAt: new Date('2023-06-14'),
    status: 'approved',
    documents: [
      { name: 'School ID', url: '#' },
      { name: 'Grades', url: '#' }
    ]
  },
  {
    id: 'sub-003',
    applicantName: 'Mike Johnson',
    email: 'mikejohnson@example.com',
    createdAt: new Date('2023-06-13'),
    status: 'rejected',
    documents: [
      { name: 'School ID', url: '#' },
      { name: 'Grades', url: '#' }
    ]
  }
];

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [filter, setFilter] = useState('all');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const updateSubmissionStatus = (submissionId, newStatus) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? {...sub, status: newStatus} : sub
    ));
    alert(`Submission status updated to ${newStatus}`);
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filter);

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
            <Link to="/admin/submissions" className="active">
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
          <h1>Manage Submissions</h1>
          <div className="admin-user-controls">
            <div className="admin-user-info">
              <p>Welcome,</p>
              <strong>{currentUser?.firstName} {currentUser?.lastName}</strong>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="filter-controls">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}>
            All
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={filter === 'pending' ? 'active' : ''}>
            Pending
          </button>
          <button 
            onClick={() => setFilter('approved')} 
            className={filter === 'approved' ? 'active' : ''}>
            Approved
          </button>
          <button 
            onClick={() => setFilter('rejected')} 
            className={filter === 'rejected' ? 'active' : ''}>
            Rejected
          </button>
        </div>
        
        {filteredSubmissions.length === 0 ? (
          <p>No {filter !== 'all' ? filter : ''} submissions found.</p>
        ) : (
          <div className="submissions-list">
            {filteredSubmissions.map(submission => (
              <div key={submission.id} className={`submission-card ${submission.status}`}>
                <h3>Application #{submission.id.substring(0, 8)}</h3>
                <p><strong>Applicant:</strong> {submission.applicantName}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Submitted:</strong> {submission.createdAt.toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`status-${submission.status}`}>{submission.status}</span></p>
                
                <div className="document-links">
                  <h4>Documents:</h4>
                  {submission.documents?.map((doc, index) => (
                    <a key={index} href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  ))}
                </div>
                
                <div className="action-buttons">
                  {submission.status !== 'approved' && (
                    <button 
                      onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                      className="approve-btn">
                      Approve
                    </button>
                  )}
                  {submission.status !== 'rejected' && (
                    <button 
                      onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                      className="reject-btn">
                      Reject
                    </button>
                  )}
                  {(submission.status === 'approved' || submission.status === 'rejected') && (
                    <button 
                      onClick={() => updateSubmissionStatus(submission.id, 'pending')}
                      className="reset-btn">
                      Reset to Pending
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

export default AdminSubmissions;
