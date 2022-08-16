import React from "react";
import styles from "./css/searchBar.module.css";
import { AiOutlineSearch, AiOutlineUndo } from "react-icons/ai";
import { useState, useContext } from "react";
import AuthContext from "../Context/auth-context";
import { toast, Bounce } from "react-toastify";

const SearchBar = ({ handleSearch, setSearched, searched }) => {
  const [searchText, setSearchText] = useState("");
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const searchMovies = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      handleSearch(searchText);
    } else {
      toast.error("You need to log in before you can search!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  };

  const resetSearch = () => {
    setSearched(false);
    setSearchText("");
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
          <AiOutlineSearch  />
        </button>
      </form>{" "}
      {searched && (
        <>
          <br />
          <button
            style={{ marginLeft: "3%" }}
            onClick={() => {
              resetSearch();
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
