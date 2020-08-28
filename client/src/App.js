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
      <Route path="lord">
          <TheLordsComponent />
      </Route>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
