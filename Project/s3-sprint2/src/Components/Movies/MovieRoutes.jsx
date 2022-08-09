import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./MovieDetails/MovieDetail";
import { useState } from "react";
import Movies from "./Movies";

const MovieRoutes = () => {
  const [selectedMovie, setSelectedMovie] = useState(false);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Routes>
      <Route path="/" element={<Movies handleSelect={handleMovieSelect} />} />
      <Route
        path="/:id/detail"
        element={<MovieDetail movie={selectedMovie} />}
      />
    </Routes>
  );
};

export default MovieRoutes;
