import React, { useEffect, useContext } from "react";
import { UserContext } from "../components/common/providers";
import { Footer, CatalogEditor } from "../components";

const UserProfile = (props) => {
  const user = useContext(UserContext);

  return (
    <>
      <h1>{user ? user.username : <></>}</h1>
      <CatalogEditor />
      <Footer />
    </>
  );
};

export default UserProfile;
