const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).require(),
    password: Joi.string().min(5).max(255).required,
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
