/*********************************************************************************************************************\

Software Development, Semester 3, Sprint Project 2 - Group Project

Developer: Alex Ridgeley, Mike Wadden, Cody Barrett
Date: August 2022

Objective:

To create a search engine using a sample database & generated mock data. We decided on the pre-build movie database.

You'll need to use both MongoDB and postgreSQL to make proper use of this site. There is a backup
of the PG database and a copy of several CSV files that you can import into Mongo.


TO RUN THE APP:

1)  Install postgreSQL and MongoDB. Create a database and restore the backup DB found in the 'BackUp' folder.
    Create a MongoDB database called 'sample_mflix', and add the following collections: **IF YOU RENAME THE DATABASE, YOU WILL NEED TO UPDATE THE CODE**
      'movies'    <----------- import the 'movies.csv' file here
      'reviews'   <----------- import the 'reviews.csv' file here

2)  Inside the 'server' folder, create a new file called '.env'. Paste the following into that new file, replacing the placeholder data with your info:

URI="<your MongoDB connect URI>"
URI2="<your MongoDB connect URI>/<the database name>"

HOST="<the host name for your postgreSQL database>"
USER="<your user account name in pgAdmin>"
DB_PORT=<the port where you run your database>
PASSWORD="<user password for postgres>"
DATABASE="<the name of your postgres database>"

PORT=<the port you on which want the server to run> (recommend 3001)

3)  In your terminal, navigate to the 'server' folder and run this command:
          npm i         <----------- This will install the node_modules necessary to run the server.

4)  After this is complete, navigate to the 'client' folder, and run the following two commands to start everything:
          npm i
          npm run dev

This will run both of the modules at once, and the React app should load in a browser window.

\*********************************************************************************************************************/

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
