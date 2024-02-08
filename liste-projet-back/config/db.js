// Config Sequelize
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Testez la connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connecté à la base de données MySQL via Sequelize");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
  }
})();

module.exports = sequelize;
