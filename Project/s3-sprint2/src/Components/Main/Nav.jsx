import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../Context/auth-context";
import { useContext } from "react";
import ChangeDB from "../Services/ChangeDB";
import { successToast } from "../Services/toast";

export default function NavBar(props) {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const username = authCtx.username;
  const navigate = useNavigate();
  const goToHome = () => navigate("/");

  const [isNavCollaspsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollaspsed);
  // reduce function  array and converts into a single value
  // curValue starts a 0 and increase as called
  // the item value comes from Cart Context handled in Cart Provider

  const userIcon = <FontAwesomeIcon icon={faUser} />;

  const setLogout = () => {
    successToast(`Logging you out, ${username}. Please come again.`);
    authCtx.logout();
    goToHome();
  };

  // by switching between the isLoggenIn state we can switch what links are displayed based on that state.

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid fs-2">
        <Link className="navbar-brand" to="/">
          <h1 className="d-inline">Squishy Kitty Movies</h1>
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
          {isLoggedIn && (
            <div className="collapse navbar-collapse justify-content-center">
              <ChangeDB databasePackage={props.dbPackage} />
            </div>
          )}
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
            {isLoggedIn && (
              <li className="nav-item px-2">
                <NavLink className="nav-link clickable h3" to="/movies">
                  Movies
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {!isLoggedIn && (
          <NavLink className="nav-link clickable " to="/auth">
            <button
              type="button"
              className="btn btn-outline-light btn-lg me-2 "
            >
              {userIcon} Login
            </button>
          </NavLink>
        )}
        {isLoggedIn && (
          <button
            type="button"
            className="btn btn-outline-light btn-lg me-2 "
            onClick={() => setLogout()}
          >
            {userIcon} Logout
          </button>
        )}
      </div>
    </nav>
  );
}
