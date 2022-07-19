const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { statusCode, result } = await userService.createUser(req.body);

  return res.status(statusCode).json(result);
};

const getAllUsers = async (req, res) => {
  const { statusCode, result } = await userService.getAllUsers();

  return res.status(statusCode).json(result);
};

const getUserId = async (req, res) => {
  const { statusCode, result } = await userService.getUserId(req.params);

  return res.status(statusCode).json(result);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await userService.deleteUser(id);
  
  return res.status(statusCode).json(result);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
  deleteUser,
};