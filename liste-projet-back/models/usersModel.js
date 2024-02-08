const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assurez-vous de configurer votre connexion à la base de données

const Users = sequelize.define("Users", {
  use_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  use_pseudo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  use_email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  use_password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // Ajoutez d'autres champs en fonction de vos besoins
});

module.exports = Users;
