const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "combined.log",
      format: winston.format.simple(),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      format: winston.format.json(),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "rejections.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = logger;
