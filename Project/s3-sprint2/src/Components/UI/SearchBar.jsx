import React from "react";
import styles from "./css/searchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const searchMovies = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <div className="mt-2">
      <form className={styles.searchBar} onSubmit={searchMovies}>
        <input
          type="text"
          id="search"
          placeholder="Search movies..."
          name="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
