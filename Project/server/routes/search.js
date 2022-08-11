const express = require("express");
const router = express.Router();

const { searchMovies } = require("../services/mongo_dal/searchMovies.dal");

router.post("/mongo", async (req, res) => {
  let response = await searchMovies(req.body);
  res.status(200).send(response);
});

module.exports = router;
