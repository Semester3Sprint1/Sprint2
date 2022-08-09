import React from "react";
import MovieHeader from './MovieHeader'
import MovieImage from "./MovieImage";
import classes from "./MovieDetails.module.css"
import MovieBody from "./MovieBody";
import Card from "../../UI/Card";
const MovieDetail = ({ movie }) => {
  const {
    _id,
    awards,
    cast,
    countries,
    directors,
    fullplot,
    genres,
    imdb,
    lastupdated,
    plot,
    poster,
    rated,
    released,
    runtime,
    title,
    tomatoes,
    type,
    year,
  } = movie;

  

  return <div className="container">
    <MovieHeader 
  
  movie = {title} 
  rating = {rated}
  date = {released}
  length = {runtime}
  imdb = {imdb}/>
  <div className={classes.grid}>
    <div className={classes.image}>
  <MovieImage image = {poster} />
  </div>
  <Card>
    <MovieBody plot = {plot}/>
  </Card>
  </div>
  </div>;
};

export default MovieDetail;
