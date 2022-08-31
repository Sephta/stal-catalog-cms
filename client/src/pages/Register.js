import React, { useState }  from 'react';
import { Navigate } from 'react-router-dom';
import LazyFetch from '../components/common/requests/LazyFetch';

const Register = (props) => {
  const [registerState, setRegisterState] = useState(
    {
      username: "",
      email: "",
      password: "",
    }
  );

  const onUpdateUsernameField = (event) => {
    setRegisterState({
      username: event.target.value,
      email: registerState.email,
      password: registerState.password,
    });
  }
  const onUpdateEmailField = (event) => {
    setRegisterState({
      username: registerState.username,
      email: event.target.value,
      password: registerState.password,
    });
  }
  const onUpdatePasswordField = (event) => {
    setRegisterState({
      username: registerState.username,
      email: registerState.email,
      password: event.target.value,
    });
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
          <input type="text" value={registerState.username} onChange={onUpdateUsernameField} />
        </label>
        <label>Email: 
          <input type="text" value={registerState.email} onChange={onUpdateEmailField} />
        </label>
        <label> Password: 
          <input type="text" value={registerState.password} onChange={onUpdatePasswordField} />
        </label>
        <input type="submit" value={"Submit"}/>
      </form>
    </div>
  );
};

export default Register;