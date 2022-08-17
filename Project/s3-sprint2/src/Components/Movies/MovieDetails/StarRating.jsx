import { useState } from "react";
import classes from "./StarRating.module.css";
// import { FaStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  // const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(10)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              id="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaPaw
              className={classes.star}
              color={ratingValue <= (hover || rating) ? "#03045e" : "#e4e5e9"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
