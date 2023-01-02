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

const getUser = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await user.findOne({
      where: {
        id,
      },
    });
    if (userData === null) {
      res.status(500).send({ message: "500 error, Id is invalid" });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "500 error to user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.headers;
    const deleteUser = await user.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({ status: deleteUser });
  } catch (error) {
    res.status(500).send({ message: "500 error to user" });
  }
};

const findLimitUser = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  try {
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber)) {
      if (sizeAsNumber > 0 && size < 10) {
        size = sizeAsNumber;
      }
    }
    const users = await user.findAndCountAll({
      limit: sizeAsNumber,
      offset: pageAsNumber * sizeAsNumber,
    });

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: null });
  }
};

module.exports = { userRegister, login, getUser, deleteUser, findLimitUser };
