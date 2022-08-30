import React, {useContext, useEffect} from 'react';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  useEffect(() => {
    
  });

  return (
    <div>
      <h1>HOME</h1>
      <a href="/app/login">Login</a>
    </div>
  );
};

export default Home;