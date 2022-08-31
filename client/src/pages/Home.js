import React, {useContext, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  useEffect(() => {
    console.debug(`[DEBUG] - <Home>: `, user);
  }, [user]);

  return (
    <div>
      <h1>HOME</h1>
      {user == null ? (<a href="/app/login">Login</a>) : (<a href={`${process.env.REACT_APP_SERVER_URL}/api/oauth/signout`}>Logout</a>)}
      {user == null ? (<a href="/app/register">Register</a>) : (<></>)}
      <p>{JSON.stringify(user)}</p>
      
      
    </div>
  );
};

export default Home;