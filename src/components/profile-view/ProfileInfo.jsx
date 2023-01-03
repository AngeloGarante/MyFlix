import React from "react";

const ProfileInfo = ({ userInfo }) => {
  return (
    <>
      <div> Username: {userInfo.Username}</div>
      <div>Birthday: {userInfo.Birthday}</div>
      <div> Email: {userInfo.Email}</div>
    </>
  );
};

export default ProfileInfo;
