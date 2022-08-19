import React from "react";
import { useState, useContext, useEffect } from "react";
import styles from "./css/MovieReviews.module.css";
import AuthContext from "../../Context/auth-context";
import { collapseToast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import StarDisplay from "./StarDisplay";
import { successToast } from "../../Services/toast";

const ShowReview = ({
  review,
  useMongo,
  setEditReview,
  onDelete,
  movieID,
  confirmUser,
}) => {
  if (useMongo) {
    var { _id, user, rating, details, tagline } = review;
    var viewer_name = user.username;
    var review_id = review._id;
  } else {
    var { review_id, viewer_name, rating, date, details, tagline } = review;
    var review_date = new Date(date);
  }

  const deleteReview = () => {
    onDelete(review_id, movieID);
    successToast("Review deleted!");
  };

  return (
    <div className={styles.movieReview}>
      <div className={styles.reviewHeader}>
        <div>
          <h2>
            {" "}
            {viewer_name}{" "}
            {confirmUser ? (
              <>
                <button className={styles.btnEdit} onClick={() => setEditReview(true)}>
                  <AiFillEdit size={20} />{" "}
                </button>
                <button className={styles.btnDelete} onClick={() => deleteReview()}>X</button>
              </>
            ) : (
              ""
            )}
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

export default ShowReview;
