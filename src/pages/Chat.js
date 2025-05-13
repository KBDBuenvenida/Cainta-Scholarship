import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import './Chat.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getChatbotResponse } from '../utils/scholarshipChatbot';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Hello! How can I help you today with your scholarship questions?', timestamp: '10:00 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

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

  // Ensure chat container size is maintained
  useEffect(() => {
    const resizeChat = () => {
      if (chatMessagesRef.current) {
        const headerHeight = 60; // Approximate header height
        const inputHeight = 70; // Approximate input form height
        const contentHeight = window.innerHeight - headerHeight - inputHeight - 40; // Subtract padding
        chatMessagesRef.current.style.height = `${contentHeight}px`;
      }
    };
    
    window.addEventListener('resize', resizeChat);
    resizeChat(); // Call on initial render
    
    return () => window.removeEventListener('resize', resizeChat);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message to chat
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'You', content: newMessage, timestamp }
    ]);
    
    // Clear input and show typing indicator
    const userQuery = newMessage; // Store the user query before clearing
    setNewMessage('');
    setIsTyping(true);
    
    // Get response from the scholarship chatbot after a short delay
    setTimeout(() => {
      try {
        // Use a try-catch to prevent any errors in the chatbot from breaking the UI
        const botResponse = getChatbotResponse(userQuery);
        
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            id: prevMessages.length + 1, 
            sender: 'Admin', 
            content: botResponse, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } catch (error) {
        console.error("Error getting chatbot response:", error);
        // Fallback response in case of error
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            id: prevMessages.length + 1, 
            sender: 'Admin', 
            content: "I'm sorry, I encountered an error processing your request. Please try again with a different question.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } finally {
        setIsTyping(false);
      }
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
              <h1>AI Scholarship Assistant</h1>
              <p>Get help with your scholarship questions using our advanced AI</p>
            </div>
            
            <div className="chat-messages" ref={chatMessagesRef}>
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
              {isTyping && (
                <div className="message message-admin">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ask about scholarships, requirements, deadlines..."
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