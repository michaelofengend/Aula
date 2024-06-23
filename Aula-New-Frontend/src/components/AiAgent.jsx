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
  setMessages((prevMessages) => [...prevMessages, { type: 'user', message: input }]);
  localStorage.setItem('messages', JSON.stringify([...messages, { type: 'user', message: input }]));
  setInput('');
  setLoading(true);
  try{
    const response = await fetch('http://localhost:5001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId: threadId,
        messages: messages,
      }),
    });
    console.log(response);
    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, { type: 'assistant', message: data.run.data[0].content[0].text.value }]);
    localStorage.setItem('messages', JSON.stringify([...messages, { type: 'assistant', message: data.run.data[0].content[0].text.value }]));
    setLoading(false);
  } catch (error) {
    console.error('Error Sending the Chat Message:', error);
    setMessages((prevMessages) => [...prevMessages, { type: 'assistant', message: 'Sorry, I have encountered a problem' }]);
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
                <p key={index}>{message.message}</p>
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
