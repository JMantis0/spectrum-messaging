import React from "react";
import axios from "axios";
import "./Input.css";
import { useRef } from "react";

const Input = ({ localUser, remoteUser }) => {
  const inputRef = useRef();

  function addMessage() {
    axios
      .post("/crud/addMessage", {
        body: inputRef.current.value,
        recipientEmail: remoteUser,
        senderEmail: localUser,
      })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((err) => {
        console.log("There was an error: ", err);
      });
  }

  return (
    <form className="form">
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("localUser: ", localUser);
          console.log("remoteUser: ", remoteUser);
        }}
      >
        Console Log Data
      </button>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        ref={inputRef}
      />
      <button
        className="sendButton"
        onClick={(e) => {
          console.log(inputRef.current.value);
          axios
            .post("/api/analyze", { text: inputRef.current.value })
            .then((response) => console.log(response));
          addMessage();
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
