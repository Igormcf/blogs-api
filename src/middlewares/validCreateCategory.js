const Joi = require('joi');

const createCategoryDto = Joi.object({
  name: Joi.string().empty().required(),
});

const createCategoryValid = (req, res, next) => {
  const { error } = createCategoryDto.validate(req.body);

  if (!error) {
    return next();
  }

  const [message] = error.details.map((e) => e.message);

  return res.status(400).json({ message });
};

module.exports = createCategoryValid;