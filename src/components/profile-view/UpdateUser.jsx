import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

const UpdateUser = ({ user, onUpdateProfile }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(storedUser.Username);
  const [password, setPassword] = useState(storedUser.Password);
  const [email, setEmail] = useState(storedUser.Email);
  const [birthday, setBirthday] = useState(storedUser.Birthday);
  const handleUpdate = (event) => {
    event.preventDefault();
    const updateData = {
      Username: username ? username : storedUser.Username,
      Password: password ? password : storedUser.Password,
      Email: email ? email : storedUser.Email,
      Birthday: birthday ? birthday : storedUser.Birthday,
    };
    fetch("https://myflix-angelo.cyclic.app/users/" + user.Username, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      response.json();
      console.log(response);
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Update your Profile:</Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label> Username: </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Please enter your Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label> Password: </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Your Password must be at least  8 characters"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="yourEmail@gmail.com"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label> Birthday: </Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder="YYYY-MM-DD"
                    />
                  </Form.Group>

                  <Button variant="info" type="submit" onClick={handleUpdate}>
                    Update
                  </Button>
                </Form>
                <div>
                  Back To Profile
                  <Link to={`/profile/`}>
                    <Button variant="secondary">Back</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;
