const express = require("express");
const router = express.Router();

const {
  getMovies,
  getFilms,
  getFilmActors,
  getGenres,
  getFilmGenres,
  getFilmDirectors,
  getFilmWriters,
} = require("../services/postgres_dal/pg.getMovies.dal");

router.get("/", async (req, res) => {
  let films = await getFilms();

  for (film of films) {
    let actors = await getFilmActors(film._id);
    let genres = await getFilmGenres(film._id);
    let writers = await getFilmWriters(film._id);
    let directors = await getFilmDirectors(film._id);

    film.cast = actors;
    film.genres = genres;
    film.writers = writers;
    film.directors = directors;

    // let languages = [];
    // languages.push(film.language);
    // film.languages = languages;
  }
  DEBUG && console.log(films);
  res.status(200).send(films);
});

router.get("/genres", async (req, res) => {
  let response = await getGenres();
  res.status(200).send(response);
});

module.exports = router;
