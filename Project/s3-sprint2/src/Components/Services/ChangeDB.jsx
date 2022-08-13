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
  let styled = `btn btn-outline-light btn-lg me-2 `
  return (
    <div className="" role="group" aria-label="Basic example">
      <button
        type="button"
        className={useMongo ? ` ${styled + "active"}` : `${styled}`}
        onClick={() => changeDB(true)}
      >
         <icon  className="mr-1"><SiMongodb size={30}/></icon>MongoDB
      </button>
      <button
        type="button"
        className={!useMongo ? `${styled + "active"}` : `${styled}`}
        onClick={() => changeDB(false)}
      >
          <icon  className="mr-1"><SiPostgresql 
          size={30}
          /></icon>PostgreSQL
      </button>
    </div>
  );
};

export default ChangeDB;
