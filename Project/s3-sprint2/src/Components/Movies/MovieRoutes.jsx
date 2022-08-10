import React from "react";
import { Routes, Route } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import MovieDetail from "./MovieDetails/MovieDetail";
import { useState } from "react";
import Movies from "./Movies";

const MovieRoutes = () => {
  const [selectedMovie, setSelectedMovie] = useState(false);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const loadingToast = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip,
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Movies handleSelect={handleMovieSelect} toast={loadingToast} />
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
