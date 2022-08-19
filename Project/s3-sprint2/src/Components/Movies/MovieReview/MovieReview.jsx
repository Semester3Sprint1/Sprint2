import { useState, useContext, useEffect } from "react";
import styles from "./css/MovieReviews.module.css";
import AuthContext from "../../Context/auth-context";

import EditReview from "./EditReview";
import ShowReview from "./ShowReview";

const MovieReview = ({ review, useMongo, movieID, onEditReview, onDelete }) => {
  const [editReview, setEditReview] = useState(false);
  const authCtx = useContext(AuthContext);
  const username = authCtx.username;
  const userID = authCtx.userId;

  const [confirmUser, setconfirmUser] = useState(false);

  if (useMongo) {
    var { user } = review;
    var viewer_name = user.username;
  } else {
    var { viewer_name } = review;
  }

  useEffect(() => {
    username === viewer_name ? setconfirmUser(true) : setconfirmUser(false);
  }, []);

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
          onDelete={onDelete}
          confirmUser={confirmUser}
        />
      )}
    </>
  );
};

export default MovieReview;
