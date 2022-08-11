import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Main/Nav";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Components/Main/Main";
import Account from "./Components/Account/Account";
import Auth from "./Components/Account/Auth/Auth";
import Footer from "./Components/Main/Footer";
import AuthContext from "./Components/Context/auth-context";
import NotFound from "./Components/Main/notFound";
import MovieRoutes from "./Components/Movies/MovieRoutes";

function App() {
  const [pageNum, setPageNum] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getMoviesByGenre(0, "All");
    getGenres();
  }, []);

  useEffect(() => {
    console.log("Genre get");
    getMoviesByGenre(0, selectedGenre, "title");
  }, [selectedGenre]);

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

  // -------------- MOVIES SECTION BEGIN HERE ---------------- //

  const getMoviesByGenre = async (page, genre) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMovies(data);
  };

  const loadMoreMoviesByGenre = async (page, genre) => {
    const page_num = encodeURIComponent(page);

    const res = await fetch(
      `http://localhost:3001/movies/${genre}?page=${page_num}`
    );
    const data = await res.json();

    setMovies([...movies, ...data]);
  };

  const getGenres = async () => {
    const res = await fetch("http://localhost:3001/movies/getGenres");
    const data = await res.json();

    setGenres(data);
  };

  const loadMoreMovies = async (page) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(`http://localhost:3001/movies?page=${page_num}`);
    const data = await res.json();

    setMovies([...movies, ...data]);
  };

  const loadNextData = () => {
    let newPage = pageNum + 1;
    setPageNum(newPage);
    loadMoreMoviesByGenre(newPage, selectedGenre);
    loadingToast("Loading movies...");
    // paginate.jump(0);
  };

  const moviePackage = {
    movies,
    setMovies,
    genres,
    setGenres,
    selectedGenre,
    setSelectedGenre,
    loadNextData,
  };

  // -------------- MOVIES SECTION END HERE ---------------- //

  return (
    <Fragment>
      <header>
        <NavBar />
      </header>

      <main className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies/*"
            element={
              <MovieRoutes moviePackage={moviePackage} toast={loadingToast} />
            }
          />

          {authCtx.isLoggedIn && (
            <Route path="/account" element={<Account />}></Route>
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
