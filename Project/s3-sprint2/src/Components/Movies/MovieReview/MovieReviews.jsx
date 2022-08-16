import React from "react";
import MovieReview from "./MovieReview";
import styles from "./css/MovieReviews.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddReview from "./AddReview";

const MovieReviews = ({ reviews, setViewReviews, movieID, useMongo }) => {
  const [addReview, setAddReview] = useState(false);

  const navigate = useNavigate();
  const goToAddReview = (id) => navigate(`/movies/${id}/detail/reviews/add`);

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.controlButtons}>
        <button
          className="btn btn-primary"
          onClick={() => setAddReview(!addReview)}
        >
          {addReview ? `View Reviews` : `Write a review!`}
        </button>
        <button
          onClick={() => setViewReviews(false)}
          className="btn btn-primary"
        >
          Film Details
        </button>
      </div>

      <hr />
      {!addReview ? (
        <>
          {reviews.length > 0 ? (
            <>
              {reviews.map((review) => {
                return (
                  <>
                    <MovieReview review={review} />
                    <hr />
                  </>
                );
              })}
            </>
          ) : (
            <p>No reviews yet. Consider adding one!</p>
          )}
        </>
      ) : (
        <AddReview movieID={movieID} useMongo={useMongo} />
      )}
    </div>
  );
};

export default MovieReviews;
