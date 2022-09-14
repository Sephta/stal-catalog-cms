import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "./providers";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
  const user = useContext(UserContext);

  return user ? children : <Navigate to={`/login`} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.any,
};
