import React from "react";
import { Routes, Route } from "react-router-dom";

import MovieDetail from "./MovieDetails/MovieDetail";
import { useState } from "react";
import MongoMovies from "./MongoMovies";
import PgMovies from "./PgMovies";

const MovieRoutes = ({ moviePackage, toast, useMongo }) => {
  const [selectedMongoMovie, setSelectedMongoMovie] = useState(false);
  const [selectedPgMovie, setSelectedPgMovie] = useState(false);

  const handleMongoMovieSelect = (movie) => {
    setSelectedMongoMovie(movie);
  };

  const handlePgMovieSelect = (movie) => {
    setSelectedPgMovie(movie);
  };

  return (
    <Routes>
      {useMongo ? (
        <>
          <Route
            path="/"
            element={
              <MongoMovies
                handleSelect={handleMongoMovieSelect}
                toast={toast}
                moviePackage={moviePackage}
              />
            }
          />
          <Route
            path="/:id/detail"
            element={<MovieDetail movie={selectedMongoMovie} />}
          />{" "}
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <PgMovies
                handleSelect={handlePgMovieSelect}
                toast={toast}
                moviePackage={moviePackage}
              />
            }
          />
          <Route
            path="/:id/detail"
            element={<MovieDetail movie={selectedPgMovie} />}
          />{" "}
        </>
      )}
    </Routes>
  );
};

export default MovieRoutes;
