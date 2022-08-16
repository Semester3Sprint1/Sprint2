import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import MovieReviews from "./MovieReview/MovieReviews";
import Movies from "./Movies";

const MovieRoutes = ({ moviePackage, toast, useMongo }) => {
  const { handleSelect, selectedMovie } = moviePackage;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies
            handleSelect={handleSelect}
            toast={toast}
            moviePackage={moviePackage}
          />
        }
      />
      <Route
        path="/:id/detail"
        element={<MovieDetail movie={selectedMovie} useMongo={useMongo} />}
      />
      <Route path="/:id/detail/reviews" element={<MovieReviews />} />
    </Routes>
  );
};

export default MovieRoutes;
