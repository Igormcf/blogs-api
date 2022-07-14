const Joi = require('joi');

const loginDTO = Joi.object({
  email: Joi.string().required(),
  password: Joi.number().required(),
}).message({ 'any.required': 'Some required fields are missing' });

const validLogin = (req, res, next) => {
  const { error } = loginDTO.validate(req.body);

  if (!error) {
    return next();
  }

  const [message] = error.details.map((e) => e.message);

  return res.status(400).json({ message });
};

module.exports = validLogin;