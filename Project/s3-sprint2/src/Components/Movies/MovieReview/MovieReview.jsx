import { useState, useContext, useEffect } from "react";
import styles from "./css/MovieReviews.module.css";

import EditReview from "./EditReview";
import ShowReview from "./ShowReview";

const MovieReview = ({ review, useMongo, movieID, onEditReview }) => {
  const [editReview, setEditReview] = useState(false);

  return (
    <>
      {editReview ? (
        <EditReview
          review={review}
          useMongo={useMongo}
          movieID={movieID}
          setEditReview={setEditReview}
          onEdit={onEditReview}
        />
      ) : (
        <ShowReview
          review={review}
          useMongo={useMongo}
          movieID={movieID}
          setEditReview={setEditReview}
        />
      )}
    </>
  );
};

export default MovieReview;
