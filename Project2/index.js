const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  res.render("input", { status: app.locals.status });
});

app.get("/proc", async (req, res) => {
  res.render("proc");
});

const Router = require("./routes/routes");
app.use("/", Router);

app.use((req, res) => {
  res.status(404).render("404");
});
