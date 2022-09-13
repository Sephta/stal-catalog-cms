import React from "react";
import { useContext } from "react";
import { UserContext } from "../components/common/providers";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";

const UserProfile = (props) => {
  const user = useContext(UserContext);

  return user ? (
    <>
      <h1>{user.username}</h1>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default UserProfile;
