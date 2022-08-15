import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import { sortRows, filterRows, paginateRows } from "./helpers/helpers";
import SortIcons from "./SortIcons";
import styles from "./css/table.module.css";

const Table = ({ rows, columns, onSelect, loadMoreData, pages, searched }) => {
  const { activePage, setActivePage } = pages;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: "asc", orderBy: "" });
  const rowsPerPage = 20;

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    console.log(accessor);
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <>
      <table className="table table">
        <thead className="thead-dark">
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.accessor} scope="col">
                  <span>{column.label}</span>{" "}
                  {column.type === "rating" ? (
                    <span onClick={() => handleSort(column.accessor)}>
                      <SortIcons sort={sort} accessor={column.accessor} />
                    </span>
                  ) : (
                    <span onClick={() => handleSort(column.accessor)}>
                      <SortIcons sort={sort} accessor={column.accessor} />
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((column) => {
              if (column.type !== "rating") {
                return (
                  <th>
                    <input
                      key={`${column.accessor}-search`}
                      type="search"
                      placeholder={`Filter by ${column.label}`}
                      value={filters[column.accessor]}
                      onChange={(event) =>
                        handleSearch(event.target.value, column.accessor)
                      }
                    />
                  </th>
                );
              } else {
                return <th></th>;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr
                key={row._id}
                className={styles.dataRow}
                onClick={() => onSelect(row)}
              >
                {columns.map((column) => {
                  if (column.type === "date") {
                    let date = new Date(row[column.accessor]);
                    return (
                      <td key={column.accessor}>{date.toLocaleDateString()}</td>
                    );
                  } else if (column.type === "rating") {
                    // This part of the code is NOT reusable, and will need to be deleted later. I wasn't sure how to access data that was within another object layer
                    return <td key={column.accessor}>{row.imdb.rating}</td>;
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        count={count}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        setActivePage={setActivePage}
        loadMoreData={loadMoreData}
        searched={searched}
      />
    </>
  );
};

export default Table;
