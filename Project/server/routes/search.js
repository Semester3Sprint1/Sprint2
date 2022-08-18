const express = require("express");
const router = express.Router();
const logger = require("../startup/logging");
const { logSearch } = require("../startup/searchLog");
const { Search, validate } = require("../models/search");

// const { searchMovies } = require("../services/mongo_dal/searchMovies.dal");

router.get("/mongo", async (req, res) => {
  const { searchText, user, target } = req.query;
  const { error } = await validate({ searchText });
  if (error) {
    logger.error("invalid Search");
    return res.status(400).send(error.details[0].message);
  }
  if (target === "movie") {
    var agg = [
      {
        $search: {
          index: "searchBar",
          compound: {
            should: [
              {
                autocomplete: {
                  query: `${searchText}`,
                  path: "title",
                  fuzzy: { maxEdits: 2, prefixLength: 2, maxExpansions: 100 },
                },
              },
              {
                autocomplete: {
                  query: `${searchText}`,
                  path: "fullplot",
                  fuzzy: { maxEdits: 2, prefixLength: 2, maxExpansions: 100 },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 250,
      },
    ];
  } else {
    var agg = [
      {
        $search: {
          index: "searchBar",

          text: {
            query: `${searchText}`,
            path: "cast",
            fuzzy: { maxEdits: 2, prefixLength: 2, maxExpansions: 100 },
          },
        },
      },
      {
        $limit: 250,
      },
    ];
  }

  let response = await Search.aggregate(agg);
  logSearch(user, searchText, response.length, "MONGODB");

  res.status(200).send(response);
});

//PGAdmin
const {
  pgSearchAll,
  pgSearchByText,
} = require("../services/postgres_dal/pgSearch.dal");

const { getFilmDetails } = require("../services/postgres_dal/pg.getMovies.dal");

router.get("/pg", async (req, res) => {
  const { searchText, user } = req.query;
  let films = await pgSearchAll(searchText);
  let response = await getFilmDetails(films);

  logSearch(user, searchText, response.length, "POSTGRESQL");
  res.status(200).send(response);
});

module.exports = router;
