import React, { useState } from "react";
import "./WaitlistProbability.css";
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
const WaitlistProbability = () => {
  return (
    <div>
      <h2>Waitlist Probability</h2>
      <ListGroup>
        <ListGroup.Item>Course 1: 80%</ListGroup.Item>
        <ListGroup.Item>Course 2: 50%</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default WaitlistProbability;
