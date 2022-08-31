import React, { useState, useContext, useEffect }  from 'react';
import { Navigate } from 'react-router-dom';
import LazyFetch from '../components/common/requests/LazyFetch';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Login = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  const [loginState, setLoginState] = useState(
    {
      email: "",
      password: "",
    }
  );

  const handleFormUpdate = (event) => {
    setLoginState((prevState) => ({
      ...prevState,
      [event.target.type]: event.target.value,
    }));
  }

  const submitLogin = (event) => {
    event.preventDefault();

    const [
      emailField, 
      passwordField, 
      submitButton
    ] = event.target;
    
    LazyFetch({
      type: "post",
      endpoint: "/api/user/login",
      data: {
        email: emailField.value,
        password: passwordField.value,
      },
      onSuccess: (data) => {
        console.debug(`[DEBUG] - `, data);
        setUser(data);
      },
      onFailure: (err) => {
        console.error(`[ERROR] - `, err);
      },
    });
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={submitLogin}>
        <label>Email: 
          <input 
            type="email" 
            value={loginState.email} 
            onChange={handleFormUpdate} 
          />
        </label>
        <label> Password: 
          <input 
            type="password" 
            value={loginState.password} 
            onChange={handleFormUpdate} 
          />
        </label>
        <input type="submit" />
      </form>
      <a href="/app/">Return</a>
    </div>
  );
};

export default Login;