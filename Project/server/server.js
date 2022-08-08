const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
global.DEBUG = false;

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
  next();
});

// Routes
const searchEngine = require("./routes/search");

app.use("/search", searchEngine);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
