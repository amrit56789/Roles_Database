const { check, validationResult } = require("express-validator");
const Token = require("../models/accessToken");

const checkValidation = () => {
  return [
    // Check password username
    check("username")
      .isLength({ min: 3 })
      .withMessage("UserName must be at least 3 character long"),

    // Check password length
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 character long"),

    // Check email
    check("email").isEmail().withMessage("Email is not correct"),

    // check password and confirm password validation
    check("confirmPassword")
      .exists()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password and confirm password doesn't match"),
  ];
};

const emailValidator = () => {
  // Check email
  return [check("email").isEmail().withMessage("Email is not correct")];
};

const getUserValidate = (req, res, next) => {
  const userId = req.headers.id;
  if (!userId) {
    res.status(500).send({ message: "500 error to user, Please define Id" });
  }
  next();
};

const deleteUserData = (req, res, next) => {
  const userId = req.headers.id;
  if (!userId) {
    res
      .status(500)
      .send({ message: "500 error to user, Please enter valid id." });
  }
  next();
};

const tokenValidator = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const findToken = await Token.findOne({
      where: {
        token,
      },
    });

    let timing = findToken.expiryDate.getTime();
    let currentTime = new Date().getTime();

    let difference = (timing - currentTime) / 1000;
    difference /= 60;

    let minutes = Math.abs(Math.round(difference));

    if (findToken && findToken.token === token) {
      if (minutes < 60) {
        req.body = { ...req.body, userId: findToken.userId };
        next();
      } else {
        res.status(401).send({ message: "Sorry session expire" });
      }
    } else {
      res.status(500).send({ message: "500 error to user, Wrong credential." });
    }
  } else {
    res.status(500).send({ message: "500 error to user, Please enter token." });
  }
};

const validationMiddleWare = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  checkValidation,
  validationMiddleWare,
  emailValidator,
  getUserValidate,
  deleteUserData,
  tokenValidator,
};
