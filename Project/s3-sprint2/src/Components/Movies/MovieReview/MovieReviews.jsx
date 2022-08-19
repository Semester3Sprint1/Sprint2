import React from "react";
import MovieReview from "./MovieReview";
import styles from "./css/MovieReviews.module.css";
import { useState } from "react";
import AddReview from "./AddReview";
import banner from "../../Main/images/KittyBanner.png";

const MovieReviews = ({
  reviews,
  setViewReviews,
  movieID,
  useMongo,
  onAddReview,
  onEditReview,
  onDelete,
}) => {
  const [addReview, setAddReview] = useState(false);

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
                    <MovieReview
                      review={review}
                      useMongo={useMongo}
                      movieID={movieID}
                      onEditReview={onEditReview}
                      onDelete={onDelete}
                    />
                    <hr />
                  </>
                );
              })}
            </>
          ) : (
            <img
              src={banner}
              alt="Leave a Review Kitty Banner"
              className={styles.noReview}
            />
          )}
        </>
      ) : (
        <AddReview
          movieID={movieID}
          useMongo={useMongo}
          onAddReview={onAddReview}
          setAddReview={setAddReview}
        />
      )}
    </div>
  );
};

export default MovieReviews;
