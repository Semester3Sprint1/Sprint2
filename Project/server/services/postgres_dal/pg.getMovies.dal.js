dal = require("./pg");

let pgGetMoviesData = async () => {
  const sql =
    "SELECT movie, plot, release_year as year, length, rated, language, actor, genre, writer, director, poster, imdb  FROM vw_full_movies";
  let res = await dal.query(sql);
  DEBUG && console.log(`Get Stores rows ${res.rows}`);
  return res.rows;
};

module.export = {
  pgGetMoviesData,
};
