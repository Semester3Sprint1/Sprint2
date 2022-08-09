import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/movies.module.css";
import ListGroup from "../UI/ListGroup";
import usePagination from "../../Hooks/usePagination";

const Movies = ({ handleSelect, toast }) => {
  const [movies, setMovies] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [pageNum, setPageNum] = useState(0);

  const navigate = useNavigate();
  const goToMovieDetail = (id) => navigate(`/movies/${id}/detail`);

  const paginate = usePagination(movies, 20); // THE SECOND NUMBER HERE CONTROLS HOW MANY MOVIES ARE DISPLAYED PER PAGE

  // const getMovies = async () => {
  //   const res = await fetch(`http://localhost:3001/movies?page=${page_num}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await res.json();

  //   setMovies(data);
  // };

  const getGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/getGenres");
    const data = await res.json();

    setGenre(data);
  };

  const getMoviesByGenre = async (page, genre) => {
    const page_num = encodeURIComponent(page);
    console.log(page + 1);

    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMovies(data);
    paginate.jump(1);
  };

  useEffect(() => {
    getGenres();
    getMoviesByGenre(0, selectedGenre);
  }, []);

  useEffect(() => {
    getMoviesByGenre(0, selectedGenre);
    toast("UseEffect Loading movies...");
  }, [selectedGenre]);

  const handleGenreSelect = (genres) => {
    setSelectedGenre(genres);
  };

  const onSelect = (movie) => {
    handleSelect(movie);
    goToMovieDetail(movie._id);
  };

  const loadNextData = () => {
    let newPage = pageNum + 1;
    setPageNum(newPage);
    getMoviesByGenre(newPage, selectedGenre);
    toast("Loading movies...");
    paginate.jump(1);
  };

  const loadLastData = () => {
    let newPage = pageNum - 1;
    if (pageNum !== 0) {
      setPageNum(newPage);
      getMoviesByGenre(newPage, selectedGenre);
      toast("Loading movies...");
      paginate.jump(1);
    }
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
              <div className={styles.dataSelect}>
                <span onClick={loadLastData}>Load Previous</span>

                <span>Page No: {pageNum + 1}</span>

                <span onClick={loadNextData}>Load More</span>
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
                  {movies && (
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
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
