const router = require("express").Router();
const db = require("../models");
const env = require("dotenv");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");

//  This route will get all the messages existing between two users.
//  Accordingly, the request object is expected to have the two users.
router.get("/getAllBetweenTwoUsers", (req, res) => {
  const user1 = req.body.user1;
  const user2 = req.body.user2;
});

router.post("/createUser", (req, res) => {
  console.log("backend inside /createUser Route");

  db.User.create({
    email: req.body.email,
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
  // console.log("req", req);
  console.log("POST request from client on /addMessage");
  console.log("message: ", req.body.message);
  console.log("recipientEmail: ", req.body.recipientEmail);
  console.log("senderEmail: ", req.body.senderEmail);
  console.log("Adding message do SQL DB");
  db.Message.create({
    body: req.body.message,
    recipientEmail: req.body.recipientEmail,
    senderEmail: req.body.senderEmail,
  })
    .then((response) => {
      console.log("Message saved to DB.... Sending response to client");
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

router.get("/getConversation/:localUser/:remoteUser", (req, res) => {
  const localUser = req.params.localUser;
  const remoteUser = req.params.remoteUser;
  console.log(
    `GET request from client on route /crudRoutes/${localUser}/${remoteUser}}`
  );
  console.log("Finding conversation between these two users...");
  // SELECT * FROM MESSAGES WHERE (senderId = senderId AND recipientId = rId) OR (senderId = rId AND recipientId = senderId);
  db.Message.findAll({
    where: Sequelize.or(
      {
        senderEmail: req.params.localUser,
        recipientEmail: req.params.remoteUser,
      },
      {
        senderEmail: req.params.remoteUser,
        recipientEmail: req.params.localUser,
      }
    ),
  })
    .then((conversation) => {
      console.log("Conversation found, sorting...");
      const sortedConvo = conversation.sort((a, b) => {
        return a.dataValues.createdAt < b.dataValues.createdAt ? -1 : 1;
      });
      console.log("Conversation sorted.  Sending to client");
      res.status(202).send(sortedConvo);
    })
    .catch((error) => {
      console.log("There was an error: ".error);
      res.status(400).send(error);
    });
});

//  Might need a route to add multiple messages
router.post("/addManyMessages", (req, res) => {
  res.send("Whoa, that's the addManyMessages route.");
});

router.get("/loginAttempt", (req, res) => {
  db.User.find({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then((userIfExists) => {
      console.log(userIfExists);
      res.status(202).json(userIfExists);
    })
    .catch((error) => {
      console.log("There was an error", error);
      res.status(404).send(error);
    });
});

//  Check to see if the user exists
router.post("/checkIfUserExistsAndCreate", (req, res) => {
  console.log("inside /checkIfUserExistsAndCreate");
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((response) => {
      console.log(response);
      if (response === null) {
        db.User.create({
          email: req.body.email,
        })
          .then((response) => {
            console.log("attempt to create new user", response);
            res.send(response);
          })
          .catch((error) => {
            console.log("There was an error creating new user: ", error);
            res.send(error);
          });
      } else {
        res.send("user exists");
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

router.get("/getAllUsers", (req, res) => {
  console.log("GET request from client.  Getting all users...");

  db.User.findAll({})
    .then((users) => {
      console.log(`Found ${users.length} users`);
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log("There was an error: ", err);
    });
});

module.exports = router;
