import React from 'react'
import classes from './MovieBody.module.css'
const MovieBody = ({plot}) => {
  return (
    <div>
        <p className={classes.plot}>{plot}</p>
        </div>
  )
}

export default MovieBody;