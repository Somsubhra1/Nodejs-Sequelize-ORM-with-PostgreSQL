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

app.get("/", (req, res) => {
  res.send("Index");
});

// Gig routes

app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
