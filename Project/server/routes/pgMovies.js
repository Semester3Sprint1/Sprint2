const express = require("express");
const router = express.Router();

const {
  getMovies,
  getGenres,
  getFilmDetails,
} = require("../services/postgres_dal/pg.getMovies.dal");
const { addReview } = require("../services/postgres_dal/reviews.dal");

router.get("/", async (req, res) => {
  let films = await getMovies();

  let response = await getFilmDetails(films);
  DEBUG && console.log(response);
  res.status(200).send(response);
});

router.get("/genres", async (req, res) => {
  let response = await getGenres();
  res.status(200).send(response);
});

router.post("/review/new", async (req, res) => {
  let response = await addReview();
  res.status(200).send(response);
});

module.exports = router;
