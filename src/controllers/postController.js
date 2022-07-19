const postService = require('../services/postService');

const createBlogPost = async (req, res) => {
  const { id } = req.user;

  const { statusCode, result } = await postService.createBlogPost({ id, ...req.body });

  return res.status(statusCode).json(result);
};

const getAllPosts = async (_req, res) => {
  const { statusCode, result } = await postService.getAllPosts();

  return res.status(statusCode).json(result);
};

const getPostId = async (req, res) => {
  const { statusCode, result } = await postService.getPostId(req.params);

  return res.status(statusCode).json(result);
};

const updatePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { title, content } = req.body;
  const { statusCode, result } = await postService.updatePost(userId, id, title, content);

  return res.status(statusCode).json(result);
};

const deletePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const { statusCode, result } = await postService.deletePost(userId, id);

  return res.status(statusCode).json(result);
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostId,
  updatePost,
  deletePost,
};