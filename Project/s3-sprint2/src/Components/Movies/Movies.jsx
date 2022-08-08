import React, { useEffect, useState } from "react";
import styles from "./css/movies.modules.css";

const Movies = () => {
  const [movies, setMovies] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const getMovies = async () => {
    const res = await fetch("http://localhost:3001/movies");
    const data = await res.json();

    setMovies(data);
  };

  const getMoviesByGenre = async (genre) => {
    const res = await fetch(`http://localhost:3001/movies/${genre}`);
    const data = await res.json();

    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleGenreSelect = (genres) => {
    setSelectedGenre(genres);
  };

  const onSelect = (id) => {
    // go to movie with corresponding movie ID
  };

  return (
    <div>
      <table className="table table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Movie Title</th>
            <th scope="col">Release Date</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies && (
            <>
              {movies.map((movie) => {
                let date = new Date(movie.released);
                return (
                  <tr
                    key={movie._id}
                    onClick={() => onSelect(movie._id)}
                    className={styles.dataRow}
                  >
                    <td>
                      <strong>{movie.title}</strong>
                    </td>
                    <td>{date.toLocaleDateString()}</td>
                    <td>{movie.imdb.rating}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
