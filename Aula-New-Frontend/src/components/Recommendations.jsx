import React, { useState } from "react";
import "./Recommendations.css";
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
const Recommendations = () => {
  return (
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
};

export default Recommendations;
