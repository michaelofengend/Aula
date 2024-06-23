import React, { useState } from "react";
import "./ConnectWithAlumni.css";
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
const ConnectWithAlumni = () => {
  return (
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
};

export default ConnectWithAlumni;
