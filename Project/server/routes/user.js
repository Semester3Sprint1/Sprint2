const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already registered.");

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    returnSecureToken: req.body.returnSecureToken,
  });

  await user.save();

  res.send(user);
});

module.exports = router;
