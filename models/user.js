const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Role = require("../models/role");
const user = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    roleId: {
      type: Sequelize.INTEGER,
      reference: {
        model: "Role",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Role.hasMany(user);
module.exports = user;
