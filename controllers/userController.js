const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const user = require("../models/user");

const userRegister = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, roleId } = req.body;
    const userData = await user.create({
      username,
      password,
      email,
      firstName,
      lastName,
      roleId,
    });
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "500 error to user" });
  }
};

module.exports = { userRegister };
