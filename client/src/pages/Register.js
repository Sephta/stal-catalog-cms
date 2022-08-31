import React, { useState }  from 'react';
import { Navigate } from 'react-router-dom';
import LazyFetch from '../components/common/requests/LazyFetch';

const Register = (props) => {
  const [registerState, setRegisterState] = useState(
    {
      text: "",
      email: "",
      password: "",
    }
  );

  const handleFormUpdate = (event) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [event.target.type]: event.target.value,
    }));
  }

  const submitRegister = (event) => {
    event.preventDefault();

    const [
      usernameField, 
      emailField, 
      passwordField, 
      submitButton
    ] = event.target;

    LazyFetch({
      type: "post",
      endpoint: "/api/user/register",
      data: {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value,
      },
      onSuccess: (data) => {
        console.debug(`[DEBUG] - `, data);
        return (<Navigate to={'/'} />)
      },
      onFailure: (err) => {
        console.error(`[ERROR] - `, err);
      },
    })
  }

  return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={submitRegister}>
        <label>Username: 
          <input 
            type="text" 
            value={registerState.username} 
            onChange={handleFormUpdate} 
            placeholder={"Enter desired username..."}
          />
        </label>
        <label>Email: 
          <input 
            type="email" 
            value={registerState.email} 
            onChange={handleFormUpdate} 
            placeholder={"Enter desired email..."}
          />
        </label>
        <label> Password: 
          <input 
            type="password" 
            value={registerState.password} 
            onChange={handleFormUpdate} 
            placeholder={"Enter password..."}
          />
        </label>
        <input type="submit" value={"Submit"}/>
      </form>
      <a href="/app/">Return</a>
    </div>
  );
};

export default Register;