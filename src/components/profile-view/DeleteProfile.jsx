import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const DeleteProfile = ({ user, token, onLoggedOut }) => {
  const deleteUser = async () => {
    const body = {
      Username: user.Username,
      Password: user.Password,
    };
    try {
      const res = await fetch(
        `https://myflix-angelo.cyclic.app/users/${user.Username}/deregister`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            body: JSON.stringify(body),
          },
        }
      );
      const deregister = await res.json();
      if (res.ok) {
        alert("Account has been Deleted");
        onLoggedOut;
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
      onLoggedOut;
      console.log(error);
    }
  };
  return (
    <>
      <h2> Are you sure you want to Delete your Account?</h2>
      <Button onClick={deleteUser} variant="danger">
        DELETE
      </Button>
      <div>
        Back To Profile
        <Link to={`/profile/`}>
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    </>
  );
};

export default DeleteProfile;
