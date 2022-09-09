import React, {useContext, useEffect} from 'react';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  const handleLogout = (event) => {
    setUser(null);
    localStorage.clear();
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
      {user == null ? (<a href={`/login`}>Login</a>) : (<button onClick={handleLogout}>Logout</button>)}
      {user == null ? (<a href={`/register`}>Register</a>) : (<></>)}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      
      
    </div>
  );
};

export default Home;