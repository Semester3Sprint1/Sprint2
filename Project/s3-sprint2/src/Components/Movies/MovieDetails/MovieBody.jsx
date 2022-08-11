import React from 'react'
import classes from './MovieBody.module.css'

const MovieBody = ({plot, genre, director, writer, stars, imdb, award}) => {

   
  return (
    <div   className={classes.body}>
        <h1 className={classes.title}>Synopsis</h1>
        <p className={classes.plot}>{plot}</p>
        <div className= {classes.block}>
        <h2 className={classes.title}>Genre(s):</h2>
        <ul>
        {genre.map((genres,i) =>   
        <li key={i}> {genres}</li>
        )}
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Director(s): {!director ? "No Director" : ""}</h2>
        <ul>
         {director && director.map((directors,i) =>
        <li key={i}>{directors}</li>
        )}   
        </ul>
        </div>
        <div className= {classes.block}>
        
        <h2 className={classes.title}>Writer(s): {!writer ? "No Writer" : ""}</h2>
        <ul>
        {writer && writer.map((writers,i) =>
        <li key={i}>{writers}</li>
        )}
        
        </ul>
        </div>
        <div className= {classes.block}>
        <h2 className={classes.title}>Stars:{!stars ? "No Stars Only Actors"  : ""}</h2>
        <ul>
         {stars &&  stars.map((star,i) =>
        <li key={i}>{star}</li>
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