import React from 'react';

const Login = (props) => {
  return (
    <div>
      <h1>LOGIN</h1>
      <p><a href={`${process.env.REACT_APP_SERVER_URL + "/api/oauth/github"}`}>Login with GitHub</a></p>
    </div>
  );
};

export default Login;