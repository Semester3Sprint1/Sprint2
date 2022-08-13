const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMoviesByGenre,
  getGenres,
} = require("../services/mongo_dal/getMovies.dal");

router.get("/", async (req, res) => {
  let { page } = req.query;
  DEBUG && console.log(page);
  let response = await getMovies({ page_number: 0, page_size: 3000 });
  res.status(200).send(response);
});

router.get("/getGenres", async (req, res) => {
  let response = await getGenres();
  res.status(200).send(response);
});

router.get("/:genre", async (req, res) => {
  let { page } = req.query;
  // console.log(`The page number query: ${page}`);
  let response = await getMoviesByGenre({
    page_number: page,
    page_size: 3000,
    genre: req.params.genre,
  });
  res.status(200).send(response);
});

module.exports = router;
