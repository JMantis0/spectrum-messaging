import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TheLordsComponent from "./components/TheLordsComponent";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/lord">
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <TheLordsComponent />
        </div>
      </Route>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
