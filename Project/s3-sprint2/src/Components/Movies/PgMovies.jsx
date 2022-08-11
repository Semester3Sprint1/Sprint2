import React from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "../UI/ListGroup";
import SearchBar from "../UI/SearchBar";
import Table from "../UI/Table";
import styles from "./css/movies.module.css";

const PgMovies = ({ handleSelect, toast, moviePackage }) => {
  const {
    columns,
    movies,
    setMovies,
    genres,
    setGenres,
    selectedGenre,
    setSelectedGenre,
    loadNextData,
    filteredMovies,
  } = moviePackage;

  const navigate = useNavigate();
  const goToMovieDetail = (id) => navigate(`/movies/${id}/detail`);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    // toast("Loading movies...");
  };

  const onSelect = (movie) => {
    handleSelect(movie);
    goToMovieDetail(movie._id);
  };

  const getMoviesBySearch = async (text) => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <ListGroup
              genres={genres}
              selectedItem={selectedGenre}
              onItemSelect={handleGenreSelect}
            />
          </div>

          <div className="col">
            <div className={styles.searchResults}>
              <Table
                rows={selectedGenre === "All" ? movies : filteredMovies}
                columns={columns}
                onSelect={onSelect}
                loadMoreData={loadNextData}
              />
            </div>
          </div>

          <div className="col-2">
            <SearchBar handleSearch={getMoviesBySearch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PgMovies;
