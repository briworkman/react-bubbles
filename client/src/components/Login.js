import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [user, setUser] = useState({
    credentials: { username: "", password: "" }
  });

  const handleChange = e => {
    setUser({
      credentials: {
        ...user.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", user.credentials)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/homepage");
      })
      .catch(error => console.log(error.response));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username*"
          value={user.credentials.username}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password*"
          value={user.credentials.password}
          onChange={handleChange}
        />
        <button className="btn">Log In</button>
      </form>
    </>
  );
};

export default Login;
