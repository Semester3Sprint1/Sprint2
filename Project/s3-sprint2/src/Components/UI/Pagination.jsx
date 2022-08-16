import React from "react";
import styles from "./css/table.module.css";
import {AiFillFastBackward, AiFillStepBackward, AiFillFastForward, AiFillStepForward} from 'react-icons/ai'

const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
  loadMoreData,
  searched,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className={styles.controlBar}>
        <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          <AiFillFastBackward className={styles.badge}  size={35} />First
        </button>
        <button
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          <AiFillStepBackward className={styles.badge}  size={35}/> Previous
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          Next <AiFillStepForward className={styles.badge}  size={35}/>
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          Last <AiFillFastForward className={styles.badge}  size={35}/>
        </button>
      </div>
      <div className={styles.pageInfo}>
        <p>
          Page {activePage} of {totalPages}
        </p>
        {searched ? <></> : <button className={styles.btnLoad} onClick={loadMoreData}>Load More</button>}

        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </div>
    </>
  );
};

export default Pagination;
