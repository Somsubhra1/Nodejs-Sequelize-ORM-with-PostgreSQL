const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Environment variables
require("dotenv/config");

const db = require("./config/database");

// Connect DB
db.authenticate()
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err) => console.log(err));

const app = express();

// Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Set static
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

// Gig routes

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
