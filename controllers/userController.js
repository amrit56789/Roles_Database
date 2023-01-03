const Sequelize = require("sequelize");
const crypto = require("crypto");
const moment = require("moment");
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const user = require("../models/user");
const accessToken = require("../models/accessToken");

const SECRET_KEY = "NotesApi";

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
      res
        .status(401)
        .send({ message: "500 Error to user, Email or password is incorrect" });
    } else {
      const isMatch = await bcrypt.compare(password, userData.password);
      if (isMatch) {
        const token = await createTokenSave(userData.id, email, password);
        res.status(200).send({ message: "Success full add" });
      } else {
        res.status(500).send({
          message: "500 Error to user, Email or password is incorrect",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "500 error to user, Internal server error" });
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
    res
      .status(500)
      .send({ message: "500 error to user, Internal server error" });
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
  try {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const data = await user.findAndCountAll({
      limit: limit,
      offset: page,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "500 error to user, data not find" });
  }
};

const createTokenSave = async (id, email, password) => {
  const Token = crypto
    .createHash("md5")
    .update(`${email}${password}${SECRET_KEY}`)
    .digest("hex");

  const expiryDate = moment().add(1, "hour").toDate();

  const tokenData = await accessToken.create({
    userId: id,
    accessToken: Token,
    expiryDate: expiryDate,
  });
};

module.exports = {
  userRegister,
  login,
  getUser,
  deleteUser,
  findLimitUser,
};
