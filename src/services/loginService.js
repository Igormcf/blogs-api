const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email, password } });
 
  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  if (findUser === null) {
    return { statusCode: 400, result: { message: 'Invalid fields' } };
  }

  const payload = {
    email,
    id: findUser.id,
  };
  const token = jwt.sign(payload, JWT_SECRET, config);

  return { statusCode: 200, result: { token } };
};

module.exports = {
  login,
};