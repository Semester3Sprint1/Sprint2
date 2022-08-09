import React from "react";

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
  return <div>{title}</div>;
};

export default MovieDetail;
