const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const createUser = async ({ displayName, email, password, image }) => {
  const findOne = await User.findOne({ where: { email } });

  if (findOne) {
    return { statusCode: 409, result: { message: 'User already registered' } };
  }

  const config = { expiresIn: '7d', algorithm: 'HS256' };

  const { id } = await User.create({ displayName, email, password, image });

  const payload = { displayName, id };

  const token = jwt.sign(payload, JWT_SECRET, config);

  return { statusCode: 201, result: { token } };
};

const getAllUsers = async () => {
  const findAllUsers = await User.findAll({ attributes: { exclude: 'password' } });

  return {
    statusCode: 200,
    result: findAllUsers,
  };
};

const getUserId = async ({ id }) => {
  const findUserId = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!findUserId) {
    return { statusCode: 404, result: { message: 'User does not exist' } };
  }

  return { statusCode: 200, result: findUserId };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
};