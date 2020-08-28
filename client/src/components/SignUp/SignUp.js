import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  function handleSignUpClick() {
    console.log("Inside handleSignUpCLick");
    if (password !== passwordRetype) {
      setInfoMessage("Your passwords do not match");
      setAlertDisplay("block");
      return false;
    } else {
      const pwRegEx = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*])(?=.{8,})"
      );
      const passwordPasses = pwRegEx.test(password);

      if (!passwordPasses) {
        setInfoMessage(
          "Password must have:\n    - minimum 8 characters\n    - one number\n    - one lowercase letter\n    - one uppercase letter\n    - one special-character"
        );
        setAlertDisplay("block");
        return false;
      }
      //  Passwords match and pass requirements
      return true;
    }

  }

  function validateInput() {}

  function consoleState() {
    console.log("alertDisplay", alertDisplay);
    console.log("email", email);
    console.log("userName", userName);
    console.log("password", password);
    console.log("passwordRetype", passwordRetype);
    console.log(password === passwordRetype);
    console.log(typeof password, typeof passwordRetype);
  }
  return (
    <div className="signUpOuterContainer">
      <div className="signUpInnerContainer">
        <h1 className="heading">Sign Up</h1>
        {/* <button onClick={consoleState}>Console Logs</button> */}
        <div>
          <input
            placeholder="E-mail"
            className="signUpInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="User Name"
            className="signUpInput"
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="signUpInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Retype Password"
            className="signUpInput mt-20"
            type="password"
            onChange={(event) => setPasswordRetype(event.target.value)}
          />
        </div>
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
            const pass = handleSignUpClick();
            console.log(pass);
            if(!pass) {
              e.preventDefault();
            }
          }}
          to={"/join"}
        >
          <button className={"button mt-20"} type="submit">
            Sign UP
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
