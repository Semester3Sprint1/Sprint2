import React from 'react'
import classes from './MovieBody.module.css'

const MovieBody = ({plot, genre, director, writer, stars, imdb, id, award}) => {

   
  return (
    <div   className={classes.body}>
        <h1 className={classes.title}>Synopsis</h1>
        <p className={classes.plot}>{plot}</p>
        <div className= {classes.block}>
        <h2 className={classes.title}>Genres:</h2>
        <ul>
        {genre.map((genres) =>   
        <li key={id}> {genres}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Director(s):</h2>
        <ul>
        {director.map((directors) =>
        <li key={id}>{directors}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Writer(s):</h2>
        <ul>
        {writer.map((writers) =>
        <li key={id}>{writers}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Stars:</h2>
        <ul>
        {stars.map((star) =>
        <li key={id}>{star}</li>
        )}
        </ul>
        <h2 className={classes.title}>IMDb Rating: <span className={classes.rating}>{imdb.rating}/10</span>  </h2>
        <h2 className={classes.title}>Award Details:</h2>
        <p className={classes.award}>{award.text}</p>
        </div>
        </div>
  )
}

export default MovieBody;