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
    { id: 1, name: "John Doe", username: "@johndoe", review: "Great course! Learned a lot and the professor was very helpful.", rating: 5 },
    { id: 2, name: "Jane Smith", username: "@janesmith", review: "Interesting course, but could use more practical examples.", rating: 4 },
    { id: 3, name: "Bob Johnson", username: "@bobjohnson", review: "Loved the course material and the interactive sessions.", rating: 5 },
    { id: 4, name: "Alice Brown", username: "@alicebrown", review: "Good course, but it was a bit too fast-paced for me.", rating: 3 },
    { id: 5, name: "Charlie Davis", username: "@charliedavis", review: "The content was well-structured and easy to follow.", rating: 4 },
    { id: 6, name: "Diana Ross", username: "@dianaross", review: "Helpful instructors and engaging content.", rating: 5 },
    { id: 7, name: "Eve Torres", username: "@evetorres", review: "A bit challenging, but overall a great experience.", rating: 3 },
    { id: 8, name: "Frank White", username: "@frankwhite", review: "The assignments were very practical and useful.", rating: 4 },
  ];

  const [expandedReview, setExpandedReview] = useState(null);

  const toggleReview = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <Container className="reviews-container">
      <h2>Reviews</h2>
      <Row className="reviews-list">
        {reviews.map((review) => (
          <Col key={review.id} sm={12} md={6} lg={4} className={`review-col ${expandedReview === review.id ? 'expanded' : ''}`}>
            <Card className="review-card">
              <Card.Body>
                <div className="review-header">
                  <div className="review-info">
                    <Card.Title>{review.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.username}</Card.Subtitle>
                  </div>
                </div>
                <Card.Text className={`review-text ${expandedReview === review.id ? 'expanded' : ''}`}>
                  {review.review}
                </Card.Text>
                <div className={`review-rating rating-${review.rating}`}>
                  {"★".repeat(review.rating)}
                </div>
                <Button variant="link" onClick={() => toggleReview(review.id)}>
                  {expandedReview === review.id ? 'Show Less' : 'Read More'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Reviews;