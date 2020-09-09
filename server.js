const express = require("express");
const http = require("http");
const path = require("path");
const cors = require('cors');
const logger = require("morgan");


const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const apiRoutes = require("./routes/apiRoutes");
const crudRoutes = require("./routes/crudRoutes")
app.use(logger("dev"));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use apiRoutes
// Define API routes here

app.use(cors());
app.use("/api", apiRoutes);
app.use("/crud", crudRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
