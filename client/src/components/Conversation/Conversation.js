import React, { useEffect, useState } from "react";
import axios from "axios";

//  I want this component to know the two users, and have all the messages between them.
const Conversation = ({ conversation }) => {
  useEffect(() => {
    console.log("inside useEffect Conversation.js");
    //set conversation state
  }, [conversation]);
  return (
    <div id="conversation">
      {conversation.map((message) => {
        return (
          <div id={`message${message.id}`} key={message.id}>
            {message.body} {message.createdAt}
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
