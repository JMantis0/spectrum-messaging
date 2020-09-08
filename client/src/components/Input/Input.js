import React from "react";
import axios from "axios";
import "./Input.css";
import { useRef } from "react";

const Input = ({ setMessage, sendMessage, message }) => {
  const inputRef = useRef();
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        ref={inputRef}
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        className="sendButton"
        onClick={(e) => {
          sendMessage(e);
          console.log(inputRef.current.value)
          axios.post("/api/analyze", {text: inputRef.current.value}).then(response => console.log(response));
          // axios.post("/crud/addMessage", )
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
