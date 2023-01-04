const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const sequelize = require("./util/database");
const role = require("./models/role");
const user = require("./models/user");
const token = require("./models/accessToken");
const address = require("./models/address");

const {
  userRegister,
  login,
  getUser,
  deleteUser,
  findLimitUser,
  addAddress,
} = require("./controllers/userController");

// Role table start
const {
  addRole,
  getAllRole,
  roleUpdate,
  deleteRole,
  getSingleRole,
} = require("./controllers/roleControllers");

const {
  checkValidation,
  validationMiddleWare,
  emailValidator,
  getUserValidate,
  deleteUserData,
  tokenValidator,
} = require("./middleWare/middleWare");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

role.sync({ alter: false });
user.sync({ alter: false });
token.sync({ alert: false });
address.sync({ alter: false });
// Role table
app.post("/role/add", addRole);
app.get("/role/list", getAllRole);
app.put("/role/edit/:id", roleUpdate);
app.delete("/role/delete/:id", deleteRole);
app.get("/role/:id", getSingleRole);

// User table
app.post(
  "/user/register",
  [checkValidation(), validationMiddleWare],
  userRegister
);

// login
app.post("/user/login", [emailValidator(), validationMiddleWare], login);
app.get("/user/get/", getUserValidate, getUser);
app.put("/user/delete", deleteUserData, deleteUser);
app.get("/user/list/:limit/:page", findLimitUser);

// address
app.post("/user/address", tokenValidator, addAddress);

// Port connection
const port = process.env.port || 8000;

app.listen(port);
console.log("Server running at http://localhost:8000");
