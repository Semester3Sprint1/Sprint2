import React from "react";
import styles from "./css/MovieReviews.module.css";

const MovieReview = ({ review }) => {
  const { viewer_name, rating, date, details, tagline } = review;
  let review_date = new Date(date);
  return (
    <div className={styles.movieReview}>
      <div className={styles.reviewHeader}>
        <div>
          <h2>{viewer_name}</h2>
        </div>
        <div className={styles.reviewRating}>
          <h3>{rating} / 10</h3>
          <span>{review_date.toLocaleDateString()}</span>
        </div>
      </div>
      <div className={styles.reviewDetails}>
        <h4>{tagline}</h4>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default MovieReview;
