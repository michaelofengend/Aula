import React, {useEffect, useState, useCallback} from "react";
import "./AiAgent.css";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Card,
  Button,
} from "react-bootstrap";

const AI_Agent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSend = useCallback(async (customInput) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim()) return;
  
    const newMessage = { type: 'user', message: messageToSend };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
    setInput('');
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId: threadId,
          messages: [newMessage],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      const lastMessageResponse = await fetch(`http://localhost:5001/chat/last-message/${data.run.thread_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!lastMessageResponse.ok) {
        throw new Error(`HTTP error! status: ${lastMessageResponse.status}`);
      }
  
      const lastMessageData = await lastMessageResponse.json();
      const assistantMessage = { type: 'assistant', message: lastMessageData.message };
      
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      localStorage.setItem('messages', JSON.stringify([...messages, newMessage, assistantMessage]));
    } catch (error) {
      console.error('Error Sending the Chat Message:', error);
      setMessages((prevMessages) => [...prevMessages, { type: 'assistant', message: 'Sorry, I have encountered a problem' }]);
    } finally {
      setLoading(false);
    }
  }, [messages, threadId]);

  useEffect(() => {
    const messages = localStorage.getItem('messages')
    if (messages) {
      setMessages(JSON.parse(messages))
    }
    const threadId = localStorage.getItem('threadId')
    if (threadId) {
      setThreadId(threadId)
    } else {
      const id = Math.floor(Math.random() * 100)
      setThreadId(id)
      localStorage.setItem('threadId', id)
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.aiAgentMessage) {
      setInput(location.state.aiAgentMessage);
      handleSend(location.state.aiAgentMessage);
      navigate("/", {state: {}}, {replace: true});
    }
  }, [location.state, handleSend, navigate]);

  const resetChat = () => {
    setMessages([])
    setThreadId(undefined)
    localStorage.removeItem('messages')
    localStorage.removeItem('threadId');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="agent">
      <h2>AI Agent</h2>
      <Card >
        <Card.Body className="main-card">
          <Card.Title>Cal the Counselor</Card.Title>
          <div className="chat">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <strong>{message.type === 'user' ? 'You:' : 'AI:'}</strong>
                  <div className="message-content">
                    {message.message.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
            />
            <Button variant="primary" type="submit" onClick={() => handleSend()} className="inputSubmit">
              {loading ? "Processing" : "Ask"}
            </Button>
            <Button variant="primary" type="submit" onClick={resetChat} className="cancel">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AI_Agent;
