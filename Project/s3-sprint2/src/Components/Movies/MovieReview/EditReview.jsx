import React from "react";
import styles from "./css/MovieReviews.module.css";
import StarDisplay from "./StarDisplay";

const EditReview = ({ review, useMongo, setEditReview }) => {
  if (useMongo) {
    var { _id, user, rating, details, tagline } = review;
    var viewer_name = user.username;
  } else {
    var { viewer_name, rating, date, details, tagline } = review;
    var review_date = new Date(date);
  }

  return (
    <div className={styles.movieReview}>
      <div className={styles.reviewHeader}>
        <div>
          <h2>
            {viewer_name}

            <button onClick={() => setEditReview(false)}>
              {/* <AiFillEdit size={20} /> */} Confirm
            </button>
          </h2>
        </div>

        <div className={styles.reviewRating}>
          <div className={styles.reviewDate}>
            {!useMongo ? (
              <span>{review_date.toLocaleDateString()}</span>
            ) : (
              <span></span>
            )}

            <h3>{rating} / 10</h3>
          </div>

          <div>
            <StarDisplay rating={rating} />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.reviewDetails}>
        <h4>{tagline}</h4>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default EditReview;
