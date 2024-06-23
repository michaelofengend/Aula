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
  // const [subject, setSubject] = useState("");
  // const [recommendations, setRecommendations] = useState([]);
  const [input, setInput] = useState('')// User input
  // const [loading, setLoading] = useState(false)// Loading state
  // const [promptTokens, setPromptTokens] = useState(0)
  // const [completionTokens, setCompletionTokens] = useState(0)
  // const [totalTokens, setTotalTokens] = useState(0)
  // const [threadId, setThreadId] = useState(undefined)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const messages = localStorage.getItem('messages')
    if (messages) {
      setMessages(JSON.parse(messages))
    }
  }, [])
  const resetChat = () => {
    setMessages([])
    localStorage.removeItem('messages')
  };
  

   const handleSend = async () => {
    setMessages((prevMessages) => [...prevMessages, { type: 'user', message: input }]);
    localStorage.setItem('messages', JSON.stringify([...messages, { type: 'user', message: input }]));
    setInput('');
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
              Ask
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
