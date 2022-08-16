const mongoose = require("mongoose");
const Joi = require("joi");
const { userSchema } = require("../models/user");
const { movieSchema } = require("../models/movie");

const reviewSchema = new mongoose.Schema({
  tagline: {
    type: String,
    minlength: 3,
    maxlength: 200,
    require: true,
  },
  user: {
    type: userSchema,
    required: true,
    immutable: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  details: {
    type: String,
    maxlength: 2000,
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
});
const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    tagline: Joi.string().min(3).max(200).required(),
    userID: Joi.objectId().required(),
    movieID: Joi.objectId().required(),
    details: Joi.string().min(0).required(),
    rating: Joi.number().min(0).max(10),
  });
  return schema.validate(review);
}

exports.Review = Review;
exports.reviewSchema = reviewSchema;
exports.validate = validateReview;
