import React from "react";
import { useNavigate } from "react-router-dom";
import {SiMongodb} from 'react-icons/si'
import {SiPostgresql} from 'react-icons/si'
import styles from "./css/changeDB.module.css";
const ChangeDB = ({ databasePackage }) => {
  const { useMongo, setUseMongo } = databasePackage;
  const navigate = useNavigate();
  const goToMovies = () => navigate("/movies");
  
  const changeDB = (status) => {
    goToMovies();
    setUseMongo(status);
  };
  let styled = `btn  btn-lg me-2 `
  return (
    <div className="" role="group" aria-label="Basic example">
      <button
        type="button"
        className={useMongo ? ` ${styled + "btn-outline-info active"}` : `${styled + "btn-outline-light"}`}
        onClick={() => changeDB(true)}
      >
          <SiMongodb className="mr-1" size={30}/>MongoDB
      </button>
      <button
        type="button"
        className={!useMongo ? `${styled + " btn-outline-info active"}` : `${styled + "btn-outline-light"}`}
        onClick={() => changeDB(false)}
      >
          <SiPostgresql 
          className="mr-1"
          size={30}
          />PostgreSQL
      </button>
    </div>
  );
};

export default ChangeDB;
