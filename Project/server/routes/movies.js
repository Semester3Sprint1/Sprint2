const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMoviesByGenre,
  getGenres,
} = require("../services/mongo_dal/getMovies.dal");

router.get("/", async (req, res) => {
  let response = await getMovies({ page_number: 2, page_size: 15 });
  // console.log(response);
  res.status(200).send(response);
});

router.get("/getGenres", async (req, res) => {
  let response = await getGenres();
  res.status(200).send(response);
});

router.get("/:genre", async (req, res) => {
  let response = await getMoviesByGenre({
    page_number: 2,
    page_size: 15,
    genre: req.params.genre,
  });
  // console.log(response);
  res.status(200).send(response);
});

module.exports = router;
