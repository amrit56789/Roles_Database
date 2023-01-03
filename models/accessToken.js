const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const accessToken = sequelize.define(
  "accessToken",
  {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
