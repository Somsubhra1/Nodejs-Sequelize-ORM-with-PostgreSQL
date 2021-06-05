const sequelize = require("sequelize");

const db = require("../config/database");

// Define a model for db
const Gig = db.define("gig", {
  title: {
    type: sequelize.STRING,
  },
  technologies: {
    type: sequelize.STRING,
  },
  description: {
    type: sequelize.STRING,
  },
  budget: {
    type: sequelize.STRING,
  },
  contact_email: {
    type: sequelize.STRING,
  },
});

// Sync helps to sync the models/tables with the db,
// { force: true } - drops the tables and recreates them
// Better way is to use migration to keep track of db fields when updated without droping the entire table
// Gig.sync({ force: true });

module.exports = Gig;
