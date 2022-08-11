import React from "react";
import styles from "./css/changeDB.module.css";

const ChangeDB = ({ databasePackage }) => {
  const { useMongo, setUseMongo } = databasePackage;

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className={useMongo ? `btn btn-secondary active` : `btn btn-secondary`}
        onClick={() => setUseMongo(true)}
      >
        MongoDB
      </button>
      <button
        type="button"
        className={!useMongo ? `btn btn-secondary active` : `btn btn-secondary`}
        onClick={() => setUseMongo(false)}
      >
        PostgreSQL
      </button>
    </div>
  );
};

export default ChangeDB;

// <div className={styles.changeDB}>
//   <button
//     className={
//       useMongo
//         ? styles.pgButton
//         : `${styles.pgButton} ${styles.buttonPressed}`
//     }
//     onClick={() => setUseMongo(false)}
//   >
//     PostgreSQL
//   </button>
//   <button
//     className={
//       useMongo
//         ? `${styles.mongoButton} ${styles.buttonPressed}`
//         : styles.mongoButton
//     }
//     onClick={() => setUseMongo(true)}
//   >
//     MongoDB
//   </button>
// </div>
