const Joi = require('joi');

const updatePostDto = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const updatePostValid = (req, res, next) => {
  const { error } = updatePostDto.validate(req.body);

  if (!error) {
    return next();
  }

  console.log(error);
  const [message] = error.details.map((e) => e.message);

  return res.status(400).json({ message });
};

module.exports = updatePostValid;