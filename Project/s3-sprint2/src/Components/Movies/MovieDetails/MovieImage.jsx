import React from "react";
import classes from "./MovieImage.module.css";
import StarRating from "./StarRating";
const MovieImage = ({ image, reviews, goToMovieReview, setViewReviews }) => {
  let reviewTotal = reviews.length;
  return (
    <div className={classes.image}>
      <img src={image} alt="Movie Poster" />
      <StarRating />
      <button
        className={classes.btnReview}
        onClick={() => setViewReviews(true)}
      >
        <span className="badge bg-primary rounded-circle ms-2 ">
          {reviewTotal > 0 ? reviewTotal : 0}
        </span>{" "}
        User Reviews
      </button>
    </div>
  );
};

export default MovieImage;
