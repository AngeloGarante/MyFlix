import React from "react";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import FavoriteMovies from "./FavoriteMovies";
const ProfileView = ({ token, userData, movies }) => {
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
    <>
      <ProfileInfo userInfo={user} />
      <div>
        Change info
        <Link to={`/profile/${user.Username}`}>
          <Button variant="link">Update</Button>
        </Link>
      </div>
      <div>
        DELETE PROFILE
        <Link to={`/profile/${user.Username}/deregister`}>
          <Button variant="link">Delete</Button>
        </Link>
        <div>
          <FavoriteMovies
            favoriteMoviesList={user.FavoriteMovies}
            movies={movies}
            removeFavorite={removeFavorite}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileView;
