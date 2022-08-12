import { Fragment } from "react";
import classes from "./MovieHeader.module.css";

const MovieHeader = ({ movie, rating, date, length, lang }) => {
  let newDate = new Date(date);

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.movieDetails}>
          <h1>{movie}</h1>
          <ul>
            <li>
              Year: {newDate.toLocaleDateString("en-us", { year: "numeric" })}
            </li>
            <li>- Rating: {rating ? rating : `No recorded rating`}</li>
            <li>
              - Length: {length ? `${length} minutes` : `No length on record`}
            </li>
            <li>
              - Language(s):
              {lang
                ? lang.map((languages, i) => (
                    <span key={i}>
                      {" "}
                      {languages}
                      {lang.length > i + 1 && `,`}
                    </span>
                  ))
                : "This is silent film"}
            </li>
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default MovieHeader;
