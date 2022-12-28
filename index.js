const express = require("express");

const app = express();
const sequelize = require("./util/database");

const role = require("./models/role");

role.sync({ alter: true });

const port = process.env.port || 8000;
app.listen(port);
console.log("Server running at http://localhost:8000");
