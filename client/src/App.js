import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TheLordsComponent from "./components/TheLordsComponent";


function App() {
  return (
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
  );
}


export default App;
