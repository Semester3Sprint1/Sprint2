import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Main/Nav";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Components/Main/Main";
import Account from "./Components/Account/Account";
import Auth from "./Components/Account/Auth/Auth";
import Footer from "./Components/Main/Footer";
import AuthContext from "./Components/Context/auth-context";
import NotFound from "./Components/Main/notFound";
import MovieRoutes from "./Components/Movies/MovieRoutes";

function App() {
  const [movies, setMovies] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getMovies(0);
  }, []);

  const getMovies = async (page) => {
    const page_num = encodeURIComponent(page);
    const res = await fetch(`http://localhost:3001/movies?page=${page_num}`);
    const data = await res.json();

    setMovies(data);
  };

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
            element={<MovieRoutes movies={movies} setMovies={setMovies} />}
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
