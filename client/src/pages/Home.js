import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  const handleLogout = (event) => {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!user) {
      let localUser = localStorage.getItem("user");
      console.debug(`[DEBUG] - <Home>: localUser = `, localUser);
      setUser(JSON.parse(localUser));
    }
  });

  return (
    <div>
      <h1>HOME</h1>
      {user == null ? (<Link to={`/login`}>Login</Link>) : (<button onClick={handleLogout}>Logout</button>)}
      {user == null ? (<Link to={`/register`}>Register</Link>) : (<></>)}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      
      
    </div>
  );
};

export default Home;