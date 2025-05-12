import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import './Chat.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Scholarship chatbot logic
const scholarshipResponses = {
  "apply_scholarship": "You can apply by filling out the online application form.",
  "scholarship_requirements": "The requirements include your grades, ID, and application letter.",
  "scholarship_deadline": "The deadline for applications is every July 15.",
  "check_availability": "Yes, the scholarship is currently open.",
  "reapplication_policy": "Yes, you can reapply next semester if rejected.",
  "course_coverage": "The scholarship covers all undergraduate programs.",
  "eligibility_level": "It's open to high school graduates and college students.",
  "document_submission": "Submit your documents via the online portal or in-person.",
  "scholarship_benefits": "The grant provides PHP 5,000 per semester.",
  "grade_requirement": "You must maintain at least a 2.5 GPA.",
  "transferee_eligibility": "Yes, transferees can apply with additional documents.",
  "contact_info": "You can contact the scholarship office at info@scholar.org.",
  "interview_info": "There is a short interview after document review.",
  "renewal_process": "Submit your grades every semester to renew.",
  "failure_policy": "If you fail a subject, you'll be on probation.",
  "application_edit": "Yes, you can edit your application before the deadline."
};

// Keywords to match user queries with intents
const intentKeywords = {
  "apply_scholarship": ["apply", "how to apply", "application", "start application", "registration"],
  "scholarship_requirements": ["requirements", "documents", "need", "required", "paperwork", "submit"],
  "scholarship_deadline": ["deadline", "due date", "last day", "when to apply", "until when"],
  "check_availability": ["available", "open", "accepting", "active", "current"],
  "reapplication_policy": ["reapply", "try again", "rejected", "denied", "second chance"],
  "course_coverage": ["course", "program", "degree", "major", "field of study"],
  "eligibility_level": ["eligible", "qualify", "high school", "college", "year level", "freshman"],
  "document_submission": ["submit", "upload", "send", "documents", "papers", "requirements"],
  "scholarship_benefits": ["benefits", "how much", "amount", "cover", "financial support", "grant"],
  "grade_requirement": ["grade", "gpa", "maintain", "academic", "performance"],
  "transferee_eligibility": ["transfer", "transferee", "different school", "change school"],
  "contact_info": ["contact", "email", "phone", "office", "reach"],
  "interview_info": ["interview", "meeting", "talk", "panel"],
  "renewal_process": ["renew", "renewal", "continue", "next semester", "maintain"],
  "failure_policy": ["fail", "failing", "failed", "drop", "probation"],
  "application_edit": ["edit", "change", "modify", "update", "application"]
};

// Get response from chatbot
function getChatbotResponse(userInput) {
  const text = userInput.toLowerCase();
  
  // Check for greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
  if (greetings.some(greeting => text.includes(greeting))) {
    return "Hello! How can I assist you with your scholarship concern?";
  }
  
  // Find matching intent
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      return scholarshipResponses[intent];
    }
  }
  
  return "I'm not sure I understand. Could you please ask me about scholarship-related topics?";
}

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
    
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: 'You', content: newMessage, timestamp }
    ]);
    
    setNewMessage('');
    setIsTyping(true);
    
    // Get response from the scholarship chatbot after a short delay
    setTimeout(() => {
      const botResponse = getChatbotResponse(newMessage);
      
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: prevMessages.length + 1, 
          sender: 'Admin', 
          content: botResponse, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
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
              <h1>Scholarship Support Chat</h1>
              <p>Get help with your scholarship application and questions</p>
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