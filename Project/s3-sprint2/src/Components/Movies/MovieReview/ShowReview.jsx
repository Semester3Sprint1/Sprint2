import React from "react";
import { useState, useContext, useEffect } from "react";
import styles from "./css/MovieReviews.module.css";
import AuthContext from "../../Context/auth-context";
import { collapseToast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import StarDisplay from "./StarDisplay";

const ShowReview = ({ review, useMongo, setEditReview }) => {
  const authCtx = useContext(AuthContext);
  const username = authCtx.username;

  const [confirmUser, setconfirmUser] = useState(false);
  useEffect(() => {
    username === viewer_name ? setconfirmUser(true) : setconfirmUser(false);
  }, []);

  if (useMongo) {
    var { user, rating, details, tagline } = review;
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
            {" "}
            {viewer_name}{" "}
            {confirmUser ? (
              <>
                {useMongo && (
                  <button onClick={() => setEditReview(true)}>
                    <AiFillEdit size={20} />{" "}
                  </button>
                )}
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
