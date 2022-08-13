const dal = require("./pg");

let pgSearchAll = async (body) => {
  const { searchText } = body;
  let sql = `SELECT movie as title, plot, release_year as released,length as runtime,rated,language as languages,actor as cast,genre as genres,director as directors,writer as writers,poster,imdb 
  from vw_full_movies 
  WHERE to_tsvector(movie || ' ' || actor ) @@ to_tsquery($1)`;

  let res = await dal.query(sql, [searchText]);
  return res.rows;
};

module.exports = { pgSearchAll };
