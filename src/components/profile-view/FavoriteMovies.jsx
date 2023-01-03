import React from "react";
import MovieCard from "../movie-card/MovieCard";
import Col from "react-bootstrap/Col";
import { Button, Row } from "react-bootstrap";

const FavoriteMovies = ({ favoriteMoviesList, movies, removeFavorite }) => {
  const displayFavorite = [];
  let movieSearch = favoriteMoviesList.forEach((i) => {
    movies.filter((movie) => {
      if (movie._id === i) {
        displayFavorite.push(movie);
        return displayFavorite;
      }
    });
  });

  return (
    <>
      <Row className="justify-content-md-center">
        {displayFavorite.map((movie) => (
          <Col className="mb-5" key={movie._id} md={3}>
            <Button onClick={() => removeFavorite(movie._id)}>
              Remove Favorite
            </Button>
            <MovieCard movieData={movie} key={movie._id} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FavoriteMovies;
