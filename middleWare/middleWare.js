const { check, validationResult } = require("express-validator");

const checkValidation = () => {
  return [
    check("username")
      .matches(/^[a-zA-z0-9]+$/)
      .withMessage("UserName must be alpha numeric"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 character long"),
    check("email").isEmail().withMessage("Email is not correct"),
  ];
};

const validationMiddleWare = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { checkValidation, validationMiddleWare };
