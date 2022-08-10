var {
  isString,
  isBoolean,
  isNumber,
  isEmpty,
  toLower,
  isNil,
} = require("lodash");

export function isDateString(value) {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
}

export function convertDateString(value) {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);
}

export function convertType(value) {
  if (isNumber(value)) {
    return value.toString();
  }
  if (isDateString(value)) {
    return convertDateString(value);
  }

  if (isBoolean(value)) {
    return value ? "1" : "-1";
  }

  return value;
}

export const filterRows = (rows, filters) => {
  if (isEmpty(filters)) return rows;

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor];
      const searchValue = filters[accessor];

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue));
      }

      if (isBoolean(value)) {
        return (
          (searchValue === "true" && value) ||
          (searchValue === "false" && !value)
        );
      }

      if (isNumber(value)) {
        return value == searchValue;
      }

      return false;
    });
  });
};

export const sortRows = (rows, sort) => {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort;

    if (isNil(a[orderBy])) return 1;
    if (isNil(b[orderBy])) return -1;

    const aLocale = convertType(a[orderBy]);
    const bLocale = convertType(b[orderBy]);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
};

export const paginateRows = (sortedRows, activePage, rowsPerPage) => {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
};
