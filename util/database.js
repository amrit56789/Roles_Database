const Sequelize = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const { databaseName, dbUserName, dbPassword, host, dialect } = process.env;
const sequelize = new Sequelize(databaseName, dbUserName, dbPassword, {
  dialect: dialect,
  host: host,
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully");
} catch (error) {
  console.log(`Unable to connect to the database ${error}`);
}

module.exports = sequelize;
