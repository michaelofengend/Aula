import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import CatalogSearch from "./components/CatalogSearch";
import CourseMap from "./components/CourseMap";
import Reviews from "./components/Reviews";
import Recommendations from "./components/Recommendations";
import AI_Agent from "./components/AiAgent";
import StudentForum from "./components/StudentForum";

const App = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand className="mr-auto">AULA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Item>Welcome Michael Ofengenden</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="main-container">
          <Row>
            <Col>
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Tab eventKey="search" title="Catalog Search">
                  <CatalogSearch setActiveTab={setActiveTab} />
                </Tab>
                <Tab eventKey="courseMap" title="Course Map">
                  <CourseMap />
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <Reviews />
                </Tab>
                <Tab eventKey="recommendations" title="Recommendations">
                  <Recommendations setActiveTab={setActiveTab} />
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
      </div>
    </Router>
  );
};

export default App;