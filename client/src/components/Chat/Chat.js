import React, { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Input from "../Input/Input";
import Conversation from "../Conversation/Conversation";
import "./Chat.css";
import "@material-ui/core/";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import axios from "axios";

const Chat = ({ userList, setUserList, user, isAuthenticated, isLoading }) => {
  //  States
  let [localUser, setLocalUser] = useState("");
  let [remoteUser, setRemoteUser] = useState("");
  let [conversation, setConversation] = useState([]);

  useEffect(() => {
    console.log("inside Chat.js useEffect");
    console.log("user", user);
    console.log("isAuthenticated", isAuthenticated);

    if(isAuthenticated) {
    console.log("user.email", user.email);
    // set local user to user.email
    setLocalUser(user.email)
    axios
      .post("/crud/checkIfUserExistsAndCreate", { email: user.email })
      .then((response) => {
        console.log(
          "Attempted to check if user exists and create one if not: ",
          response
        );
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    }
    axios
      .get("/crud/getAllUsers")
      .then((users) => {
        console.log("users", users);
        console.log("Setting user list to email array");
        const userNames = users.data.map((user) => {
          console.log("user in map", user.email);
          return user.email;
        });
        setUserList(userNames);
        console.log("The userList is now :", userList);
      })
      .catch((err) => {
        console.log("There was an error: ", err);
      });
    
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .get(`/crud/getConvo/${localUser}/${remoteUser}`)
      .then((conversationObject) => {
        console.log(conversationObject);
        setConversation(conversationObject.data);
      });
  }, [remoteUser]);

  return (
    <div className="outerContainer">
      {/* <Profile user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} /> */}
      <ResponsiveDrawer
        localUser={localUser}
        remoteUser={remoteUser}
        setRemoteUser={setRemoteUser}
        userList={userList}
        user={user}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
      <div className="container">
        <Conversation conversation={conversation} localUser={localUser} remoteUser={remoteUser} />
        <Input localUser={localUser} remoteUser={remoteUser} />
      </div>
    </div>
  );
};

export default Chat;
