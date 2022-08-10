import React from 'react'
import classes from './MovieImage.module.css'
import StarRating from './StarRating'
const MovieImage = ({image}) => {

    let reviews = 50
  return (
    <div className={classes.image}>
        <img src = {image} alt = 'Movie Poster' />
        <StarRating/>
        <button className={classes.btnReview}><span className='badge bg-primary rounded-circle ms-2 ' >{reviews}</span> User Reviews</button>
        </div>
  )
}


export default MovieImage;