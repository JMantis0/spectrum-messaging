const router = require("express").Router();
const env = require("dotenv");
const axios = require("axios");

apiKey = process.env.APIKEY;
// const db = require("../models");

router.get("/test", (req, res) => {
  // Use a regular expression to search titles for req.query.q
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  console.log("This is the test route");
  console.log("req", req);
  res.send(202);
});

router.post("/analyze", (req, res) => {
  console.log(req.body.text);
  axios({
    method: "POST",
    url: "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com",
      "x-rapidapi-key": "26417dba96mshc908747af3c9234p1996ddjsnf25834dcd684",
      useQueryString: true,
    },
    data: {
      text: req.body.text,
    },
  })
    .then((response) => {
      console.log("THE API RESPONSE", response);
      res.json(response);
    })
    .catch((error) => {
      console.log("THERE WAS AN ERROR: ", error);
    });
});

module.exports = router;
