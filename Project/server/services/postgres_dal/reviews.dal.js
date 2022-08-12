const dal = require("./pg");

const getReviews = async (id) => {
  let sql = `SELECT review_id, viewer_name, details, date, review.rating FROM review
  JOIN film USING (film_id)
  WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  return res.rows;
};

const addReview = async (body) => {
  const { username, details, rating, film_id } = body;
  let sql = `INSERT INTO public.review(
    viewer_name, details,  rating, film_id)
   VALUES ($1, $2, $3, $4);`;
  let res = await dal.query(sql, [username, details, rating, film_id]);

  return res.rows;
};

module.exports = { getReviews, addReview };
