import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TheLordsComponent from "./components/Lord/TheLordsComponent";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import LoginButton from "./components/LoginButton/LoginButton";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={SignUp} />
      <Route path="/lord" exact component={TheLordsComponent} />
      <Route path="/auth0test" component={LoginButton} />
      <Route path="/login" exact component={Login} />
      <Route path="/join" component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
