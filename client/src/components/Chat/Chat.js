import React, { useState, useEffect, FaGem, FaHeart } from "react";
import Container from "react-bootstrap/Container";
import "react-pro-sidebar/dist/css/styles.css";
import queryString from "query-string";
import io from "socket.io-client";
import Input from "../Input/Input";
import "./Chat.css";
import "@material-ui/core/";
import ResponsiveDrawer from "../SideNav/ResponsiveDrawer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://project-chat-application.herokuapp.com/";

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
      <ResponsiveDrawer />

      <div className="container">
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {message}
      </div>
      <Container>
        <p id="left">PUT ON TOP THE MOTHER EFFIN THANG BREH</p>
        <p id="right">PUT ON TOP THE MOTHER EFFIN THANG BREH</p>
      </Container>
    </div>
  );
};

export default Chat;
