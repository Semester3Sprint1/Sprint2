import React from "react";
import MovieReview from "./MovieReview";
import styles from "./css/MovieReviews.module.css";

const MovieReviews = ({ reviews, setViewReviews }) => {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.controlButtons}>
        <button className="btn btn-primary">Write a review!</button>
        <button
          onClick={() => setViewReviews(false)}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>

      <hr />
      {reviews.map((review) => {
        return (
          <>
            <MovieReview review={review} />
            <hr />
          </>
        );
      })}
    </div>
  );
};

export default MovieReviews;
