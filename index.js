const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/database");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const {
  addRole,
  getAllRole,
  roleUpdate,
  deleteRole,
  getSingleRole,
} = require("./controllers/roleControllers");

const role = require("./models/role");

role.sync({ alter: true });

app.post("/role/add", addRole);
app.get("/role/list", getAllRole);
app.put("/role/edit/:id", roleUpdate);
app.delete("/role/delete/:id", deleteRole);
app.get("/role/:id", getSingleRole);
const port = process.env.port || 8000;
app.listen(port);
console.log("Server running at http://localhost:8000");
