import React, { useState } from "react";
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
  const [subject, setSubject] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/recommend?subject=${subject}`);
    const data = await response.json();
    setRecommendations(data);
  };

  return (
    <div className="agent">
      <h2>AI Agent</h2>
      <Card>
        <Card.Body>
          <Card.Title>AI Agent</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="subject">
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ask me anything"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ask
            </Button>
          </Form>
          <div>
            {recommendations.length > 0 && (
              <Card>
                <Card.Body>
                  <Card.Title>Recommended Courses</Card.Title>
                  <ListGroup>
                    {recommendations.map((course, index) => (
                      <ListGroup.Item key={index}>
                        {course.courseName} - {course.professorName}
                        <br />
                        Class Rating: {course.classRating}
                        <br />
                        Professor Rating: {course.professorRating}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AI_Agent;
