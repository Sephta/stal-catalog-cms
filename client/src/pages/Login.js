import React, { useState, useContext, useEffect }  from 'react';
import { Navigate } from 'react-router-dom';
import LazyFetch from '../components/common/requests/LazyFetch';
import { UserContext, UserDispatchContext } from '../components/common/UserProvider';

const Login = (props) => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);
  
  useEffect(() => {
    console.debug(`[DEBUG] - `, user);
  });

  const [loginState, setLoginState] = useState(
    {
      email: "",
      password: "",
    }
  );

  const onUpdateEmailField = (event) => {
    setLoginState({
      username: loginState.username,
      email: event.target.value,
      password: loginState.password,
    });
  }
  const onUpdatePasswordField = (event) => {
    setLoginState({
      username: loginState.username,
      email: loginState.email,
      password: event.target.value,
    });
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

        return (<Navigate to="/" />);
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
          <input type="text" value={loginState.email} onChange={onUpdateEmailField} />
        </label>
        <label> Password: 
          <input type="text" value={loginState.password} onChange={onUpdatePasswordField} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;