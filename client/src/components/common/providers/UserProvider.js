import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import LazyFetch from "../requests/LazyFetch";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

/** UserProvider
 * Creates a user data DOM to get information about the user.
 *
 * @param {node} children Uncertain what this actually does... TODO: figure that out?
 * @returns UserContext DOM to interface with user related data.
 */
const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
}

export { UserProvider, UserContext, UserDispatchContext };
