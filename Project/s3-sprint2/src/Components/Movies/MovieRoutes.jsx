import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import AddReview from "./MovieReview/AddReview";
import MovieReviews from "./MovieReview/MovieReviews";
import Movies from "./Movies";

const MovieRoutes = ({ moviePackage, useMongo }) => {
  const {
    handleSelect,
    selectedMovie,
    onAddReview,
    currentReviews,
    onEditReview,
    onDeleteReview,
  } = moviePackage;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies
            handleSelect={handleSelect}
            moviePackage={moviePackage}
            useMongo={useMongo}
          />
        }
      />
      <Route
        path="/:id/detail"
        element={
          <MovieDetail
            movie={selectedMovie}
            useMongo={useMongo}
            onAddReview={onAddReview}
            onEditReview={onEditReview}
            currentReviews={currentReviews}
            onDelete={onDeleteReview}
          />
        }
      />
    </Routes>
  );
};

export default MovieRoutes;
