import React from "react";
import classes from "../MovieDetails/StarRating.module.css";
// import { FaStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
const StarDisplay = ({ rating }) => {
  const displayStars = () => {
    return (
      <>
        {[...Array(10)].map((star, i) => {
          if (i < rating) {
            return <FaPaw color={"#03045e"} size={50} />;
          } else {
            return <FaPaw color={"#e4e5e9"} size={50} />;
          }
        })}
      </>
    );
  };

  return <div>{displayStars()}</div>;
};

export default StarDisplay;
