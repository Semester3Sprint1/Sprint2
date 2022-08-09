import React from 'react'
import classes from './MovieImage.module.css'
const MovieImage = ({image}) => {
  return (
    <div className={classes.image}>
        <img src = {image} alt = 'Movie Poster' />
        </div>
  )
}


export default MovieImage;