const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { treeify, inputvalues } = require("./services/binaryTree");
const PORT = process.env.PORT || 4000;
var MongoClient = require("mongodb").MongoClient;

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

app.post("/proc", async (req, res) => {
  var tree = await treeify(req.body.inputvalues);
  var StringArray = JSON.stringify(tree, null, 2);

  var url = "mongodb+srv://sprint2:sprint2@cluster0.svdzfgf.mongodb.net/test";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sprint2");

    dbo
      .collection("treeify")
      .insertOne(JSON.parse(StringArray), function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
  });

  res.render("proc", { StringArray });
});

app.get("/records", async (req, res) => {
  var url = "mongodb+srv://sprint2:sprint2@cluster0.svdzfgf.mongodb.net/test";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sprint2");
    dbo
      .collection("treeify")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        stringDBArray = JSON.stringify(result, null, 2);
        res.render("records", { stringDBArray });
      });
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});
