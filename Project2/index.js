const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});

app.set("view engine", "ejs");

const customerRouter = require("./routes/customer");

app.use("/customer", customerRouter);

app.use((req, res) => {
  res.status(404).render("404");
});
