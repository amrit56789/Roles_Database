const sequelize = require("../util/database");
const role = require("../models/role");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const roleData = await role.create({ name, description });
    res.status(200).send(roleData);
  } catch (error) {
    res.status(500).send({ message: "500 error to user" });
  }
};
module.exports = {
  addRole,
};
