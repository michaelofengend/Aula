import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ClassCard from "./ClassCard";
import "./Recommendations.css";

const Recommendations = ({ setActiveTab }) => {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");

  const years = ["Incoming", "Transfer", "Freshman", "Sophomore", "Junior", "Senior"];
  const majors = ["Computer Science", "Biology", "Mathematics", "Psychology", "Economics", "Engineering"];

  const handleYearSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleMajorSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleNewRecommendations = () => {
    setActiveTab("AI_Agent");
  };

  const renderYearForm = () => (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>Select Your Year</Card.Title>
        <Form onSubmit={handleYearSubmit}>
          <Form.Group>
            <Form.Control as="select" value={year} onChange={(e) => setYear(e.target.value)} required>
              <option value="">Choose your year...</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Next
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderMajorForm = () => (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>Select Your Major</Card.Title>
        <Form onSubmit={handleMajorSubmit}>
          <Form.Group>
            <Form.Control as="select" value={major} onChange={(e) => setMajor(e.target.value)} required>
              <option value="">Choose your major...</option>
              {majors.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Get Recommendations
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderRecommendations = () => (
    <div>
      <h2>Recommended Classes for {year} {major} Students</h2>
      <Card>
        <Card.Body className="recommendations-grid">
          <ClassCard
            classNumber="CS 61A"
            classTitle="The Structure and Interpretation of Computer Programs"
            classTime="MWF 10-11am"
            professorName="John DeNero"
            professorRating="4.5"
            professorDifficulty="3.0"
            overallRating="4.5"
          />
          <ClassCard
            classNumber="MATH 54"
            classTitle="Linear Algebra and Differential Equations"
            classTime="TTh 2-3:30pm"
            professorName="Jane Smith"
            professorRating="4.2"
            professorDifficulty="3.5"
            overallRating="4.0"
          />
          <ClassCard
            classNumber="EECS 16A"
            classTitle="Designing Information Devices and Systems I"
            classTime="MWF 1-2pm"
            professorName="Anant Sahai"
            professorRating="4.0"
            professorDifficulty="4.0"
            overallRating="3.8"
          />
        </Card.Body>
        <Button className="recommendation-button" onClick={handleNewRecommendations}>
          New Recommendations
        </Button>
      </Card>
    </div>
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          {step === 1 && renderYearForm()}
          {step === 2 && renderMajorForm()}
          {step === 3 && renderRecommendations()}
        </Col>
      </Row>
    </Container>
  );
};

export default Recommendations;