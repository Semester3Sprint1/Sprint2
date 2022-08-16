const express = require("express");
const app = express();
const error = require("./middleware/error");
require("express-async-errors");
require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const port = process.env.PORT;
global.DEBUG = false;

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const logger = require("./startup/logging");
require("./startup/db")();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// Routes
const mongoMovieRouter = require("./routes/mongoMovies");
const pgMovieRouter = require("./routes/pgMovies");
const searchEngine = require("./routes/search");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const reviewRouter = require("./routes/review");
// const pgSearchRouter = require("./routes/pgSearch");

app.use("/search", searchEngine);
app.use("/movies/mongo", mongoMovieRouter);
app.use("/movies/pg", pgMovieRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/review", reviewRouter);

// app.use("/pgsearch", pgSearchRouter);
app.use(error);

const server = app.listen(port, () => {
  logger.info(`App running on port ${port}.`);
});

module.exports = server;
