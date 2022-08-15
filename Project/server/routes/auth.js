const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("Joi");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../startup/logging");

// Handles the post request for logging in

router.post("/", async (req, res) => {
  // validate check
  const { error } = await validate(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  //checks to see if the email is valid
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    logger.error(` ${req.body.email} (Invalid email).`);
    return res.status(400).send(JSON.stringify("Invalid email or password."));
  }
  //confirms password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    logger.error(` ${req.body.email} (Invalid  Password).`);
    return res.status(400).send(JSON.stringify("Invalid email or password."));
  }
  logger.info(`${req.body.email} Logged in`);
  //generates a JSON TOKEN
  const token = user.generateAuthToken();
  res.send(JSON.stringify(token));
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
