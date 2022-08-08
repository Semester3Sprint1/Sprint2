import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Main/Nav";
import React, { Fragment, useContext, useState } from "react";
import Main from "./Components/Main/Main";
import Movies from "./Components/Movies/Movies";
import Account from "./Components/Account/Account";
import Auth from "./Components/Account/Auth/Auth";
import Footer from "./Components/UI/Footer";
import AuthContext from "./Components/Context/auth-context";

function App() {

  const authCtx = useContext(AuthContext);


  
  return (
    <Fragment>
      <NavBar />
      <div className="App ">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          {authCtx.isLoggedIn &&(
            <Route path="/account" element={<Account />}></Route>
          )}
          {!authCtx.isLoggedIn &&(
            <Route path="/auth" element={<Auth />}></Route>
          )}
          <Route path="*" element={<Main/>}/>
          <Route path="/footer" element={<Footer/>}/>
        </Routes>
        <Footer />
      </div>
  
    
 
    </Fragment>
  );
}

export default App;
