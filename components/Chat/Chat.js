import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://spectrum-messaging.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      console.log(message);
      console.log(messages);
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {messages.text}
      </div>
    </div>
  );
};

export default Chat;
