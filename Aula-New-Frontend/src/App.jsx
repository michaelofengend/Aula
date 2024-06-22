import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

import CourseMap from "./components/CourseMap";

const CatalogSearch = () => (
  <div>
    <h2>Catalog Search</h2>
    <Form>
      <Form.Group controlId="searchQuery">
        <Form.Control type="text" placeholder="Search courses" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  </div>
);

const Preferences = () => (
  <div>
    <h2>Preferences</h2>
    <Form>
      <Form.Group controlId="campusPreference">
        <Form.Label>Preferred Campus</Form.Label>
        <Form.Control as="select">
          <option>Time slots: Late afternoon</option>
          <option>Satisfies Major requirements</option>
          <option>Online</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Preferences
      </Button>
    </Form>
  </div>
);

const Reviews = () => (
  <div>
    <h2>Reviews</h2>
    <Card>
      <Card.Body>
        <Card.Title>Course Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Professor Name
        </Card.Subtitle>
        <Card.Text>Course review goes here...</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

const AverageGrades = () => (
  <div>
    <h2>Average Grades</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course</th>
          <th>Average Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Course 1</td>
          <td>A-</td>
        </tr>
        <tr>
          <td>Course 2</td>
          <td>B+</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

const WaitlistProbability = () => (
  <div>
    <h2>Waitlist Probability</h2>
    <ListGroup>
      <ListGroup.Item>Course 1: 80%</ListGroup.Item>
      <ListGroup.Item>Course 2: 50%</ListGroup.Item>
    </ListGroup>
  </div>
);

const RecommendationAlgorithm = () => (
  <div>
    <h2>Recommendation Algorithm</h2>
    <Card>
      <Card.Body>
        <Card.Title>Recommended Courses</Card.Title>
        <ListGroup>
          <ListGroup.Item>CS 189 spring version for ML route </ListGroup.Item>
          <ListGroup.Item>Music 20 for music theory</ListGroup.Item>
          <ListGroup.Item>Math 110 as intro to Math upper divs</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </div>
);

const ConnectWithAlumni = () => (
  <div>
    <h2>Connect with Alumni</h2>
    <Card>
      <Card.Body>
        <Card.Title>Alumni Network</Card.Title>
        <Form>
          <Form.Group controlId="alumniSearch">
            <Form.Control type="text" placeholder="Search alumni" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);
const AI_Agent = () => (
  <div>
    <h2>AI Agent</h2>
    <Card>
      <Card.Body>
        <Card.Title>AI Agent</Card.Title>
        <Form>
          <Form.Group controlId="alumniSearch">
            <Form.Control type="text" placeholder="Ask me anything" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ask
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);

const StudentForum = () => (
  <div>
    <h2>Student Forum</h2>
    <div className="forum-section">
      <h3>Welcome to the Student Forum</h3>
      <p>
        Discuss courses, share experiences, and connect with fellow students.
      </p>
      <Button variant="primary">Join the Discussion</Button>
    </div>
  </div>
);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  async function runPythonScript(data) {
    const response = await fetch("http://localhost:5001/run-python", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log(result);
    return result;
  }

  useEffect(() => {
    runPythonScript("Hello, Python!").then((result) => {
      setData(result.split("\n"));
    });
  }, []);

  return (
    <Router>
      <div className="v10_3">
        <Navbar bg="light" expand="lg" className="v10_4">
          <Navbar.Brand className="v10_76">BConnected</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/login" className="v10_21">
                Welcome Michael Ofengenden
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <h1 className="v10_22">AULA</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs defaultActiveKey="search">
                <Tab eventKey="search" title="Catalog Search">
                  <CatalogSearch />
                </Tab>
                <Tab eventKey="courseMap" title="Course Map">
                  <CourseMap />
                </Tab>
                <Tab eventKey="preferences" title="Preferences">
                  <Preferences />
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Reviews />
                </Tab>
                <Tab eventKey="grades" title="Average Grades">
                  <AverageGrades />
                </Tab>
                <Tab eventKey="waitlist" title="Waitlist Probability">
                  <WaitlistProbability />
                </Tab>
                <Tab eventKey="recommendations" title="Recommendations">
                  <RecommendationAlgorithm />
                </Tab>
                <Tab eventKey="alumni" title="Connect with Alumni">
                  <ConnectWithAlumni />
                </Tab>
                <Tab eventKey="AI_Agent" title="AI Agent">
                  <AI_Agent />
                </Tab>
                <Tab eventKey="forum" title="Student Forum">
                  <StudentForum />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
        <Container>
          <h1>Data from the Backend:</h1>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Container>
      </div>
    </Router>
  );
};
export default App;
