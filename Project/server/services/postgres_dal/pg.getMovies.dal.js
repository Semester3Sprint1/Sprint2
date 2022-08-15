const dal = require("./pg");
const { getReviews } = require("./reviews.dal");

let getMovies = async () => {
  const sql = `SELECT film_id AS _id, movie as title, plot AS fullplot, release_year as released,length as runtime,rated,language as languages,poster,imdb  
    FROM vw_full_movies
    GROUP BY film_id, movie, plot, release_year, length, rated, language, poster, imdb
    ORDER BY film_id ASC`;
  let res = await dal.query(sql);
  DEBUG && console.log(`Get Stores rows ${res.rows}`);
  return res.rows;
};

const getFilms = async () => {
  let sql = `SELECT film_id AS _id, title, description AS fullplot, release_year as released, length AS runtime, rating as rated, lang.name AS languages, special_features, poster, imdb FROM public.film
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

  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.name);
  });

  return arr;
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

const getFilmWriters = async (id) => {
  let sql = `SELECT first_name ||' '|| last_name AS name FROM writer
  JOIN film_writer USING (writer_id)
  WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.name);
  });

  return arr;
};

const getFilmDirectors = async (id) => {
  let sql = `SELECT first_name ||' '|| last_name AS name FROM director
  JOIN film_director USING (director_id)
  WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.name);
  });

  return arr;
};

const getGenres = async () => {
  const sql = `SELECT name AS genre FROM public.category
  WHERE type = 'generic'
  ORDER BY category_id ASC`;
  let res = await dal.query(sql);

  // This is here for a bit of formatting
  let arr = [];
  res.rows.forEach((row) => {
    arr.push(row.genre);
  });

  return arr;
};

const getFilmDetails = async (films) => {
  for (film of films) {
    let actors = await getFilmActors(film._id);
    let genres = await getFilmGenres(film._id);
    let writers = await getFilmWriters(film._id);
    let directors = await getFilmDirectors(film._id);
    let reviews = await getReviews(film._id);

    film.cast = actors;
    film.genres = genres;
    film.writers = writers;
    film.directors = directors;
    film.reviews = reviews;
  }

  return films;
};

module.exports = {
  getMovies,
  getGenres,
  getFilmDetails,
};
