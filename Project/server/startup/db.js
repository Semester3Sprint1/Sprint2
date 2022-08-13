const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect(process.env.URI2)
    .then(() => winston.info("Connected to MongoDB"));
};
