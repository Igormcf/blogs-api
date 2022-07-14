const Joi = require('joi');

const createUserDto = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const createUserValid = (req, res, next) => {
  const { error } = createUserDto.validate(req.body);

  if (!error) {
    return next();
  }

  console.log('joicreate', error);
  const [message] = error.details.map((e) => e.message);

  return res.status(400).json({ message });
};

module.exports = createUserValid;