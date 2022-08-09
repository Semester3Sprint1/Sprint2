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
    languages,
    directors,
    fullplot,
    genres,
    imdb,
    poster,
    rated,
    released,
    runtime,
    title,
    writers,
  } = movie;

  

  return <div className="container">
    <MovieHeader 
  
  movie = {title} 
  rating = {rated}
  date = {released}
  length = {runtime}
  imdb = {imdb}
  lang = {languages}/>
  <div className={classes.grid}>
    <div className={classes.image}>
  <MovieImage image = {poster} />
  </div>
  
  <Card>
  <div className={classes.body}>
    <MovieBody 
    plot = {fullplot}
    genre = {genres}
    director = {directors}
    writer = {writers}
    />
    </div>
  </Card>
  
  </div>
  </div>;
};

export default MovieDetail;
