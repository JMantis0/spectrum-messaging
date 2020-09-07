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
    method: "GET",
    url: "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
      "x-rapidapi-key": "26417dba96mshc908747af3c9234p1996ddjsnf25834dcd684",
      useQueryString: true,
    },
    params: {
      text: req.body.text,
    },
  })
    .then((response) => {
      console.log(response.data)
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
