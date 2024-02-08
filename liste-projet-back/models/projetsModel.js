const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assurez-vous de configurer votre connexion à la base de données

const Projets = sequelize.define("Projets", {
  pro_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pro_nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  pro_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  use_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Users",
      key: "use_id",
    },
  },
  // Ajoutez d'autres champs en fonction de vos besoins
});

module.exports = Projets;
