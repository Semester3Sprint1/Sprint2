const mongoose = require("mongoose");
const logger = require("../startup/logging");

module.exports = function () {
  mongoose
    .connect(process.env.URI2)
    .then(() => logger.info("Connected to MongoDB"));
};
