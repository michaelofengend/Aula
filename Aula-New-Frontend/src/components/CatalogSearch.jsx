import React, { useState, useEffect } from "react";
import "./CatalogSearch.css";
import ClassCard from './ClassCard';
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

  const [csvData, setCsvData] = useState([]);
  const [csvProfessorData, setCsvProfessorData] = useState([]);
  


  useEffect(() => {
    fetch('http://localhost:5001/classes')
      .then(response => response.json())
      .then(data => setCsvData(data))
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/professors')
      .then(response => response.json())
      .then(data => setCsvProfessorData(data))
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);
  
  const professorMap = new Map(csvProfessorData.map(prof => [prof["Name"], prof]));
  console.log(professorMap);
  return (
    <div className="main">
      <h2>Catalog Search</h2>
      <Form>
        <Form.Group controlId="searchQuery" className="form">
          <Form.Control type="text" placeholder="Search courses" className="form-input"/>
        </Form.Group>
        <Button variant="primary" type="submit" className="search">
          Search
        </Button>
      </Form>
      <h2>Search Results</h2>
      <div className="class-card-grid">
        {csvData.map((row, index) => (
          
          <div key={index}>
            <ClassCard
  classNumber={row["Course Code"]}
  classTitle={row["Title"]}
  classTime={`${row["Days"]} ${row["Time"]}`}
  professorName={row["Instructor"]}
  professorRating={professorMap.get(row["Instructor"])?.Rating || "N/A"}
  professorDifficulty={professorMap.get(row["Instructor"])?.Difficulty || "N/A"}
  overallRating={professorMap.get(row["Instructor"])?.["Would Take Again"] || "N/A"}
/>
          </div>
        ))}
        </div>

    </div>
  );
};

export default CatalogSearch;
