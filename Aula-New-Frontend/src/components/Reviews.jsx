import React, { useState } from "react";
import "./Reviews.css";
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

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      username: "@johndoe",
      review:
        "Great course! Learned a lot and the professor was very helpful.",
      rating: 5,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "@janesmith",
      review: "Interesting course, but could use more practical examples.",
      rating: 4,
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <Card key={review.id} className="review-card">
            <Card.Body>
              <div className="review-header">
                <img
                  src={review.image}
                  alt={review.name}
                  className="review-image"
                />
                <div className="review-info">
                  <Card.Title>{review.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {review.username}
                  </Card.Subtitle>
                </div>
              </div>
              <Card.Text>{review.review}</Card.Text>
              <div className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
