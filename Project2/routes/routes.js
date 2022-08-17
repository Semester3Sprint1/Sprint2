const express = require("express");
const router = express.Router();

// const records = require('../services/records.dal')

router.use(express.static("public"));

router.get("/", async (req, res) => {
  res.render("input", { status: req.app.locals.status });
});
router.get("/proc", async (req, res) => {
  res.render("proc", { status: req.app.locals.status });
});
router.get("/records", async (req, res) => {
  res.render("records", { status: req.app.locals.status });
});

module.exports = router;
