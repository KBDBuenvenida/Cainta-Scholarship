import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import './Chat.css';
import { NavLink } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
    { id: 2, sender: 'You', content: 'I have a question about my scholarship application.', timestamp: '10:02 AM' },
    { id: 3, sender: 'Admin', content: 'Sure, I\'d be happy to help. What would you like to know?', timestamp: '10:03 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

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
    
    // Simulate admin response after a short delay
    setTimeout(() => {
      const responses = [
        "I'll check on that for you.",
        "Thanks for your message. Let me look into that.",
        "I understand your concern. We're working on it.",
        "That's a good question. The scholarship committee will review applications next week.",
        "Please provide your application ID and I can check the status for you."
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
    }, 1000);
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
            to="/mail"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/mail.png" alt="Mail" />
            <span>Mail</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <img src="/icons/settings.png" alt="Settings" />
            <span>Settings</span>
          </NavLink>
          <div className="sidebar-item">
            <img src="/icons/logout.png" alt="Logout" />
            <span>Logout</span>
          </div>
        </div>
        
        <div className="content">
          <div className="chat-container">
            <div className="chat-header">
              <h1>Support Chat</h1>
              <p>Get help with your scholarship application</p>
            </div>
            
            <div className="chat-messages">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'You' ? 'message-user' : 'message-admin'}`}
                >
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">{message.sender}</span>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                    <div className="message-body">{message.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="chat-input-field"
              />
              <button type="submit" className="chat-send-button">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;