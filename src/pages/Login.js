import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // ✅ hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'admin123') {
      // ✅ redirect to dashboard
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Try admin@example.com / admin123');
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="header">
        <img src="/cydo.png" alt="CYDO Logo" />
        Cainta Youth Development Office Scholarship Management System
      </div>

      <div className="main-content">
        <div className="login-container">
          <h2>Login</h2>
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
            <button type="submit">Login</button>
            <div className="links">
              <a href="#">Register for free</a>
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
