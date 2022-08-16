const { Review, validate } = require("../models/review");
const { User } = require("../models/user");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = await validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userID);
  if (!user) return res.status(400).send("Invalid Users.");
  const movie = await Movie.findById(req.body.movieID);
  if (!movie) return res.status(400).send("Invalid Movie.");

  const review = new Review({
    tagline: req.body.tagline,
    details: req.body.details,
    user: {
      _id: user._id,
      username: user.username,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
    },
    rating: req.body.rating,
  });
  await review.save();
  res.send(review);
});

module.exports = router;
