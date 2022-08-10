import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/movies.module.css";
import ListGroup from "../UI/ListGroup";
import usePagination from "../../Hooks/usePagination";
import SearchBar from "../UI/SearchBar";

const Movies = ({ handleSelect, toast }) => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [pageNum, setPageNum] = useState(0);
  const [selectionMade, setSelectionMade] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const navigate = useNavigate();
  const goToMovieDetail = (id) => navigate(`/movies/${id}/detail`);

  useEffect(() => {
    getGenres();
    // setSelectedGenre("Action");
    // getMoviesByGenre(0, selectedGenre);
    // getMovies();
  }, []);

  useEffect(() => {
    getMoviesByGenre(0, selectedGenre);
  }, [selectedGenre]);

  const paginate = usePagination(movies, 20); // THE SECOND NUMBER HERE CONTROLS HOW MANY MOVIES ARE DISPLAYED PER PAGE

  const getGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/getGenres");
    const data = await res.json();

    setGenre(data);
  };

  const getMoviesByGenre = async (page, genre) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMovies(data);
    setPageNum(0);
    paginate.jump(1);
  };

  const loadMoreMoviesByGenre = async (page, genre) => {
    const page_num = encodeURIComponent(page);

    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
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

  // const loadLastData = () => {
  //   let newPage = pageNum - 1;
  //   if (pageNum !== 0) {
  //     setPageNum(newPage);
  //     getMoviesByGenre(newPage, selectedGenre);
  //     toast("Loading movies...");
  //     paginate.jump(0);
  //   }
  // };

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
            {selectionMade ? (
              <div className={styles.searchResults}>
                {/* This secion will load other data when clicked */}
                <div className={styles.dataSelect}>
                  <span className={styles.loadData}>{/* Load Previous */}</span>

                  {/* <span>Page No: {pageNum + 1}</span> */}

                  <span onClick={loadNextData} className={styles.loadData}>
                    Load More
                  </span>
                </div>

                {/* This section will filter the loaded data */}
                <div className={styles.pageSelect}>
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
                </div>

                <table className="table table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Movie Title</th>
                      <th scope="col">Release Date</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.length > 0 ? (
                      <>
                        {paginate.currentData().map((movie) => {
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
                    ) : (
                      `No movie data available.`
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <h2>Select a genre or search for a film to begin.</h2>
            )}
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
