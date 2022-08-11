const express = require("express");
const router = express.Router();

const {
  getMovies,
  getFilms,
  getFilmActors,
  getGenres,
  getFilmGenres,
} = require("../services/postgres_dal/pg.getMovies.dal");

router.get("/", async (req, res) => {
  let films = await getFilms();

  for (film of films) {
    let actors = await getFilmActors(film.film_id);
    film.actors = actors;

    let genres = await getFilmGenres(film.film_id);
    film.genres = genres;
  }
  DEBUG && console.log(films);
  res.status(200).send(films);
});

router.get("/genres", async (req, res) => {
  let response = await getGenres();
  res.status(200).send(response);
});

module.exports = router;
