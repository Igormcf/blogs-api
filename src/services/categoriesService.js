const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return { statusCode: 201, result: newCategory };
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return { statusCode: 200, result: allCategories };
};

module.exports = {
  createCategory,
  getAllCategories,
};