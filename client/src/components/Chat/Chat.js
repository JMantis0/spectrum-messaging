import React, { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Input from "../Input/Input";
import Conversation from "../Conversation/Conversation";
import "./Chat.css";
import "@material-ui/core/";
import ResponsiveDrawer from "../ResponsiveDrawer/ResponsiveDrawer";
import axios from "axios";

const Chat = ({ user, isAuthenticated }) => {
  //  States
  const [userInDb, setUserInDb] = useState(false);

  useEffect(() => {
    console.log("inside Chat.js useEffect");
    console.log("user", user);
    console.log("isAuthenticated", isAuthenticated);
    console.log("userInDb", userInDb);

    // if (!userInDb) {
    //   axios
    //     .post("/crud/checkIfUserExistsAndCreate", { email: user.email })
    //     .then((response) => {
    //       console.log(
    //         "Attempted to check if user exists and create one if not: ",
    //         response
    //       );
    //       setUserInDb(true);
    //     })
    //     .catch((error) => {
    //       console.log("There was an error: ", error);
    //     });
    // }
  });

  return (
    isAuthenticated && (
      <div className="outerContainer">
        <ResponsiveDrawer user={user} isAuthenticated={isAuthenticated} />
        <div className="container">
          <Conversation />
          <Input />
        </div>
      </div>
    )
  );
};

export default Chat;
