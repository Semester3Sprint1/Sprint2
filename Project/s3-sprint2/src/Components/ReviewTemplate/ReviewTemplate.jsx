import { Fragment } from "react";
import styles from "./css/ReviewTemplate.module.css";
import React from "react";

const ReviewTemplate = () => {
  return (
    <Fragment>
      <div>
        <h1 className={styles.reviewTitle}>Leave a Review:</h1>
      </div>
    </Fragment>
  );
};

export default ReviewTemplate;
