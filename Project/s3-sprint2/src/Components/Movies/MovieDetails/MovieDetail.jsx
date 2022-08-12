import React from "react";
import MovieHeader from "./MovieHeader";
import MovieImage from "./MovieImage";
import classes from "./MovieDetails.module.css";
import MovieBody from "./MovieBody";
import Card from "../../UI/Card";
import { useState } from "react";

const MovieDetail = ({ movie, useMongo }) => {
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
  const [pgLang, setPgLang] = useState([languages]);
  const [pgRating, setPgRating] = useState({ rating: imdb });

  return (
    <div className="container">
      <MovieHeader
        movie={title}
        rating={rated}
        date={released}
        length={runtime}
        lang={useMongo ? languages : pgLang}
      />
      <div className={classes.grid}>
        <div className={classes.image}>
          <MovieImage image={poster} />
        </div>

        <Card>
          <div className={classes.body}>
            <MovieBody
              plot={fullplot}
              genre={genres}
              director={directors}
              writer={writers}
              stars={cast}
              imdb={useMongo ? imdb : pgRating}
              award={awards}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MovieDetail;
