const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email, password } });

  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  if (!findUser) {
    return { statusCode: 400, result: { message: 'Invalid fields' } };
  }

  const token = jwt.sign({ email }, JWT_SECRET, config);

  return { statusCode: 200, result: { token } };
};

module.exports = {
  login,
};