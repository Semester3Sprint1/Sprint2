import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/MovieReviews.module.css";
import AuthContext from "../../Context/auth-context";
import StarRating from "../MovieDetails/StarRating";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AddReview = ({ movieID, useMongo, onAddReview, setAddReview }) => {
  const [tagline, setTagline] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [details, setDetails] = useState("");

  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const username = authCtx.username;

  const toastProps = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  };

  const invalidToast = (message) => {
    toast.error(message, toastProps);
  };

  const successToast = (message) => {
    toast.success(message, toastProps);
  };

  const submitReview = (e) => {
    e.preventDefault();

    if (tagline === "" || details === "") {
      invalidToast("Invalid entry. No fields can be blank!");
      return;
    }

    // These might be better off being combined into one
    if (useMongo) {
      var reviewPackage = {
        movieID: movieID,
        userID: id,
        tagline: tagline,
        rating: reviewRating,
        details: details,
      };
    } else {
      var reviewPackage = {
        movieID: movieID,
        userID: username,
        tagline: tagline,
        rating: reviewRating,
        details: details,
      };
    }

    onAddReview(reviewPackage);
    successToast("Review posted successfully!");
    setAddReview(false);
  };

  return (
    <div className={styles.movieReview}>
      <form action="" onSubmit={submitReview}>
        <div className={styles.reviewHeader}>
          <div>
            <h2>{username}</h2>
          </div>
          {/* The stars will go here */}
          <div className={styles.reviewRating}>
            <StarRating rating={reviewRating} setRating={setReviewRating} />
            <h3>{reviewRating} / 10</h3>
          </div>
        </div>
        <hr />
        <div className={styles.reviewDetails}>
          <div className={styles.addReviewHeader}>
            <label htmlFor="tagline">Tagline</label>
            <input
              type="text"
              name="tagline"
              id="tagline"
              className="form-control"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Tagline goes here..."
            />
          </div>
          <br />
          <div className={styles.addReviewBody}>
            <label htmlFor="details">Your Review</label>
            <textarea
              type="text"
              name="details"
              id="details"
              className="form-control"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Review goes here..."
              rows="5"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
