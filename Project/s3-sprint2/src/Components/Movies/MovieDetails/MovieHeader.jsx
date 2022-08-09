import {Fragment} from "react";
import { useEffect } from "react";
import classes from './MovieHeader.module.css'

const MovieHeader = ({movie,rating, date, length,lang, id}) => {

    let newDate = new Date(date)


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
                     <li key ={id}>Language: {languages}</li>
        )}                       
                </ul>
            </div>
        </header>
        
    </Fragment>
  )
};

export default MovieHeader;