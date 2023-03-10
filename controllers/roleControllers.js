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

const getAllRole = async (req, res) => {
  try {
    const findData = await role.findAll();
    res.status(200).send(findData);
  } catch (error) {
    res.status(500).send({
      message: "500 error to user",
    });
  }
};

const roleUpdate = async (req, res) => {
  const { description, id } = req.body;
  try {
    const roleDataUpdate = await role.update(
      {
        description: description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send(roleDataUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).sendStatus({ message: "500 error to user" });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.body;
  try {
    const roleDelete = await role.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "500 error to user" });
  }
};

const getSingleRole = async (req, res) => {
  const { id } = req.body;
  try {
    const getRole = await role.findAll({
      where: {
        id: id,
      },
    });
    res.status(200).send(getRole);
  } catch (err) {
    res.status(500).send({ message: "500 error to user" });
  }
};

module.exports = {
  addRole,
  getAllRole,
  roleUpdate,
  deleteRole,
  getSingleRole,
};
