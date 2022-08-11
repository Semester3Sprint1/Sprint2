import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import { useState } from "react";
import Movies from "./Movies";

const MovieRoutes = ({ moviePackage, toast }) => {
  const [selectedMovie, setSelectedMovie] = useState(false);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies
            handleSelect={handleMovieSelect}
            toast={toast}
            moviePackage={moviePackage}
          />
        }
      />
      <Route
        path="/:id/detail"
        element={<MovieDetail movie={selectedMovie} />}
      />
    </Routes>
  );
};

export default MovieRoutes;
