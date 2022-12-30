const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Role = require("../models/role");

const user = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING(12),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(20),
    },
    lastName: {
      type: Sequelize.STRING(20),
    },
    roleId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = user;
