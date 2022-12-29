const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/database");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const role = require("./models/role");

role.sync({ alter: true });

const { userRegister } = require("./controllers/userController");

const user = require("./models/user");

user.sync({ alter: true });

app.post("/user/register", userRegister);
const port = process.env.port || 8000;

app.listen(port);
console.log("Server running at http://localhost:8000");
