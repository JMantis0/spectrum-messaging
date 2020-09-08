import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//  I want this component to know the two users, and have all the messages between them.
const Conversation = (props) => {
  let [localUser, setLocalUser] = useState("Email1@test.com");
  let [remoteUser, setRemoteUser] = useState("Email2@test.com");
  let [conversation, setConversation] = useState([]);

  useEffect(() => {
    console.log("inside useEffect Conversation.js");
    //set conversation state
  }, [conversation]);

  return (
    <div>
      <button
        id={Math.random()}
        onClick={() => {
          axios
            .get("/crud/getConvo", {
              params: {
                senderId: localUser,
                recipientId: remoteUser,
              }
            })
            .then((conversationObject) => {
              console.log(conversationObject);
              setConversation(conversationObject.data);
            });
        }}
      >
        Get Convo
      </button>

      {conversation.map((message) => {
        return <div>{message.body}</div>;
      })}
    </div>
  );
};

export default Conversation;
