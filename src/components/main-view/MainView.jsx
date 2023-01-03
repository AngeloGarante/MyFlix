import React, { useEffect } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import components
import MovieCard from "../movie-card/MovieCard";
import MovieView from "../movie-view/MovieView";
import LoginView from "../login-view/LoginView";
import SignUpView from "../signup-view/SignUpView";
import NavBar from "../navigation-bar/NavBar";
import ProfileView from "../profile-view/ProfileView";
import UpdateUser from "../profile-view/UpdateUser";
import ErrorView from "../error-view/ErrorView";
import DeleteProfile from "../profile-view/DeleteProfile";
//component
const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-angelo.cyclic.app/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={8}>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={8}>The list is empty</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movieData={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={8}>The list is empty</Col>
                ) : (
                  <Col md={8}>
                    <ProfileView
                      userData={user}
                      token={storedToken}
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/profile/:UserName"
            element={
              <UpdateUser
                user={user}
                token={token}
                onUpdateProfile={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            }
          />
          <Route
            path="/profile/:UserName/deregister"
            element={
              <DeleteProfile
                user={user}
                token={token}
                onLoggedOut={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              />
            }
          />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
