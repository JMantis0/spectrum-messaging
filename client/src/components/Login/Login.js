import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

function Login() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  //  This function validates user input by checking to make sure the passwords satisfy
  //  Security requirements.  It also checks that the retype matches the original type.
  //  Returns false if the tests fail, true if they pass.
  //  The returned boolean is used by the Link component.
  function handleLoginClick() {
    console.log("Inside handleLoginCLick");
    return true
    }
  

  function consoleState() {
    console.log("alertDisplay", alertDisplay);
    console.log("email", email);
    console.log("userName", userName);
  }
  return (
    <div className="LoginOuterContainer">
      <div className="LoginInnerContainer">
        <h1 className="heading">Login</h1>
        {/* <button onClick={consoleState}>Console Logs</button> */}
        <div>
          <input
            placeholder="E-mail"
            className="LoginInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="LoginInput"
            type="password"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <input type="checkbox" value="lsRememberMe" id="rememberMe" />{" "}
        <label for="rememberMe">Remember me</label>
        <div
          style={{ display: alertDisplay }}
          id="alert"
          className="alert alert-danger"
          role="alert"
        >
          <span
            className="glyphicon glyphicon-exclamation-sign"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Error:</span> {infoMessage}
        </div>
        <Link
          onClick={(e) => {
            console.log(e);
            const pass = handleLoginClick();
            console.log(pass);
            if (!pass) {
              e.preventDefault();
            }
          }}
          to={"/join"}
        >
          <button className={"button mt-20"} type="submit">
            Login
          </button>
        </Link>
        <a href="/">Need to signup?</a>
      </div>
    </div>
  );
}

export default Login;
