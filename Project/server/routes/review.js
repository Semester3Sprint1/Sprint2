const { Review, validate } = require("../models/review");
const { User } = require("../models/user");
const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const auth = require("../middleware/auth.middle");

router.get("/", async (req, res) => {
  const reviews = await Review.find().select("-user.password -user.email");
  res.send(reviews);
});

router.get("/:id", async (req, res) => {
  const filter = {
    "movie._id": new ObjectId(req.params.id),
  };
  const review = await Review.find(filter).select("-user.password -user.email");
  if (!review) return res.status(404).send("The Movie id was not found");
  res.send(review);
});

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

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const check = await Review.findById(req.params.id);
  const user = await User.findById(req.body.userID);

  if (!user) return res.status(400).send("Invalid User");

  if (req.body.userID != check.user._id)
    return res.status(400).send("User Does Not Match Owner of Post");

  const movie = await Movie.findById(req.body.movieID);
  if (!movie) return res.status(400).send("Invalid User");

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    {
      tagline: req.body.tagline,
      details: req.body.details,
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
      rating: req.body.rating,
    },
    { new: true }
  ).select("-user.password -user.email");

  if (!review)
    return res.status(404).send("The review with the given ID was not found");

  res.send(review);
});

router.delete("/:id", async (req, res) => {
  const check = await Review.findById(req.params.id);
  if (!check) return res.status(400).send("Review no longer exists");

  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review)
    return res.status
      .apply(404)
      .send("The Review with the given ID was not found");

  res.send(review);
});

module.exports = router;
