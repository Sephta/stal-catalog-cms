import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import { 
  UserContext, 
  UserDispatchContext, 
  CollectionContext 
} from '../components/common/providers';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

const Home = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);
  const collection = useContext(CollectionContext);

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
        <br />
        <h1>Collection data:</h1>
        <pre>{JSON.stringify(collection, null, 2)}</pre>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  height: auto;
  padding: 1em;

  > pre {
    /* border: 1px solid red; */
    overflow: hidden;
    padding: 1em;
  }
`;
