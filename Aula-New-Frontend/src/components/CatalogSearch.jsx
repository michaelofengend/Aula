import React, { useState } from "react";
import "./CatalogSearch.css";
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
const CatalogSearch = () => {
  return (
    <div className="main">
      <h2>Catalog Search</h2>
      <Form>
        <Form.Group controlId="searchQuery" className="form">
          <Form.Control type="text" placeholder="Search courses" />
        </Form.Group>
        <Button variant="primary" type="submit" className="search">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default CatalogSearch;
