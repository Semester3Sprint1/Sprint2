const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
global.DEBUG = false;

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect(
    "mongodb+srv://mikewadden:database@cluster0.k857l01.mongodb.net/sample_mflix"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

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

app.use("/search", searchEngine);
app.use("/movies/mongo", mongoMovieRouter);
app.use("/movies/pg", pgMovieRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
