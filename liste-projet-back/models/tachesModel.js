const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assurez-vous de configurer votre connexion à la base de données

const Taches = sequelize.define("Taches", {
  tac_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tac_titre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tac_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tac_important: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tac_delai: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pro_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Projets",
      key: "pro_id",
    },
  },
  // Ajoutez d'autres champs en fonction de vos besoins
});

module.exports = Taches;
