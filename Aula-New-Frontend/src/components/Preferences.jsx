import React, { useState } from "react";
import "./Preferences.css";
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
const Preferences = () => {
  return (
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
};

export default Preferences;
