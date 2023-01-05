const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const user = require("../models/user");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Role;
