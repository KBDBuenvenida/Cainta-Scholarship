import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './Documents.css';
import { useAuth } from '../context/AuthContext';

const Documents = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    registrationForm: null,
    studentId: null,
    grades: null
  });

  const [fileProgress, setFileProgress] = useState({
    registrationForm: 0,
    studentId: 0,
    grades: 0
  });

  const [statusMessages, setStatusMessages] = useState({
    registrationForm: '',
    studentId: '',
    grades: ''
  });

  // Add logout functionality
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileChange = (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update the state with the selected file
    setUploadedFiles({
      ...uploadedFiles,
      [documentType]: file
    });

    // Reset progress and status
    setFileProgress({
      ...fileProgress,
      [documentType]: 0
    });
    setStatusMessages({
      ...statusMessages,
      [documentType]: 'Ready to upload'
    });
  };

  const handleUpload = (documentType) => {
    const file = uploadedFiles[documentType];
    if (!file) {
      setStatusMessages({
        ...statusMessages,
        [documentType]: 'Please select a file first'
      });
      return;
    }

    // Simulate upload progress
    let progress = 0;
    setStatusMessages({
      ...statusMessages,
      [documentType]: 'Uploading...'
    });

    const interval = setInterval(() => {
      progress += 5;
      setFileProgress({
        ...fileProgress,
        [documentType]: progress
      });

      if (progress >= 100) {
        clearInterval(interval);
        setStatusMessages({
          ...statusMessages,
          [documentType]: 'Upload complete!'
        });
      }
    }, 100);
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return 'file-icon';
    
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(extension)) {
      return 'pdf-icon';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image-icon';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word-icon';
    } else {
      return 'file-icon';
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src="/cydo.png" alt="CYDO Logo" />
        Cainta Youth Development Office Scholarship Management System
      </div>
      <div className="container">
        <div className="sidebar">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <img src="/icons/home.png" alt="Home" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/user-info"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <img src="/icons/user.png" alt="User" />
            <span>User</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <img src="/icons/chat.png" alt="Chat" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <img src="/icons/documents.png" alt="Documents" />
            <span>Documents</span>
          </NavLink>
          <div className="sidebar-item" onClick={handleLogout}>
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>

        <div className="content">
          <div className="documents-header">
            <h1>Scholarship Documents</h1>
            <p>Upload the required documents for your scholarship application</p>
          </div>
          
          <div className="document-requirements">
            <div className="requirement-card">
              <div className="requirement-icon">📋</div>
              <div className="requirement-content">
                <h3>Registration Form</h3>
                <p>Completed and signed scholarship registration form</p>
                <div className="file-formats">Accepted formats: PDF, JPG, PNG</div>
              </div>
            </div>
            
            <div className="requirement-card">
              <div className="requirement-icon">🆔</div>
              <div className="requirement-content">
                <h3>Student ID</h3>
                <p>Clear photo of your valid school ID (front and back)</p>
                <div className="file-formats">Accepted formats: JPG, PNG</div>
              </div>
            </div>
            
            <div className="requirement-card">
              <div className="requirement-icon">📝</div>
              <div className="requirement-content">
                <h3>Grade Report</h3>
                <p>Official grade report from your most recent semester</p>
                <div className="file-formats">Accepted formats: PDF, JPG, PNG</div>
              </div>
            </div>
          </div>
          
          <div className="upload-section">
            <h2>Upload Your Documents</h2>
            
            <div className="document-upload-card">
              <div className={`document-icon ${getFileIcon(uploadedFiles.registrationForm?.name)}`}>
                {!uploadedFiles.registrationForm && <span>+</span>}
              </div>
              <div className="document-details">
                <h3>Registration Form</h3>
                {uploadedFiles.registrationForm ? (
                  <p className="file-name">{uploadedFiles.registrationForm.name}</p>
                ) : (
                  <p className="no-file">No file selected</p>
                )}
                
                {fileProgress.registrationForm > 0 && fileProgress.registrationForm < 100 && (
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${fileProgress.registrationForm}%` }}
                    ></div>
                  </div>
                )}
                
                {statusMessages.registrationForm && (
                  <p className={`status-message ${statusMessages.registrationForm === 'Upload complete!' ? 'success' : ''}`}>
                    {statusMessages.registrationForm}
                  </p>
                )}
                
                <div className="upload-actions">
                  <label className="file-input-label">
                    Select File
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileChange(e, 'registrationForm')}
                      className="file-input"
                    />
                  </label>
                  <button 
                    className="upload-button"
                    onClick={() => handleUpload('registrationForm')}
                    disabled={!uploadedFiles.registrationForm}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            
            <div className="document-upload-card">
              <div className={`document-icon ${getFileIcon(uploadedFiles.studentId?.name)}`}>
                {!uploadedFiles.studentId && <span>+</span>}
              </div>
              <div className="document-details">
                <h3>Student ID</h3>
                {uploadedFiles.studentId ? (
                  <p className="file-name">{uploadedFiles.studentId.name}</p>
                ) : (
                  <p className="no-file">No file selected</p>
                )}
                
                {fileProgress.studentId > 0 && fileProgress.studentId < 100 && (
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${fileProgress.studentId}%` }}
                    ></div>
                  </div>
                )}
                
                {statusMessages.studentId && (
                  <p className={`status-message ${statusMessages.studentId === 'Upload complete!' ? 'success' : ''}`}>
                    {statusMessages.studentId}
                  </p>
                )}
                
                <div className="upload-actions">
                  <label className="file-input-label">
                    Select File
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png" 
                      onChange={(e) => handleFileChange(e, 'studentId')}
                      className="file-input"
                    />
                  </label>
                  <button 
                    className="upload-button"
                    onClick={() => handleUpload('studentId')}
                    disabled={!uploadedFiles.studentId}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            
            <div className="document-upload-card">
              <div className={`document-icon ${getFileIcon(uploadedFiles.grades?.name)}`}>
                {!uploadedFiles.grades && <span>+</span>}
              </div>
              <div className="document-details">
                <h3>Grade Report</h3>
                {uploadedFiles.grades ? (
                  <p className="file-name">{uploadedFiles.grades.name}</p>
                ) : (
                  <p className="no-file">No file selected</p>
                )}
                
                {fileProgress.grades > 0 && fileProgress.grades < 100 && (
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${fileProgress.grades}%` }}
                    ></div>
                  </div>
                )}
                
                {statusMessages.grades && (
                  <p className={`status-message ${statusMessages.grades === 'Upload complete!' ? 'success' : ''}`}>
                    {statusMessages.grades}
                  </p>
                )}
                
                <div className="upload-actions">
                  <label className="file-input-label">
                    Select File
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png" 
                      onChange={(e) => handleFileChange(e, 'grades')}
                      className="file-input"
                    />
                  </label>
                  <button 
                    className="upload-button"
                    onClick={() => handleUpload('grades')}
                    disabled={!uploadedFiles.grades}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            
            <div className="submit-application">
              <button 
                className="submit-button"
                disabled={
                  !statusMessages.registrationForm.includes('complete') ||
                  !statusMessages.studentId.includes('complete') ||
                  !statusMessages.grades.includes('complete')
                }
              >
                Submit Application
              </button>
              <p className="submit-note">
                All required documents must be uploaded before submitting your application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;