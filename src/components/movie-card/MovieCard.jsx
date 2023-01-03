import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
        <Link to={`/movies/${movieData._id}`}>
          <Button variant="info">See More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
export default MovieCard;
