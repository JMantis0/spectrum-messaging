// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    const pwRegEx = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*])(?=.{8,})"
    );
    const passwordPasses = pwRegEx.test(req.body.password);
    if (!passwordPasses) {
      res.status(400).json({
        msg:
          "Password must have:\n    - minimum 8 characters\n    - one number\n    - one lowercase letter\n    - one uppercase letter\n    - one special-character",
        formName: ""
      });
      return;
    }
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      recoveryQuestion: null,
      recoveryAnswer: null
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //  route to handle an update for user's password recovery info
  app.put(
    "/api/members/setSecurityQuestionAnswer",
    isAuthenticated,
    (req, res) => {
      const match = req.body.recoveryAnswer === req.body.recoveryAnswerRetype;
      const { recoveryAnswerRetype } = req.body;
      const regExpQA = new RegExp("^(?=.{6,})");
      if (!regExpQA.test(recoveryAnswerRetype)) {
        res.status(400).json({
          msg: " Answer must be at least 6 characters",
          formName: "securityQuestionAnswerSetter"
        });
      }
      if (match) {
        db.User.update(
          {
            recoveryAnswer: bcrypt.hashSync(
              recoveryAnswerRetype,
              bcrypt.genSaltSync(10),
              null
            )
          },
          {
            where: {
              id: req.user.id
            }
          }
        )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        const err = {
          msg: " Your answers do not match.",
          formName: "securityQuestionAnswerSetter"
        };
        res.status(400).json(err);
      }
    }
  );

  app.post("/api/passwordRecovery/accountSearch", (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.account
      }
    })
      .then((accountFound) => {
        if (accountFound === null) {
          const err = {
            msg: ` Account does not exist for ${req.body.email}`,
            formName: "accountSearch"
          };
          res.status(404).json(err);
        } else {
          res.status(200).send(accountFound.dataValues.recoveryQuestion);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  app.post("/api/passwordRecovery/validateUserAnswer", (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        const userAnswer = req.body.recoveryAnswer;
        const correctAnswer = user.dataValues.recoveryAnswer;
        if (bcrypt.compareSync(userAnswer, correctAnswer)) {
          res.sendStatus(202);
        } else {
          const err = {
            msg: " Incorrect Answer",
            formName: "recoveryAnswer"
          };
          res.status(400).json(err);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  app.post("/api/passwordRecovery/ensurePasswordRequirements", (req, res) => {
    //  Regular Expression must contain at least one number, one capital letter, one lowercase letter,
    //  one special character, and have length in range 9-32
    const pwRegEx = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*])(?=.{8,})"
    );
    const passwordPasses = pwRegEx.test(req.body.potentialPassword);
    if (passwordPasses) {
      res.sendStatus(200);
    } else {
      const err = {
        msg:
          " Password must have:\n    - minimum 8 characters\n    - one number\n    - one lowercase letter\n    - one uppercase letter\n    - one special-character",
        formName: "newPassword"
      };
      res.status(400).json(err);
    }
  });

  app.put("/api/passwordRecovery/confirmAndStoreNewPassword", (req, res) => {
    const match = req.body.password1 === req.body.password2;
    if (match) {
      db.User.update(
        {
          password: bcrypt.hashSync(
            req.body.password1,
            bcrypt.genSaltSync(10),
            null
          )
        },
        {
          where: {
            email: req.body.email
          }
        }
      ).then(() => {
        res.sendStatus(202);
      });
    } else {
      const err = {
        msg: " Your new passwords do not match",
        formName: "passwordConfirm"
      };
      res.status(400).json(err);
    }
  });
};
