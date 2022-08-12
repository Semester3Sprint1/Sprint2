import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/movies.module.css";
import ListGroup from "../UI/ListGroup";
import usePagination from "../../Hooks/usePagination";
import SearchBar from "../UI/SearchBar";
import SortIcons from "../UI/SortIcons";
import Table from "../UI/Table";

const Movies = ({ handleSelect, toast, moviePackage }) => {
  const {
    columns,
    movies,
    setMovies,
    genres,
    setGenres,
    selectedGenre,
    setSelectedGenre,
    searchMovies,
    searched,
    searchResults,
    setSearched,
    loadNextData,
    filteredMovies,
    filteredSearchResults,
  } = moviePackage;

  const navigate = useNavigate();
  const goToMovieDetail = (id) => navigate(`/movies/${id}/detail`);

  const handleGenreSelect = (genres) => {
    setSelectedGenre(genres);
  };

  const onSelect = (movie) => {
    handleSelect(movie);
    goToMovieDetail(movie._id);
  };

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
              {searched ? (
                <Table
                  rows={
                    selectedGenre === "All"
                      ? searchResults
                      : filteredSearchResults
                  }
                  columns={columns}
                  onSelect={onSelect}
                  loadMoreData={loadNextData}
                />
              ) : (
                <Table
                  rows={selectedGenre === "All" ? movies : filteredMovies}
                  columns={columns}
                  onSelect={onSelect}
                  loadMoreData={loadNextData}
                />
              )}
            </div>
          </div>

          <div className="col-2">
            <SearchBar
              handleSearch={searchMovies}
              setSearched={setSearched}
              searched={searched}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
