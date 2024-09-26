const express = require("express");
const path = require("path");
const app = express();

// Database connection
const dbConnect = require("./mongodb");

// Setting View Engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting Port
const PORT = process.env.PORT || 8080;

// Routes here
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/submitted", async (req, res) => {
  let result = await dbConnect();
  let data = await result.find({}).toArray();
  res.render("formSub", { data });
});

app.get("/err", (req, res) => {
  res.render("err");
});

app.post("/submit", async (req, res) => {
  let result = await dbConnect();
  let data = result.insertOne(req.body);
  res.redirect("/submitted");
});

// listning here
app.listen(PORT, () => {
  console.log(`listning on this port http://localhost:${PORT}`);
});
