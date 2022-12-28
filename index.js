const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/database");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const { addRole, getAllRole } = require("./controllers/roleControllers");

const role = require("./models/role");

role.sync({ alter: true });

app.post("/role/add", addRole);
app.get("/role/list", getAllRole);

const port = process.env.port || 8000;
app.listen(port);
console.log("Server running at http://localhost:8000");
