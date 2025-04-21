import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Sample users
const SAMPLE_USERS = {
  student: {
    email: 'student@example.com',
    password: 'password123',
    firstName: 'Sample',
    lastName: 'Student',
    role: 'user',
    id: 'student-123'
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Sample',
    lastName: 'Admin',
    role: 'admin',
    id: 'admin-456'
  }
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock login function
  const login = async (email, password) => {
    setError('');
    
    // Check for student
    if (email === SAMPLE_USERS.student.email && password === SAMPLE_USERS.student.password) {
      setCurrentUser(SAMPLE_USERS.student);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('currentUser', JSON.stringify(SAMPLE_USERS.student));
      return true;
    }
    
    // Check for admin
    if (email === SAMPLE_USERS.admin.email && password === SAMPLE_USERS.admin.password) {
      setCurrentUser(SAMPLE_USERS.admin);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('currentUser', JSON.stringify(SAMPLE_USERS.admin));
      return true;
    }
    
    // If no match
    setError('Invalid email or password');
    return false;
  };

  // Mock logout function
  const logout = async () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    return true;
  };

  // Mock register function - for demo purposes
  const register = async (email, password, userData) => {
    setError('Registration is disabled in demo mode');
    return false;
  };

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
    }
    
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
