const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  console.log(`Something failed ${err}`);
  res.status(500).send("Something Failed.");
};
