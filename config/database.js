const { Sequelize } = require("sequelize");

// module.exports = new Sequelize("codegig", "postgres", "123456", {
//   host: "localhost",
//   dialect: "postgres",
// });

module.exports = new Sequelize(process.env.DATABASE_URL);
