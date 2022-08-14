const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Search, validate } = require("../models/search");
const { searchMovies } = require("../services/mongo_dal/searchMovies.dal");

router.post("/mongo", async (req, res) => {
  const { searchText } = req.body;
  const { error } = await validate(req.body);
  if (error) {
    winston.error("invalid Search");
    return res.status(400).send(error.details[0].message);
  }
  let response = await Search.find({ $text: { $search: `"${searchText}"` } });
  // let response = await searchMovies(req.body);
  res.status(200).send(response);
});

//PGAdmin
const { pgSearchAll } = require("../services/postgres_dal/pgSearch.dal");

router.post("/pg", async (req, res) => {
  let response = await pgSearchAll(req.body);
  res.status(200).send(response);
});

module.exports = router;
