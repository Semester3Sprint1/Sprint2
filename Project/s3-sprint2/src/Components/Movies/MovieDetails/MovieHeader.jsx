import {Fragment} from "react";
import { useEffect } from "react";
import classes from './MovieHeader.module.css'

const MovieHeader = ({movie,rating, date, length, imdb,lang}) => {

    let newDate = new Date(date)
    console.log(lang)


  return (
    <Fragment>
        <header className={classes.header}>
            
            <div className={classes.movieDetails}>
            <h1>{movie}</h1>
                <ul>
                    
                    <li> Year: {newDate.toLocaleDateString('en-us',{year:"numeric"})}</li>
                    <li>Rating: {!rating ? `Not Rated`: rating}</li>
                    <li>Length: {length}m</li>
                    {lang.map((languages) =>   
                     <li>Language: {languages}</li>
        )}
                    
          
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