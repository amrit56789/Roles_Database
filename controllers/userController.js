const Sequelize = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sequelize = require("../util/database");
const user = require("../models/user");
const token = require("../models/accessToken");
const addressData = require("../models/address");
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
        res.status(200).send(token);
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
      include: {
        model: addressData,
        as: "addressList",
        attributes: ["address", "city"],
      },
      where: {
        id,
      },
    });
    if (userData === null) {
      res.status(500).send({ message: "500 error, Id is invalid" });
    }
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
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
  const tokenValue = crypto
    .createHash("md5")
    .update(`${email}${password}${process.env.SECRET_KEY}`)
    .digest("hex");

  const expiryDate = new Date();

  const tokenData = await token.create({
    userId: id,
    token: tokenValue,
    expiryDate: expiryDate,
  });

  return tokenData;
};

const addAddress = async (req, res) => {
  try {
    const { address, city, state, pin_code, phone_no, userId } = req.body;
    const createAddress = await addressData.create({
      address,
      city,
      state,
      pin_code,
      phone_no,
      userId,
    });
    res.status(200).send(createAddress);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "500 error to user, Internal server error" });
  }
};

module.exports = {
  userRegister,
  login,
  getUser,
  deleteUser,
  findLimitUser,
  addAddress,
};
