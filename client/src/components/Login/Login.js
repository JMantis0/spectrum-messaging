import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginButton from "../LoginButton/LoginButton"
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

function Login( { user }) {
  return (
    <div className="LoginOuterContainer">
      <div className="LoginInnerContainer">
        <h1 className="heading">Login</h1>
        <LoginButton></LoginButton>
        {JSON.stringify(user)}
      </div>
    </div>
  );
}

export default Login;
