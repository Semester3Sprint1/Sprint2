import {Fragment} from "react";
import { useEffect } from "react";
import classes from './MovieHeader.module.css'

const MovieHeader = ({movie,image,rating, date, length, imdb}) => {

    let newDate = new Date(date)



  return (
    <Fragment>
        <header className={classes.header}>
            
            <div className={classes.movieDetails}>
            <h1>{movie}</h1>
                <ul>
                    <li>{newDate.toLocaleDateString('en-us',{year:"numeric"})}</li>
                    <li>-{!rating ? `Not Rated`: rating}-</li>
                    <li>{length}m</li>
                </ul>
            </div>
            <div>
                <p>IMDb Rating <span>{imdb.rating}/10</span> </p>
                <p>Your Rating <span>{imdb.rating}/10</span> </p>
                
            </div>
        </header>
        
    </Fragment>
  )
};

export default MovieHeader;