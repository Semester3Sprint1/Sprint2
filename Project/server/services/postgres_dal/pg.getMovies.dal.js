const dal = require("./pg");

let getMovies = async () => {
  const sql =
    "SELECT movie, plot, release_year as year, length, rated, language, actor, genre, writer, director, poster, imdb  FROM vw_full_movies";
  let res = await dal.query(sql);
  DEBUG && console.log(`Get Stores rows ${res.rows}`);
  return res.rows;
};

const getFilms = async () => {
  let sql = `SELECT film_id, title, description, release_year as released, length, rating as rated, lang.name AS language, special_features, poster, imdb as rating FROM public.film
  JOIN public.language AS lang USING (language_id)
  ORDER BY film_id ASC`;
  let res = await dal.query(sql);
  DEBUG && console.log("Movies: ", res.rows);

  return res.rows;
};

const getFilmActors = async (id) => {
  let sql = `SELECT first_name ||' '|| last_name AS name FROM film_actor
JOIN actor USING (actor_id)
WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  return res.rows;
};

const getFilmGenres = async (id) => {
  let sql = `SELECT name AS genre FROM film_category
JOIN category USING (category_id)
WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.genre);
  });

  return arr;
};

const getGenres = async () => {
  const sql = `SELECT name AS genre FROM public.category
  ORDER BY category_id ASC`;
  let res = await dal.query(sql);

  // This is here for a bit of formatting
  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.genre);
  });

  return arr;
};

module.exports = {
  getMovies,
  getFilms,
  getFilmActors,
  getFilmGenres,
  getGenres,
};