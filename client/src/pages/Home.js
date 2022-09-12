import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  useEffect(() => {
    if (!user) {
      let localUser = localStorage.getItem("user");
      if (localUser) {
        // console.debug(`[DEBUG] - <Home>: localUser = `, JSON.parse(localUser));
        setUser(JSON.parse(localUser));
      }
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>User data:</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1em;

  > pre {
    overflow: hidden;
  }
`;
