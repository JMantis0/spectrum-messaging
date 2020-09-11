import React from "react";
import axios from "axios";
import "./Input.css";
import { useRef, useState } from "react";

const Input = ({ getConversation, localUser, remoteUser }) => {
  const inputRef = useRef();
  const [messageInput, setMessageInput] = useState("");

  function addMessage() {
    const sendThis = messageInput;
    setMessageInput("");
    axios
      .post("/crud/addMessage", {
        body: sendThis,
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
          console.log("messageInput", messageInput);
          getConversation();
        }}
      >
        Console Log Data
      </button>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        ref={inputRef}
        value={messageInput}
        onChange={(e) => {
          console.log("Setting message Input state", e.target.value);
          setMessageInput(e.target.value);
          console.log("messageInput", messageInput);
        }}
        onKeyPress={(e) => {
          console.log("e", e)
          console.log("e.key", e.key)
          if (e.key === "Enter") {
            console.log("inside keydown")
            e.preventDefault();
            console.log(inputRef.current.value);
            axios
              .post("/api/analyze", { text: messageInput })
              .then((response) => console.log(response))
              .catch((err) => {
                console.log("There was an error: ", err);
              });
            console.log("localUser: ", localUser);
            console.log("remoteUser: ", remoteUser);
            addMessage();
          }
        }}
      />
      <button
        className="sendButton"
        onClick={(e) => {
          e.preventDefault();
          console.log(inputRef.current.value);
          axios
            .post("/api/analyze", { text: messageInput })
            .then((response) => console.log(response))
            .catch((err) => {
              console.log("There was an error: ", err);
            });
          console.log("localUser: ", localUser);
          console.log("remoteUser: ", remoteUser);
          addMessage();
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
