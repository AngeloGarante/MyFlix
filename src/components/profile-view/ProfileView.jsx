import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import FavoriteMovies from "./FavoriteMovies";
import { Col, Container, Figure, Row } from "react-bootstrap";
import "./profile-view.scss";

const ProfileView = ({ userData, movies }) => {
  token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [delId, setdelId] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://myflix-angelo.cyclic.app/users", {
          headers: { Authorization: `Bearer ${token}`, method: "GET" },
        });
        const userslist = await res.json();
        if (!res.ok) {
          return;
        } else {
          userslist.find((profile) => {
            if (
              profile.Username === userData.Username &&
              profile._id === userData._id
            ) {
              setUser(profile);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [user]);
  const removeFavorite = (delId) => {
    setdelId(delId);
    const token = localStorage.getItem("token");
    const removeMovie = {
      MovieId: delId,
    };
    fetch(
      `https://myflix-angelo.cyclic.app/users/${user.Username}/favorite/${delId}`,
      {
        method: "DELETE",
        body: JSON.stringify(removeMovie),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((response) => {
      response.json();
      if (response.ok) {
        alert("Movie Removed");
      }
    });
  };

  return (
    <Container className="profile-container">
      <Row>
        <Col xs={12} sm={4}>
          <ProfileInfo userInfo={user} />
        </Col>
        <Col>
          <span>Change info:</span>
          <Link to={`/profile/${user.Username}`}>
            <Button variant="secondary">Update</Button>
          </Link>
        </Col>
        <Col>
          DELETE PROFILE
          <Link to={`/profile/${user.Username}/deregister`}>
            <Button variant="secondary">Delete</Button>
          </Link>
        </Col>

        <FavoriteMovies
          favoriteMoviesList={user.FavoriteMovies}
          movies={movies}
          removeFavorite={removeFavorite}
        />
      </Row>
    </Container>
  );
};

export default ProfileView;
