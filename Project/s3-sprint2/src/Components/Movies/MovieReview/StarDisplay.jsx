import React from "react";
import classes from "../MovieDetails/StarRating.module.css";
import { FaStar } from "react-icons/fa";

const StarDisplay = ({ rating }) => {
  const displayStars = () => {
    var counter = 0;
    while (counter < 10) {
      if (rating.length >= counter) {
        counter++;
        return <FaStar className={classes.star} color={"#ffc107"} size={50} />;
      } else {
        counter++;
        return <FaStar className={classes.star} color={"#e4e5e9"} size={50} />;
      }
    }
  };

  return (
    <div>
      {rating.forEach((star) => {
        return <>1</>;
      })}
    </div>
  );
};

export default StarDisplay;
