import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import "./Login.css";

function Login({ user, isAuthenticated }) {
  console.log(isAuthenticated);
  return (
    <div className="LoginOuterContainer">
      <div className="LoginInnerContainer">
        <h1 className="heading">
          {isAuthenticated ? `Welcome ${user.email}` : "Click to Login"}
        </h1>
        {isAuthenticated ? (
          <Link to="/chat">
            <button className="button">chat</button>
          </Link>
        ) : (
          <LoginButton></LoginButton>
        )}

        <div>{JSON.stringify(user)}</div>
        <div>{isAuthenticated}</div>
      </div>
    </div>
  );
}

export default Login;
