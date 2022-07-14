const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return { statusCode: 201, result: newCategory };
};

module.exports = {
  createCategory,
};