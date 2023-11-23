import React, { useState } from 'react';
import { useHistory, useParams, useLocation } from "react-router-dom";
import Layout from '../Layout'
import './styles.css'



const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('name');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for autoresponse
    const autoresponses = {
      hello: 'whats up, what u want?',
      goodbye: 'Auf wiedersehen loser',
      later: "okay sounds good",
      much: "2k straight cash, no takebacks."
      
    };
    const autoresponse = Object.entries(autoresponses).find(([word]) =>
      message.toLowerCase().includes(word.toLowerCase())
    )?.[1];
    // Create message objects
    const userMessage = { text: message, sender: 'user' };
    const botMessage = { text: autoresponse, sender: 'bot' };
    // Add messages to array
    setMessages([
      ...messages,
      userMessage,
      ...(autoresponse ? [botMessage] : []),
    ]);
    setMessage('');
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Layout>
      <div className="app">
        <div className="chat-window">
          <h2>{userName}</h2>
          <div className="messages-container">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === 'user' ? 'left' : 'right'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                style={{
                  maxWidth: 'calc(50% - 10px)',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              />
              <button
                type="submit"
                style={{ width: 'calc(50% - 10px)', marginLeft: '10px' }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ChatWindow;