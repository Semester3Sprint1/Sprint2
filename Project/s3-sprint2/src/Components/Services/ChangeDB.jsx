import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/changeDB.module.css";

const ChangeDB = ({ databasePackage }) => {
  const { useMongo, setUseMongo } = databasePackage;
  const navigate = useNavigate();
  const goToMovies = () => navigate("/movies");

  const changeDB = (status) => {
    goToMovies();
    setUseMongo(status);
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className={useMongo ? `btn btn-secondary active` : `btn btn-secondary`}
        onClick={() => changeDB(true)}
      >
        MongoDB
      </button>
      <button
        type="button"
        className={!useMongo ? `btn btn-secondary active` : `btn btn-secondary`}
        onClick={() => changeDB(false)}
      >
        PostgreSQL
      </button>
    </div>
  );
};

export default ChangeDB;
