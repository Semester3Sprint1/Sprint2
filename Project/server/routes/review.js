const { Review, validate } = require("../models/review");
const { User } = require("../models/user");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { movieID, userID, tagline, rating, details } = req.body;
  const { error } = await validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(userID);
  if (!user) return res.status(400).send("Invalid Users.");
  const movie = await Movie.findById(movieID);
  if (!movie) return res.status(400).send("Invalid Movie.");

  const review = new Review({
    tagline: tagline,
    details: details,
    user: {
      _id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
    rating: rating,
  });
  await review.save();
  res.send(review);
});

module.exports = router;
