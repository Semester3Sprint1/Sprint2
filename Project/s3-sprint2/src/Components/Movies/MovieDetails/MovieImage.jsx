import React from 'react'
import classes from './MovieImage.module.css'
import StarRating from './StarRating'
const MovieImage = ({image}) => {
  return (
    <div className={classes.image}>
        <img src = {image} alt = 'Movie Poster' />
        <StarRating/>
        <button className={classes.btnReview}>44 User Reviews</button>
        </div>
  )
}


export default MovieImage;