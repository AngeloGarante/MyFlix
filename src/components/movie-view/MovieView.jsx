import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";

const MovieView = ({ movies, user }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => {
    if (movie._id === movieId) {
      return movie;
    }
  });
  const handleFavorite = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const addMovie = {
      MovieId: movie._id,
    };
    if (!user.FavoriteMovies.includes(movie._id)) {
      fetch(
        `https://myflix-angelo.cyclic.app/users/${user.Username}/favorite/${movie._id}`,
        {
          method: "PUT",
          body: JSON.stringify(addMovie),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((response) => {
        response.json();
        if (response.ok) {
          alert("Movie added");
        }
      });
    } else {
      alert("Movie already listed!");
    }
  };
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director Name: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <Button onClick={handleFavorite} size="sm">
          Add Favorite
        </Button>
      </div>
      <Link to={"/"}>
        <Button size="sm">Back</Button>
      </Link>
      <Link to={"/profile"}>
        <Button variant="link">Back to profile</Button>
      </Link>
    </div>
  );
};

export default MovieView;
