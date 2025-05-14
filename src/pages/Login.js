import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      const success = await login(email, password);
      
      if (success) {
        // Check if the user is an admin and redirect accordingly
        const userInfo = JSON.parse(localStorage.getItem('currentUser'));
        if (userInfo && userInfo.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Display sample login credentials for demo purposes
  const sampleCredentials = (
    <div className="sample-credentials">
      <p><strong>Sample Logins:</strong></p>
      <p>Student: student@example.com / password123</p>
      <p>Admin: admin@example.com / admin123</p>
    </div>
  );

  return (
    <div className="login-page">
      <div className="overlay"></div>
      
      <div className="header">
        <img src="/cydo.png" alt="Cainta Logo" />
        <h1>Cainta Youth Development Office Scholarship Management System</h1>
      </div>
      
      <div className="main-content">
        <div className="login-container">
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="links">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/register">Register</Link>
            </div>
          </form>
          
          {/* Display sample credentials */}
          {sampleCredentials}
        </div>
      </div>
    </div>
  );
};

export default Login;
