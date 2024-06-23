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
          <Form.Control type="text" placeholder="Search courses" />
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
            professorRating={professorMap[row["Instructor"]]|| "N/A"}
            professorDifficulty={professorMap[row["Instructor"]] || "N/A"}
            overallRating={professorMap[row["Instructor"]] || "N/A"}
          />
          </div>
        ))}
        </div>
        <div>
          <h2>Testing</h2>
          {professorMap.forEach((value, key) => {
            <p>{value}</p>
          })}
        </div>
        {/* <div>
          <h2>Professor Ratings</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Professor</th>
                <th>Rating</th>
                <th>Difficulty</th>
                <th>Would Take Again</th>
              </tr>
            </thead>
            <tbody>
              {csvProfessorData.map((row, index) => (
                <tr key={index}>
                  <td>{row["Name"]}</td>
                  <td>{row["Rating"]}</td>
                  <td>{row["Difficulty"]}</td>
                  <td>{row["Would Take Again"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div> */}
    </div>
  );
};

export default CatalogSearch;
