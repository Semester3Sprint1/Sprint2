import React from "react";
import classes from "./MovieBody.module.css";

const MovieBody = ({
  plot,
  otherPlot,
  genre,
  director,
  writer,
  stars,
  imdb,
  award,
}) => {
  return (
    <div className={classes.body}>
      <h1 className={classes.title}>Synopsis</h1>
      <p className={classes.plot}>{plot ? plot : otherPlot}</p>
      <hr />
      <div className={classes.block}>
        <h2 className={classes.title}>Genre(s):</h2>
        <ul>
          {genre ? (
            genre.map((genres, i) => <li key={i}> {genres}</li>)
          ) : (
            <li>No genre on record.</li>
          )}
        </ul>
      </div>
      <hr />
      <div className={classes.block}>
        <h2 className={classes.title}>Director(s):</h2>
        <ul>
          {director ? (
            director.map((directors, i) => <li key={i}>{directors}</li>)
          ) : (
            <li>No director on record.</li>
          )}
        </ul>
      </div>
      <hr />
      <div className={classes.block}>
        <h2 className={classes.title}>Writer(s):</h2>
        <ul>
          {writer ? (
            writer.map((writers, i) => <li key={i}>{writers}</li>)
          ) : (
            <li>No writer on record.</li>
          )}
        </ul>
      </div>
      <hr />
      <div className={classes.block}>
        <h2 className={classes.title}>Stars:</h2>
        <ul>
          {stars ? (
            stars.map((star, i) => <li key={i}>{star}</li>)
          ) : (
            <li>No stars here. Just actors.</li>
          )}
        </ul>
        <hr />
        <h2 className={classes.title}>
          IMDb Rating: <span className={classes.rating}>{imdb.rating}/10</span>{" "}
        </h2>
        <hr />
        <h2 className={classes.title}>Award Details:</h2>
        {award ? (
          <p className={classes.award}>{award.text}</p>
        ) : (
          <p>No awards.</p>
        )}
      </div>
    </div>
  );
};

export default MovieBody;
