import React, { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Input from "../Input/Input";
import Conversation from "../Conversation/Conversation";
import "./Chat.css";
import "@material-ui/core/";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import axios from "axios";
import Profile from "../Profile/Profile" 

const Chat = ({ user, isAuthenticated, isLoading }) => {
  //  States

  useEffect(() => {
    console.log("inside Chat.js useEffect");
    console.log("user", user);
    console.log("isAuthenticated", isAuthenticated);
  

    if (isAuthenticated) {
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
  }, [isAuthenticated]);

  return (
    (
      <div className="outerContainer">
        {/* <Profile user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} /> */}
        <ResponsiveDrawer user={user} isAuthenticated={isAuthenticated} isLoading={isLoading}/>
        <div className="container">
          <Conversation />
          <Input />
        </div>
      </div>
    )
  );
};

export default Chat;
