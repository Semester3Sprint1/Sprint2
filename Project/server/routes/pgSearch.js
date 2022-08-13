const express = require("express");
const router = express.Router();
const { pgSearchAll } = require("../services/postgres_dal/pgSearch.dal");

router.post("/", async (req, res) => {
  let response = await pgSearchAll(req.body);
  res.status(200).send(response);
});

module.exports = router;
