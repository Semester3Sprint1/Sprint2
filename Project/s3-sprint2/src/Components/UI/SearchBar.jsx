import React from "react";
import styles from "./css/searchBar.module.css";
import { AiOutlineSearch, AiOutlineUndo } from "react-icons/ai";
import { useState } from "react";

const SearchBar = ({ handleSearch, setSearched, searched }) => {
  const [searchText, setSearchText] = useState("");

  const searchMovies = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <div className="mt">
      <form className={styles.searchBar} onSubmit={searchMovies}>
        <div>
          <input
            type="text"
            id="search"
            placeholder="Search movies..."
            className="form-control"
            name="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <AiOutlineSearch />
        </button>
      </form>{" "}
      {searched && (
        <>
          <br />
          <button
            onClick={() => {
              setSearched(false);
            }}
            className="btn btn-primary"
          >
            Reset Search <AiOutlineUndo />
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
