const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("./config/db");

const userRouter = require("./routes/user.route");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * u have to  put this router after body parser otherwise it will not work
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/./views/index.html"));
});

// *not found route error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: "not found 404",
  });
});

// *server error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "server error",
  });
});

module.exports = app;
