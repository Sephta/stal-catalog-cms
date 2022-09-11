import React, {useContext, useEffect} from 'react';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';
import Navbar from '../components/navbar/Navbar';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  useEffect(() => {
    if (!user) {
      let localUser = localStorage.getItem("user");
      if (localUser) {
        console.debug(`[DEBUG] - <Home>: localUser = `, JSON.parse(localUser));
        setUser(JSON.parse(localUser));
      }
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Home;