import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [csvData, setCsvData] = useState([]);
  const [csvProfessorData, setCsvProfessorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/classes')
      .then(response => response.json())
      .then(data => setCsvData(data))
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/professors')
      .then(response => response.json())
      .then(data => setCsvProfessorData(data))
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);
  
  const professorMap = new Map(csvProfessorData.map(prof => [prof["Name"], prof]));

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
    // Reset the form and go back to the first step
    setStep(1);
    setYear("");
    setMajor("");
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

  const majorToCoursePrefix = {
    "Computer Science": "compsci",
    "Biology": "bio",
    "Mathematics": "math",
    "Psychology": "psych",
    "Economics": "econ",
    "Engineering": "engin"
  };

  const handleAIAgentClick = (recommendedClasses) => {
    const classInfo = recommendedClasses.map(course => ({
      classNumber: course["Course Code"],
      classTitle: course["Title"],
      professorName: course["Instructor"]
    }));
  
    const message = `Can you tell me more about these classes: ${classInfo.map(c => c.classTitle).join(', ')}?`;
    
    // Instead of using localStorage, we'll pass the message as a state parameter
    setActiveTab("AI_Agent");
    navigate("/", {state: {aiAgentMessage: message}});
  };

  const getRecommendedClasses = () => {
    const coursePrefix = majorToCoursePrefix[major] || major.toLowerCase();
    
    return csvData.filter(course => {
      const courseCode = course["Course Code"].toLowerCase();
      return courseCode.startsWith(coursePrefix);
    }).slice(0, 5); // Return top 5 matches
  };

  const renderRecommendations = () => {
    const recommendedClasses = getRecommendedClasses();
    
    if (recommendedClasses.length === 0) {
      return (
        <Alert variant="info">
          No classes found for {year} {major} students. Try a different major or year.
        </Alert>
      );
    }
    return (
      <div>
        <h2>Recommended Classes for {year} {major} Students</h2>
        <div className="class-card-grid">
          {recommendedClasses.map((course, index) => (
            <ClassCard
              key={index}
              classNumber={course["Course Code"]}
              classTitle={course["Title"]}
              classTime={`${course["Days"]} ${course["Time"]}`}
              professorName={course["Instructor"]}
              professorRating={professorMap.get(course["Instructor"])?.Rating || "N/A"}
              professorDifficulty={professorMap.get(course["Instructor"])?.Difficulty || "N/A"}
              overallRating={professorMap.get(course["Instructor"])?.["Would Take Again"] || "N/A"}
              onReviewClick={() => {}} // You may want to implement this function
            />
          ))}
        </div>
        <Button className="recommendation-button" onClick={handleNewRecommendations}>
          New Recommendations
        </Button>
        <Button className="ai-agent-button" onClick={() => handleAIAgentClick(recommendedClasses)}>
            Ask AI Agent About These Classes
          </Button>
      </div>
    );
  };

  return (
    <div className="main">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={8}>
            {step === 1 && renderYearForm()}
            {step === 2 && renderMajorForm()}
            {step === 3 && renderRecommendations()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Recommendations;
