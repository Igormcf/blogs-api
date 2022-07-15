const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const { statusCode, result } = await categoriesService.createCategory(req.body);

  return res.status(statusCode).json(result);
};

const getAllCategories = async (req, res) => {
  const { statusCode, result } = await categoriesService.getAllCategories();
  
  return res.status(statusCode).json(result);
};
module.exports = {
  createCategory,
  getAllCategories,
};