const logger = require("../startup/logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  console.log(`Something failed ${err}`);
  res.status(500).send("Something Failed.");
};
