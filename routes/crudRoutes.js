const router = require("express").Router();
const db = require("../models");
const env = require("dotenv");
const axios = require("axios");
const bcrypt = require("bcryptjs");

//  This route will get all the messages existing between two users.
//  Accordingly, the request object is expected to have the two users.
router.get("/getAllBetweenTwoUsers", (req, res) => {
  const user1 = req.body.user1;
  const user2 = req.body.user2;
});

router.post("/createUser", (req, res) => {
  console.log("backend inside /createUser Route");
  const pwRegEx = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*])(?=.{8,})"
  );
  const passwordPasses = pwRegEx.test(req.body.password);
  if (!passwordPasses) {
    res.status(400).json({
      msg:
        "Password must have:\n    - minimum 8 characters\n    - one number\n    - one lowercase letter\n    - one uppercase letter\n    - one special-character",
      formName: "",
    });
    return;
  }

  db.User.create({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error :", err);
      console.log(err.name);
      res.status(404).json(err);
    });
});

//  Route expects a req with a body recipient, and  senderId props (the sender)
//  And maybe later add a jsonEmo for api call info
//  That would be an interesting async challenge!

router.post("/addMessage", (req, res) => {
  console.log(req)
  db.Message.create({
    body: req.body.message,
    recipientId: req.body.recipientId,
    senderId: req.body.senderId,
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log("There was an error :", err);
      res.status(400).send(err);
    });
});

//  This route gets all the messages sent to the currently logged in user by the other user in the convo
//  And also gets all the messages sent from the currently logged in user to the other user in the convo
//  Thus this route expects to emails (the currently logged in user and the other conversant)

router.get("/getConvo", (req, res) => {
  const { senderId, recipientId } = req.body;

  // SELECT * FROM MESSAGES WHERE (senderId = senderId AND recipientId = rId) OR (senderId = rId AND recipientId = senderId);
  db.Message.findAll({
    $or: [
      {
        where: {
          senderId: senderId,
          recipientId: recipientId,
        },
      },
      {
        where: {
          senderId: recipientId,
          recipientId: senderId,
        },
      },
    ],
  })
    .then((conversation) => {
      console.log("crudRoutes.js response: ", conversation);
      res.status(202).send(conversation);
    })
    .catch((error) => {
      console.log("There was an error: ".error);
      res.status(400).send(error);
    });
});

//  Might need a route to add multiple messages
router.post("/addManyMessages", (req, res) => {
  res.send("Whoa, that's the addManyMessages route.")
})

module.exports = router;
