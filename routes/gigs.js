const router = require("express").Router();
const db = require("../config/database");

const Gig = require("../models/Gig");

router.get("/", async (req, res) => {
  try {
    //   Get all data from a table
    const gigs = await Gig.findAll();
    console.log(gigs);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
