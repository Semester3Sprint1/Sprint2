import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Main/Nav";
import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Components/Main/Main";
import Auth from "./Components/Account/Auth/Auth";
import Footer from "./Components/Main/Footer";
import AuthContext from "./Components/Context/auth-context";
import NotFound from "./Components/Main/notFound";
import MovieRoutes from "./Components/Movies/MovieRoutes";
import http from "../src/Components/Services/http";

function App() {
  // -------------- GENERAL STATES ---------------- //
  const [useMongo, setUseMongo] = useState(true);
  const [activePage, setActivePage] = useState(1);

  // -------------- MONGO STATES ---------------- //
  const [pageNum, setPageNum] = useState(1);
  const [mongoMovies, setMongoMovies] = useState([]);
  const [selectedMongoMovie, setSelectedMongoMovie] = useState(false);
  const [mongoGenres, setMongoGenres] = useState([]);
  const [selectedMongoGenre, setSelectedMongoGenre] = useState("All");
  const [mongoSearchResults, setMongoSearchResults] = useState([]);
  const [mongoSearched, setMongoSearched] = useState(false);
  const [mongoReviews, setMongoReviews] = useState([]);

  // -------------- PG STATES ---------------- //
  const [pgMovies, setPgMovies] = useState([]);
  const [selectedPgMovie, setSelectedPgMovie] = useState(false);
  const [pgGenres, setPgGenres] = useState([{ genres: ["Genre"] }]);
  const [selectedPgGenre, setSelectedPgGenre] = useState("All");
  const [pgSearchResults, setPgSearchResults] = useState([]);
  const [pgSearched, setPgSearched] = useState(false);

  // -------------- CONTEXTUAL STATES ---------------- //
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const loggedIn = authCtx.isLoggedIn;
  const username = authCtx.username;

  // -------------- MEMORY ---------------- //
  const currentPgGenre = useMemo(
    () =>
      pgMovies.filter(
        (movie) => movie.genres && movie.genres.includes(selectedPgGenre)
      ),
    [pgMovies, selectedPgGenre]
  );

  const currentPgSearchResults = useMemo(
    () =>
      pgSearchResults.filter(
        (movie) => movie.genres && movie.genres.includes(selectedPgGenre)
      ),
    [pgSearchResults, selectedPgGenre]
  );

  const currentMongoGenre = useMemo(
    () =>
      mongoMovies.filter(
        (movie) => movie.genres && movie.genres.includes(selectedMongoGenre)
      ),
    [mongoMovies, selectedMongoGenre]
  );

  const currentMongoSearchResults = useMemo(
    () =>
      mongoSearchResults.filter(
        (movie) => movie.genres && movie.genres.includes(selectedMongoGenre)
      ),
    [mongoSearchResults, selectedMongoGenre]
  );

  // This will load the first batch of Mongo Movies, all the PG movies, and both groups of genres (for the right side filter bar)
  useEffect(() => {
    getMongoMovies(0, "All");
    getMongoGenres();
    getPgMovies();
    getPgGenres();
  }, []);

  // This will fire off each time a user logs in or logs out - it updates the current user state
  useEffect(() => {
    loggedIn && getUsers();
  }, [username, loggedIn]);

  const loadingToast = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip,
    });
  };

  // -------------- PG MOVIES SECTION BEGIN HERE ---------------- //

  // Loads all PG movies
  const getPgMovies = async () => {
    const res = await fetch(`http://localhost:3001/movies/pg/`);
    const data = await res.json();

    setPgMovies(data);
  };

  // Loads all PG genres
  const getPgGenres = async () => {
    const res = await fetch(`http://localhost:3001/movies/pg/genres`);
    const data = await res.json();

    setPgGenres(data);
  };

  // Loads the results when a user searches for a PG movie
  const getPgMoviesBySearch = async (text) => {
    const res = await fetch(
      `http://localhost:3001/search/pg?searchText=${text}&user=${username}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();

    setPgSearched(true);
    setPgSearchResults(data);
    setActivePage(1);
  };

  // Changes the selected movie state when a user clicks on a movie
  const handlePgMovieSelect = (movie) => {
    setSelectedPgMovie(movie);
  };

  // Adds a review to a PG movie, and updates the state storing the movies
  const addReviewPg = async (review) => {
    const res = await fetch(`http://localhost:3001/movies/pg/review/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const data = await res.json();

    // This code is to update the currently stored movie object without needing to query the DB again
    const date = new Date();
    const newReview = {
      date: date.toLocaleDateString(),
      details: review.details,
      rating: review.rating,
      review_id: 0,
      tagline: review.tagline,
      viewer_name: review.userID,
    };

    setPgMovies(
      pgMovies.map((movie) =>
        movie._id === review.movieID
          ? { ...movie, reviews: [...movie.reviews, newReview] }
          : movie
      )
    );

    return data;
  };

  const editReviewPg = async (review) => {
    const res = await fetch(`http://localhost:3001/movies/pg/review/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const data = await res.json();

    // Needs a little extra
  };

  // Stores all of the relevant movie states and state changers - easier to put it into one object instead of passing all of these down to all of the components that need them
  const pgMoviePackage = {
    movies: pgMovies,
    setMovies: setPgMovies,

    genres: pgGenres,
    setGenres: setPgGenres,
    selectedGenre: selectedPgGenre,
    setSelectedGenre: setSelectedPgGenre,

    filteredMovies: currentPgGenre,

    searchMovies: getPgMoviesBySearch,
    searched: pgSearched,
    setSearched: setPgSearched,
    searchResults: pgSearchResults,
    filteredSearchResults: currentPgSearchResults,

    loadNextData: null,
    handleSelect: handlePgMovieSelect,
    selectedMovie: selectedPgMovie,
    onAddReview: addReviewPg,
    onEditReview: editReviewPg,
    currentReviews: null,
    columns: [
      {
        accessor: "title",
        label: "Movie Title",
      },
      {
        accessor: "released",
        label: "Release Date",
      },
      {
        accessor: "rated",
        label: "Rated",
      },
    ],
    pages: { activePage, setActivePage },
  };

  // -------------- PG MOVIES SECTION END HERE ---------------- //

  // -------------- MONGO MOVIES SECTION BEGIN HERE ---------------- //

  let getUsers = async () => {
    http.setJwT(token);
    const res = await http.get("http://localhost:3001/api/users/me");
    await authCtx.getUser(res.data.username);
    await authCtx.getUserId(res.data._id);
  };

  const getMongoMovies = async (page, genre) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(
      `http://localhost:3001/movies/mongo/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMongoMovies(data);
  };

  const loadMoreMongoMovies = async (page, genre) => {
    const page_num = encodeURIComponent(page);

    const res = await fetch(
      `http://localhost:3001/movies/mongo/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMongoMovies([...mongoMovies, ...data]);
  };

  const getMongoGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/mongo/getGenres");
    const data = await res.json();

    setMongoGenres(data);
  };

  const getMongoMoviesBySearch = async (text, target) => {
    const res = await fetch(
      `http://localhost:3001/search/mongo?searchText=${text}&user=${username}&target=${target}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();

    setMongoSearched(true);
    setMongoSearchResults(data);
    setActivePage(1);
  };

  const loadNextMongoPage = () => {
    let newPage = pageNum + 1;
    setPageNum(newPage);
    loadMoreMongoMovies(newPage, "All");
    loadingToast("Loading movies...");
  };

  const handleMongoMovieSelect = (movie) => {
    setSelectedMongoMovie(movie);
    fetchReviewMongo(movie._id);
  };

  const addReviewMongo = async (review) => {
    const res = await fetch(`http://localhost:3001/api/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const data = await res.json();

    fetchReviewMongo(review.movieID);
  };

  const editReviewMongo = async (review) => {
    const res = await fetch(
      `http://localhost:3001/api/review/${review.reviewID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );
    const data = await res.json();
    fetchReviewMongo(review.movieID);
  };

  const fetchReviewMongo = async (id) => {
    const res = await fetch(`http://localhost:3001/api/review/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    setMongoReviews(data);
  };

  const mongoMoviePackage = {
    movies: mongoMovies,
    setMovies: setMongoMovies,
    genres: mongoGenres,
    setGenres: setMongoGenres,
    selectedGenre: selectedMongoGenre,
    setSelectedGenre: setSelectedMongoGenre,
    loadNextData: loadNextMongoPage,
    searchMovies: getMongoMoviesBySearch,
    searched: mongoSearched,
    setSearched: setMongoSearched,
    searchResults: mongoSearchResults,
    filteredMovies: currentMongoGenre,
    filteredSearchResults: currentMongoSearchResults,
    handleSelect: handleMongoMovieSelect,
    selectedMovie: selectedMongoMovie,
    onAddReview: addReviewMongo,
    onEditReview: editReviewMongo,
    currentReviews: mongoReviews,
    columns: [
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
        accessor: "rated",
        label: "Rated",
      },
    ],
    pages: { activePage, setActivePage },
  };

  // -------------- MONGO MOVIES SECTION END HERE ---------------- //

  const databasePackage = {
    useMongo,
    setUseMongo,
  };

  return (
    <Fragment>
      <header>
        <NavBar dbPackage={databasePackage} />
      </header>

      <main className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Main />} />
          {authCtx.isLoggedIn && (
            <Route
              path="/movies/*"
              element={
                useMongo ? (
                  <MovieRoutes
                    useMongo={useMongo}
                    moviePackage={mongoMoviePackage}
                  />
                ) : (
                  <MovieRoutes
                    useMongo={useMongo}
                    moviePackage={pgMoviePackage}
                  />
                )
              }
            />
          )}

          {!authCtx.isLoggedIn && (
            <Route path="/auth" element={<Auth />}></Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}

export default App;
