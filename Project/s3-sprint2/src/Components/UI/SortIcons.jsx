import React from "react";
import { useState } from "react";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsSortUp,
} from "react-icons/bs";
import styles from "./css/sortIcons.module.css";

const SortIcons = ({ type, onSort }) => {
  const [sorted, setSorted] = useState(false);

  const clickSort = () => {
    setSorted(!sorted);
    // onSort(sorted);
  };

  return (
    <span onClick={clickSort} className={styles.sortIcon}>
      {type === "alpha" ? (
        <>{sorted ? <BsSortAlphaDown /> : <BsSortAlphaUp />}</>
      ) : (
        <>{sorted ? <BsSortDown /> : <BsSortUp />}</>
      )}
    </span>
  );
};

SortIcons.defaultProps = {
  type: "numeric",
};

export default SortIcons;
