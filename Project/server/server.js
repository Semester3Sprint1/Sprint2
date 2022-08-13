const express = require("express");
const winston = require("winston");
const app = express();
const error = require("./middleware/error");
require("dotenv").config();

const port = process.env.PORT;
global.DEBUG = false;

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

require("./startup/logging")();
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

app.use("/search", searchEngine);
app.use("/movies/mongo", mongoMovieRouter);
app.use("/movies/pg", pgMovieRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(error);

app.listen(port, () => {
  winston.info(`App running on port ${port}.`);
});
