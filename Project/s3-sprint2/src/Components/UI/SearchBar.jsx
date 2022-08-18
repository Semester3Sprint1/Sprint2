import React from "react";
import styles from "./css/searchBar.module.css";
import { AiOutlineSearch, AiOutlineUndo } from "react-icons/ai";
import { useState, useContext } from "react";
import AuthContext from "../Context/auth-context";
import { toast, Bounce } from "react-toastify";

const SearchBar = ({ handleSearch, setSearched, searched }) => {
  const [searchText, setSearchText] = useState("");
  const [target, setTarget] = useState("movie");
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const searchMovies = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      handleSearch(searchText, target);
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
    <div className={styles.search}>
      <div className={styles.btnMovies}>
        <button
          onClick={() => {
            setTarget("movie");
          }}
          className={
            target === "movie"
              ? `${styles.targetButton} ${styles.pressedButton}`
              : `${styles.targetButton}`
          }
        >
          Search by Movie
        </button>
        <button
          onClick={() => {
            setTarget("actor");
          }}
          className={
            target === "actor"
              ? `${styles.targetButton} ${styles.pressedButton}`
              : `${styles.targetButton}`
          }
        >
          Search by Actor
        </button>
      </div>
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

        <button type="submit" className={styles.btnSearch}>
          <AiOutlineSearch size={20} />
        </button>
      </form>{" "}
      {searched && (
        <>
          <br />
          <div className={styles.btnReset}>
          <button
            onClick={() => {
              resetSearch();
            }}
            className={styles.reset}
          >
            Reset Search <AiOutlineUndo size={40} />
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
