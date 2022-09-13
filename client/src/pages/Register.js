import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LazyFetch from "../components/common/requests/LazyFetch";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

const Register = (props) => {
  const navigate = useNavigate();

  const [registerState, setRegisterState] = useState({
    text: "",
    email: "",
    password: "",
  });

  const handleFormUpdate = (event) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [event.target.type]: event.target.value,
    }));
  };

  const submitRegister = (event) => {
    event.preventDefault();

    const [usernameField, emailField, passwordField, submitButton] =
      event.target;

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
        navigate("/login");
      },
      onFailure: (err) => {
        console.error(`[ERROR] - `, err);
      },
    });
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <form onSubmit={submitRegister}>
          <label>
            Username:
            <input
              type="text"
              value={registerState.username}
              onChange={handleFormUpdate}
              placeholder={"Enter desired username..."}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={registerState.email}
              onChange={handleFormUpdate}
              placeholder={"Enter desired email..."}
            />
          </label>
          <label>
            {" "}
            Password:
            <input
              type="password"
              value={registerState.password}
              onChange={handleFormUpdate}
              placeholder={"Enter password..."}
            />
          </label>
          <input type="submit" value={"Submit"} />
        </form>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Register;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 1em;
`;
