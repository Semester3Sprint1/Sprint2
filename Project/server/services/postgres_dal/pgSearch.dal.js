const dal = require("./pg");

let pgSearchAll = async (searchText) => {
  let sql = `SELECT film_id AS _id, movie as title, plot AS fullplot, release_year as released,length as runtime,rated,language as languages,poster,imdb 
  from vw_full_movies 
  WHERE fulltext @@ to_tsquery($1)
  GROUP BY film_id, movie, plot, release_year, length, rated, language, poster, imdb`;

  let res = await dal.query(sql, [searchText]);
  return res.rows;
};

const pgSearchByText = async (searchText) => {
  let textFormat = `%${searchText}%`;
  let sql = `SELECT film_id AS _id, title, description AS fullplot, release_year as released, length AS runtime, rating as rated, lang.name AS languages, special_features, poster, imdb FROM public.film
  JOIN public.language AS lang USING (language_id)
  WHERE title ILIKE $1
  ORDER BY film_id ASC`;

  const res = await dal.query(sql, [textFormat]);
  // console.log(res.rows);
  return res.rows;
};

module.exports = { pgSearchAll, pgSearchByText };
