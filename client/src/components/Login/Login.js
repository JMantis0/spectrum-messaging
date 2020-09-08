import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginButton from "../LoginButton/LoginButton";
import "./Login.css";

// This is the javascript for the remember me button.

// const rmCheck = document.getElementById("rememberMe"),
//     emailInput = document.getElementById("email");

// if (localStorage.checkbox && localStorage.checkbox !== "") {
//   rmCheck.setAttribute("checked", "checked");
//   emailInput.value = localStorage.username;
// } else {
//   rmCheck.removeAttribute("checked");
//   emailInput.value = "";
// }

// function lsRememberMe() {
//   if (rmCheck.checked && emailInput.value !== "") {
//     localStorage.username = emailInput.value;
//     localStorage.checkbox = rmCheck.value;
//   } else {
//     localStorage.username = "";
//     localStorage.checkbox = "";
//   }
// }

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
