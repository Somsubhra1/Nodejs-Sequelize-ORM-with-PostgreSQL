const router = require("express").Router();
const db = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Gig = require("../models/Gig");

// Get gigs list
router.get("/", async (req, res) => {
  try {
    //   Get all data from a table
    // raw: true is needed to pass just the raw data to template
    const gigs = await Gig.findAll({ raw: true });
    console.log(gigs);
    res.render("gigs", { gigs });
  } catch (error) {
    console.log(error);
  }
});

// Display add gig form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add a gig
router.post("/add", async (req, res) => {
  try {
    let { title, technologies, budget, description, contact_email } = req.body;

    let errors = [];

    if (!title) {
      errors.push({ text: "Please add a title!" });
    }
    if (!technologies) {
      errors.push({ text: "Please add some technologies!" });
    }
    if (!description) {
      errors.push({ text: "Please add a description!" });
    }
    if (!contact_email) {
      errors.push({ text: "Please add a contact email!" });
    }

    // Check for errors

    if (errors.length > 0) {
      res.render("add", {
        errors,
        title,
        technologies,
        budget,
        description,
        contact_email,
      });
    } else {
      if (!budget) {
        budget = "Unknown";
      } else {
        budget = `$${budget}`;
      }
      // Make lower case and remove space and comma
      technologies = technologies.toLowerCase().replace(/, /g, ",");
      await Gig.create({
        title,
        technologies,
        budget,
        description,
        contact_email,
      });

      res.redirect("/gigs");
    }

    // Insert into table
  } catch (error) {}
});

router.get("/search", async (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  const gigs = await Gig.findAll({
    where: { technologies: { [Op.like]: `%${term}%` } },
    raw: true,
  });

  res.render("gigs", { gigs });
});

module.exports = router;
