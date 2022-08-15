const winston = require("winston");
var path = require("path");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
      format: winston.format.simple(),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/exceptions.log"),
      format: winston.format.json(),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/rejections.log"),
      format: winston.format.json(),
    }),
  ],
});

module.exports = logger;
