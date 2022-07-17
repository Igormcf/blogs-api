const postService = require('../services/postService');

const createBlogPost = async (req, res) => {
  const { id } = req.user;

  console.log('req.user do controller', id);
  const { statusCode, result } = await postService.createBlogPost({ id, ...req.body });

  console.log('response Controller', statusCode, result);
  return res.status(statusCode).json(result);
};

const getAllPosts = async (req, res) => {
  const { statusCode, result } = await postService.getAllPosts();

  return res.status(statusCode).json(result);
};

module.exports = {
  createBlogPost,
  getAllPosts,
};