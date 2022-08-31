import React, { createContext, useState, useEffect } from "react";
import LazyFetch from "./requests/LazyFetch";

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

  // useEffect(() => {
  //   LazyFetch({
  //     type: "get",
  //     endpoint: "/api/user/me",
  //     onSuccess: (data) => {console.debug(`[DEBUG] - ${JSON.stringify(data)}`);},
  //     onFailure: (err) => {console.error(`[ERROR] - ${err}`);},
  //   })
  // }, []);

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
