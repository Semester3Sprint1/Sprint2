const express = require("express");
const router = express.Router();

const {
  getMovies,
  getGenres,
  getFilmDetails,
} = require("../services/postgres_dal/pg.getMovies.dal");
const {
  addReview,
  uppdateReview,
  deleteReview,
} = require("../services/postgres_dal/reviews.dal");

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
  let response = await addReview(req.body);
  res.status(200).send(response);
});

router.put("/review/edit", async (req, res) => {
  let response = await uppdateReview(rq.body);
  res.status(200).send(response);
});

router.delete("/review/delete", async (req, res) => {
  let response = await deleteReview(req.body);
  res.status(200).send(response);
});

module.exports = router;
