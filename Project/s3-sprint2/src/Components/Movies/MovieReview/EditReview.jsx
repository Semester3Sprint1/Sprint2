import React, { useContext, useState } from "react";
import styles from "./css/MovieReviews.module.css";
import StarDisplay from "./StarDisplay";
import StarRating from "../MovieDetails/StarRating";
import AuthContext from "../../Context/auth-context";
import { successToast } from "../../Services/toast";
import {FaCheck} from "react-icons/fa";

const EditReview = ({ review, useMongo, setEditReview, onEdit }) => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userId;

  if (useMongo) {
    var { user, rating, details, tagline } = review;
    var viewer_name = user.username;
    var review_id = review._id;
  } else {
    var { review_id, viewer_name, rating, date, details, tagline } = review;
    var review_date = new Date(date);
  }
  const [newRating, setNewRating] = useState(rating);
  const [newDetails, setNewDetails] = useState(details);
  const [newTagline, setNewTagline] = useState(tagline);

  const submitEdit = async (e) => {
    e.preventDefault();
    if (useMongo) {
      var newReview = {
        userID: userID,
        movieID: review.movie._id,
        rating: newRating,
        details: newDetails,
        tagline: newTagline,
      };
    } else {
      var newReview = {
        rating: newRating,
        details: newDetails,
        tagline: newTagline,
      };
    }

    await onEdit({ review: newReview, id: review_id });
    successToast("Review edited!");
    setEditReview(false);
  };

  return (
    <div className={styles.movieReview}>
      <form onSubmit={submitEdit}>
        <div className={styles.reviewHeader}>
          <div>
            <h2>
              {viewer_name}

              <button className={styles.btnCheck} type="submit">
                <FaCheck/>  <span>Confirm</span>
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

              <h3>{newRating} / 10</h3>
            </div>

            <div>
              <StarRating rating={newRating} setRating={setNewRating} />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.reviewDetails}>
          <div className={styles.addReviewHeader}>
            <label htmlFor="tagline">Edit Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              className="form-control"
            />
          </div>
          <br />
          <div className={styles.addReviewBody}>
            <label htmlFor="details">Edit Review</label>
            <textarea
              type="text"
              id="details"
              name="details"
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
