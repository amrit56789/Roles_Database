const Sequelize = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const { databaseName, dbUserName, dbPassword } = process.env;
const sequelize = new Sequelize(databaseName, dbUserName, dbPassword, {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully");
} catch (error) {
  console.log(`Unable to connect to the database ${error}`);
}

module.exports = sequelize;
