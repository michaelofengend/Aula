import React, { useState } from "react";
import "./Recommendations.css";
import ClassCard from "./ClassCard";
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
const Recommendations = ({setActiveTab}) => {

  const handleNewRecommendations = () => {
    setActiveTab("AI_Agent");
  };

  return (
    <div>
      <h2>Recommendation Algorithm</h2>
      <Card>
        <Card.Body className="recommendations-grid">
          {/* {filteredData.map((row, index) => (
          <div key={index}> */}
            <ClassCard
              classNumber="CS 61A"
              classTitle="The Structure and Interpretation of Computer Programs"
              classTime="MWF 10-11am"
              professorName="John DeNero"
              professorRating="4.5"
              professorDifficulty="3.0"
              overallRating="4.5"
            />
            <ClassCard
              classNumber="CS 61A"
              classTitle="The Structure and Interpretation of Computer Programs"
              classTime="MWF 10-11am"
              professorName="John DeNero"
              professorRating="4.5"
              professorDifficulty="3.0"
              overallRating="4.5"
            />
            <ClassCard
              classNumber="CS 61A"
              classTitle="The Structure and Interpretation of Computer Programs"
              classTime="MWF 10-11am"
              professorName="John DeNero"
              professorRating="4.5"
              professorDifficulty="3.0"
              overallRating="4.5"
            />
          {/* </div>
        ))} */}
        </Card.Body>
        <Button className="recommendation-button" onClick={handleNewRecommendations}>
          New Recommendations
          </Button>
      </Card>
      
    </div>
  );
};

export default Recommendations;
