import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/movies.module.css";
import ListGroup from "../UI/ListGroup";
import SearchBar from "../UI/SearchBar";
import Table from "../UI/Table";
import BackGround from "../UI/BackGround";
import Banner from "../UI/Banner";

const Movies = ({ handleSelect, moviePackage }) => {
  const {
    columns,
    movies,
    genres,
    selectedGenre,
    setSelectedGenre,
    searchMovies,
    searched,
    searchResults,
    setSearched,
    loadNextData,
    filteredMovies,
    filteredSearchResults,
    pages,
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
      <Banner />
      <div className={styles.search}>
        <SearchBar
          handleSearch={searchMovies}
          setSearched={setSearched}
          searched={searched}
        />
      </div>

      <div className={styles.container}>
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
                  pages={pages}
                  searched={searched}
                />
              ) : (
                <Table
                  rows={selectedGenre === "All" ? movies : filteredMovies}
                  columns={columns}
                  onSelect={onSelect}
                  loadMoreData={loadNextData}
                  pages={pages}
                  searched={searched}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
