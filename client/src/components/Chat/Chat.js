import React, { useState, useEffect, useRef } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Input from "../Input/Input";
import Conversation from "../Conversation/Conversation";
import "./Chat.css";
import "@material-ui/core/";
import Side from "../ResponsiveDrawer/Side";
import axios from "axios";

const Chat = ({ userList, setUserList, user, isAuthenticated, isLoading }) => {
  //  States
  const [localUser, setLocalUser] = useState("");
  const [remoteUser, setRemoteUser] = useState("");
  const [conversation, setConversation] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  // const prevUser = usePrevious(remoteUser);
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);
  //   return ref.current;
  // }

  function addMessage() {
    const sendThis = messageInput;
    setMessageInput("");
    axios
      .post("/crud/addMessage", {
        message: sendThis,
        recipientEmail: remoteUser,
        senderEmail: localUser,
      })
      .then((response) => {
        console.log("response from /crud/addMessage: ", response);
      })
      .then(() => {
        console.log("Is this being executed?");
        getConversation();
      })
      .catch((err) => {
        console.log("There was an error: ", err);
      });
  }

  function getConversation() {
    
    if (localUser && remoteUser) {
      console.log(`Sending GET request to server on route /crud/getConversation/${localUser}/${remoteUser}`)
      axios
        .get(`/crud/getConversation/${localUser}/${remoteUser}`)
        .then((conversationObject) => {
          setConversation(conversationObject.data);
        })
        .catch((err) => {
          console.log("There was an error: ", err);
        });
    } else {
      console.log(
        "Error getting conversation: localUser and remoteUser required."
      );
    }
  }

  //  Why is this here?  this will trigger when conversation changes.
  useEffect(() => {}, [conversation]);

  //
  useEffect(() => {
    if (isAuthenticated) {
      // set local user to user.email
      setLocalUser(user.email);
      axios
        .post("/crud/checkIfUserExistsAndCreate", { email: user.email })
        .then(() => {
          axios.get("/crud/getAllUsers").then((users) => {
            console.log("Setting user list to email array");
            const userNames = users.data.map((user) => {
              return user.email;
            });
            setUserList(userNames);
          });
        })
        .catch((error) => {
          console.log("There was an error: ", error);
        });
    } else {
      console.log("No authenticated user");
    }
  }, [isAuthenticated]);

  // let interval;
  // useEffect(() => {
  //   clearInterval(interval);
  //   getConversation();
  //   interval = setInterval(() => getConversation(), 2000);
  // }, [remoteUser]);

  useEffect(() => {
    console.log("conversation", conversation);
    console.log("localUser", localUser);
    console.log("remoteUser", remoteUser);
  }, [conversation]);

  return (
    <div className="outerContainer">
      <Side
        setLocalUser={setLocalUser}
        localUser={localUser}
        remoteUser={remoteUser}
        setRemoteUser={setRemoteUser}
        userList={userList}
        user={user}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
      <div className="container">
        <Conversation
          conversation={conversation}
          localUser={localUser}
          remoteUser={remoteUser}
        />
        <Input
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          addMessage={addMessage}
          getConversation={getConversation}
          localUser={localUser}
          remoteUser={remoteUser}
        />
      </div>
    </div>
  );
};

export default Chat;
