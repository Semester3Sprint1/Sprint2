import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import AddReview from "./MovieReview/AddReview";
import MovieReviews from "./MovieReview/MovieReviews";
import Movies from "./Movies";

const MovieRoutes = ({ moviePackage, useMongo }) => {
  const { handleSelect, selectedMovie, onAddReview, currentReviews } =
    moviePackage;

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
            currentReviews={currentReviews}
          />
        }
      />
    </Routes>
  );
};

export default MovieRoutes;
