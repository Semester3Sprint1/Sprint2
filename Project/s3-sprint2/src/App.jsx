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
  // General States
  const [useMongo, setUseMongo] = useState(true);
  const [activePage, setActivePage] = useState(1);

  // Mongo States
  const [pageNum, setPageNum] = useState(1);
  const [mongoMovies, setMongoMovies] = useState([]);
  const [selectedMongoMovie, setSelectedMongoMovie] = useState(false);
  const [mongoGenres, setMongoGenres] = useState([]);
  const [selectedMongoGenre, setSelectedMongoGenre] = useState("All");
  const [mongoSearchResults, setMongoSearchResults] = useState([]);
  const [mongoSearched, setMongoSearched] = useState(false);

  // PG States
  const [pgMovies, setPgMovies] = useState([]);
  const [selectedPgMovie, setSelectedPgMovie] = useState(false);
  const [pgGenres, setPgGenres] = useState([{ genres: ["Genre"] }]);
  const [selectedPgGenre, setSelectedPgGenre] = useState("All");
  const [pgSearchResults, setPgSearchResults] = useState([]);
  const [pgSearched, setPgSearched] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const loggedIn = authCtx.isLoggedIn;
  const username = authCtx.username;

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

  useEffect(() => {
    getMongoMovies(0, "All");
    getMongoGenres();
    getPgMovies();
    getPgGenres();
  }, []);

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

  const getPgMovies = async () => {
    const res = await fetch(`http://localhost:3001/movies/pg/`);
    const data = await res.json();
    // console.log(data);

    setPgMovies(data);
  };

  const getPgGenres = async () => {
    const res = await fetch(`http://localhost:3001/movies/pg/genres`);
    const data = await res.json();

    setPgGenres(data);
  };

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

  const handlePgMovieSelect = (movie) => {
    setSelectedPgMovie(movie);
  };

  // var reviewPackage = {
  //   movieID: movieID,
  //   userID: username,
  //   tagline: tagline,
  //   rating: reviewRating,
  //   details: details,
  // };

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
    // put the code to update the movie list here
    setPgMovies(
      pgMovies.map((movie) =>
        movie._id === review.movieID
          ? { ...movie, reviews: [...movie.reviews, newReview] }
          : movie
      )
    );

    return data;
  };

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
      // {
      //   accessor: "imdb",
      //   label: "IMDB Rating",
      // },
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

  const getMongoMoviesBySearch = async (text) => {
    const res = await fetch(
      `http://localhost:3001/search/mongo?searchText=${text}&user=${username}`,
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
                    toast={loadingToast}
                  />
                ) : (
                  <MovieRoutes
                    useMongo={useMongo}
                    moviePackage={pgMoviePackage}
                    toast={loadingToast}
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
