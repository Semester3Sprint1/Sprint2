import React from 'react'
import classes from './MovieImage.module.css'
import StarRating from './StarRating'
const MovieImage = ({image}) => {
  return (
    <div className={classes.image}>
        <img src = {image} alt = 'Movie Poster' />
        <StarRating/>
        </div>
  )
}


export default MovieImage;