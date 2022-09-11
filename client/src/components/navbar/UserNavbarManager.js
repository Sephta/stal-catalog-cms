import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext, UserDispatchContext } from '../common/UserProvider';

const UserNavbarManager = ({setCollections, ...props}) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  const handleLogout = (event) => {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!user) {
      let localUser = localStorage.getItem("user");
      if (localUser) {
        console.debug(`[DEBUG] - <Home>: localUser = `, JSON.parse(localUser));
        setUser(JSON.parse(localUser));
      }
    }
  }, [user]);

  const generateUserArea = (user) => {
    let result = user ? (
      <UserArea>
        <UserIcon />
        {user ? (<p>{user.username}</p>) : (<p>{`Name`}</p>)}
      </UserArea>
    ) : (
      <UserArea></UserArea>
    );
    return result;
  }

  return (
    <>
      <Wrapper>
        {generateUserArea(user)}
        <LoginLogoutWrapper>
          {user == null ? (<Link to={`/register`}>Register</Link>) : (<></>)}
          {user == null ? (<Link to={`/login`}>Login</Link>) : (<button onClick={handleLogout}>Logout</button>)}
        </LoginLogoutWrapper>
      </Wrapper>
    </>
  );
};

export default UserNavbarManager;

UserNavbarManager.propTypes = {
  setCollections: PropTypes.func,
}

const Wrapper = styled.div`
  width: 20em;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

const UserArea = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--highlight-03);

  /* border: 1px solid red; */
  border-radius: 0 0 1em 1em;

  box-shadow: 0 0.25em 1em rgb(18, 18, 18, 0.15);

  cursor: pointer;
`;

const UserIcon = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin: 0 0.5em;

  background-color: var(--contrast-01);
`;

const LoginLogoutWrapper = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  /** selects all children */
  > * {
    width: 4.5em;
    height: 1.5em;

    margin: 0 0.5em;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--highlight-01);

    border-radius: 0.25em;
    border: none;

    color: var(--off-black);
    font-size: small;
    text-decoration: none;

    /* :link {
      color: var(--off-black);
    }

    :visited {
      color: var(--off-black);
    } */

    :hover {
      cursor: pointer;
      box-shadow: 0 0.0625em 0.25em rgba(18, 18, 18, 0.15);
    }
  }
`;

