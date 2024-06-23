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

      </div>
    </Router>
  );
};

export default App;
