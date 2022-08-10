import React from "react";
import styles from "./css/table.module.css";

const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
  loadMoreData,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className={styles.controlBar}>
        <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          ⏮️ First
        </button>
        <button
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          ⬅️ Previous
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          Next ➡️
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          Last ⏭️
        </button>
      </div>
      <div className={styles.pageInfo}>
        <p>
          Page {activePage} of {totalPages}
        </p>
        <button onClick={loadMoreData}>Load More</button>
        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>
    </>
  );
};

export default Pagination;
