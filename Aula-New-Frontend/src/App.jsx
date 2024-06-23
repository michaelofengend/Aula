import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
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
import CatalogSearch from "./components/CatalogSearch";
import CourseMap from "./components/CourseMap";
import Reviews from "./components/Reviews";
import Recommendations from "./components/Recommendations";
import AI_Agent from "./components/AiAgent";
import StudentForum from "./components/StudentForum";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
      <div>
        <Navbar bg="light" expand="lg" className="navbar">
          <Navbar.Brand>BConnected</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/login">Welcome Michael Ofengenden</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <div className="aula">
                <h1>AULA</h1>
              </div>
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
                <Tab eventKey="reviews" title="Reviews">
                  <Reviews />
                </Tab>
                <Tab eventKey="recommendations" title="Recommendations">
                  <Recommendations />
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
