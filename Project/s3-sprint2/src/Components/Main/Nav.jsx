import {useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../Context/auth-context";
import { useContext } from "react";
export default function NavBar(props) {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

  const [isNavCollaspsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollaspsed);
  // reduce function  array and converts into a single value
  // curValue starts a 0 and increase as called
  // the item value comes from Cart Context handled in Cart Provider

  const userIcon = <FontAwesomeIcon icon={faUser} />;

  // by switching between the isLoggenIn state we can switch what links are displayed based on that state.

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1 className="d-inline">Movies Reviews</h1>
        </Link>
        <button
          onClick={handleNavCollapse}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollaspsed ? true : false}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${
            isNavCollaspsed ? `collapse` : ""
          } navbar-collapse justify-content-end`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-4 text-center ">
            <li className="nav-item px-2">
              <NavLink
                className="nav-link clickable h3"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink className="nav-link clickable h3" to="/movies">
               Movies
              </NavLink>
            </li>
            {isLoggedIn &&(
                 <li className="nav-item">
                 <NavLink
                   className="nav-link clickable h3"
                   to= '/account'
                 >
                   Account
                 </NavLink>
               </li>
            )}
           
          </ul>
        </div>
        {!isLoggedIn &&(
             <NavLink className="nav-link clickable " to="/auth">
             <button
               type="button"
               className="btn btn-outline-light btn-lg me-2 "
             >
               {userIcon} Login
             </button>
           </NavLink>
        )}
        {isLoggedIn &&(
            <button
            type="button"
            className="btn btn-outline-light btn-lg me-2 "
          >
            {userIcon} Logout
          </button>
        )}
          
      
      </div>
    </nav>
  );
}
