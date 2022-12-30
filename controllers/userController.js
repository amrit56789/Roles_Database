const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const user = require("../models/user");

const userRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      roleId,
      confirmPassword,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userData = await user.create({
      username,
      password: hash.slice(0, 6),
      email,
      firstName,
      lastName,
      roleId,
    });
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "500 error to user" });
  }
};

module.exports = { userRegister };
