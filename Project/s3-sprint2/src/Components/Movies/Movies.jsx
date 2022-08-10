import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/movies.module.css";
import ListGroup from "../UI/ListGroup";
import usePagination from "../../Hooks/usePagination";
import SearchBar from "../UI/SearchBar";
import SortIcons from "../UI/SortIcons";
import Table from "../UI/Table";

const Movies = ({ handleSelect, toast, movies, setMovies }) => {
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [selectionMade, setSelectionMade] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [sortMethod, setSortMethod] = useState("");

  const navigate = useNavigate();
  const goToMovieDetail = (id) => navigate(`/movies/${id}/detail`);

  useEffect(() => {
    getGenres();
    // setSelectedGenre("Action");
    // getMoviesByGenre(0, selectedGenre);
  }, []);

  useEffect(() => {
    getMoviesByGenre(0, selectedGenre, "title");
  }, [selectedGenre]);

  const paginate = usePagination(movies, 20); // THE SECOND NUMBER HERE CONTROLS HOW MANY MOVIES ARE DISPLAYED PER PAGE

  const columns = [
    {
      accessor: "title",
      label: "Movie Title",
      sort: "alpha",
    },
    {
      accessor: "released",
      label: "Release Date",
      type: "date",
    },
    {
      //accessor: "imdb.rating",
      accessor: "rated",
      label: "Rated",
      //type: "rating",
    },
  ];

  //movies.sort((a, b) => b.title.localeCompare(a.title));
  const getGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/getGenres");
    const data = await res.json();

    setGenre(data);
  };

  const getMovies = async (page) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(`http://localhost:3001/movies?page=${page_num}`);
    const data = await res.json();

    setMovies(data);
  };

  const loadMoreMovies = async (page) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(`http://localhost:3001/movies?page=${page_num}`);
    const data = await res.json();

    setMovies([...movies, ...data]);
  };

  const getMoviesByGenre = async (page, genre, sort) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMovies(data);
    setPageNum(0);
    paginate.jump(1);
  };

  const loadMoreMoviesByGenre = async (page, genre, sort) => {
    const page_num = encodeURIComponent(page);

    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}?sort=${sort}`
    );
    const data = await res.json();

    setMovies([...movies, ...data]);
  };

  const getMoviesBySearch = async (text) => {
    const res = await fetch(`http://localhost:3001/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchText: text }),
    });
    const data = await res.json();

    setSelectionMade(true);
    setMovies(data);
    paginate.jump(1);
  };

  const handleGenreSelect = (genres) => {
    setSelectionMade(true);
    setSelectedGenre(genres);
    toast("Loading movies...");
  };

  const onSelect = (movie) => {
    handleSelect(movie);
    goToMovieDetail(movie._id);
  };

  const loadNextData = () => {
    let newPage = pageNum + 1;
    setPageNum(newPage);
    loadMoreMoviesByGenre(newPage, selectedGenre);
    toast("Loading movies...");
    // paginate.jump(0);
  };

  const displayMovies = () => {
    if (sortMethod === "title") {
      var sortBy = (a, b) => a.title.localeCompare(b.title);
    } else if (sortMethod === "rating") {
      var sortBy = (a, b) =>
        a.imdb.rating > b.imdb.rating
          ? 1
          : b.imdb.rating > a.imdb.rating
          ? -1
          : 0;
    } else if (sortMethod === "date") {
      var sortBy = () => (a, b) => a.released.localeCompare(b.released);
    }

    return (
      <>
        {paginate
          .currentData()
          .sort(sortBy)
          .map((movie) => {
            let date = new Date(movie.released);
            return (
              <tr
                key={movie._id}
                onClick={() => onSelect(movie)}
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
    );
  };

  return (
    <>
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
              {/* This secion will load other data when clicked */}
              {/* <div className={styles.dataSelect}>
                <span className={styles.loadData}></span>

             

                <span onClick={loadNextData} className={styles.loadData}>
                  Load More
                </span>
              </div> */}

              {/* This section will filter the loaded data */}
              {/* <div className={styles.pageSelect}>
                <span
                  onClick={paginate.prev}
                  className={
                    paginate.currentPage === 1
                      ? `${styles.previous} ${styles.grey}`
                      : styles.previous
                  }
                >
                  Previous Page
                </span>
                <span>
                  Page {paginate.currentPage} of {paginate.maxPage}
                </span>
                <span
                  onClick={paginate.next}
                  className={
                    paginate.currentPage === paginate.maxPage
                      ? `${styles.next} ${styles.grey}`
                      : styles.next
                  }
                >
                  Next Page
                </span>
              </div> */}

              <Table rows={movies} columns={columns} onSelect={onSelect} />
              {/* <table className="table table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">
                        Movie Title{" "}
                        <span
                          onClick={() => {
                            setSortMethod("title");
                          }}
                        >
                          <SortIcons type="alpha" />
                        </span>
                      </th>
                      <th scope="col">
                        Release Date{" "}
                        <span
                          onClick={() => {
                            setSortMethod("date");
                          }}
                        >
                          <SortIcons />
                        </span>
                      </th>
                      <th scope="col">
                        Rating{" "}
                        <span
                          onClick={() => {
                            setSortMethod("rating");
                          }}
                        >
                          <SortIcons />
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.length > 0 ? (
                      <>{displayMovies()}</>
                    ) : (
                      `No movie data available.`
                    )}
                  </tbody>
                </table> */}
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

export default Movies;
