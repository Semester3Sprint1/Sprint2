const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { treeify, inputvalues } = require("./services/binaryTree");
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("input", { status: app.locals.status });
});

app.get("/proc", async (req, res) => {
  res.render("proc", { status: app.locals.status });
});

app.post("/proc", function (req, res) {
  var tree = treeify(req.body.inputvalues);
  var StringArray = JSON.stringify(tree, null, 2);
  console.log(StringArray);
  res.render("proc", { StringArray, tree });
});

app.get("/records", async (req, res) => {
  res.render("records");
});
const Router = require("./routes/routes");
app.use("/", Router);

app.use((req, res) => {
  res.status(404).render("404");
});
