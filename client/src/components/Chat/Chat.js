import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-pro-sidebar/dist/css/styles.css";
import queryString from "query-string";
import io from "socket.io-client";
import Input from "../Input/Input";
import "./Chat.css";
import "@material-ui/core/";
import ResponsiveDrawer from "../SideNav/ResponsiveDrawer";

let socket;

const Chat = ({ location, user, isAuthenticated }) => {
  
  //  States
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //  socketio Endpoints
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
    isAuthenticated && (
      <div className="outerContainer">
        <ResponsiveDrawer user={user} isAuthenticated={isAuthenticated} />

        <div className="container">
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          {message}
        </div>
      </div>
    )
  );
};

export default Chat;
