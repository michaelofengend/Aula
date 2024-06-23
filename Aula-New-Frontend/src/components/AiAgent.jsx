import React, {useEffect, useState} from "react"
import "./AiAgent.css";

import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  ListGroup,
} from "react-bootstrap";

const AI_Agent = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [threadId, setThreadId] = useState(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const messages = localStorage.getItem('messages')
    if (messages) {
      setMessages(JSON.parse(messages))
    }
    const threadId = localStorage.getItem('threadId')
    if (threadId) {
      setThreadId(threadId)
    }else{
      const id = Math.floor(Math.random() * 100)
      setThreadId(id)
      localStorage.setItem('threadId', id)
    }
  }, [])

  const resetChat = () => {
    setMessages([])
    setThreadId(undefined)
    localStorage.removeItem('messages')
    localStorage.removeItem('threadId');
  };

  const handleSend = async () => {
    if (!input.trim()) return; // Don't send empty messages
  
    const newMessage = { type: 'user', message: input };
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
          messages: [newMessage], // Send only the new message
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response from server:", data); // Log the entire response
  
      // Fetch the last message from the thread
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
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };


  return (
    <div className="agent">
      <h2>AI Agent</h2>
      <Card>
        <Card.Body>
          <Card.Title>AI Agent</Card.Title>
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
            <Button variant="primary" type="submit" onClick={handleSend} className="inputSubmit">
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
