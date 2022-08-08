import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Main/Nav";
import React, { Fragment } from "react";
import Main from "./Components/Main/Main";
import Movies from "./Components/Movies/Movies";
import Account from "./Components/Account/Account";
import Auth from "./Components/Account/Auth/Auth";
import Footer from "./Components/UI/Footer";

function App() {
  return (
    <Fragment>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
