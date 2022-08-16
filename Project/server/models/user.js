const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// STEP 1
// mongoose Schema is the second check before the data goes to MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 400,
  },
});

// this generates a JWT Token that contains the _id built in
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.KEY);
  return token;
};
const User = mongoose.model("User", userSchema);

// Joi is the first validation check on data from the user input
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
