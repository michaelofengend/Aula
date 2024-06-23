import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classNumber, classTitle, classTime, professorName, professorRating, overallRating }) => {
  return (
    <div className="class-card">
      <h2 className="class-number">{classNumber}</h2>
      <h3 className="class-title">{classTitle}</h3>
      <p className="class-time">{classTime}</p>
      <div className="professor-info">
        <p className="professor-name">Prof. {professorName}</p>
        <p className="professor-rating">Rating: {professorRating === "N/A" ? "N/A" : `${professorRating}/5`}</p>
      </div>
      <button className="overall-rating-button">
      Overall Rating: {overallRating === "N/A" ? "N/A" : `${overallRating}/5`}
    </button>
    </div>
  );
};

export default ClassCard;