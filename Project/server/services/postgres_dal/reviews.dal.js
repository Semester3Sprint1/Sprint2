const dal = require("./pg");

const getReviews = async (id) => {
  let sql = `SELECT review_id, viewer_name, details, date, review.rating, tagline FROM review
  JOIN film USING (film_id)
  WHERE film_id = $1`;
  let res = await dal.query(sql, [id]);

  return res.rows;
};

const addReview = async (body) => {
  const { userID, details, rating, movieID, tagline } = body;
  let sql = `INSERT INTO public.review(
    viewer_name, details,  rating, film_id, tagline)
   VALUES ($1, $2, $3, $4, $5);`;
  let res = await dal.query(sql, [userID, details, rating, movieID, tagline]);

  return res.rows;
};

const uppdateReview = async (body) => {
  const { reviewID, details, rating, tagline } = body;
  let sql = `UPDATE public.review
	SET  details=$2, rating=$3, tagline=$4
	WHERE review_id = $1`;
  let res = await dal.query(sql, [reviewID, details, rating, tagline]);

  return res.rows;
};

const deleteReview = async (body) => {
  const { reviewID } = body;
  let sql = `DELETE FROM public.review
	WHERE $1`;
  let res = await dal.query(sql, [reviewID]);

  return res.rows;
};

module.exports = { getReviews, addReview, uppdateReview, deleteReview };
