import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
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
      {/* Gonna need to replace these with Database specific view pages... probably */}
      {useMongo ? (
        <Route
          path="/:id/detail"
          element={<MovieDetail movie={selectedMovie} />}
        />
      ) : (
        <Route
          path="/:id/detail"
          element={<MovieDetail movie={selectedMovie} />}
        />
      )}
    </Routes>
  );
};

export default MovieRoutes;
