const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { statusCode, result } = await userService.createUser(req.body);

  return res.status(statusCode).json(result);
};

const getAllUsers = async (req, res) => {
  const { statusCode, result } = await userService.getAllUsers();

  return res.status(statusCode).json(result);
};

module.exports = {
  createUser,
  getAllUsers,
};