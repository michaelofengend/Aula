import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classNumber, classTitle, classTime, professorName, professorRating, professorDifficulty, overallRating }) => {
  return (
    <div className="class-card">
      <h2 className="class-number">{classNumber}</h2>
      <h3 className="class-title">{classTitle}</h3>
      <p className="class-time">{classTime}</p>
      <div className="professor-info">
        <p className="professor-name">Prof. {professorName}</p>
        <p className="professor-rating">Rating: {professorRating === "N/A" ? "N/A" : `${professorRating}/5.0`}</p>
        <p className="professor-difficulty">Difficulty: {professorDifficulty === "N/A" ? "N/A" : `${professorDifficulty}/5.0`}</p>
      </div>
      <button className="overall-rating-button">
      Would Take Again: {overallRating === "N/A" ? "N/A" : `${overallRating}`}
    </button>
    </div>
  );
};

export default ClassCard;