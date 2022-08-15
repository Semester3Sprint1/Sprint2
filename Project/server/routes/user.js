const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middleware/auth.middle");
const { User, validate } = require("../models/user");
const logger = require("../startup/logging");

// STEP 1

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//handles setting up a new user
router.post("/", async (req, res) => {
  const { error } = await validate(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  // checks to see if the email is already in the DB
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    logger.error("User Already registered.");
    return res.status(400).send("User Already registered.");
  }
  // after some encyption sends to new user to DB
  user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  logger.info(`${req.body.username} created a new account`);
  await user.save();
  // sends JWT token
  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, process.env.KEY);
  // adds the token to the header
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = router;
