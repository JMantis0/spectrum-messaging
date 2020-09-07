import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import queryString from "query-string";
import io from "socket.io-client";
import Input from "../Input/Input";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const { user, isAuthenticated } = useAuth0();
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
    isAuthenticated && (
      <div className="outerContainer">
        <ProSidebar>
          <SidebarHeader>
            {
              <div className="column">
                <img src="https://www.paulekman.com/wp-content/uploads/2018/07/PAFF_040918_emotionspectrum2-609x419-1280x720.jpg"></img>
                <p>SidebarHeader</p>
              </div>
            }
          </SidebarHeader>
          <SidebarContent>{<p>SidebarContent</p>}</SidebarContent>
          <SidebarFooter>{"footer"}</SidebarFooter>
        </ProSidebar>
        <div className="container">
          <Input
          className="chatInput"
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          {messages.map((message) => message.text)}
        </div>
      </div>
    )
  );
};

export default Chat;
