import React from 'react'
import classes from './MovieBody.module.css'

const MovieBody = ({plot, genre, director, writer}) => {

   
  return (
    <div className={classes.body}>
        <h1 className={classes.title}>Synopsis</h1>
        <p className={classes.plot}>{plot}</p>
        <div className= {classes.block}>
        <h2 className={classes.title}>Genres:</h2>
        <ul>
        {genre.map((genres) =>   
        <li>{genres}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Director(s):</h2>
        <ul>
        {director.map((directors) =>
        <li>{directors}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Writer(s):</h2>
        <ul>
        {writer.map((writers) =>
        <li>{writers}</li>
        )}
        </ul>
        </div>
        </div>
  )
}

export default MovieBody;