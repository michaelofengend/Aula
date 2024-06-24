// ClassCard.jsx
import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classNumber, classTitle, classTime, professorName, professorRating, professorDifficulty, overallRating, onReviewClick}) => {
  const getRatingColor = (rating, isRating = true) => {
    if (rating === "N/A") return "";
    const numRating = parseFloat(rating);
    if (isRating) {
      if (numRating > 4) return "rating-green";
      if (numRating > 3.5) return "rating-light-green";
      if (numRating > 3) return "rating-yellow";
      if (numRating > 2) return "rating-orange";
      if (numRating <= 1) return "rating-red";
    } else {
      if (numRating > 4) return "rating-red";
      if (numRating > 3.5) return "rating-orange";
      if (numRating > 3) return "rating-yellow";
      if (numRating > 2) return "rating-light-green";
      if (numRating <= 1) return "rating-green";
    }
    return "";
  };

  return (
    <div className="class-card">
      <h2 className="class-number">{classNumber}</h2>
      <h3 className="class-title">{classTitle}</h3>
      <p className="class-time">{classTime}</p>
      <div className="professor-info">
        <p className="professor-name">Prof. {professorName}</p>
        <div className="ratings-container">
          <p className={`professor-rating ${getRatingColor(professorRating, true)}`}>
            Rating: {professorRating === "N/A" ? "N/A" : `${professorRating}/5.0`}
          </p>
          <p className={`professor-difficulty ${getRatingColor(professorDifficulty, false)}`}>
            Difficulty: {professorDifficulty === "N/A" ? "N/A" : `${professorDifficulty}/5.0`}
          </p>
        </div>
      </div>
      <button className="overall-rating-button" onClick={() => onReviewClick(professorName)}>
        Would Take Again: {overallRating === "N/A" ? "N/A" : `${overallRating}`}
      </button>
    </div>
  );
};

export default ClassCard;