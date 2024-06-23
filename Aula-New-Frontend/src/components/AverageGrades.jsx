import React, { useState } from "react";
import "./AverageGrades.css";
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
const AverageGrades = () => {
  return (
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
};

export default AverageGrades;
