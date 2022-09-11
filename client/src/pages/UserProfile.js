import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/common/UserProvider';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {
  const user = useContext(UserContext);

  return user ? (
    <>
      <h1>{user.username}</h1>
      <Link to={`/`}>Return</Link>
    </>
  ) : <></>;
};

export default UserProfile;