import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import AddReview from "./MovieReview/AddReview";
import MovieReviews from "./MovieReview/MovieReviews";
import Movies from "./Movies";

const MovieRoutes = ({ moviePackage, useMongo }) => {
  const { handleSelect, selectedMovie, onAddReview } = moviePackage;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies handleSelect={handleSelect} moviePackage={moviePackage} />
        }
      />
      <Route
        path="/:id/detail"
        element={
          <MovieDetail
            movie={selectedMovie}
            useMongo={useMongo}
            onAddReview={onAddReview}
          />
        }
      />
      {/* Might just get rid of these */}
      <Route path="/:id/detail/reviews" element={<MovieReviews />} />
      <Route path="/:id/detail/reviews/add" element={<AddReview />} />
    </Routes>
  );
};

export default MovieRoutes;
