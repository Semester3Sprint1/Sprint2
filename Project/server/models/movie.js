const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 200,
    required: true,
  },
});

const Movie = mongoose.model("Movies", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().max(200).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;
