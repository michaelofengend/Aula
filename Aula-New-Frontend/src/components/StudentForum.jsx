import React, { useState } from "react";
import './StudentForum.css'
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

const StudentForum = () => {
  return (
    <div className="student-forum-container">
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
};

export default StudentForum;
