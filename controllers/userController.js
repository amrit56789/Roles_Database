const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const user = require("../models/user");

const userRegister = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, roleId } = req.body;
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
    res.status(500).send({ message: "Sorry, Role id is wrong" });
  }
};

module.exports = { userRegister };
