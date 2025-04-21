import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import './Chat.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
    { id: 2, sender: 'You', content: 'I have a question about my scholarship application.', timestamp: '10:02 AM' },
    { id: 3, sender: 'Admin', content: 'Sure, I\'d be happy to help. What would you like to know?', timestamp: '10:03 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: 'You', content: newMessage, timestamp }
    ]);
    
    setNewMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate admin response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "I'll check on that for you. Your application is being processed.",
        "Thanks for your message. The scholarship committee will review applications starting next week.",
        "I understand your concern. All complete applications received by the deadline will be considered.",
        "That's a good question. The scholarship results will be announced on the 15th of next month.",
        "Please provide your application ID and I can check the specific status for you.",
        "We've received your documents. Is there anything else you need assistance with?",
        "The scholarship covers tuition and book allowance. Would you like me to send you the full benefits list?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: prevMessages.length + 1, 
          sender: 'Admin', 
          content: randomResponse, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2500);
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
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/home.png" alt="Home" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/user-info"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/user.png" alt="User" />
            <span>User</span>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/chat.png" alt="Chat" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/documents.png" alt="Documents" />
            <span>Documents</span>
          </NavLink>
          <div className="sidebar-item" onClick={handleLogout}>
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>
        
        <div className="content">
          <div className="chat-container">
            <div className="chat-header">
              <div>
                <h2>Support Chat</h2>
                <p>Get assistance with your scholarship application</p>
              </div>
              <span className="online-indicator">● Admin is online</span>
            </div>
            
            <div className="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'You' ? 'user-message' : 'admin-message'}`}
                >
                  <div className="message-content">
                    <p>{message.content}</p>
                    <span className="message-timestamp">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form className="message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;