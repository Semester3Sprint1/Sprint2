import React, { useEffect, useState } from "react";
import styles from "./css/movies.modules.css";
import ListGroup from "../UI/ListGroup";
import usePagination from "../../Hooks/usePagination";

const Movies = () => {
  const [movies, setMovies] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const getMovies = async () => {
    const res = await fetch("http://localhost:3001/movies");
    const data = await res.json();

    setMovies(data);
  };

  const getGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/getGenres");
    const data = await res.json();

    setGenre(data);
  };

  const getMoviesByGenre = async (genre) => {
    const res = await fetch(`http://localhost:3001/movies/${genre}`);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    getGenres();
    getMovies();
  }, []);

  useEffect(() => {
    getMoviesByGenre(selectedGenre);
  }, [selectedGenre]);

  const handleGenreSelect = (genres) => {
    setSelectedGenre(genres);
  };

  const onSelect = (id) => {
    // go to movie with corresponding movie ID
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={genre}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>

        <div className="col">
          <div className={styles.searchResults}>
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
        </div>
      </div>
    </div>
  );
};

export default Movies;
