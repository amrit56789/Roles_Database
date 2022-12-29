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
    if (password !== confirmPassword) {
      return res
        .status(402)
        .send({ message: "password and confirm password doesn't match" });
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, 10);
    const userData = await user.create({
      username,
      password: hash,
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
