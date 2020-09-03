import React, { useState, useEffect, FaGem, FaHeart } from "react";
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
      <ProSidebar>
        <SidebarHeader>
          {
            <div className="column">
              <img src="https://www.paulekman.com/wp-content/uploads/2018/07/PAFF_040918_emotionspectrum2-609x419-1280x720.jpg"></img>
              <p>hello!</p>
              <p>I like turtles</p>
              <p>github.mindyabidness</p>
              <p>LinkedIn more like blinked 182</p>
              <button>viewprofile</button>
            </div>
          }
        </SidebarHeader>
        <SidebarContent>
          {<p>yo you mad stupid, B! This AIN'T A BIO IT'S A CHATROOM BOY!</p>}
        </SidebarContent>
        <SidebarFooter>
          {
            <ul>
              These Yo Conversations Cuz
              <li>person 1</li>
              <li>person 2</li>
              <li>person 3</li>
              <li>person 4</li>
              <li>person 5</li>
              <li>person 6</li>
              <li>person 7</li>
              <li>person 1</li>
              <li>person 2</li>
              <li>person 3</li>
              <li>person 4</li>
              <li>person 5</li>
              <li>person 6</li>
              <li>person 7</li>
              <li>person 1</li>
              <li>person 2</li>
              <li>person 3</li>
              <li>person 4</li>
              <li>person 5</li>
              <li>person 6</li>
              <li>person 7</li>
              <li>person 1</li>
              <li>person 2</li>
              <li>person 3</li>
              <li>person 4</li>
              <li>person 5</li>
              <li>person 6</li>
              <li>person 7</li>
            </ul>
          }
        </SidebarFooter>
      </ProSidebar>
      <div className="container">
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {messages.map(message => message.text)}
      </div>
      <Container>
        <p id="left">PUT ON TOP THE MOTHER EFFIN THANG BREH</p>
        <p id="right">PUT ON TOP THE MOTHER EFFIN THANG BREH</p>
      </Container>
    </div>
  );
};

export default Chat;
