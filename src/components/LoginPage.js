import React, {useState} from "react";


function LoginPage()  {
  const initialState = {
    email: "",
    password: ""
  }
  let [userData, setUserData] = useState(initialState);

  return (<div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h2>Login Form</h2>
        <form className="login">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="email-input" placeholder="Email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password-input" placeholder="Password" />
            <a href="/passwordRecovery" id="forgotPasswordLink">Forgot password?</a>
          </div>
          <div style={{display : "none"}} id="alert" className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span> <span className="msg"></span>
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
        <br />
        <p>Or sign up <a href="/">here</a></p>
      </div>
    </div>
  </div>)

}

export default LoginPage;
