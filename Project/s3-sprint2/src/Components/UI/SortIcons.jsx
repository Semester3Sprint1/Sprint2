import React from "react";
import { useState } from "react";
import {
  BsSortAlphaDown,
  BsSortAlphaUp,
  BsSortDown,
  BsSortUp,
} from "react-icons/bs";
import { VscClearAll } from "react-icons/vsc";
import styles from "./css/sortIcons.module.css";

const SortIcons = ({ sort, accessor }) => {
  const sortIcon = () => {
    if (accessor === sort.orderBy) {
      if (sort.order === "asc") {
        return <BsSortUp />;
      }
      return <BsSortDown />;
    } else {
      return <VscClearAll />;
    }
  };

  return (
    <span className={styles.sortIcon}>
      <>{sortIcon()}</>
    </span>
  );
};

SortIcons.defaultProps = {
  type: "numeric",
};

export default SortIcons;
