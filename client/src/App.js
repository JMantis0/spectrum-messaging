import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const { user } = useAuth0();
  return (
    <Router>
      <Route exact path="/">
        <Login user={user} />
      </Route>
      <Route exact path="/join" component={Join} />
      <Route exact path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
