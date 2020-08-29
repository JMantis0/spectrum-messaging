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
  // THIS SECTION WILL BE USED FOR PASSWORD REQS
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
      console.log(err.name)
      res.status(404).json(err);
    });
});

router.post("/addMessage", (req, res) => {
  db.Message.create({});
});

module.exports = router;
