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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await user.findOne({
      where: {
        email,
      },
    });
    if (!userData) {
      res.status(401).send({ message: "500 Error to user" });
    } else {
      const isMatch = await bcrypt.compare(password, userData.password);
      if (isMatch) {
        res.status(200).send({ id: userData.id });
      } else {
        res.status(500).send({ message: "500 error to user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "500 error to user" });
  }
};

module.exports = { userRegister, login };
