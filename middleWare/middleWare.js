const { check, validationResult } = require("express-validator");

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
    check("email").isEmail().withMessage("Email is not correct"),

    // check password and confirm password validation
    check("confirmPassword")
      .exists()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password and confirm password doesn't match"),
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
