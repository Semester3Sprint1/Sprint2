import React from "react";
import MovieHeader from "./MovieHeader";
import MovieImage from "./MovieImage";
import classes from "./MovieDetails.module.css";
import MovieBody from "./MovieBody";
import Card from "../../UI/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieReviews from "../MovieReview/MovieReviews";

const MovieDetail = ({
  movie,
  useMongo,
  onAddReview,
  onEditReview,
  currentReviews,
  onDelete,
}) => {
  const {
    _id,
    awards,
    cast,
    languages,
    directors,
    plot,
    fullplot,
    genres,
    imdb,
    poster,
    rated,
    released,
    runtime,
    title,
    writers,
    reviews,
  } = movie;
  const [pgLang, setPgLang] = useState([languages]);
  const [pgRating, setPgRating] = useState({ rating: imdb });
  const [viewReviews, setViewReviews] = useState(false);

  const navigate = useNavigate();
  const goToMovieReview = (id) => navigate(`/movies/${id}/detail/reviews`);

  return (
    <div className="container">
      <MovieHeader
        movie={title}
        rating={rated}
        date={released}
        length={runtime}
        lang={useMongo ? languages : pgLang}
      />
      {!viewReviews ? (
        <div className={classes.grid}>
          <div className={classes.image}>
            <MovieImage
              image={poster}
              reviews={reviews && reviews.length > 0 ? reviews : currentReviews}
              setViewReviews={setViewReviews}
              goToMovieReview={goToMovieReview}
            />
          </div>

          <Card>
            <div className={classes.body}>
              <MovieBody
                plot={fullplot}
                otherPlot={plot}
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
      ) : (
        <MovieReviews
          reviews={reviews && reviews.length > 0 ? reviews : currentReviews}
          setViewReviews={setViewReviews}
          movieID={movie._id}
          useMongo={useMongo}
          onAddReview={onAddReview}
          onEditReview={onEditReview}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default MovieDetail;
