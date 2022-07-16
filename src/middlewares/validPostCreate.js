const Joi = require('joi');

const createPostDto = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
  categoryIds: Joi.array().empty().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const createPostValid = (req, res, next) => {
  const { error } = createPostDto.validate(req.body);

  if (!error) {
    return next();
  }

  console.log(error);
  const [message] = error.details.map((e) => e.message);

  return res.status(400).json({ message });
};

module.exports = createPostValid;