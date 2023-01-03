const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const User = require("../models/user");
const accessToken = sequelize.define(
  "accessToken",
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    expiryDate: {
      type: "TIMESTAMP",
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = accessToken;
