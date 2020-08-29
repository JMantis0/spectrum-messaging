import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  //  This function validates user input by checking to make sure the passwords satisfy
  //  Security requirements.  It also checks that the retype matches the original type.
  //  Returns false if the tests fail, true if they pass.
  //  The returned boolean is used by the Link component.
  function handleLoginClick() {
    console.log("Inside handleLoginCLick");
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
      axios
        .post("crud/createUser", {
          email,
          password,
          userName,
        })
        .then((response) =>
          console.log("response from crud/createUser route", response)
        )
        .catch((err) => console.log("There was an error: ", err));
      return true;
    }
  }

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
    <div className="LoginOuterContainer">
      <div className="LoginInnerContainer">
        <h1 className="heading">Sign Up</h1>
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
            placeholder="User Name"
            className="LoginInput"
            type="text"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="LoginInput mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Retype Password"
            className="LoginInput mt-20"
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
            const pass = handleLoginClick();
            console.log(pass);
            if (!pass) {
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

export default Login;
